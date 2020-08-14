/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.service

import jp.co.trillium.secureskye.oauth.model.Role
import jp.co.trillium.secureskye.oauth.repository.CredentialsRepository
import jp.co.trillium.secureskye.user.admin.exception.RoleDeletionException
import jp.co.trillium.secureskye.user.admin.repository.RoleRepository
import org.springframework.stereotype.Service
import java.util.UUID
import javax.persistence.EntityNotFoundException

/**
 * Business logic for administering role.
 */
@Service
class RoleService(
    private val credentialsRepository: CredentialsRepository,
    private val roleRepository: RoleRepository
) {

    /**
     * List all known role.
     *
     * @return All role.
     *
     */
    fun listRoles() = roleRepository.findAll().toSet()

    /**
     * Insert new role with specified [role].
     *
     * @return Role
     */
    fun createRole(role: Role): Role {
        if (role.name.compareTo("ROLE_") == 0 || roleRepository.findByName(role.name).isPresent) {
            throw IllegalArgumentException("Name must not be empty or duplicate!!")
        } else if (role.description.isEmpty()) {
            throw IllegalArgumentException("Description must not be empty!!")
        } else {
            return when (role.users.isEmpty()) {
                true -> roleRepository.save(role)
                false -> roleRepository.save(role)
                    .also { roleUser ->
                        roleUser.users.forEach { user ->
                            updateRoleForUser(user.id, roleUser)
                        }
                    }
            }
        }
    }

    /**
     * Update Role for User.
     */
    private fun updateRoleForUser(userId: UUID, role: Role) {
        credentialsRepository.getOne(userId).apply {
            val tmpSet = this.roles as MutableSet
            tmpSet.add(role)
            this.roles = tmpSet
        }.let(credentialsRepository::save)
    }

    /**
     * Delete Role for User.
     */
    private fun deleteRoleForUser(userId: UUID, role: Role) {
        credentialsRepository.getOne(userId).apply {
            val tmpSet = this.roles as MutableSet
            tmpSet.remove(role)
            this.roles = tmpSet
        }.let(credentialsRepository::save)
    }

    /**
     * Get role info specified by [id].
     *
     * @return Role
     * @throws EntityNotFoundException
     */
    fun getRole(id: UUID): Role = roleRepository.findById(id).orElseThrow { EntityNotFoundException() }

    /**
     * Delete role specified by [id].
     *
     * @throws RoleDeletionException
     */
    fun deleteRole(id: UUID) {
        roleRepository.findById(id).ifPresent { role ->
            if (role.isAdmin) {
                throw RoleDeletionException("Cannot remove role with ADMIN feature")
            } else {
                role.users.forEach {
                    deleteRoleForUser(it.id, role)
                }
                roleRepository.delete(role)
            }
        }
    }

    /**
     * Delete multiple role by listId.
     *
     * @throws RoleDeletionException
     */
    fun deleteMultipleRole(listId: List<UUID>) {
        listId.forEach { id ->
            val checkPresent = roleRepository.findById(id)
            if (checkPresent.isPresent) {
                if (checkPresent.get().isAdmin) {
                    throw RoleDeletionException("Cannot remove role with ADMIN feature")
                }
            } else throw RoleDeletionException("Cannot find role with Id: $id")
        }
        listId.forEach { id ->
            roleRepository.getOne(id).let { role ->
                role.users.forEach {
                    deleteRoleForUser(it.id, role)
                }
                roleRepository.delete(role)
            }
        }
    }

    /**
     * Update role specified by [id] values from [updateInfo].
     *
     * @return Role
     * @throws EntityNotFoundException
     */
    fun updateRole(id: UUID, updateInfo: Role): Role {
        val role = getRole(id)

        // update role info
        if (updateInfo.description.isEmpty()) {
            throw IllegalArgumentException("Description must not be empty!!")
        } else if (role.name == updateInfo.name) {
            role.displayName = updateInfo.displayName
            role.description = updateInfo.description
        } else if (updateInfo.name == "ROLE_" || roleRepository.findByName(updateInfo.name).isPresent) {
            throw IllegalArgumentException("Name must not be empty or duplicate!!")
        } else {
            role.displayName = updateInfo.displayName
            role.name = updateInfo.name
            role.description = updateInfo.description
        }
        // update role user
        val users = role.users as MutableList
        role.users.forEach { user ->
            deleteRoleForUser(user.id, role)
        }

        users.clear()
        users.addAll(updateInfo.users)

        // update role authorities
        val authorities = role.authorities as MutableList
        authorities.clear()
        authorities.addAll(updateInfo.authorities)

        // persist
        return roleRepository.save(role)
            .also { roleUser ->
                roleUser.users.forEach { user ->
                    updateRoleForUser(user.id, roleUser)
                }
            }
    }
}
