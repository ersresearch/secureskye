/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.feign

import jp.co.trillium.secureskye.ota.vehicle.configuration.FeignConfiguration
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleProto
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam

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
}
