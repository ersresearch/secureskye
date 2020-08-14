/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.rest

import jp.co.trillium.secureskye.user.admin.api.proto.CredentialProto
import jp.co.trillium.secureskye.user.admin.exception.UnknownQueryFieldException
import jp.co.trillium.secureskye.user.admin.service.CredentialService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Endpoints for credential administration (registering, listing, ...).
 */
@RestController
@Validated
@RequestMapping("/api/internal/users")
class CredentialInternalController(
    private val credentialService: CredentialService
) {
    /**
     * Get a specific user by its [name].
     */
    @GetMapping
    @PreAuthorize("hasAuthority('user:read')")
    fun getUsers(@RequestParam(value = "name", required = false) name: String?) =
        credentialService.findUsersByName(name)

    /**
     * Get a specific user by its [value] which can be its `id` or `name` depending on the [field].
     */
    @GetMapping("{value}")
    @PreAuthorize("hasAuthority('user:read')")
    fun getUser(
        @PathVariable value: String,
        @RequestParam(defaultValue = "id") field: String
    ): CredentialProto = when (field) {
        "id" -> credentialService.findUserById(UUID.fromString(value))
        "name" -> credentialService.findUserByName(value)
        else -> throw UnknownQueryFieldException(field)
    }
}
