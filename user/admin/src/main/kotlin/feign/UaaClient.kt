/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.feign

import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
import jp.co.trillium.secureskye.user.admin.configuration.FeignConfiguration
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam

/**
 * Feign client for communication with 'uaa'.
 */
@FeignClient("uaa", configuration = [FeignConfiguration::class])
interface UaaClient {

    /**
     * Get 2FA info.
     */
    @GetMapping("/uaa/oauth/2fa/{oauthId}/status")
    fun getTwoFactorAuthenticationStatus(@PathVariable oauthId: String): TwoFactorAuthenticationStatusProto

    /**
     * Disable 2fa using scratch code instead of OTP.
     */
    @DeleteMapping("/uaa/oauth/2fa/{oauthId}", params = ["scratchCode"])
    fun unregisterViaScratchCode(@PathVariable oauthId: String, @RequestParam scratchCode: Int)
}
