/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.model

import jp.co.trillium.secureskye.oauth.model.AdditionalInfo
import jp.co.trillium.secureskye.oauth.model.Role
import org.springframework.beans.factory.annotation.Required
import java.util.UUID
import javax.validation.constraints.Email

/**
 * Update credential information of user.
 *
 * @property id user id.
 * @property version credential version.
 * @property name user name.
 * @property password user password.
 * @property enabled Credentials have been disabled or not.
 * @property avatar link image.
 * @property avatarFormat PNG, JPG...
 * @property avatarThirdParty Third party avatar.
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
 */
data class UpdateCredential(
    var id: UUID? = null,

    var version: Int? = null,

    @get:Required
    var name: String? = null,

    @get:Required
    var password: String? = null,

    var enabled: Boolean? = null,

    var avatar: String? = null,

    var avatarFormat: String? = null,

    var avatarThirdParty: Boolean = false,

    @get:Required
    var firstName: String? = null,

    @get:Required
    var lastName: String? = null,

    @get:Email
    @get:Required
    var email: String? = null,

    var phoneAreaCode: String = "",

    var phoneNumber: String = "",

    var gender: Boolean = false,

    var birthday: Long = 0,

    var nationality: String = "",

    var address: String = "",

    var roles: List<Role>? = null,

    var additionalInfo: List<AdditionalInfo> = mutableListOf()

)
