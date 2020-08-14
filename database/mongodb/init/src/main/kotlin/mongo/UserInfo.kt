/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

/**
 * List of all users including several details.
 *
 * @property users The users' information.
 * @property ok Status of the _dbStats_ command, one of [CommandState].
 */
data class UserInfo(
    var users: List<User> = listOf(),
    var ok: Int = CommandState.Failed
)
