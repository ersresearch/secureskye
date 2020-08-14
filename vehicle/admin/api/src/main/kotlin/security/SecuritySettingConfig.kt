/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model.security

import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne

/**
 *  Security setting config.
 *
 * @property id security setting config id.
 * @property isActive active security setting config.
 * @property vehicleSecurityConfig vehicle security config info.
 * @property securitySetting security setting info.
 */
@Entity
data class SecuritySettingConfig(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    var isActive: Boolean = false,

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = [CascadeType.REMOVE])
    var vehicleSecurityConfig: VehicleSecurityConfig = VehicleSecurityConfig(),

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = [CascadeType.REMOVE])
    var securitySetting: SecuritySetting = SecuritySetting()
)
