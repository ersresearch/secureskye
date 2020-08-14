/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.model.oauth

import jp.co.trillium.secureskye.oauth.model.Role
import java.util.UUID
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
import javax.persistence.Table
import javax.persistence.Version

/**
 * Credential information of user.
 *
 * @property id user id.
 * @property version credential version.
 * @property name user name.
 * @property password user password.
 * @property enabled Credentials have been disabled or not.
 * @property displayName display name.
 * @property avatar link image.
 * @property avatarFormat PNG, JPG...
 * @property firstName first name.
 * @property lastName last name.
 * @property middleName middle name.
 * @property email email.
 * @property roles list role.
 */
@Entity(name = "CredentialsIe")
@Table(name = "credentials")
data class Credentials(
    @Id
    var id: UUID = UUID(0, 0),

    @Version
    var version: Int = 0,

    var name: String = "",

    var password: String = "",

    var enabled: Boolean = false,

    var displayName: String = "",

    var avatar: String? = null,

    var avatarFormat: String = "",

    var firstName: String = "",

    var lastName: String = "",

    var middleName: String = "",

    var email: String = "",

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "credentials_roles",
        joinColumns = [(JoinColumn(name = "credentials_id", referencedColumnName = "id"))],
        inverseJoinColumns = [(JoinColumn(name = "roles_id", referencedColumnName = "id"))]
    )
    var roles: Set<Role>? = null // Cannot simultaneously fetch multiple bags (hibernate bug when having 2 eager list)
)
