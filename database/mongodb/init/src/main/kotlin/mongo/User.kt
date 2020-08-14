/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * A single user information.
 *
 * @property id Unique identifier of the user.
 * @property user The name, used for login.
 * @property db Database where this user belongs to.
 * @property roles Different roles that the user possesses.
 */
data class User(
    @JsonProperty("_id")
    var id: String = "",
    var user: String = "",
    var db: String = "",
    var roles: List<UserRole> = listOf()
)
