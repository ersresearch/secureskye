/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.repository

import jp.co.trillium.secureskye.vehicle.admin.model.VehicleConnection
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.util.UUID

/**
 * Repository for managing [VehicleConnection] entities.
 */
@Repository
interface VehicleConnectionRepository : JpaRepository<VehicleConnection, UUID> {
    /**
     * Find connection data by vehicle's id.
     */
    fun findByVehicleId(id: UUID): VehicleConnection?

    /**
     * Count vehicle connected.
     */
    fun countByConnectedTrue(): Long

    /**
     * Delete vehicle connection data by [vehicleId].
     */
    @Modifying
    fun deleteByVehicleId(vehicleId: UUID)

    /**
     * Find lost-signal vehicle connection by the last receiving time (nanoseconds).
     */
    fun findByLastReceivingTimestampLessThanAndConnectedTrue(lastReceivingTimestamp: LocalDateTime): List<VehicleConnection>
}
