/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.admin.feign

import jp.co.trillium.secureskye.obd2device.admin.configuration.FeignConfiguration
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleListProto
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping

/**
 * Feign client for communication with 'vehicle-admin'.
 */
@FeignClient("vehicle-admin", configuration = [FeignConfiguration::class])
interface VehicleAdminClient {

    /**
     * List all currently registered vehicles.
     */
    @GetMapping("/api/vehicles")
    fun listVehicles(): VehicleListProto
}
