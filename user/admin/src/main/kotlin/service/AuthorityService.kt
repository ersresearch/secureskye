/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.service

import jp.co.trillium.secureskye.user.admin.mapper.CredentialMapper
import jp.co.trillium.secureskye.user.admin.repository.AuthorityRepository
import org.springframework.stereotype.Service

/**
 * Business logic for administering authority.
 */
@Service
class AuthorityService(
    private val credentialMapper: CredentialMapper,
    private val authorityRepository: AuthorityRepository
) {

    /**
     * List all known authority.
     *
     * @return All authority.
     *
     */
    fun listAuthorities() = credentialMapper.authorityList(authorityRepository.findAll())
}
