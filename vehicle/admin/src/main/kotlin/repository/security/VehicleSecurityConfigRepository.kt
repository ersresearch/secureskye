/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.repository.security

import jp.co.trillium.secureskye.vehicle.admin.model.security.VehicleSecurityConfig
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional
import java.util.UUID

/**
 * Repository for managing [VehicleSecurityConfig] entities.
 */
interface VehicleSecurityConfigRepository : JpaRepository<VehicleSecurityConfig, UUID> {
    /**
     * Find  vehicle security config by [vehicleId].
     */
    fun findByVehicleId(vehicleId: UUID): List<VehicleSecurityConfig>

    /**
     * Find  vehicle security config by [vehicleId] and [securitySoftwareId].
     */
    fun findByVehicleIdAndSecuritySoftwareId(vehicleId: UUID, securitySoftwareId: UUID): Optional<VehicleSecurityConfig>
}
