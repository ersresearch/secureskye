/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.health

import jp.co.trillium.secureskye.mongodb.init.mongo.ReplicaSetMember

/**
 * Extra health details provided on the [MongodbInitHealthIndicator].
 *
 * @property config Status of the configuration replica set.
 * @property shards Status of the shards.
 * @property routers Status of the routers.
 * @property databases Status of the databases.
 */
data class HealthDetails(
    var config: Replica = Replica(),
    var shards: MutableMap<String, Replica> = mutableMapOf(),
    var routers: MutableList<Node> = mutableListOf(),
    var databases: MutableList<Node> = mutableListOf()
) {

    /**
     * Health information for all member of a replica set.
     *
     * @property master Information about the master server.
     * @property slaves Information about the slave servers.
     */
    data class Replica(
        var master: Node = Node(),
        var slaves: List<Node> = listOf()
    )

    /**
     * A node describing one server in the cluster.
     *
     * @property name Name of this server.
     * @property status The health status of this server, either "UP" or "DOWN".
     */
    data class Node(
        var name: String = "",
        var status: String = ""
    ) {
        /**
         * Alternative constructor to create server information from a [ReplicaSetMember] and it's [desiredState].
         */
        constructor(member: ReplicaSetMember, desiredState: Int) : this(member.name, member.status(desiredState))
    }
}
