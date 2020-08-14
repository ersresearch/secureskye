/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.repository

import jp.co.trillium.secureskye.oauth.model.Attachment
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * Repository for managing [AdditionalInfo] entities.
 */
@Transactional
interface AttachmentRepository : JpaRepository<Attachment, UUID> {

    /**
     * Get [Attachment] by [CredentialId].
     */
    fun findByCredentialsId(credentialId: UUID): List<Attachment>
}
