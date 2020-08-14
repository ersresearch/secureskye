/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.feign

import jp.co.trillium.secureskye.vehicle.message.configuration.FeignConfiguration
import jp.co.trillium.secureskye.vehicle.message.model.EcuInfoDto
import jp.co.trillium.secureskye.vehicle.message.model.VehicleEcuDto
import jp.co.trillium.secureskye.vehicle.registry.model.EcuStatus
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import java.util.UUID

/**
 * Feign client interface to communicate with vehicle-registry micro services to retrieve ECU information.
 */
@FeignClient("vehicle-registry", configuration = [FeignConfiguration::class])
interface EcuInfoClient {

    /**
     * List ECU.
     */
    @GetMapping("/api/vehicles/{id}/ecus")
    fun listEcus(@PathVariable id: UUID, @RequestHeader("Accept") requestHeader: String): VehicleEcuDto

    /**
     * Get ECU information.
     */
    @GetMapping("/api/vehicles/ecus/{id}")
    fun findEcuInfo(@PathVariable id: UUID, @RequestHeader("Accept") requestHeader: String): EcuInfoDto

    /**
     * Update alert status.
     */
    @PutMapping("/api/vehicles/ecus/{id}/status")
    fun updateAlertStatus(
        @PathVariable id: UUID,
        @RequestBody status: EcuStatus
    )
}
