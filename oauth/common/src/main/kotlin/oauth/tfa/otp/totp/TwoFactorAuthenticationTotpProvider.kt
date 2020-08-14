/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa.otp.totp

import com.warrenstrange.googleauth.GoogleAuthenticator
import jp.co.trillium.secureskye.oauth.model.OauthTotpAccess
import jp.co.trillium.secureskye.oauth.tfa.otp.TwoFactorAuthenticationOtpProvider
import org.springframework.security.oauth2.common.exceptions.InvalidGrantException
import java.time.LocalDateTime
import java.util.UUID

/**
 * 2FA provider by TOTP.
 */
class TwoFactorAuthenticationTotpProvider(
    private val oauthTotpRepository: OauthTotpRepository,
    private val oauthTotpAccessRepository: OauthTotpAccessRepository,
    private val googleAuthenticator: GoogleAuthenticator
) : TwoFactorAuthenticationOtpProvider() {

    override fun authenticateInternal(oauthId: String, otpParams: MutableMap<String, String?>) {
        // Check for access id
        try {
            otpParams["otp_access_id"]?.let(UUID::fromString)?.let { accessId ->
                val access = oauthTotpAccessRepository.findById(OauthTotpAccess.PK(oauthId, accessId))
                if (access.isPresent) {
                    if (LocalDateTime.now() < access.get().expiresAt) {
                        otpParams["otp_access_id_valid"] = access.get().accessId.toString()
                        return // Bypass
                    } else {
                        // Remove expired
                        oauthTotpAccessRepository.delete(access.get())
                        otpParams.remove("otp_access_id")
                    }
                }
            }
        } catch (e: IllegalArgumentException) {
            // Ignored as access id is optional.
        }

        // TOTP verification
        try {
            // Get TOTP secret
            oauthTotpRepository.findById(oauthId).ifPresent { entity ->
                entity.takeIf { it.enabled }?.secret?.let { secret ->
                    // TOTP parameter
                    val totp = otpParams["otp"]?.toInt() ?: throw NumberFormatException()
                    // Verify TOTP
                    if (!googleAuthenticator.authorize(secret, totp)) {
                        throw InvalidGrantException("Invalid OTP: Verification failed.")
                    }
                }
            }
        } catch (e: NumberFormatException) {
            throw InvalidGrantException("Invalid OTP: Incorrect TOTP format for `otp`.")
        }
    }
}
