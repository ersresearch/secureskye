/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.oauth

import jp.co.trillium.secureskye.ie.main.model.oauth.CredentialsRoles
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional
import java.util.stream.Stream

/**
 * Repository for managing [CredentialsRoles] entities.
 */
@Transactional
interface CredentialsRolesRepository : JpaRepository<CredentialsRoles, CredentialsRoles> {

    /**
     * List all [CredentialsRoles] in a Java 8 [Stream].
     */
    @Query("SELECT c FROM CredentialsRoles c")
    fun streamAll(): Stream<CredentialsRoles>
}
