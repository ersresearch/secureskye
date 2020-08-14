/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.service

import jp.co.trillium.secureskye.vehicle.admin.model.VehicleAlertCountDto
import jp.co.trillium.secureskye.vehicle.admin.model.Vehicle
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleAlertCount
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleAlertCountRepository
import org.springframework.stereotype.Service
import java.util.UUID

/**
 * Business logic for vehicle alert count.
 */
@Service
class VehicleAlertCountService(
    private val vehicleAlertCountRepository: VehicleAlertCountRepository
) {

    /**
     * Update vehicle's alert count.
     * [id] vehicle's id.
     * [alertCount] vehicle's alert count.
     */
    fun updateVehicleAlertCount(id: UUID, alertCount: VehicleAlertCountDto) {
        (vehicleAlertCountRepository.findByVehicleId(id) ?: VehicleAlertCount(vehicle = Vehicle(id)))
            .also {
                it.danger = alertCount.danger
                it.warning = alertCount.warning
                it.info = alertCount.info
            }.let(vehicleAlertCountRepository::save)
    }
}
