/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

/**
 * A replica set member's state, which reflects its disposition.
 */
object ReplicaState {

    /**
     * The primary member and only one which can accept write operations.
     */
    const val Primary = 1

    /**
     * A secondary member, replicating the data store.
     */
    const val Secondary = 2

    /**
     * The state is not yet known.
     */
    const val Unknown = 6
}
