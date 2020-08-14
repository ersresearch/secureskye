/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.model

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.beans.factory.annotation.Required
import java.time.LocalDate
import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToMany
import javax.persistence.OneToMany
import javax.persistence.Table
import javax.persistence.Version
import javax.validation.constraints.Email

/**
 * Credential information of user.
 *
 * @property id user id.
 * @property version credential version.
 * @property name user name.
 * @property password user password.
 * @property enabled Credentials have been disabled or not.
 * @property avatar link image.
 * @property avatarFormat PNG, JPG...
 * @property firstName first name.
 * @property lastName last name.
 * @property email email.
 * @property phoneAreaCode area code of phone number.
 * @property phoneNumber phone number of user.
 * @property gender gender of user.
 * @property birthday birthday of user.
 * @property nationality nationality of user.
 * @property address address of user.
 * @property roles list role.
 * @property additionalInfo list additional info.
 * @property attachments file attachment.
 */
@Entity
@Table(name = "credentials")
data class Credentials(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Version
    var version: Int = 0,

    @get:Required
    @Column(nullable = false, unique = true)
    var name: String = "",

    @get:Required
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var password: String = "",

    var enabled: Boolean = false,

    var avatar: String? = null,

    @Column(nullable = false)
    var avatarFormat: String = "",

    @get:Required
    @Column(nullable = false)
    var firstName: String = "",

    @get:Required
    @Column(nullable = false)
    var lastName: String = "",

    @get:Email
    @get:Required
    @Column(nullable = false)
    var email: String = "",

    @Column(nullable = false)
    var phoneAreaCode: String = "",

    @Column(nullable = false)
    var phoneNumber: String = "",

    var gender: Boolean = false,

    var birthday: LocalDate = LocalDate.of(1990, 1, 1),

    @Column(nullable = false)
    var nationality: String = "",

    @Column(nullable = false)
    var address: String = "",

    @ManyToMany(fetch = FetchType.EAGER, cascade = [CascadeType.REMOVE])
    var roles: Set<Role> = mutableSetOf(),

    @OneToMany(mappedBy = "credentials")
    var additionalInfo: List<AdditionalInfo> = mutableListOf(),

    @OneToMany(mappedBy = "credentials")
    var attachments: List<Attachment> = mutableListOf()
)
