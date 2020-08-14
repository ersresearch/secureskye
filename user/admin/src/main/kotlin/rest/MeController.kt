/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.rest

import jp.co.trillium.secureskye.user.admin.service.CredentialService
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

/**
 * Endpoints for credential administration (registering, listing, ...).
 */
@RestController
@RequestMapping("/api/users/me")
@Validated
class MeController(private val credentialService: CredentialService) {

    /**
     * Logged-in user info endpoint.
     * TODO: access rights
     */
    @GetMapping
    fun me(me: Principal) = credentialService.findUserByName(me.name)
}
