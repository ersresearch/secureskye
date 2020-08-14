/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.properties

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

/**
 * Settings for a full MongoDB cluster to set it up as sharded and replicated cluster.
 */
@Component
@ConfigurationProperties("mongodb-init")
class MongodbInitProperties {

    /**
     * Several port definitions for different kind of server types.
     */
    var ports = Ports()

    /**
     * The config server to setup as replica set.
     */
    var config = ReplicaSet()

    /**
     * The shards of the cluster to setup as replica sets.
     */
    var shards = listOf<ReplicaSet>()

    /**
     * The router addresses to setup for all defined [shards].
     */
    var routers = listOf<String>()

    /**
     * The databases to setup for sharding.
     */
    var databases = listOf<String>()

    /**
     * The time in milliseconds to wait after setting up config and shard servers to finish syncing up.
     */
    var syncWait = 30000L

    /**
     * Ports for different kinds of mongo instances.
     */
    class Ports {

        /**
         * Default port for config servers.
         */
        var config = 27019

        /**
         * Default port for sharding servers.
         */
        var shards = 27018

        /**
         * Default port for routing servers.
         */
        var routers = 27017
    }

    /**
     * A replica set defined by one master and one or more slaves.
     */
    class ReplicaSet {

        /**
         * Name of the replica set.
         */
        var name = ""

        /**
         * Address of the master server.
         */
        var master = ""

        /**
         * Addresses of the slave servers.
         */
        var slaves = listOf<String>()
    }
}
