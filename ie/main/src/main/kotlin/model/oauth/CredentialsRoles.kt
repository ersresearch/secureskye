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
 * `credentials_roles` table entity.
 *
 * @property credentialsId credentials id.
 * @property rolesId role id.
 */
@Entity
@IdClass(CredentialsRoles::class)
@Table(name = "credentials_roles")
data class CredentialsRoles(

    @Id
    @Column(name = "credentials_id")
    var credentialsId: UUID? = UUID(0, 0),

    @Id
    @Column(name = "roles_id")
    var rolesId: UUID? = UUID(0, 0)
) : Serializable
