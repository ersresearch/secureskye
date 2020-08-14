/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa.otp.totp

import com.warrenstrange.googleauth.HmacHashFunction
import com.warrenstrange.googleauth.KeyRepresentation

/**
 * Configuration for TOTP.
 * @property timeStepSizeInSeconds
 * @property windowSize
 * @property codeDigits
 * @property keyRepresentation
 * @property hmacHashFunction
 * @property issuer TOTP issuer name
 */
class TotpConfigurationProperties(
    // Google Authenticator config
    var timeStepSizeInSeconds: Long? = null,
    var windowSize: Int? = null,
    var codeDigits: Int? = null,
    var keyRepresentation: KeyRepresentation? = null,
    var hmacHashFunction: HmacHashFunction? = null,

    // TOTP config
    var issuer: String = ""
)
