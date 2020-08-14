/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

/**
 * The status of a replica set.
 *
 * @property set Name of this replica set.
 * @property myState Status of the replication, one of [ReplicaState].
 * @property members List of all members that form the replication.
 * @property ok Status of this response, one of [CommandState].
 */
data class ReplicaSetStatus(
    var set: String = "",
    var myState: Int = ReplicaState.Unknown,
    var members: List<ReplicaSetMember> = listOf(),
    var ok: Int = CommandState.Failed
)
