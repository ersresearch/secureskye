/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.model.oauth

import java.io.Serializable
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.IdClass
import javax.persistence.Table

/**
 * `roles_authorities` table entity.
 *
 * @property rolesId role id.
 * @property authoritiesId authorities id.
 */
@Entity
@IdClass(RolesAuthorities::class)
@Table(name = "roles_authorities")
data class RolesAuthorities(

    @Id
    @Column(name = "roles_id")
    var rolesId: UUID? = UUID(0, 0),

    @Id
    @Column(name = "authorities_id")
    var authoritiesId: UUID? = UUID(0, 0)
) : Serializable
