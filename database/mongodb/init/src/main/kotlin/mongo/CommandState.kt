/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

/**
 * Return state of a MongoDB command.
 */
object CommandState {

    /**
     * The command failed to execute.
     */
    const val Failed = 0

    /**
     * The command succeeded executing.
     */
    const val Succeeded = 1
}
