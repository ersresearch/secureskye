/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.rest

import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlertDto
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentStatusDto
import jp.co.trillium.secureskye.vehicle.message.service.VehicleComponentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * The rest controller to manage OBD2 component and their status.
 */
@RestController
class ComponentAlertController(private val vehicleComponentService: VehicleComponentService) {

    /**
     * Create alert.
     */
    @PostMapping("/api/vehicles/component-alerts")
    @PreAuthorize("hasAuthority('event:create')")
    fun createAlert(
        @RequestBody alertList: List<VehicleComponentAlertDto>
    ): ResponseEntity<List<VehicleComponentAlertDto>> {
        val response = vehicleComponentService.createAlert(alertList)
        return ResponseEntity(response, HttpStatus.OK)
    }

    /**
     * Get alert by vehicle.
     */
    @GetMapping("/api/vehicles/{vehicleId}/component-alerts")
    @PreAuthorize("hasAuthority('event:read')")
    fun findAlertByVehicleId(@PathVariable vehicleId: UUID): ResponseEntity<List<VehicleComponentAlertDto>> {
        val alerts = vehicleComponentService.findAlert(vehicleId)
        return ResponseEntity(alerts, HttpStatus.OK)
    }

    /**
     * Get component status by vehicle.
     */
    @GetMapping("/api/vehicles/{vehicleId}/component-status")
    @PreAuthorize("hasAuthority('event:read')")
    fun findComponentStatusByVehicleId(@PathVariable vehicleId: UUID): List<VehicleComponentStatusDto> {
        val alert = vehicleComponentService.findAlert(vehicleId)
        return vehicleComponentService.calVehicleComponentStatus(vehicleId, alert)
    }

    /**
     * Update component alert to FIXED.
     */
    @GetMapping("/api/vehicles/components/alerts/{id}")
    @PreAuthorize("hasAuthority('event:read')")
    fun updateComponentAlert(@PathVariable id: UUID): VehicleComponentAlertDto =
        vehicleComponentService.fixAlert(id)
}
