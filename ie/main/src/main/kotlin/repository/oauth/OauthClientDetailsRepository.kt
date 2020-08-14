/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.oauth

import jp.co.trillium.secureskye.ie.main.model.oauth.OauthClientDetails
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional
import java.util.stream.Stream

/**
 * Repository for managing [OauthClientDetails] entities.
 */
@Transactional
interface OauthClientDetailsRepository : JpaRepository<OauthClientDetails, String> {

    /**
     * List all [OauthClientDetails] in a Java 8 [Stream].
     */
    @Query("SELECT d FROM OauthClientDetails d")
    fun streamAll(): Stream<OauthClientDetails>
}
