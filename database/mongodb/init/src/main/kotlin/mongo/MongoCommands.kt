/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

import org.bson.Document

/**
 * Different commands that can be executed through `runCommand`.
 */
object MongoCommands {

    /**
     * Get the status of a replica set.
     */
    val replSetGetStatus = Document("replSetGetStatus", 1)

    /**
     * List all shards of a router.
     */
    val listShards = Document("listShards", 1)

    /**
     * Get statistics of a database.
     */
    val dbStats = Document("dbStats", 1)

    /**
     * Initiate a replica set with the given [name] and [members]. The [configSvr] describes if
     * this is a config replica set or a shard replica set.
     */
    fun replSetInitiate(name: String, configSvr: Boolean, members: List<ReplSetMember>) =
        Document(
            "replSetInitiate", mapOf(
                "_id" to name,
                "configsvr" to configSvr,
                "members" to members.map(ReplSetMember::toDocument)
            )
        )

    /**
     * A replica member.
     *
     * @property id Identifier of this member.
     * @property host The address to reach this member.
     */
    data class ReplSetMember(
        val id: Int,
        val host: String
    ) {
        /**
         * Convert the [ReplSetMember] to a [Document].
         */
        fun toDocument() = Document(mapOf("_id" to id, "host" to host))
    }

    /**
     * Add (register) a shard replica set with the given [name] and [port] on a router, providing the primary [shard].
     */
    fun addShard(name: String, shard: String, port: Int) = Document("addShard", "$name/$shard:$port")

    /**
     * Enable the sharding of a [database].
     */
    fun enableSharding(database: String) = Document("enableSharding", database)

    /**
     * Get the user info, filtered by [user] and [db].
     */
    fun usersInfo(user: String, db: String) = Document(
        "usersInfo", mapOf(
            "user" to user,
            "db" to db
        )
    )

    /**
     * Create a new user with [name] and [password] as well as its [roles].
     */
    fun createUser(name: String, password: String, roles: List<UserRole>) = Document(
        mapOf(
            "createUser" to name,
            "pwd" to password,
            "roles" to roles.map(UserRole::toDocument)
        )
    )
}
