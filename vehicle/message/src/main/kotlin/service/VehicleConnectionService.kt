/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleConnectionProto
import jp.co.trillium.secureskye.vehicle.message.feign.VehicleAdminClient
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

/**
 * Business logic for vehicle connection status.
 */
@Service
class VehicleConnectionService(
    private val uuidMapper: UuidMapper,
    private val vehicleAdminClient: VehicleAdminClient
) {
    /**
     * Update vehicle connection status.
     */
    fun updateVehicleConnectionStatus(clientId: String, connect: VehicleConnectionProto) =
        loadVehicleId(clientId).let { vehicleAdminClient.updateConnectionStatus(it, connect) }

    /**
     * Load the vehicle ID for the given [clientId] to associate events to it.
     */
    @Cacheable("client-id-to-vehicle-id")
    fun loadVehicleId(clientId: String) =
        uuidMapper.uuidString(vehicleAdminClient.getVehicle(clientId, true).id)
}
