/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.exception

/**
 * Make changes to 2fa failed.
 */
class TwoFactorAuthenticationSettingsException(
    val oauthId: String = "",
    message: String = ""
) : RuntimeException(message)
