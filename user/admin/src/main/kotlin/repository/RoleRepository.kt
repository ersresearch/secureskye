/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.repository

import jp.co.trillium.secureskye.oauth.model.Role
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.transaction.annotation.Transactional
import java.util.Optional
import java.util.UUID

/**
 * Repository for managing [Role] entities.
 */
@Transactional
interface RoleRepository : JpaRepository<Role, UUID> {
    /**
     * Find role by name.
     */
    fun findByName(name: String): Optional<Role>
}
