/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.runners

import com.fasterxml.jackson.databind.ObjectMapper
import com.mongodb.MongoClient
import com.mongodb.MongoClientOptions
import com.mongodb.MongoCommandException
import com.mongodb.MongoCredential
import com.mongodb.MongoException
import com.mongodb.ServerAddress
import jp.co.trillium.secureskye.mongodb.init.extensions.getAdminDatabase
import jp.co.trillium.secureskye.mongodb.init.extensions.getConfigDatabase
import jp.co.trillium.secureskye.mongodb.init.extensions.toIndentedJson
import jp.co.trillium.secureskye.mongodb.init.extensions.toObject
import jp.co.trillium.secureskye.mongodb.init.mongo.CommandState
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommandError
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands.addShard
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands.createUser
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands.enableSharding
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands.listShards
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands.replSetGetStatus
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands.replSetInitiate
import jp.co.trillium.secureskye.mongodb.init.mongo.MongoCommands.usersInfo
import jp.co.trillium.secureskye.mongodb.init.mongo.ReplicaSetStatus
import jp.co.trillium.secureskye.mongodb.init.mongo.ReplicaState
import jp.co.trillium.secureskye.mongodb.init.mongo.ShardList
import jp.co.trillium.secureskye.mongodb.init.mongo.UserInfo
import jp.co.trillium.secureskye.mongodb.init.mongo.UserRole
import jp.co.trillium.secureskye.mongodb.init.properties.MongodbInitProperties
import mu.KLogging
import org.apache.commons.lang.time.DateUtils
import org.bson.Document
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

/**
 * An initiator for sharded MongoDB cluster that does all the necessary setup for a fresh group of servers.
 * The setup of the individual servers is done through [settings].
 */
@Component
class MongoInitiator(
    private val settings: MongodbInitProperties,
    private val objectMapper: ObjectMapper
) : CommandLineRunner {

    /**
     * [CommandLineRunner.run].
     */
    override fun run(vararg args: String?) {
        setupSharding()
    }

    private fun connect(host: String, port: Int, func: MongoClient.() -> Boolean): Boolean {
        var client: MongoClient? = null
        var count = 0

        while (count++ < connectTryCount) {
            try {
                client = MongoClient(
                    ServerAddress(host, port),
                    MongoCredential.createCredential("mongodb", "admin", "mongodb".toCharArray()),
                    MongoClientOptions.builder().build()
                )
                break
            } catch (e: MongoException) {
                logger.info { e }
                logger.info { "Connection refused, trying again ($count/30)..." }
                Thread.sleep(connectSleepTime)
            }
        }

        client.use {
            return client?.func() ?: false
        }
    }

    /**
     * Setup a [master] and one or more [slaves] with [port] for replication with the given replica set [name].
     * Also defines if this set is to be a [configSvr] or not.
     */
    private fun setupReplicaSet(
        name: String,
        configSvr: Boolean,
        port: Int,
        master: String,
        slaves: List<String>
    ): Boolean = connect(master, port) {
        try {
            val replSetStatus = getAdminDatabase()
                .runCommand(replSetGetStatus)
                .toObject<ReplicaSetStatus>(objectMapper)
            if (replSetStatus.myState == ReplicaState.Primary) {
                logger.info { "Skip to setup replica set '$name' as it is already set up" }
                return@connect true
            }
        } catch (e: MongoCommandException) {
            if (e.errorCode != MongoCommandError.notYetInitialized)
                throw e
        }

        try {
            logger.info { "Setting up replica set '$name'" }
            val result = getAdminDatabase().runCommand(
                replSetInitiate(name, configSvr, (listOf(master) + slaves).mapIndexed { i, it ->
                    MongoCommands.ReplSetMember(i, "$it:$port")
                })
            )

            logger.debug { result.toIndentedJson() }
        } catch (e: MongoCommandException) {
            if (e.errorCode != MongoCommandError.alreadyInitialized)
                throw e
        }

        return@connect false
    }

    /**
     * Setup a config server replica set consisting of [master] and [slaves] with the given [name].
     */
    private fun setupConfigReplicaSet(name: String, master: String, slaves: List<String>) =
        setupReplicaSet(name, true, settings.ports.config, master, slaves)

    /**
     * Setup a shard server replica set consisting of [master] and [slaves] with the given [name].
     */
    private fun setupShardReplicaSet(name: String, master: String, slaves: List<String>) =
        setupReplicaSet(name, false, settings.ports.shards, master, slaves)

    /**
     * Setup a router at [host] to manage the [shards].
     */
    private fun setupRouter(host: String, shards: List<Pair<String, String>>) {
        connect(host, settings.ports.routers) {
            val db = getAdminDatabase()
            val shardList = db.runCommand(listShards).toObject<ShardList>(objectMapper)
            for ((replicaSet, shard) in shards) {
                if (shardList.shards.find { it.id == replicaSet } != null) {
                    logger.info { "Skip to add shard '$replicaSet' to router '$host' as it is already registered" }
                    continue
                }

                logger.info { "Adding shard '$replicaSet' to router '$host'" }
                val result = db.runCommand(
                    addShard(replicaSet, shard, settings.ports.shards)
                )
                logger.debug { result.toIndentedJson() }
            }
            true
        }
    }

    /**
     * Setup a [database] for sharding, contacting through the router at [host].
     */
    private fun setupDatabase(host: String, database: String) {
        connect(host, settings.ports.routers) {
            val searchResult = getConfigDatabase()
                .getCollection("databases")
                .find(Document("_id", database))
                .limit(1)

            if (searchResult.firstOrNull()?.getBoolean("partitioned") == true) {
                logger.info { "Skip to shard database '$database' as it is already set up" }
                return@connect false
            }

            logger.info { "Enabling sharding for database '$database'" }
            val result = getAdminDatabase().runCommand(
                enableSharding(database)
            )

            logger.debug { result.toIndentedJson() }
            true
        }
    }

    private fun setupAccounts(host: String) {
        connect(host, settings.ports.routers) {
            val userInfo = getAdminDatabase().runCommand(
                usersInfo("mongodb", "admin")
            ).toObject<UserInfo>(objectMapper)

            if (userInfo.ok == CommandState.Succeeded &&
                userInfo.users.singleOrNull()
                    ?.roles?.any { it.role == "root" && it.db == "admin" } == true
            ) {
                logger.info { "Skip to add root user 'mongodb' as it is already added" }
                return@connect false
            }

            logger.info { "Adding root user 'mongodb'" }
            val result = getAdminDatabase().runCommand(
                createUser("mongodb", "mongodb", listOf(UserRole("root", "admin")))
            )
            logger.debug { result.toIndentedJson() }
            true
        }
    }

    /**
     * Setup the MongoDB config, shard and router servers, defined in the [settings].
     */
    private fun setupSharding() {
        logger.info { "Starting setup of replica sets" }
        val skipConfig = settings.config.run {
            setupConfigReplicaSet(name, master, slaves)
        }

        val skipShards = settings.shards.map {
            it.run {
                setupShardReplicaSet(name, master, slaves)
            }
        }.all { it }
        logger.info { "Finished setup of replica sets" }

        if (!skipConfig || !skipShards) {
            logger.info { "Waiting ${settings.syncWait / DateUtils.MILLIS_PER_SECOND}s for routers to sync" }
            Thread.sleep(settings.syncWait)
        }

        logger.info { "Starting setup of routers" }
        settings.routers.forEach {
            setupRouter(it, settings.shards.map { it.name to it.master })
        }
        logger.info { "Finished setup of routers" }

        logger.info { "Starting setup of databases" }
        settings.databases.forEach {
            setupDatabase(settings.routers.first(), it)
        }
        logger.info { "Finished setup of databases" }

        logger.info { "Starting setup of accounts" }
        settings.routers.firstOrNull()?.run(::setupAccounts)
        logger.info { "Finished setup of accounts" }
    }

    private companion object : KLogging() {

        private const val connectTryCount = 30
        private const val connectSleepTime = 2000L
    }
}
