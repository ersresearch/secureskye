/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

import jp.co.trillium.secureskye.vehicle.admin.service.VehicleConnectionService
import jp.co.trillium.secureskye.vehicle.admin.service.VehicleService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Endpoints for vehicle administration (registering, listing, ...).
 */
@RestController
@RequestMapping("/api/vehicles/statistics")
@Validated
class StatisticsController(
    private val vehicleService: VehicleService,
    private val vehicleConnectionService: VehicleConnectionService
) {

    /**
     * Statistics for vehicle.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('vehicle:read')")
    fun statistics() = vehicleService.statistics()

    /**
     * Statistics for vehicle.
     */
    @GetMapping("/online")
    @PreAuthorize("hasAuthority('vehicle:read')")
    fun countVehicleConnection() = vehicleConnectionService.countOnlineStatistic()
}
