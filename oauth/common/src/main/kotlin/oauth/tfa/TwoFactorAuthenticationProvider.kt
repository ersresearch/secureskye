/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa

import org.springframework.security.oauth2.provider.AuthorizationRequest
import org.springframework.security.oauth2.provider.TokenRequest

/**
 * 2FA provider.
 */
interface TwoFactorAuthenticationProvider {
    /**
     * Authenticate request.
     * @param request oauth2 auth
     */
    fun authenticate(request: TokenRequest)

    /**
     * Authenticate request.
     * @param request AuthorizationRequest
     */
    fun authenticate(request: AuthorizationRequest)
}
