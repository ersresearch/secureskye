/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.service

import jp.co.trillium.secureskye.common.util.Images
import jp.co.trillium.secureskye.oauth.model.Credentials
import jp.co.trillium.secureskye.oauth.repository.CredentialsRepository
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialListProto
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialProto
import jp.co.trillium.secureskye.user.admin.api.proto.UserStatisticsProto
import jp.co.trillium.secureskye.user.admin.feign.UaaClient
import jp.co.trillium.secureskye.user.admin.mapper.CredentialMapper
import jp.co.trillium.secureskye.user.admin.model.UpdateCredential
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID
import java.util.regex.Pattern
import javax.persistence.EntityNotFoundException

/**
 * Business logic for administering users.
 */
@Service
class CredentialService(
    private val credentialMapper: CredentialMapper,
    private val credentialRepository: CredentialsRepository,
    private val avatarService: AvatarService,
    private val uaaClient: UaaClient,
    private val additionalInfoService: AdditionalInfoService
) {
    private companion object {
        /**
         * Email Regex for user validate.
         */
        private const val EMAIL_REGEX =
            "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$"
        private const val DEFAULT_PASSWORD = "\$2a\$10\$GQtLPBdx/rvzN8Fs/mv/F.qfCeOIcSYmA8rQpzSHeLFT.2KvkiNba"
    }

    /**
     * Register a new [user] with listed roles, additional info, image.
     */
    @Transactional
    fun registerUser(user: UpdateCredential): CredentialProto {

        val credentials = Credentials()
        credentialMapper.update(user, credentials)
        return credentials.apply {
            enabled = true
            if (password.isEmpty()) password = DEFAULT_PASSWORD
        }.apply {
            checkDuplicateName(name)
            checkEmailFormat(email)
        }.let(credentialRepository::save)
            .let {
                it.additionalInfo = additionalInfoService.createInfo(it, user.additionalInfo)
                credentialMapper.credential(it)
            }
    }

    /**
     * Delete an existing user identifier by its [id].
     */
    @Transactional
    fun deleteUser(id: UUID) {
        credentialRepository.findById(id).orElseThrow { EntityNotFoundException("No user found for ID $id") }
            .also(avatarService::remove)
        credentialRepository.deleteById(id)
    }

    /**
     * Active or deactive an existing user, identified by [id].
     */
    fun activeUser(id: UUID, value: Boolean, name: String) {
        credentialRepository.findById(id).orElseThrow { EntityNotFoundException("No user found for ID $id") }
            .let {
                if (it.name != name) {
                    it.enabled = value
                    credentialRepository.save(it)
                } else {
                    throw IllegalArgumentException("Cannot deactive yourself")
                }
            }
    }

    /**
     * Find an user by [id].
     *
     * @throws EntityNotFoundException If a user with [id] doesn't exist.
     */
    fun findUserById(id: UUID): CredentialProto = credentialRepository.findById(id)
        .orElseThrow { EntityNotFoundException("No user found for ID $id") }
        .let { credentialMapper.credential(it, uaaClient.getTwoFactorAuthenticationStatus(it.name)) }

    /**
     * Find an user by [name].
     *
     * @throws EntityNotFoundException If a user with [name] doesn't exist.
     */
    fun findUserByName(name: String): CredentialProto = credentialRepository.findByName(name)
        .orElseThrow { EntityNotFoundException("No user found for Name $name") }
        .let { credentialMapper.credential(it, uaaClient.getTwoFactorAuthenticationStatus(it.name)) }

    /**
     * Find an user by [name].
     *
     * @throws EntityNotFoundException If a user with [name] doesn't exist.
     */
    fun searchUsersByName(name: String): CredentialListProto =
        credentialRepository.findByNameContaining(name)
            .let(credentialMapper::credentialGetListApi)

    /**
     * Find an user by [userName].
     *
     * @throws EntityNotFoundException If a user with [userName] doesn't exist.
     */
    fun findUsersByName(userName: String?): CredentialListProto =
        if (userName == null) {
            credentialRepository.findAll()
        } else {
            val user = credentialRepository.findByName(userName)
            if (user.isPresent) listOf(user.get()) else emptyList()
        }
            .let(credentialMapper::credentialGetListApi)

    /**
     * Update an user identified by [id] with the [updateInfo] and returns the updated version.
     *
     * @throws EntityNotFoundException If the user with [id] doesn't exist.
     */
    @Transactional
    fun putUser(id: UUID, updateInfo: UpdateCredential): CredentialProto {
        if (!updateInfo.avatarThirdParty) {
            Images.validate(updateInfo.avatar, updateInfo.avatarFormat)
        }
        return credentialRepository.findById(id)
            .orElseThrow { EntityNotFoundException("No user found for ID ${updateInfo.id}") }
            .also {
                checkEmailFormat(updateInfo.email)
                if (it.name != updateInfo.name) {
                    checkDuplicateName(updateInfo.name)
                }
                // Check if avatar is unchanged (null), then ignore mapping avatar.
                // If removing, pass avatar as '' instead of null.
                if (updateInfo.avatar == null) {
                    credentialMapper.updateIgnoreAvatar(updateInfo, it)
                } else {
                    // remove old avatar
                    avatarService.remove(it)
                    // update new info
                    credentialMapper.update(updateInfo, it)
                    // save new avatar
                    if (!updateInfo.avatarThirdParty) {
                        avatarService.save(it)
                    }
                }
            }.let(credentialRepository::save)
            .also { credential ->
                credential.additionalInfo = additionalInfoService.update(credential, updateInfo.additionalInfo)
            }
            .let { credentialMapper.credential(it, uaaClient.getTwoFactorAuthenticationStatus(it.name)) }
    }

    /**
     * Statistics for user.
     */
    fun statistics(): UserStatisticsProto = UserStatisticsProto.newBuilder()
        .setMemberCount(credentialRepository.count())
        .build()

    /**
     *  Check duplicate email for user.
     */
    private fun checkDuplicateName(name: String?) {
        if (name == null || name.isBlank()) throw IllegalArgumentException("Name is invalid")
        else credentialRepository.findByName(name)
            .ifPresent {
                throw IllegalArgumentException("Name is already exists")
            }
    }

    /**
     *  Check valid email for user.
     */
    private fun checkEmailFormat(email: String?) {
        if (email.isNullOrBlank()) throw IllegalArgumentException("Email is invalid")
        else {
            val pattern = Pattern.compile(EMAIL_REGEX, Pattern.CASE_INSENSITIVE)
            val matcher = pattern.matcher(email)
            if (!matcher.matches()) throw IllegalArgumentException("Email is invalid")
        }
    }
}
