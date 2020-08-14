/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.feign

import jp.co.trillium.secureskye.oauth.model.OauthTotpListProto
import jp.co.trillium.secureskye.oauth.model.OauthTotpProto
import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
import jp.co.trillium.secureskye.vehicle.admin.configuration.FeignConfiguration
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import java.util.UUID

/**
 * Feign client for communication with 'uaa'.
 */
@FeignClient("uaa", configuration = [FeignConfiguration::class])
interface UaaClient {

    /**
     * Get 2FA info.
     *
     */
    @GetMapping("/uaa/oauth/2fa/{oauthId}/status")
    fun getTwoFactorAuthenticationStatus(@PathVariable oauthId: String): TwoFactorAuthenticationStatusProto

    /**
     * Get 2FA pending info.
     */
    @GetMapping("/uaa/oauth/2fa/{oauthId}")
    fun getPendingInfo(@PathVariable oauthId: String): OauthTotpProto

    /**
     * (Pre)enable 2fa feature for user. Need confirmation after.
     */
    @PostMapping("/uaa/oauth/2fa/{oauthId}")
    fun register(@PathVariable oauthId: String, @RequestParam(required = false) oauthGroup: UUID?): OauthTotpProto

    /**
     * Confirm enabling 2fa with OTP.
     */
    @PutMapping("/uaa/oauth/2fa/{oauthId}", params = ["otp"])
    fun registerConfirm(@PathVariable oauthId: String, @RequestParam otp: Int): TwoFactorAuthenticationStatusProto

    /**
     * Disable 2fa. For disabled TTOP secret, requires nothing.
     */
    @DeleteMapping("/uaa/oauth/2fa/{oauthId}")
    fun unregisterDisabled(@PathVariable oauthId: String)

    /**
     * Disable 2fa. Requires OTP.
     */
    @DeleteMapping("/uaa/oauth/2fa/{oauthId}", params = ["otp"])
    fun unregister(@PathVariable oauthId: String, @RequestParam otp: Int)

    /**
     * Disable 2fa using scratch code instead of OTP.
     */
    @DeleteMapping("/uaa/oauth/2fa/{oauthId}", params = ["scratchCode"])
    fun unregisterViaScratchCode(@PathVariable oauthId: String, @RequestParam scratchCode: Int)

    /**
     * Get 2fa information by [oauthGroup].
     */
    @GetMapping("/uaa/oauth/2fa/group/{oauthGroup}")
    fun getTotpSecretList(@PathVariable oauthGroup: UUID): OauthTotpListProto?

    /**
     * Update [secretList] by [oauthGroup]. Preserve existing secrets and remove all orphans.
     */
    @PutMapping("/uaa/oauth/2fa/group/{oauthGroup}")
    fun updateTotpSecretList(
        @PathVariable oauthGroup: UUID,
        @RequestBody secretList: OauthTotpListProto
    ): OauthTotpListProto?

    /**
     * Remove (disable) 2fa by [oauthGroup].
     */
    @DeleteMapping("/uaa/oauth/2fa/group/{oauthGroup}")
    fun disable2FactorAuthenticationForGroup(@PathVariable oauthGroup: UUID)
}
