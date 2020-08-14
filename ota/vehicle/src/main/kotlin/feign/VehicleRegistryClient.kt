/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.feign

import jp.co.trillium.secureskye.ota.vehicle.configuration.FeignConfiguration
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareVersionListProto
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody

/**
 * Feign client for communication with 'vehicle-registry'.
 */
@FeignClient("vehicle-registry", configuration = [FeignConfiguration::class])
interface VehicleRegistryClient {

    /**
     * Save new software version.
     */
    @PostMapping("/api/software/version")
    fun saveNewVersion(@RequestBody software: SoftwareVersionListProto)
}
