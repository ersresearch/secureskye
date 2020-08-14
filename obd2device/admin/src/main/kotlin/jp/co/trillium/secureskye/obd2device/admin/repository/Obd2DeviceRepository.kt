/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.admin.repository

import jp.co.trillium.secureskye.obd2device.admin.model.Obd2Device
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

/**
 * Repository for managing [Obd2Device] entities.
 */
@Repository
interface Obd2DeviceRepository : JpaRepository<Obd2Device, UUID> {

    /**
     * Find all devices attached to vehicle [vehicleId].
     */
    fun findByVehicleId(vehicleId: UUID): List<Obd2Device>

    /**
     * Find device by its [clientId].
     */
    fun findByClientId(clientId: String): Obd2Device?
}
