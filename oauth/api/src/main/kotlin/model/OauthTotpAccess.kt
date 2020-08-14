/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.model

import java.io.Serializable
import java.time.LocalDateTime
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.IdClass

/**
 * `oauth_totp_access` table entity.
 *
 * @property oauthId OAuth ID.
 * @property accessId Access ID represent a client / device has been 2factor authenticated before.
 * @property expiresAt Access expiration.
 */
@Entity
@IdClass(OauthTotpAccess.PK::class)
data class OauthTotpAccess(
    @Id
    var oauthId: String = "",
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var accessId: UUID = UUID(0, 0),

    @Column(nullable = false)
    var expiresAt: LocalDateTime = LocalDateTime.now().plusWeeks(1)
) {
    /**
     * `oauth_totp_access` table's primary key.
     *
     * @property oauthId OAuth ID.
     * @property accessId Access ID represent a client / device has been 2factor authenticated before.
     */
    data class PK(
        var oauthId: String = "",
        var accessId: UUID = UUID(0, 0)
    ) : Serializable
}
