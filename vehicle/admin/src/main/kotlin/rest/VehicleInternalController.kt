/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleConnectionProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleTrackingStatusProto
import jp.co.trillium.secureskye.vehicle.admin.mapper.VehicleMapper
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleAlertCountDto
import jp.co.trillium.secureskye.vehicle.admin.service.VehicleAlertCountService
import jp.co.trillium.secureskye.vehicle.admin.service.VehicleConnectionService
import jp.co.trillium.secureskye.vehicle.admin.service.VehicleService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID
import javax.validation.constraints.NotBlank

/**
 * Endpoints for vehicle administration (registering, listing, ...).
 */
@RestController
@RequestMapping("/api/internal/vehicles/")
@Validated
class VehicleInternalController(
    private val vehicleService: VehicleService,
    private val vehicleConnectionService: VehicleConnectionService,
    private val vehicleAlertCountService: VehicleAlertCountService,
    private val vehicleMapper: VehicleMapper
) {
    /**
     * Get a specific vehicle by its [id] or client [id], depending of the setting of [clientId].
     *
     * In case [clientId] is set to false or not provided, the [id] is treated as id of the vehicle.
     * In case [clientId] is set to true, the [id] is treated as OAuth client id.
     */
    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle:read')")
    fun get(
        @PathVariable @NotBlank id: String,
        @RequestParam(defaultValue = "false") clientId: Boolean
    ) =
        if (clientId) vehicleService.findVehicleByCliendId(id)
        else vehicleService.findVehicle(UUID.fromString(id))

    /**
     * Update vehicle connection status.
     * [id] vehicle's id.
     */
    @PostMapping("{id}/connection")
    @PreAuthorize("hasAuthority('vehicle-status:update')")
    fun updateConnectionStatus(@PathVariable id: UUID, @RequestBody connect: VehicleConnectionProto) {
        vehicleConnectionService.updateVehicleConnection(id, connect.let(vehicleMapper::vehicleConnection))
    }

    /**
     * Get vehicle's status and update it to the database.
     * [id] vehicle's id.
     * [status] vehicle's status.
     */
    @PutMapping("{id}/connection/{status}")
    @PreAuthorize("hasAuthority('vehicle-status:update')")
    fun updateTracking(@PathVariable id: UUID, @PathVariable status: VehicleTrackingStatusProto) =
        vehicleConnectionService.updateVehicleConnectionTracking(id, status.let(vehicleMapper::trackingStatus))

    /**
     * Update vehicle update count.
     * [id] vehicle's id.
     * [updateCount] vehicle's update count.
     */
    @PutMapping("{id}/update-count")
    @PreAuthorize("hasAuthority('vehicle-status:update')")
    fun updateVehicleUpdateCount(
        @PathVariable id: UUID,
        @RequestParam(defaultValue = "0") updateCount: Int
    ) = vehicleService.updateVehicleUpdateCount(id, updateCount)

    /**
     * Update vehicle alert count.
     * [id] vehicle's id.
     * [alertCount] vehicle's alert count.
     */
    @PutMapping("{id}/alert-count")
    @PreAuthorize("hasAuthority('vehicle-status:update')")
    fun updateAlertCount(
        @PathVariable id: UUID,
        @RequestBody alertCount: VehicleAlertCountDto
    ) = vehicleAlertCountService.updateVehicleAlertCount(id, alertCount)
}
