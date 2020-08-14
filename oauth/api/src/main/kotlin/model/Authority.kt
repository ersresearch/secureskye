/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.model

import org.springframework.security.core.GrantedAuthority
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

/**
 * Represent granted authority.
 *
 * @property id id.
 * @property authority authority string.
 * @property description description.
 */
@Entity
data class Authority(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    private var authority: String = "",

    @Column(nullable = false)
    var description: String = ""
) : GrantedAuthority {

    /**
     * [GrantedAuthority.getAuthority].
     */
    override fun getAuthority() = authority

    /**
     * Setter for the [authority].
     */
    fun setAuthority(auth: String) {
        authority = auth
    }
}
