/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

/**
 * Status of a database.
 *
 * @property raw Raw information of a database, only present when setup as sharded.
 * @property ok Status of the _dbStats_ command, one of [CommandState].
 */
data class DatabaseStatus(
    var raw: Map<String, Any> = mapOf(),
    var ok: Int = CommandState.Failed
)
