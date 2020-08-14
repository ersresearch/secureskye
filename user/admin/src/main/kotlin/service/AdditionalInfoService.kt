/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.service

import jp.co.trillium.secureskye.oauth.model.AdditionalInfo
import jp.co.trillium.secureskye.oauth.model.Credentials
import jp.co.trillium.secureskye.oauth.repository.CredentialsRepository
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialProto
import jp.co.trillium.secureskye.user.admin.mapper.CredentialMapper
import jp.co.trillium.secureskye.user.admin.repository.AdditionalInfoRepository
import org.springframework.stereotype.Service
import java.util.UUID

/**
 * Business logic for AdditionalInfo .
 */
@Service
class AdditionalInfoService(
    private val additionalInfoRepository: AdditionalInfoRepository,
    private val credentialMapper: CredentialMapper,
    private val credentialsRepository: CredentialsRepository
) {

    /**
     * Create AdditionalInfo by [credential].
     */
    fun createInfo(credential: Credentials, info: List<AdditionalInfo>) =
        info.filter { it.key.isNotBlank() }.map {
            it.credentials = credential
            additionalInfoRepository.save(it)
        }

    /**
     * Delete AdditionalInfo by [additionalInfoId].
     */
    fun deleteInfo(id: UUID, additionalInfoId: UUID): CredentialProto {
        additionalInfoRepository.deleteById(additionalInfoId)
        return credentialsRepository.getOne(id)
            .let(credentialMapper::credential)
    }

    /**
     * Delete AdditionalInfo by CredentialId.
     */
    fun deleteInfoByCredentialId(id: UUID) = additionalInfoRepository.deleteByCredentialsId(id)

    /**
     * Update AdditionalInfo of an existing credential.
     */
    fun update(credential: Credentials, info: List<AdditionalInfo>): List<AdditionalInfo> {
        // Step 1: clear all current data
        credential.additionalInfo.forEach {
            additionalInfoRepository.deleteById(it.id)
        }

        // Step 2: add all data as new ones
        return createInfo(credential, info)
    }
}
