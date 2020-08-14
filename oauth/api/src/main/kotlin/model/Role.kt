/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.model

import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToMany

/**
 * Role of user.
 * @property id role id.
 * @property name role name.
 * @property displayName the name display on UI.
 * @property isAdmin role marked as ADMIN, cannot be deleted.
 * @property description the description of the role.
 * @property users the list user have this role.
 * @property authorities authority info.
 */
@Entity
data class Role(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    var name: String = "",

    @Column(nullable = false)
    var displayName: String = "",

    var isAdmin: Boolean = false,

    @Column(nullable = false)
    var description: String = "",

    @ManyToMany(mappedBy = "roles")
    var users: List<Credentials> = mutableListOf(),

    @ManyToMany(fetch = FetchType.EAGER, cascade = [CascadeType.REMOVE])
    var authorities: List<Authority> = mutableListOf()
)
