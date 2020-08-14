/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.repository

import jp.co.trillium.secureskye.vehicle.admin.model.VehicleAlertCount
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.stereotype.Repository
import java.util.UUID

/**
 * Repository for managing [VehicleAlertCountRepository] entities.
 */
@Repository
interface VehicleAlertCountRepository : JpaRepository<VehicleAlertCount, UUID> {
    /**
     * Find vehicle alert count data by vehicle's id.
     */
    fun findByVehicleId(id: UUID): VehicleAlertCount?

    /**
     * Delete vehicle alert count data by [vehicleId].
     */
    @Modifying
    fun deleteByVehicleId(vehicleId: UUID)
}
