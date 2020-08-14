/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.event.feign

import jp.co.trillium.secureskye.obd2device.event.configuration.FeignConfiguration
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlertDto
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody

/**
 * Feign client for communication with 'vehicle-message'.
 */
@FeignClient("vehicle-message", configuration = [FeignConfiguration::class])
interface VehicleMessageClient {

    /**
     * Create alert.
     */
    @PostMapping("/api/vehicles/component-alerts")
    fun createAlert(
        @RequestBody vehicleComponentAlertDto: List<VehicleComponentAlertDto>
    ): List<VehicleComponentAlertDto>
}
