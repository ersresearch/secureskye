/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.service

import com.warrenstrange.googleauth.GoogleAuthenticator
import jp.co.trillium.secureskye.oauth.exception.TwoFactorAuthenticationSettingsException
import jp.co.trillium.secureskye.oauth.model.OauthTotp
import jp.co.trillium.secureskye.oauth.tfa.otp.totp.OauthTotpAccessRepository
import jp.co.trillium.secureskye.oauth.tfa.otp.totp.OauthTotpRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service for enable/disable 2fa feature.
 */
@Service
class TwoFactorAuthenticationService(
    private val googleAuthenticator: GoogleAuthenticator,
    private val oauthTotpRepository: OauthTotpRepository,
    private val oauthTotpAccessRepository: OauthTotpAccessRepository
) {

    /**
     * INTERNAL Get 2fa totp information for the [oauthId].
     * The [oauthId] may be either username or client ID.
     */
    fun getOauthTotpInfo(oauthId: String): OauthTotp? =
        oauthTotpRepository.findById(oauthId).orElse(null)

    /**
     * Request 2fa status (in-active only) for the [oauthId].
     * The [oauthId] may be either username or client ID.
     *
     * @throws TwoFactorAuthenticationSettingsException If 2FA is not enabled or already confirmed.
     */
    fun getPendingInfo(oauthId: String): OauthTotp {
        // Check for existing
        val secret = oauthTotpRepository.findById(oauthId)
            .orElseThrow {
                TwoFactorAuthenticationSettingsException(
                    oauthId,
                    "2FA not enabled."
                )
            }
        if (secret.enabled) {
            throw TwoFactorAuthenticationSettingsException(
                oauthId,
                "2FA already confirmed."
            )
        }
        return secret
    }

    /**
     * (Pre)enable 2fa feature for a user with [oauthId]. Need confirmation after or can be disabled with
     * [enabledWithoutVerified]. An optional [oauthGroup] can be provided.
     *
     * @throws TwoFactorAuthenticationSettingsException If 2FA is already registered.
     */
    @Suppress("MagicNumber")
    fun register(oauthId: String, oauthGroup: String?, enabledWithoutVerified: Boolean = false): OauthTotp {
        // Check for existing
        oauthTotpRepository.findById(oauthId)
            .ifPresent {
                throw TwoFactorAuthenticationSettingsException(
                    oauthId,
                    "2FA is already enabled or waiting for confirmation."
                )
            }
        // Create
        return OauthTotp().apply {
            this.oauthId = oauthId
            this.oauthGroup = oauthGroup
            googleAuthenticator.createCredentials().let {
                this.secret = it.key
                this.recoveryCode1 = it.scratchCodes[0]
                this.recoveryCode2 = it.scratchCodes[1]
                this.recoveryCode3 = it.scratchCodes[2]
                this.recoveryCode4 = it.scratchCodes[3]
                this.recoveryCode5 = it.scratchCodes[4]
            }
            this.enabled = enabledWithoutVerified
        }.let(oauthTotpRepository::save)
    }

    /**
     * Confirm enabling 2fa with OTP for the [oauthId] with the [otp] code.
     *
     * @throws TwoFactorAuthenticationSettingsException If 2FA is not enabled or was already confirmed before.
     * Also the verification may have failed.
     */
    @Transactional
    fun registerConfirm(oauthId: String, otp: Int): OauthTotp {
        // Check for existing
        val secret = oauthTotpRepository.findById(oauthId)
            .orElseThrow {
                TwoFactorAuthenticationSettingsException(
                    oauthId,
                    "2FA not enabled."
                )
            }
        if (secret.enabled) {
            throw TwoFactorAuthenticationSettingsException(
                oauthId,
                "2FA already confirmed."
            )
        }

        // Verify OTP
        if (!googleAuthenticator.authorize(secret.secret, otp)) {
            throw TwoFactorAuthenticationSettingsException(
                oauthId,
                "OTP verification failed."
            )
        }

        // Save confirmation
        return secret
            .apply { enabled = true }
            .let(oauthTotpRepository::save)
            .also {
                // Remove all known access devices
                removeTotpAccess(it.oauthId)
            }
    }

    /**
     * Disable 2FA for given [oauthId]. Requires a valid [otp] code.

     * @throws TwoFactorAuthenticationSettingsException If no 2FA enabled or the [otp] code is invalid.
     */
    fun unregister(oauthId: String, otp: Int) {
        // Check for existing
        val secret = oauthTotpRepository.findById(oauthId)
            .orElseThrow {
                TwoFactorAuthenticationSettingsException(
                    oauthId,
                    "2FA not enabled."
                )
            }

        // Verify if 2fa enabled yet
        if (secret.enabled) {
            // Verify OTP
            if (!googleAuthenticator.authorize(secret.secret, otp)) {
                throw TwoFactorAuthenticationSettingsException(
                    oauthId,
                    "OTP verification failed."
                )
            }
        }

        // Remove all known access devices
        removeTotpAccess(oauthId)

        // Delete
        oauthTotpRepository.deleteById(oauthId)
    }

    /**
     * Disable 2FA for the given [oauthId] by using a [scratchCode] instead of OTP.

     * @throws TwoFactorAuthenticationSettingsException If 2FA is not enabled or the [scratchCode] is invalid.
     */
    fun unregisterViaScratchCode(oauthId: String, scratchCode: Int) {
        val totpSecret = oauthTotpRepository.findById(oauthId)
        // Check for existing
        if (!totpSecret.isPresent) {
            throw TwoFactorAuthenticationSettingsException(
                oauthId,
                "2FA not enabled."
            )
        } else {
            // Verify if scratch code matches 1 of 5
            val totpSecretValue = totpSecret.get()
            if (totpSecretValue.recoveryCode1 == scratchCode ||
                totpSecretValue.recoveryCode2 == scratchCode ||
                totpSecretValue.recoveryCode3 == scratchCode ||
                totpSecretValue.recoveryCode4 == scratchCode ||
                totpSecretValue.recoveryCode5 == scratchCode
            ) {
                // Delete
                oauthTotpRepository.delete(totpSecretValue)
            } else {
                throw TwoFactorAuthenticationSettingsException(
                    oauthId,
                    "Scratch code is not correct."
                )
            }
        }
    }

    /**
     * Get 2FA information by [oauthGroup].
     */
    fun getTotpSecretList(oauthGroup: String): List<OauthTotp> =
        oauthTotpRepository.findByOauthGroup(oauthGroup)

    /**
     * Update all 2FA by [oauthGroup]. Preserve existing secrets and remove all orphans. The verification for all
     * affected clients can be skipped with [enabledWithoutVerified].
     */
    @Transactional
    fun updateTotpSecretList(
        oauthGroup: String,
        newTotpList: List<OauthTotp>,
        enabledWithoutVerified: Boolean = false
    ): List<OauthTotp> {
        // Retrieve existing old secrets
        val oldTotpMap = oauthTotpRepository.findByOauthGroup(oauthGroup)
            .associateBy { it.oauthId }
            .toMutableMap()

        // Map old secret to new ones
        newTotpList.forEach { totp ->
            // oauth group
            totp.oauthGroup = oauthGroup

            if (oldTotpMap.containsKey(totp.oauthId)) {
                // preserve secret from old records
                oldTotpMap.remove(totp.oauthId)?.let { source ->
                    totp.secret = source.secret
                    totp.recoveryCode1 = source.recoveryCode1
                    totp.recoveryCode2 = source.recoveryCode2
                    totp.recoveryCode3 = source.recoveryCode3
                    totp.recoveryCode4 = source.recoveryCode4
                    totp.recoveryCode5 = source.recoveryCode5
                    // Only allow disabling
                    if (totp.enabled) {
                        totp.enabled = source.enabled
                    }
                }
            } else {
                // generate secrets for new records
                @Suppress("MagicNumber")
                googleAuthenticator.createCredentials().let { source ->
                    totp.secret = source.key
                    totp.recoveryCode1 = source.scratchCodes[0]
                    totp.recoveryCode2 = source.scratchCodes[1]
                    totp.recoveryCode3 = source.scratchCodes[2]
                    totp.recoveryCode4 = source.scratchCodes[3]
                    totp.recoveryCode5 = source.scratchCodes[4]
                    totp.enabled = enabledWithoutVerified
                }
            }
        }

        // Remove orphans
        oauthTotpRepository.deleteAll(oldTotpMap.values)

        // Save secrets
        return oauthTotpRepository.saveAll(newTotpList)
    }

    /**
     * Remove (disable) 2FA for all clients belonging to the [oauthGroup].
     */
    @Transactional
    fun removeTotpSecretByOauthGroup(oauthGroup: String) {
        oauthTotpRepository.findByOauthGroup(oauthGroup).forEach {
            // Remove known access devices
            removeTotpAccess(it.oauthId)

            // Remove TOTP secret
            oauthTotpRepository.deleteById(it.oauthId)
        }
    }

    /**
     * Remove all oauth TOTP access by [oauthId].
     */
    fun removeTotpAccess(oauthId: String) = oauthTotpAccessRepository.deleteByOauthId(oauthId)

    /**
     * Remove all oauth TOTP access by [oauthGroup].
     */
    fun removeTotpAccessByGroup(oauthGroup: String) =
        oauthTotpRepository.findByOauthGroup(oauthGroup).forEach {
            oauthTotpAccessRepository.deleteByOauthId(it.oauthId)
        }
}
