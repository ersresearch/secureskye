/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.oauth

import jp.co.trillium.secureskye.ie.main.model.oauth.Authority
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional
import java.util.UUID
import java.util.stream.Stream

/**
 * Repository for managing [Authority] entities.
 */
@Transactional
interface AuthorityIeRepository : JpaRepository<Authority, UUID> {

    /**
     * List all [Authority] in a Java 8 [Stream].
     */
    @Query("SELECT c FROM AuthorityIe c")
    fun streamAll(): Stream<Authority>
}
