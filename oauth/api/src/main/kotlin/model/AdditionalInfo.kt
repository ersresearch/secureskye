/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.model

import java.util.UUID
import javax.persistence.CascadeType
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
 * @property key key.
 * @property value authority info.
 */
@Entity
data class AdditionalInfo(

    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.REMOVE])
    var credentials: Credentials = Credentials(),

    @Column(nullable = false)
    var key: String = "",

    @Column(nullable = false)
    var value: String = ""
)
