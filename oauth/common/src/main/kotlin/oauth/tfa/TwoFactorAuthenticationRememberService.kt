/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa

import org.springframework.security.oauth2.common.OAuth2AccessToken
import org.springframework.security.oauth2.provider.OAuth2Authentication

/**
 * 2FA remember service.
 */
interface TwoFactorAuthenticationRememberService {

    /**
     * Remember.
     */
    fun remember(accessToken: OAuth2AccessToken, authentication: OAuth2Authentication): OAuth2AccessToken
}
