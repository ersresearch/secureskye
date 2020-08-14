/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.feign

import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleConnectionProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleProto
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleAlertCountDto
import jp.co.trillium.secureskye.vehicle.message.configuration.FeignConfiguration
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import java.util.UUID

/**
 * Feign client for communication with 'vehicle-admin'.
 */
@FeignClient("vehicle-admin", configuration = [FeignConfiguration::class])
interface VehicleAdminClient {

    /**
     * Get a vehicle by [id] or client [id], depending on how [clientId] is set.
     *
     * If [clientId] is set to true, [id] is treated as OAuth client id, otherwise as vehicle id.
     */
    @GetMapping("/api/vehicles/{id}")
    fun getVehicle(@PathVariable id: String, @RequestParam clientId: Boolean): VehicleProto

    /**
     * List all available vehicles as a [VehicleListProto].
     */
    @GetMapping("/api/vehicles")
    fun getAllVehicles(): VehicleListProto

    /**
     * Update vehicle's connection status.
     */
    @PostMapping("/api/internal/vehicles/{id}/connection")
    fun updateConnectionStatus(@PathVariable id: UUID, @RequestBody connect: VehicleConnectionProto)

    /**
     * Update vehicle's alert count.
     */
    @PutMapping("/api/internal/vehicles/{id}/alert-count")
    fun updateAlertCount(@PathVariable id: UUID, @RequestBody alertCount: VehicleAlertCountDto)
}
