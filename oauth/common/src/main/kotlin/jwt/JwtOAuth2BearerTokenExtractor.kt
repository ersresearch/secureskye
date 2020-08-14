/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.jwt

import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.provider.authentication.BearerTokenExtractor
import javax.servlet.http.HttpServletRequest

/**
 * Extension from BearerTokenExtractor for token type header.
 */
class JwtOAuth2BearerTokenExtractor : BearerTokenExtractor() {

    override fun extract(request: HttpServletRequest): Authentication? {
        val tokenValue = extractToken(request)
        val tokenType = extractTokenType(request)
        return if (tokenValue != null) {
            JwtOAuth2PreAuthenticatedAuthenticationToken(tokenValue, tokenType)
        } else null
    }

    /**
     * Extract token type from request header.
     * @param request request
     */
    private fun extractTokenType(request: HttpServletRequest): BearerTokenType? {
        val tokenType = request.getHeaders(SecureSkyeClientCredentialsResourceDetails.AUTH_ADDED_INFO_HEADER_KEY)

        while (tokenType.hasMoreElements()) {
            val type = tokenType.nextElement()
            if ("jwt".equals(type, true)) {
                return BearerTokenType.Jwt
            }
        }
        return BearerTokenType.OAuthAccessToken
    }
}
