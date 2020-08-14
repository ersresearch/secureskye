/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa

import org.springframework.security.oauth2.provider.AuthorizationRequest
import org.springframework.security.oauth2.provider.ClientDetails
import org.springframework.security.oauth2.provider.ClientDetailsService
import org.springframework.security.oauth2.provider.OAuth2Request
import org.springframework.security.oauth2.provider.TokenRequest
import org.springframework.security.oauth2.provider.request.DefaultOAuth2RequestFactory

/**
 * 2FA request factory.
 */
class TwoFactorAuthenticationRequestFactory(
    clientDetailsService: ClientDetailsService,
    private val twoFactorAuthenticationProvider: TwoFactorAuthenticationProvider
) : DefaultOAuth2RequestFactory(clientDetailsService) {
    override fun createOAuth2Request(request: AuthorizationRequest): OAuth2Request {
        // 2FA for implicit, authorization_code
        twoFactorAuthenticationProvider.authenticate(request)
        return super.createOAuth2Request(request)
    }

    override fun createOAuth2Request(client: ClientDetails, tokenRequest: TokenRequest): OAuth2Request {
        // 2FA for password, client_credentials
        twoFactorAuthenticationProvider.authenticate(tokenRequest)
        return super.createOAuth2Request(client, tokenRequest)
    }
}
