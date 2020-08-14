/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.health

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.mongodb.MongoClient
import com.mongodb.MongoClientOptions
import com.mongodb.MongoCommandException
import com.mongodb.MongoCredential
import com.mongodb.MongoException
import com.mongodb.ServerAddress
import jp.co.trillium.secureskye.mongodb.init.extensions.getAdminDatabase
import jp.co.trillium.secureskye.mongodb.init.mongo.CommandState
import jp.co.trillium.secureskye.mongodb.init.mongo.DatabaseStatus
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommandError
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands.dbStats
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands.listShards
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands.replSetGetStatus
import jp.co.trillium.secureskye.mongodb.init.mongo.ReplicaSetMember
import jp.co.trillium.secureskye.mongodb.init.mongo.ReplicaSetStatus
import jp.co.trillium.secureskye.mongodb.init.mongo.ReplicaState
import jp.co.trillium.secureskye.mongodb.init.mongo.ShardList
import jp.co.trillium.secureskye.mongodb.init.properties.MongodbInitProperties
import mu.KLogging
import org.springframework.boot.actuate.health.Health
import org.springframework.boot.actuate.health.HealthIndicator
import org.springframework.stereotype.Component

/**
 * A health indicator to report the status of the MongoDB cluster through this services health endpoint.
 */
@Component
class MongodbInitHealthIndicator(
    private val settings: MongodbInitProperties,
    private val objectMapper: ObjectMapper
) : HealthIndicator {

    /**
     * [HealthIndicator.health].
     */
    override fun health(): Health {
        val details = HealthDetails()

        if (!settings.config.run { checkReplicaStatus(settings.ports.config, name, master, slaves, details) })
            return Health.down()
                .withDetail("reason", "Config replica is down")
                .withDetail("status", details)
                .build()

        for (shard in settings.shards) {
            if (!shard.run { checkReplicaStatus(settings.ports.shards, name, master, slaves, details) })
                return Health.down()
                    .withDetail("reason", "Shard replica '${shard.name}' is down")
                    .withDetail("status", details)
                    .build()
        }

        for (router in settings.routers) {
            if (!checkRouterStatus(settings.ports.routers, router, settings.shards.map { it.name }, details))
                return Health.down()
                    .withDetail("reason", "Router '$router' is down")
                    .withDetail("status", details)
                    .build()
        }

        for (database in settings.databases) {
            if (!checkDatabaseStatus(settings.ports.routers, settings.routers.first(), database, details))
                return Health.down()
                    .withDetail("reason", "Database '$database' is down")
                    .withDetail("status", details)
                    .build()
        }

        return Health.up()
            .withDetail("status", details)
            .build()
    }

    /**
     * Check the readiness of a replica set.
     */
    private fun checkReplicaStatus(
        port: Int,
        id: String,
        master: String,
        slaves: List<String>,
        healthDetails: HealthDetails
    ): Boolean {
        val client = connect(master, port) ?: return false

        val buff = try {
            client.getAdminDatabase().runCommand(replSetGetStatus)
        } catch (e: MongoCommandException) {
            if (e.errorCode != MongoCommandError.keyNotFound)
                logger.warn(e) { "Failed getting replica set status" }
            return false
        }

        val result = objectMapper.readValue<ReplicaSetStatus>(buff.toJson())

        removeMemberPorts(result)

        val masterMember = result.members.find { it.name == master } ?: ReplicaSetMember()
        val slaveMembers = result.members - masterMember

        updateReplicaHealthDetails(healthDetails, result.set, masterMember, slaveMembers)

        return result.ok == CommandState.Succeeded &&
                result.set == id &&
                result.myState == ReplicaState.Primary &&
                masterMember.name == master &&
                slaveMembers.all { slaves.contains(it.name) && it.state == ReplicaState.Secondary }
    }

    /**
     * Update the [HealthDetails] with status about the replica set.
     */
    private fun updateReplicaHealthDetails(
        healthDetails: HealthDetails,
        setName: String,
        masterMember: ReplicaSetMember,
        slaveMembers: List<ReplicaSetMember>
    ) {
        val details =
            if (masterMember.name == settings.config.master)
                healthDetails.config
            else healthDetails.shards.getOrPut(setName) { HealthDetails.Replica() }

        details.master = HealthDetails.Node(masterMember, ReplicaState.Primary)
        details.slaves = slaveMembers.map { HealthDetails.Node(it, ReplicaState.Secondary) }
    }

    /**
     * Strip the port from member names in [status].
     */
    private fun removeMemberPorts(status: ReplicaSetStatus) {
        status.members.forEach {
            val index = it.name.indexOf(':')
            if (index > 0)
                it.name = it.name.substring(0, index)
        }
    }

    /**
     * Check the readiness of a router of the sharded cluster.
     */
    private fun checkRouterStatus(
        port: Int,
        router: String,
        shards: List<String>,
        healthDetails: HealthDetails
    ): Boolean {
        val client = connect(router, port) ?: return false

        try {
            val buff = client.getAdminDatabase().runCommand(listShards)
            val result = objectMapper.readValue<ShardList>(buff.toJson())
            val up = result.ok == CommandState.Succeeded && result.shards.all { shards.contains(it.id) }

            healthDetails.routers.add(HealthDetails.Node(router, if (up) "UP" else "DOWN"))

            return up
        } catch (e: MongoException) {
            logger.warn(e) { "Connection refused" }
        }

        return false
    }

    /**
     * Check the readiness of a database.
     */
    private fun checkDatabaseStatus(
        port: Int,
        router: String,
        database: String,
        healthDetails: HealthDetails
    ): Boolean {
        val client = connect(router, port) ?: return false

        val buff = client.getDatabase(database).runCommand(dbStats)
        val result = objectMapper.readValue<DatabaseStatus>(buff.toJson())
        val up = result.ok == CommandState.Succeeded && result.raw.isNotEmpty()

        healthDetails.databases.add(HealthDetails.Node(database, if (up) "UP" else "DOWN"))

        return up
    }

    /**
     * Try to connect to the MongoDB instance and return the [MongoClient] or **null** if the
     * connection failed.
     */
    private fun connect(router: String, port: Int) = try {
        MongoClient(
            ServerAddress(router, port),
            MongoCredential.createCredential("mongodb", "admin", "mongodb".toCharArray()),
            MongoClientOptions.builder().build()
        )
    } catch (e: MongoException) {
        logger.warn(e) { "Connection refused" }
        null
    }

    private companion object : KLogging()
}
