/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.feign

import jp.co.trillium.secureskye.vehicle.admin.configuration.FeignConfiguration
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import java.util.UUID

/**
 * Feign client for communication with 'vehicle-registry'.
 */
@FeignClient("vehicle-registry", configuration = [FeignConfiguration::class])
interface VehicleRegistryClient {

    /**
     * Remove all registry info of vehicle by [vehicleId].
     */
    @DeleteMapping("/api/vehicles/{vehicleId}/ecus")
    fun unregisterVehicle(@PathVariable vehicleId: UUID)
}
