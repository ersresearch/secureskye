/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.rest

import jp.co.trillium.secureskye.oauth.model.OauthTotpListProto
import jp.co.trillium.secureskye.oauth.model.OauthTotpProto
import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
import jp.co.trillium.secureskye.oauth.uaa.mapper.TotpMapper
import jp.co.trillium.secureskye.oauth.uaa.service.TwoFactorAuthenticationService
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

/**
 * Controller for enable/disable 2fa feature.
 */
@RestController
@RequestMapping("/oauth/2fa")
class TwoFactorAuthenticationInternalController(
    private val twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private val totpMapper: TotpMapper
) {

    /**
     * INTERNAL Get 2fa information.
     */
    @GetMapping("{oauthId}/status")
    @PreAuthorize("hasAuthority('2fa:read')")
    fun getTwoFactorAuthenticationStatus(@PathVariable oauthId: String): TwoFactorAuthenticationStatusProto =
        twoFactorAuthenticationService.getOauthTotpInfo(oauthId)
            .let(totpMapper::twoFactorAuthenticationProto)

    /**
     * Request 2fa status (in-active only).
     */
    @GetMapping("{oauthId}")
    @PreAuthorize("hasAuthority('2fa:read')")
    fun getPendingInfo(@PathVariable oauthId: String): OauthTotpProto =
        twoFactorAuthenticationService.getPendingInfo(oauthId)
            .let(totpMapper::oauthTotpProto)

    /**
     * (Pre)enable 2fa feature for user. Need confirmation after.
     */
    @PostMapping("{oauthId}")
    @PreAuthorize("hasAuthority('2fa:create')")
    fun register(@PathVariable oauthId: String, @RequestParam(required = false) oauthGroup: String?): OauthTotpProto =
        twoFactorAuthenticationService.register(oauthId, oauthGroup, true)
            .let(totpMapper::oauthTotpProto)

    /**
     * Confirm enabling 2fa with OTP.
     */
    @PutMapping("{oauthId}", params = ["otp"])
    @PreAuthorize("hasAuthority('2fa:update')")
    fun registerConfirm(@PathVariable oauthId: String, @RequestParam otp: Int): TwoFactorAuthenticationStatusProto =
        twoFactorAuthenticationService.registerConfirm(oauthId, otp)
            .let(totpMapper::twoFactorAuthenticationProto)

    /**
     * Disable 2fa. For disabled TTOP secret, requires nothing.
     */
    @DeleteMapping("{oauthId}")
    @PreAuthorize("hasAuthority('2fa:delete')")
    fun unregisterDisabled(@PathVariable oauthId: String) =
        twoFactorAuthenticationService.unregister(oauthId, 0)

    /**
     * Disable 2fa. Requires OTP.
     */
    @DeleteMapping("{oauthId}", params = ["otp"])
    @PreAuthorize("hasAuthority('2fa:delete')")
    fun unregister(@PathVariable oauthId: String, @RequestParam otp: Int) =
        twoFactorAuthenticationService.unregister(oauthId, otp)

    /**
     * Disable 2fa using scratch code instead of OTP.
     */
    @DeleteMapping("{oauthId}", params = ["scratchCode"])
    @PreAuthorize("hasAuthority('2fa:delete')")
    fun unregisterViaScratchCode(@PathVariable oauthId: String, @RequestParam scratchCode: Int) =
        twoFactorAuthenticationService.unregisterViaScratchCode(oauthId, scratchCode)

    /**
     * Remove all oauth totp access by [oauthId].
     */
    @DeleteMapping("{oauthId}/access")
    @PreAuthorize("hasAuthority('2fa:delete')")
    fun removeTotpAccess(@PathVariable oauthId: String) = twoFactorAuthenticationService.removeTotpAccess(oauthId)

    /**
     * Get 2fa information by [oauthGroup].
     */
    @GetMapping("group/{oauthGroup}")
    @PreAuthorize("hasAuthority('2fa:read')")
    fun getTotpSecretList(@PathVariable oauthGroup: String): OauthTotpListProto =
        twoFactorAuthenticationService.getTotpSecretList(oauthGroup)
            .let(totpMapper::oauthTotpListProto)

    /**
     * Update [secretList] by [oauthGroup]. Preserve existing secrets and remove all orphans.
     */
    @PutMapping("group/{oauthGroup}")
    @PreAuthorize("hasAuthority('2fa:update')")
    fun updateTotpSecretList(
        @PathVariable oauthGroup: String,
        @RequestBody secretList: OauthTotpListProto
    ): OauthTotpListProto =
        twoFactorAuthenticationService.updateTotpSecretList(
            oauthGroup,
            secretList.let(totpMapper::oauthTotpListProto),
            true
        ).let(totpMapper::oauthTotpListProto)

    /**
     * Remove (disable) 2fa by [oauthGroup].
     */
    @DeleteMapping("group/{oauthGroup}")
    @PreAuthorize("hasAuthority('2fa:delete')")
    fun disable2FactorAuthenticationForGroup(@PathVariable oauthGroup: String) =
        twoFactorAuthenticationService.removeTotpSecretByOauthGroup(oauthGroup)

    /**
     * Remove all oauth totp access by [oauthGroup].
     */
    @DeleteMapping("group/{oauthGroup}/access")
    @PreAuthorize("hasAuthority('2fa:delete')")
    fun removeTotpAccessByGroup(@PathVariable oauthGroup: String) =
        twoFactorAuthenticationService.removeTotpAccessByGroup(oauthGroup)
}
