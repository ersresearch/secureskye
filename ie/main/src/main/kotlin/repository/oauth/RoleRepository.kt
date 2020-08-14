/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.oauth

import jp.co.trillium.secureskye.oauth.model.Role
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional
import java.util.UUID
import java.util.stream.Stream

/**
 * Repository for managing [Role] entities.
 */
@Transactional
interface RoleRepository : JpaRepository<Role, UUID> {

    /**
     * List all [Role] in a Java 8 [Stream].
     */
    @Query("SELECT c FROM Role c")
    fun streamAll(): Stream<Role>
}
