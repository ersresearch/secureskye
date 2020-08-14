/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.oauth

import jp.co.trillium.secureskye.ie.main.model.oauth.Credentials
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import java.util.Optional
import java.util.UUID
import java.util.stream.Stream

/**
 * Repository for managing [Credentials] entities.
 */
@Transactional
@Repository
interface CredentialsIeRepository : JpaRepository<Credentials, UUID> {

    /**
     * Find credential info by user [name].
     */
    fun findByName(name: String): Optional<Credentials>

    /**
     * Stream all credential.
     */
    @Query("SELECT c FROM CredentialsIe c")
    fun streamAll(): Stream<Credentials>
}
