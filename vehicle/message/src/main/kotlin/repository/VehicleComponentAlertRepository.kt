/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.repository

import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlert
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlertStatus
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

/**
 * Repository for managing [VehicleComponentAlertRepository] entities.
 */
@Repository
interface VehicleComponentAlertRepository : JpaRepository<VehicleComponentAlert, UUID> {
    /**
     * List Component alert by [vehicleId] and [alertStatus].
     */
    fun findByVehicleIdAndAlertStatus(
        vehicleId: UUID,
        alertStatus: VehicleComponentAlertStatus
    ): List<VehicleComponentAlert>

    /**
     * List component alert by [vehicleId].
     */
    fun findByVehicleId(vehicleId: UUID): List<VehicleComponentAlert>

    /**
     * List component alert by [id] and [alertStatus].
     */
    fun findByIdAndAlertStatus(
        id: UUID,
        alertStatus: VehicleComponentAlertStatus
    ): VehicleComponentAlert
}
