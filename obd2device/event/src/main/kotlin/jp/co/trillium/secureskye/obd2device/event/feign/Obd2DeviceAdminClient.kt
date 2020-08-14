/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.event.feign

import jp.co.trillium.secureskye.obd2device.admin.api.proto.Obd2DeviceProto
import jp.co.trillium.secureskye.obd2device.event.configuration.FeignConfiguration
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam

/**
 * Feign client for communication with 'obd2device-admin'.
 */
@FeignClient("obd2device-admin", configuration = [FeignConfiguration::class])
interface Obd2DeviceAdminClient {

    /**
     * Get OBD-II device info [Obd2DeviceProto] of device of [id].
     */
    @GetMapping("/api/obd2devices/{id}")
    fun getObd2Device(@PathVariable id: String, @RequestParam clientId: Boolean = false): Obd2DeviceProto
}
