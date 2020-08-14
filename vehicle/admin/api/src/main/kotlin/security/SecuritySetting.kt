/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model.security

import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.OneToMany

/**
 *  Security setting.
 *
 * @property id security setting id.
 * @property name security setting name.
 * @property securitySoftware security software info.
 * @property description security software description.
 * @property securitySettingConfig security setting config info.
 */
@Entity
data class SecuritySetting(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    var name: String = "",

    @Column(nullable = false)
    var description: String = "",

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = [CascadeType.REMOVE])
    var securitySoftware: SecuritySoftware = SecuritySoftware(),

    @OneToMany(cascade = [CascadeType.REMOVE], mappedBy = "securitySetting")
    var securitySettingConfig: List<SecuritySettingConfig> = mutableListOf()
)
