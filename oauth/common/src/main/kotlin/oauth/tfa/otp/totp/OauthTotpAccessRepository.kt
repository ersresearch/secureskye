/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa.otp.totp

import jp.co.trillium.secureskye.oauth.model.OauthTotpAccess
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.transaction.annotation.Transactional

/**
 * Repository for managing [OauthTotpAccess].
 */
interface OauthTotpAccessRepository : JpaRepository<OauthTotpAccess, OauthTotpAccess.PK> {

    /**
     * Remove oauth totp access by [oauthId].
     */
    @Modifying
    @Transactional
    fun deleteByOauthId(oauthId: String)
}
