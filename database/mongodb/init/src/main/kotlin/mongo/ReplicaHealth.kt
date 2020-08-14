/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

/**
 * Health status of a replica set.
 */
object ReplicaHealth {

    /**
     * The replica set is down.
     */
    const val Down = 0

    /**
     * The replica set is up and running.
     */
    const val Up = 1
}
