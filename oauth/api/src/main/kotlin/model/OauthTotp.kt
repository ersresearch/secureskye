/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.model

import javax.persistence.Entity
import javax.persistence.Id

/**
 * `oauth_totp` table entity.
 *
 * @property oauthId OAuth ID which the secret belongs to
 * (credential name in `password` grant, client id in `client_credentials` grant)
 * @property oauthGroup Present a group with multiple oauth ID (TOTP secret) belongs to
 * @property secret secret key
 * @property recoveryCode1 recovery code 1
 * @property recoveryCode2 recovery code 2
 * @property recoveryCode3 recovery code 3
 * @property recoveryCode4 recovery code 4
 * @property recoveryCode5 recovery code 5
 * @property enabled if this TOTP is enabled and confirmed for 2FA yet
 */
@Entity
data class OauthTotp(
    @Id
    var oauthId: String = "",
    var oauthGroup: String? = null,
    var secret: String = "",
    var recoveryCode1: Int = 0,
    var recoveryCode2: Int = 0,
    var recoveryCode3: Int = 0,
    var recoveryCode4: Int = 0,
    var recoveryCode5: Int = 0,
    var enabled: Boolean = false
)
