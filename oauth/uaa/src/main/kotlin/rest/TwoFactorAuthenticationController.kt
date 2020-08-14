/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.rest

import jp.co.trillium.secureskye.oauth.model.OauthTotpProto
import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
import jp.co.trillium.secureskye.oauth.uaa.mapper.TotpMapper
import jp.co.trillium.secureskye.oauth.uaa.service.TwoFactorAuthenticationService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

/**
 * Controller for enable/disable 2fa feature.
 */
@RestController
@RequestMapping("/oauth/2fa")
class TwoFactorAuthenticationController(
    private val twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private val totpMapper: TotpMapper
) {

    /**
     * Request 2fa status (in-active only).
     */
    @GetMapping
    fun getPendingInfo(principal: Principal): OauthTotpProto =
        twoFactorAuthenticationService.getPendingInfo(principal.name)
            .let(totpMapper::oauthTotpProto)

    /**
     * (Pre)enable 2fa feature for user. Need confirmation after.
     */
    @PostMapping
    fun register(principal: Principal, @RequestParam(required = false) oauthGroup: String?): OauthTotpProto =
        twoFactorAuthenticationService.register(principal.name, oauthGroup)
            .let(totpMapper::oauthTotpProto)

    /**
     * Confirm enabling 2fa with OTP.
     */
    @PutMapping(params = ["otp"])
    fun registerConfirm(principal: Principal, @RequestParam otp: Int): TwoFactorAuthenticationStatusProto =
        twoFactorAuthenticationService.registerConfirm(principal.name, otp)
            .let(totpMapper::twoFactorAuthenticationProto)

    /**
     * Disable 2fa. For disabled TTOP secret, requires nothing.
     */
    @DeleteMapping
    fun unregisterDisabled(principal: Principal) =
        twoFactorAuthenticationService.unregister(principal.name, 0)

    /**
     * Disable 2fa. Requires OTP.
     */
    @DeleteMapping(params = ["otp"])
    fun unregister(principal: Principal, @RequestParam otp: Int) =
        twoFactorAuthenticationService.unregister(principal.name, otp)

    /**
     * Disable 2fa using scratch code instead of OTP.
     */
    @DeleteMapping(params = ["scratchCode"])
    fun unregisterViaScratchCode(principal: Principal, @RequestParam scratchCode: Int) =
        twoFactorAuthenticationService.unregisterViaScratchCode(principal.name, scratchCode)

    /**
     * Remove all oauth totp access for the current user.
     */
    @DeleteMapping("access")
    fun removeTotpAccess(principal: Principal) = twoFactorAuthenticationService.removeTotpAccess(principal.name)
}
