/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

import jp.co.trillium.secureskye.mongodb.init.health.MongodbInitHealthIndicator

/**
 * The member of a replica set.
 *
 * @property name Name of this member in the cluster.
 * @property health Health status of this server, one of [ReplicaHealth].
 * @property state State of this server, one of [ReplicaState].
 */
data class ReplicaSetMember(
    var name: String = "",
    var health: Int = ReplicaHealth.Down,
    var state: Int = ReplicaState.Unknown
) {

    /**
     * The status as [String] for use in the [MongodbInitHealthIndicator].
     * This check if the [health] is ok and the [state] is [desiredState].
     */
    fun status(desiredState: Int) = if (health == ReplicaHealth.Up && state == desiredState) "UP" else "DOWN"
}
