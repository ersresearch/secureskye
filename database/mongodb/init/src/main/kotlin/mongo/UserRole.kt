/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

import org.bson.Document

/**
 * A specific role that is assigned to a user and grands a group of permissions.
 *
 * @property role The role name.
 * @property db Database where this role applies.
 */
data class UserRole(
    var role: String = "",
    var db: String = ""
) {
    /**
     * Conver the [UserRole] to a [Document].
     */
    fun toDocument() = Document(mapOf("role" to role, "db" to db))
}
