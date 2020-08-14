/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa.otp.totp

import jp.co.trillium.secureskye.oauth.model.OauthTotp
import org.springframework.data.jpa.repository.JpaRepository

/**
 * Repository for managing [OauthTotp].
 */
interface OauthTotpRepository : JpaRepository<OauthTotp, String> {

    /**
     * Find all TOTP by [oauthGroup].
     */
    fun findByOauthGroup(oauthGroup: String): List<OauthTotp>
}
