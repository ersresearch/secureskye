/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa.otp.totp

import jp.co.trillium.secureskye.oauth.model.OauthTotpAccess
import jp.co.trillium.secureskye.oauth.tfa.TwoFactorAuthenticationRememberService
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken
import org.springframework.security.oauth2.common.OAuth2AccessToken
import org.springframework.security.oauth2.provider.OAuth2Authentication
import kotlin.reflect.full.cast

/**
 * 2FA TOTP remember service.
 */
class TwoFactorAuthenticationTotpRememberService(
    private val oauthTotpAccessRepository: OauthTotpAccessRepository
) : TwoFactorAuthenticationRememberService {
    override fun remember(accessToken: OAuth2AccessToken, authentication: OAuth2Authentication): OAuth2AccessToken {
        // Request for access id
        if (authentication.oAuth2Request.requestParameters["otp_access"] != null) {
            // Check for validated otp access id
            val otpAccessId = authentication.oAuth2Request.requestParameters["otp_access_id_valid"]
                    ?: OauthTotpAccess(authentication.userAuthentication?.name ?: authentication.name)
                        .let(oauthTotpAccessRepository::save)
                        .let { it.accessId.toString() }

            // Add access id to token
            accessToken
                .let { DefaultOAuth2AccessToken::class.cast(it) }
                .apply {
                    // Mutate additional info
                    additionalInformation = additionalInformation.toMutableMap().apply {
                        put("otp_access_id", otpAccessId)
                    }
                }
        }
        return accessToken
    }
}
