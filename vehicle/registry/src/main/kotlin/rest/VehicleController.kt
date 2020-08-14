/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.rest

import jp.co.trillium.secureskye.vehicle.registry.mapper.RegistryMapper
import jp.co.trillium.secureskye.vehicle.registry.model.EcuFilterType
import jp.co.trillium.secureskye.vehicle.registry.service.EcuInfoService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Endpoints for ECU and gateway management of a single vehicle.
 */
@RestController
@RequestMapping("/api/vehicles/{vehicleId}/ecus")
class VehicleController(
    private val ecuInfoService: EcuInfoService,
    private val registryMapper: RegistryMapper
) {

    /**
     * List all ECUs belonging to the vehicle [vehicleId].
     */
    @GetMapping
    @PreAuthorize("hasAuthority('vehicle-registry:read')")
    fun listEcus(
        @PathVariable vehicleId: UUID,
        @RequestParam(defaultValue = "false") filterGateway: Boolean = false,
        @RequestParam(defaultValue = "DEFAULT") filterType: EcuFilterType = EcuFilterType.DEFAULT
    ) =
        ecuInfoService.listByVehicle(vehicleId, filterGateway, filterType)
            .let { registryMapper.ecuInfoList(it) }

    /**
     * Remove all ECUs belonging to vehicle [vehicleId].
     */
    @DeleteMapping
    @PreAuthorize("hasAuthority('vehicle-registry:delete')")
    fun removeEcus(@PathVariable vehicleId: UUID) = ecuInfoService.removeEcuByVehicleId(vehicleId)
}
