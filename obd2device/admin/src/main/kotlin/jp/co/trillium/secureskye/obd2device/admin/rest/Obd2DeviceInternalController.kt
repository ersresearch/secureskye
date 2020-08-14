/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.admin.rest

import jp.co.trillium.secureskye.obd2device.admin.api.proto.Obd2DeviceListProto
import jp.co.trillium.secureskye.obd2device.admin.mapper.Obd2DeviceMapper
import jp.co.trillium.secureskye.obd2device.admin.service.Obd2DeviceService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Controller for handling OBD-II device operations.
 */
@RestController
@RequestMapping("/api")
class Obd2DeviceInternalController(
    private val obd2DeviceService: Obd2DeviceService,
    private val obd2DeviceMapper: Obd2DeviceMapper
) {
    /**
     * Find all devices attached to vehicle [vehicleId].
     */
    @GetMapping("/vehicles/{vehicleId}/obd2device")
    @PreAuthorize("hasAuthority('obd2device-admin:read')")
    fun getObd2DeviceOfVehicle(@PathVariable vehicleId: UUID): Obd2DeviceListProto =
        obd2DeviceService.getObd2DeviceOfVehicle(vehicleId).let(obd2DeviceMapper::obd2DeviceListProto)
}
