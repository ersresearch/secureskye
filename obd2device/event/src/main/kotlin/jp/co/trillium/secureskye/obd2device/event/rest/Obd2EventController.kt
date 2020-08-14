/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.event.rest

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.obd2device.event.api.proto.Obd2EventListProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.TimeSeriesDataProto
import jp.co.trillium.secureskye.obd2device.event.service.Obd2EventService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import java.util.UUID

/**
 * Controller to handle event from OBD-II devices.
 */
@RestController
class Obd2EventController(
    private val obd2EventService: Obd2EventService,
    private val uuidMapper: UuidMapper
) {
    /**
     * Save events data [deviceData] from OBD-II device.
     * Data sent in Json string format.
     */
    @PostMapping("/api/obd2devices/events")
    @PreAuthorize("#oauth2.clientHasRole('event:create')")
    fun saveObd2Event(@RequestBody deviceData: String, principal: Principal) {
        System.out.println("Received data: $deviceData")
        // Find vehicleId of deviceId
        val device = obd2EventService.findDevice(principal.name)
        val deviceId = device.id.let(uuidMapper::uuidString)
        val vehicleId = device.vehicleId?.let(uuidMapper::uuidString)
        try {
            val events = deviceData
                .let { obd2EventService.parseRawData(deviceId, vehicleId, it) }
                .also { obd2EventService.saveObd2Event(deviceId, vehicleId, it) }
                .let { obd2EventService.rawDataToProto(vehicleId, it) }
            vehicleId?.also {
                obd2EventService.streamVehicleParameters(it, events)
                obd2EventService.updateVehicleTrackingStatus(it, events)
                obd2EventService.streamTimeSeriesData(it, events)
                obd2EventService.streamAlertProcessing(it, events)
            }
        } catch (e: Exception) {
            System.out.println(e.stackTrace)
        }
        System.out.println("DONE !!!!!")
    }

    /**
     * Save events data [deviceData] from OBD-II device.
     * Data sent in protobuf format.
     */
    @PostMapping("/api/obd2devices/events/proto")
    @PreAuthorize("#oauth2.clientHasRole('event:create')")
    fun saveObd2EventAsProtobuf(@RequestBody deviceData: Obd2EventListProto, principal: Principal) {
        // Find vehicleId of deviceId
        val device = obd2EventService.findDevice(principal.name)
        val deviceId = device.id.let(uuidMapper::uuidString)
        val vehicleId = device.vehicleId?.let(uuidMapper::uuidString)
        obd2EventService.parseProto(deviceId, vehicleId, deviceData)
            .also { obd2EventService.saveObd2Event(deviceId, vehicleId, it) }

        vehicleId?.also {
            obd2EventService.streamVehicleParameters(it, deviceData)
            obd2EventService.updateVehicleTrackingStatus(it, deviceData)
            obd2EventService.streamTimeSeriesData(it, deviceData)
            obd2EventService.streamAlertProcessing(it, deviceData)
        }
    }

    /**
     * Get latest OBD-II event data (1 record) from vehicle [vehicleId].
     * If [minTimestamp] is present, retrieve all records
     * greater than or equal [minTimestamp].
     */
    @GetMapping("/api/vehicles/{vehicleId}/events/obd2")
    @PreAuthorize("hasAuthority('event:read')")
    fun getObd2Event(@PathVariable vehicleId: UUID, @RequestParam minTimestamp: Long? = null): Obd2EventListProto =
        obd2EventService.getObd2EventByVehicle(vehicleId, minTimestamp)

    /**
     * Time series data for vehicle speed.
     */
    @GetMapping("/api/vehicles/{vehicleId}/events/speed")
    fun listSpeedData(
        @PathVariable vehicleId: UUID,
        @RequestParam minTimestamp: Long? = null,
        @RequestParam timeSeriesOption: Long? = null
    ): TimeSeriesDataProto =
        obd2EventService.speedDataByVehicle(vehicleId, minTimestamp, timeSeriesOption)

    /**
     * Time series data for vehicle rpm.
     */
    @GetMapping("/api/vehicles/{vehicleId}/events/rpm")
    fun listRpmData(
        @PathVariable vehicleId: UUID,
        @RequestParam minTimestamp: Long? = null,
        @RequestParam timeSeriesOption: Long? = null
    ): TimeSeriesDataProto =
        obd2EventService.rpmDataByVehicle(vehicleId, minTimestamp, timeSeriesOption)
}
