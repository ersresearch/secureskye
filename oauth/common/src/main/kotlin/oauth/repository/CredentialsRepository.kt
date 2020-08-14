/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.repository

import jp.co.trillium.secureskye.oauth.model.Credentials
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.transaction.annotation.Transactional
import java.util.Optional
import java.util.UUID
import java.util.stream.Stream

/**
 * Repository for managing [Credentials] entities.
 */
@Transactional
interface CredentialsRepository : JpaRepository<Credentials, UUID>, CrudRepository<Credentials, UUID> {

    /**
     * Find credential info by user [name].
     */
    fun findByName(name: String): Optional<Credentials>

    /**
     * Search users by its [name].
     */
    fun findByNameContaining(name: String): List<Credentials>

    /**
     * Stream all data.
     */
    @Query("SELECT c FROM Credentials c")
    fun streamAll(): Stream<Credentials>
}
