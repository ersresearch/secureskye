/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model.security

import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany

/**
 * Security software.
 *
 * @property id security software id.
 * @property name security  software name.
 * @property description security software description.
 * @property securitySetting all security settings of security software.
 */
@Entity
data class SecuritySoftware(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    var name: String = "",

    @Column(nullable = false)
    var description: String = "",

    @OneToMany(cascade = [CascadeType.REMOVE], mappedBy = "securitySoftware")
    var securitySetting: List<SecuritySetting> = mutableListOf()

)
