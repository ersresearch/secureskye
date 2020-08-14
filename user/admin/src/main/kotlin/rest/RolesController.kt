/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.rest

import jp.co.trillium.secureskye.user.admin.api.proto.RoleDetailProto
import jp.co.trillium.secureskye.user.admin.api.proto.RoleSetProto
import jp.co.trillium.secureskye.user.admin.mapper.CredentialMapper
import jp.co.trillium.secureskye.user.admin.service.RoleService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Controller for role management.
 */
@RestController
@Validated
@RequestMapping("/api/users/roles")
class RolesController(
    private val roleService: RoleService,
    private val credentialMapper: CredentialMapper
) {

    /**
     * List all currently registered role.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('role:read')")
    fun listRoles(): RoleSetProto = roleService.listRoles().let(credentialMapper::roleSet)

    /**
     * Create new role with provided [newInfo].
     */
    @PostMapping
    @PreAuthorize("hasAuthority('role:create')")
    fun createRole(@RequestBody newInfo: RoleDetailProto): RoleDetailProto =
        roleService.createRole(newInfo.let(credentialMapper::roleDetail)).let(credentialMapper::roleDetailApi)

    /**
     * Remove role multiple role.
     */
    @PatchMapping()
    @PreAuthorize("hasAuthority('role:delete')")
    fun deleteMultipleRole(@RequestBody listId: List<UUID>) = roleService.deleteMultipleRole(listId)

    /**
     * Get role info specified by [id].
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('role:read')")
    fun getRole(@PathVariable id: UUID): RoleDetailProto = roleService.getRole(id).let(credentialMapper::roleDetail)

    /**
     * Remove role specified by [id].
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('role:delete')")
    fun deleteRole(@PathVariable id: UUID) = roleService.deleteRole(id)

    /**
     * Update role specified by [id] values from [updateInfo].
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('role:update')")
    fun updateRole(@PathVariable id: UUID, @RequestBody updateInfo: RoleDetailProto): RoleDetailProto =
        roleService.updateRole(id, updateInfo.let(credentialMapper::roleDetail))
            .let(credentialMapper::roleDetail)
}
