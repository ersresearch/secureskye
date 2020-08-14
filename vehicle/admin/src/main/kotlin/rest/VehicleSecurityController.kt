/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

import jp.co.trillium.secureskye.vehicle.admin.api.proto.SecuritySettingConfigProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.SecuritySettingProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleSecurityConfigListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleSecurityConfigProto
import jp.co.trillium.secureskye.vehicle.admin.mapper.SecurityMapper
import jp.co.trillium.secureskye.vehicle.admin.service.VehicleSecurityService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Endpoints for VehicleSecurity of a single vehicle.
 */
@RestController
@RequestMapping("/api/vehicles")
@Validated
class VehicleSecurityController(
    private val vehicleSecurityService: VehicleSecurityService,
    private val securityMapper: SecurityMapper
) {

    /**
     * Create new [vehicleSecurityConfig] for vehicle.
     */
    @PostMapping("security")
    @PreAuthorize("hasAuthority('vehicle:create')")
    fun save(@RequestBody vehicleSecurityConfig: VehicleSecurityConfigProto) =
        vehicleSecurityService.save(securityMapper.vehicleSecurity(vehicleSecurityConfig))

    /**
     * List all vehicle security belonging to the vehicle [id].
     */
    @GetMapping("{id}/security-status")
    @PreAuthorize("hasAuthority('vehicle:read')")
    fun listVehicleSecurityConfigs(@PathVariable id: UUID): VehicleSecurityConfigListProto =
        vehicleSecurityService.list(id).map(securityMapper::vehicleSecurity).let {
            VehicleSecurityConfigListProto.newBuilder().addAllData(it).build()
        }

    /**
     * Get a vehicle security by [id].
     */
    @GetMapping("security/{id}")
    @PreAuthorize("hasAuthority('vehicle:read')")
    fun getVehicleSecurity(@PathVariable id: UUID) =
        vehicleSecurityService.get(id).let(securityMapper::vehicleSecurity)

    /**
     * Function for enable/disable vehicle security.
     */
    @PostMapping("{id}/security-software")
    @PreAuthorize("hasAuthority('vehicle:create')")
    fun enableVehicleSecurity(
        @RequestBody vehicleSecurityConfig: VehicleSecurityConfigProto,
        @PathVariable id: UUID
    ) =
        vehicleSecurityService.enableVehicleSecurity(id, vehicleSecurityConfig)

    /**
     * Function for enable/disable vehicle security detail.
     */
    @PostMapping("security-setting")
    @PreAuthorize("hasAuthority('vehicle:create')")
    fun enableSecuritySettingConfig(@RequestBody securitySettingConfig: SecuritySettingConfigProto) =
        vehicleSecurityService.enableSecuritySettingConfig(securitySettingConfig)

    /**
     * Create new [securitySetting] for vehicle.
     */
    @PostMapping("security/security-setting")
    @PreAuthorize("hasAuthority('vehicle:create')")
    fun saveSecuritySetting(@RequestBody securitySetting: SecuritySettingProto) =
        vehicleSecurityService.saveSecuritySetting(securityMapper.securitySetting(securitySetting))

    /**
     * Delete software config by security setting's [id].
     */
    @DeleteMapping("security/security-setting/{id}")
    @PreAuthorize("hasAuthority('vehicle:delete')")
    fun deleteSecuritySetting(@PathVariable id: UUID) =
        vehicleSecurityService.deleteSecuritySetting(id)
}
