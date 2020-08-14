/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.rest

import jp.co.trillium.secureskye.user.admin.model.UpdateCredential
import jp.co.trillium.secureskye.user.admin.service.AvatarService
import jp.co.trillium.secureskye.user.admin.service.CredentialService
import org.bson.types.ObjectId
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import java.util.UUID
import javax.servlet.http.HttpServletResponse

/**
 * Endpoints for credential administration (registering, listing, ...).
 */
@RestController
@RequestMapping("/api/users")
@Validated
class CredentialController(
    private val credentialService: CredentialService,
    private val avatarService: AvatarService
) {
    /**
     * Create a new [user].
     */
    @PostMapping
    @PreAuthorize("hasAuthority('user:create')")
    fun createUser(@RequestBody user: UpdateCredential) =
        credentialService.registerUser(user)

    /**
     * Get a specific user by its [name].
     */
    @GetMapping
    @PreAuthorize("hasAuthority('user:read')")
    fun getUsers(@RequestParam(value = "name", required = false) name: String?) =
        credentialService.findUsersByName(name)

    /**
     *  Search users by its [name].
     */
    @GetMapping("search")
    @PreAuthorize("hasAuthority('user:read')")
    fun searchUsersByName(@RequestParam(value = "name", required = true) name: String) =
        credentialService.searchUsersByName(name)

    /**
     * Get a specific user by its [id].
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    fun getUser(@PathVariable id: UUID) = credentialService.findUserById(id)

    /**
     * Update an existing user identified by [id] with the new [updateInfo].
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('user:update')")
    fun updateUser(@PathVariable id: UUID, @RequestBody user: UpdateCredential) =
        credentialService.putUser(id, user)

    /**
     * Delete an existing user, identified by [id].
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('user:delete')")
    fun deleteUser(@PathVariable id: UUID) = credentialService.deleteUser(id)

    /**
     * Load the image identified by [id] and write it into [response].
     */
    @GetMapping("/{id}/avatar")
    fun getAvatar(@PathVariable id: ObjectId, response: HttpServletResponse) =
        avatarService.get(id, response.outputStream)

    /**
     * Active or deactive an existing user, identified by [id].
     */
    @PutMapping("/{id}/active")
    fun activeUser(
        @PathVariable id: UUID,
        @RequestParam(value = "value", required = true) value: Boolean,
        principal: Principal
    ) =
        credentialService.activeUser(id, value, principal.name)
}
