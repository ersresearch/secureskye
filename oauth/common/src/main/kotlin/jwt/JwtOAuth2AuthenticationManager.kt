/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.jwt

import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.client.resource.OAuth2AccessDeniedException
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException
import org.springframework.security.oauth2.provider.ClientDetails
import org.springframework.security.oauth2.provider.ClientDetailsService
import org.springframework.security.oauth2.provider.ClientRegistrationException
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationManager
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices

/**
 * Extension of OAuth2AuthenticationManager to support both oauth2 access token and jwt.
 */
class JwtOAuth2AuthenticationManager(
    private val jwtTokenServices: ResourceServerTokenServices,
    private val oauthTokenServices: ResourceServerTokenServices,
    private val jdbcClientDetailsService: ClientDetailsService
) : OAuth2AuthenticationManager() {

    private var _resourceId: String? = null

    override fun setResourceId(resourceId: String?) {
        super.setResourceId(resourceId)
        _resourceId = resourceId
    }

    override fun authenticate(authentication: Authentication?): Authentication {
        if (authentication == null) {
            throw InvalidTokenException("Invalid token (token not found)")
        }

        if (authentication is JwtOAuth2PreAuthenticatedAuthenticationToken) {
            val token = authentication.principal as String
            val auth = tokenServices(authentication.tokenType).loadAuthentication(token)
                    ?: throw InvalidTokenException("Invalid token: $token")

            val resourceIds = auth.oAuth2Request.resourceIds
            if (!resourceIds.isEmpty() && !resourceIds.contains(_resourceId)
            ) {
                throw OAuth2AccessDeniedException("Invalid token does not contain resource id ($_resourceId)")
            }

            checkClientDetails(auth, authentication.tokenType)

            if (authentication.details is OAuth2AuthenticationDetails) {
                val details = authentication.details as OAuth2AuthenticationDetails
                // Guard against a cached copy of the same details
                if (details != auth.details) {
                    // Preserve the authentication details from the one loaded by token services
                    details.decodedDetails = auth.details
                }
            }
            auth.details = authentication.details
            auth.isAuthenticated = true
            return auth
        } else {
            return super.authenticate(authentication)
        }
    }

    /**
     * Check client details.
     */
    private fun checkClientDetails(auth: OAuth2Authentication, type: BearerTokenType?) {
        val clientDetailsService = clientDetailsService(type)
        if (clientDetailsService != null) {
            val client: ClientDetails
            try {
                client = clientDetailsService.loadClientByClientId(auth.oAuth2Request.clientId)
            } catch (e: ClientRegistrationException) {
                throw OAuth2AccessDeniedException("Invalid token contains invalid client id")
            }

            val allowed = client.scope
            auth.oAuth2Request.scope
                .filterNot { allowed.contains(it) }
                .forEach {
                    throw OAuth2AccessDeniedException(
                        "Invalid token contains disallowed scope ($it) for this client"
                    )
                }
        }
    }

    /**
     * Client details service based on token type.
     */
    private fun clientDetailsService(type: BearerTokenType?): ClientDetailsService? {
        return when (type) {
            BearerTokenType.OAuthAccessToken -> jdbcClientDetailsService
            BearerTokenType.Jwt -> null
            else -> throw InvalidTokenException("Invalid token (token type '$type' not found)")
        }
    }

    /**
     * Token services based token type.
     */
    private fun tokenServices(type: BearerTokenType?): ResourceServerTokenServices {
        return when (type) {
            BearerTokenType.OAuthAccessToken -> oauthTokenServices
            BearerTokenType.Jwt -> jwtTokenServices
            else -> throw InvalidTokenException("Invalid token (token type '$type' not found)")
        }
    }
}
