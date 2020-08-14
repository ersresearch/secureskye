/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa.otp

import jp.co.trillium.secureskye.oauth.tfa.TwoFactorAuthenticationProvider
import org.springframework.security.oauth2.common.exceptions.InvalidGrantException
import org.springframework.security.oauth2.provider.AuthorizationRequest
import org.springframework.security.oauth2.provider.TokenRequest

/**
 * 2FA provider by OTP.
 */
abstract class TwoFactorAuthenticationOtpProvider : TwoFactorAuthenticationProvider {
    override fun authenticate(request: TokenRequest) {
        // Mutable parameters
        val parameters = request.requestParameters.toMutableMap()

        // Authenticate internal
        when (request.grantType) {
            "password" -> authenticateInternal(
                parameters["username"] ?: throw InvalidGrantException("Invalid `username` parameter."),
                parameters
            )
            "client_credentials" -> authenticateInternal(
                request.clientId,
                parameters
            )
            else -> {
                // No supported
            }
        }

        // Update parameters
        request.requestParameters = parameters
    }

    override fun authenticate(request: AuthorizationRequest) {
        // Mutable parameters
        val parameters = request.requestParameters.toMutableMap()

        // Authenticate internal
        authenticateInternal(request.clientId, parameters)

        // Update parameters
        request.requestParameters = parameters
    }

    /**
     * Authenticate [oauthId] with its [otpParams].
     */
    abstract fun authenticateInternal(oauthId: String, otpParams: MutableMap<String, String?>)
}
