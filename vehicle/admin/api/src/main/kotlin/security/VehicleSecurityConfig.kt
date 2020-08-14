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
 * Vehicle security config.
 *
 * @property id vehicle security config id.
 * @property isActive active vehicle security config.
 * @property vehicleId vehicle ID.
 * @property securitySoftware security software info.
 * @property securitySettingConfigs security setting configs info.
 */
@Entity
data class VehicleSecurityConfig(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    var isActive: Boolean = false,

    @Column(nullable = false)
    var vehicleId: UUID = UUID(0, 0),

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = [CascadeType.REMOVE])
    var securitySoftware: SecuritySoftware = SecuritySoftware(),

    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "vehicleSecurityConfig")
    var securitySettingConfigs: List<SecuritySettingConfig> = mutableListOf()
)
