/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

import com.mongodb.client.MongoDatabase

/**
 * Error codes that can come back when using [MongoDatabase.runCommand].
 */
object MongoCommandError {

    /**
     * A replica set has already been initialized.
     */
    const val alreadyInitialized = 23

    /**
     * The replica set is not yet initialized.
     */
    const val notYetInitialized = 94

    /**
     * Failure during [MongoCommands.replSetGetStatus] if the replica set is not yet set up.
     */
    const val keyNotFound = 211
}
