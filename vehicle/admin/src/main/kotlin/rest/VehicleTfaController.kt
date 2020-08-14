/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

import jp.co.trillium.secureskye.oauth.model.OauthTotpProto
import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
import jp.co.trillium.secureskye.vehicle.admin.feign.UaaClient
import jp.co.trillium.secureskye.vehicle.admin.service.VehicleService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Endpoints for vehicle administration (registering, listing, ...).
 */
@RestController
@RequestMapping("/api/vehicles/{id}/2fa")
@Validated
class VehicleTfaController(private val vehicleService: VehicleService, private val uaaClient: UaaClient) {

    /**
     * Get 2fa information.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('vehicle:read')")
    fun getPendingInfo(@PathVariable id: UUID): OauthTotpProto =
        vehicleService.getVehicleClientId(id).let { uaaClient.getPendingInfo(it) }

    /**
     * (Pre)enable 2fa feature for user. Need confirmation after.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('vehicle:create')")
    fun register(@PathVariable id: UUID, @RequestParam(required = false) oauthGroup: UUID?): OauthTotpProto =
        vehicleService.getVehicleClientId(id).let { uaaClient.register(it, oauthGroup) }

    /**
     * Confirm enabling 2fa with OTP.
     */
    @PutMapping(params = ["otp"])
    @PreAuthorize("hasAuthority('vehicle:update')")
    fun registerConfirm(@PathVariable id: UUID, @RequestParam otp: Int): TwoFactorAuthenticationStatusProto =
        vehicleService.getVehicleClientId(id).let { uaaClient.registerConfirm(it, otp) }

    /**
     * Disable 2fa. For disabled TOTP secret, requires nothing.
     */
    @DeleteMapping
    @PreAuthorize("hasAuthority('vehicle:delete')")
    fun unregisterDisabled(@PathVariable id: UUID) =
        vehicleService.getVehicleClientId(id).let { uaaClient.unregisterDisabled(it) }

    /**
     * Disable 2fa. Requires OTP.
     */
    @DeleteMapping(params = ["otp"])
    @PreAuthorize("hasAuthority('vehicle:delete')")
    fun unregister(@PathVariable id: UUID, @RequestParam otp: Int) =
        vehicleService.getVehicleClientId(id).let { uaaClient.unregister(it, otp) }

    /**
     * Disable 2fa using scratch code instead of OTP.
     */
    @DeleteMapping(params = ["scratchCode"])
    @PreAuthorize("hasAuthority('vehicle:delete')")
    fun unregisterViaScratchCode(@PathVariable id: UUID, @RequestParam scratchCode: Int) =
        vehicleService.getVehicleClientId(id).let {
            uaaClient.unregisterViaScratchCode(it, scratchCode)
        }
}
