/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.feign

import jp.co.trillium.secureskye.vehicle.registry.configuration.FeignConfiguration
import org.bson.types.ObjectId
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestParam

/**
 * Feign client for communication with 'ota-vehicle'.
 */
@FeignClient("ota-vehicle", configuration = [FeignConfiguration::class])
interface OtaVehicleClient {

    /**
     * Publish the image archive for the given [id].
     */
    @PutMapping("/api/ota/{id}/publish")
    fun imageArchivePublish(@PathVariable id: ObjectId, @RequestParam vin: String?)
}
