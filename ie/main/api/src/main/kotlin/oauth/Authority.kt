/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.model.oauth

import java.util.UUID
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

/**
 * Represent granted authority.
 *
 * @property id id.
 * @property authority authority string.
 */
@Entity(name = "AuthorityIe")
@Table(name = "authority")
data class Authority(
    @Id
    var id: UUID = UUID(0, 0),

    var authority: String = ""
)
