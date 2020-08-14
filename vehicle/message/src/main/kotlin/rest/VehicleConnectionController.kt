/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.rest

import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleConnectionProto
import jp.co.trillium.secureskye.vehicle.message.service.VehicleConnectionService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

/**
 * Endpoints for vehicle connection.
 */
@RestController
@RequestMapping("/api/vehicles")
@Validated
class VehicleConnectionController(
    private val vehicleConnectionService: VehicleConnectionService
) {
    /**
     * Update Vehicle's connection status.
     */
    @PostMapping("/connection")
    @PreAuthorize("hasAuthority('vehicle-status:update')")
    fun updateConnectionStatus(@RequestBody connect: VehicleConnectionProto, principal: Principal) =
        vehicleConnectionService.updateVehicleConnectionStatus(principal.name, connect)
}
