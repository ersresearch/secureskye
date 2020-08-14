/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa

import org.springframework.security.oauth2.common.OAuth2AccessToken
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.oauth2.provider.token.DefaultTokenServices

/**
 * 2FA token services.
 */
class TwoFactorAuthenticationTokenServices(
    private val twoFactorAuthenticationRememberService: TwoFactorAuthenticationRememberService
) : DefaultTokenServices() {

    /**
     * [DefaultTokenServices.getAccessToken].
     */
    override fun getAccessToken(authentication: OAuth2Authentication): OAuth2AccessToken? =
        super.getAccessToken(authentication)
            ?.let { twoFactorAuthenticationRememberService.remember(it, authentication) }

    /**
     * [DefaultTokenServices.createAccessToken].
     */
    override fun createAccessToken(authentication: OAuth2Authentication): OAuth2AccessToken? =
        super.createAccessToken(authentication)
            ?.let { twoFactorAuthenticationRememberService.remember(it, authentication) }
}
