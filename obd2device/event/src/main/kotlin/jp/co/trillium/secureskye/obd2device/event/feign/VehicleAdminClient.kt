/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.event.feign

import jp.co.trillium.secureskye.obd2device.event.configuration.FeignConfiguration
import jp.co.trillium.secureskye.vehicle.admin.api.proto.ModelDisplaySettingsListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleTrackingStatusProto
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestParam
import java.util.UUID

/**
 * Feign client for communication with 'vehicle-admin'.
 */
@FeignClient("vehicle-admin", configuration = [FeignConfiguration::class])
interface VehicleAdminClient {
    /**
     * Send vehicle's status to vehicle-admin by [id].
     * [status] vehicle's status.
     */
    @PutMapping("/api/internal/vehicles/{id}/connection/{status}")
    fun updateTracking(@PathVariable id: UUID, @PathVariable status: VehicleTrackingStatusProto)

    /**
     * Get model's display settings by vehicle's [modelId].
     */
    @GetMapping("/api/vehicles/models/{modelId}/settings")
    fun getDisplaySettings(@PathVariable modelId: UUID): ModelDisplaySettingsListProto

    /**
     * Get a specific vehicle by its [id] or client [id], depending of the setting of [clientId].
     *
     * In case [clientId] is set to false or not provided, the [id] is treated as id of the vehicle.
     * In case [clientId] is set to true, the [id] is treated as OAuth client id.
     */
    @GetMapping("/api/internal/vehicles/{id}")
    fun getVehicle(@PathVariable id: String, @RequestParam clientId: Boolean): VehicleProto
}
