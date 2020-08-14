/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.rest

import jp.co.trillium.secureskye.user.admin.feign.UaaClient
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * Endpoints for credential administration (registering, listing, ...).
 */
@RestController
@RequestMapping("/api/users/2fa")
@Validated
class TfaController(private val uaaClient: UaaClient) {

    /**
     * Disable 2fa using scratch code instead of OTP.
     * TODO: access rights
     */
    @DeleteMapping(params = ["oauthId", "scratchCode"])
    fun unregisterViaScratchCode(@RequestParam oauthId: String, @RequestParam scratchCode: Int) =
        uaaClient.unregisterViaScratchCode(oauthId, scratchCode)
}
