/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.model

import java.io.Serializable
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne

/**
 * Role of user.
 * @property id additional info id.
 * @property credentials additional info user id.
 * @property fileId key.
 * @property fileName key.
 * @property urlImage image url.
 */
@Entity
data class Attachment(

    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @ManyToOne(fetch = FetchType.LAZY)
    var credentials: Credentials = Credentials(),

    @Column(nullable = false)
    var fileId: String = "",

    @Column(nullable = false)
    var fileName: String = ""

) : Serializable {
    val urlImage: String
        get() = "/api/users/${credentials.id}/attachments/$id"
}
