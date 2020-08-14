/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.rest

import jp.co.trillium.secureskye.user.admin.service.AuthorityService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Endpoints for credential administration (registering, listing, ...).
 */
@RestController
@RequestMapping("/api/users/authorities")
@Validated
class AuthoritiesController(private val authorityService: AuthorityService) {

    /**
     * List all currently registered authorities.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('authority:read')")
    fun getAuthorities() = authorityService.listAuthorities()
}
