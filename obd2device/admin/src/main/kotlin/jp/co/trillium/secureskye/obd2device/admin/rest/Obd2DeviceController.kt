/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.admin.rest

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.obd2device.admin.api.proto.Obd2DeviceListProto
import jp.co.trillium.secureskye.obd2device.admin.api.proto.Obd2DeviceProto
import jp.co.trillium.secureskye.obd2device.admin.api.proto.RegisteredObd2DeviceProto
import jp.co.trillium.secureskye.obd2device.admin.mapper.Obd2DeviceMapper
import jp.co.trillium.secureskye.obd2device.admin.service.Obd2DeviceService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Controller for handling OBD-II device operations.
 */
@RestController
@RequestMapping("/api/obd2devices")
class Obd2DeviceController(
    private val obd2DeviceService: Obd2DeviceService,
    private val obd2DeviceMapper: Obd2DeviceMapper,
    private val uuidMapper: UuidMapper
) {

    /**
     * Find all registered OBD-II devices.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('obd2device-admin:read')")
    fun listObd2Devices(): Obd2DeviceListProto = obd2DeviceService.list().let(obd2DeviceMapper::obd2DeviceListProto)

    /**
     * Get OBD-II device info od [id].
     */
    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('obd2device-admin:read')")
    fun getObd2Device(
        @PathVariable id: String,
        @RequestParam(defaultValue = "false") clientId: Boolean
    ): Obd2DeviceProto =
        (if (clientId) obd2DeviceService.getByClientId(id)
        else obd2DeviceService.get(id.let(uuidMapper::uuidString)))
            .let(obd2DeviceMapper::obd2DeviceProto)

    /**
     * Register new OBD-II device with [obd2Device] info.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('obd2device-admin:create')")
    fun createObd2Device(@RequestBody obd2Device: Obd2DeviceProto): RegisteredObd2DeviceProto = obd2Device
        .let(obd2DeviceMapper::obd2Device)
        .let(obd2DeviceService::create)
        .let(obd2DeviceMapper::registeredObd2DeviceProto)

    /**
     * Update OBD-II device info of [id] with new [obd2Device] info.
     */
    @PutMapping("{id}")
    @PreAuthorize("hasAuthority('obd2device-admin:update')")
    fun updateObd2Device(@PathVariable id: UUID, @RequestBody obd2Device: Obd2DeviceProto): Obd2DeviceProto = obd2Device
        .let(obd2DeviceMapper::obd2Device)
        .let { obd2DeviceService.update(id, it) }
        .let(obd2DeviceMapper::obd2DeviceProto)

    /**
     * Remove OBD-II device of [id].
     */
    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('obd2device-admin:delete')")
    fun delete(@PathVariable id: UUID) = obd2DeviceService.delete(id)

    /**
     * Register OBD-II device with vehicleId [vehicleId].
     */
    @PutMapping("{id}/vehicle/{vehicleId}")
    @PreAuthorize("hasAuthority('obd2device-admin:update')")
    fun registerVehicleId(@PathVariable id: UUID, @PathVariable vehicleId: UUID) =
        obd2DeviceService.registerVehicleId(id, vehicleId)

    /**
     * UnRegister vehicleId for OBD-II device.
     */
    @DeleteMapping("{id}/vehicle")
    @PreAuthorize("hasAuthority('obd2device-admin:update')")
    fun unRegisterVehicleId(@PathVariable id: UUID) =
        obd2DeviceService.unRegisterVehicleId(id)
}
