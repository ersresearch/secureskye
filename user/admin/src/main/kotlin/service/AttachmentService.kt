/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.service

import com.mongodb.MongoGridFSException
import com.mongodb.client.gridfs.GridFSBucket
import jp.co.trillium.secureskye.common.mapper.ObjectIdMapper
import jp.co.trillium.secureskye.oauth.model.Attachment
import jp.co.trillium.secureskye.oauth.model.Credentials
import jp.co.trillium.secureskye.oauth.repository.CredentialsRepository
import jp.co.trillium.secureskye.user.admin.exception.AttachmentNotFoundException
import jp.co.trillium.secureskye.user.admin.exception.UserNotFoundException
import jp.co.trillium.secureskye.user.admin.repository.AttachmentRepository
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.data.mongodb.gridfs.GridFsOperations
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.OutputStream
import java.util.UUID

/**
 * Business logic for Attachment .
 */
@Service
class AttachmentService(
    private val attachmentRepository: AttachmentRepository,
    private val credentialsRepository: CredentialsRepository,
    private val gridFsOperations: GridFsOperations,
    private val objectIdMapper: ObjectIdMapper,
    private val gridFsBucket: GridFSBucket
) {

    /**
     * Create Attachment by credential.
     */
    fun createAttachment(credential: Credentials, listFile: List<MultipartFile>): List<String> {

        return listFile.map { file ->
            Attachment(
                credentials = credential,
                fileName = file.originalFilename ?: "file-${credential.name}"
            ).also { attachment ->
                file.inputStream.use {
                    attachment.fileId = gridFsOperations.store(
                        it,
                        "attachment-user-${attachment.credentials.id}-${file.originalFilename}"
                    )
                        .let(objectIdMapper::objectId)
                }
            }.let { attachmentRepository.save(it) }.urlImage.orEmpty()
        }
    }

    /**
     * Update Attachment by credential.
     */
    fun updateAttachment(credentialId: UUID, listFile: List<MultipartFile>?): List<String> {
        val credential = credentialsRepository.getOne(credentialId)
        // Step 1: clear all current attachment
        credential.attachments.forEach {
            gridFsOperations.delete(Query.query(Criteria.where("_id").isEqualTo(it.fileId)))
//            attachmentRepository.deleteById(it.id)
        }
        deleteAttachmentByCredentialId(credentialId)

        // Step 2: add all attachment as new
        return if (listFile != null && listFile.isNotEmpty()) {
            createAttachment(credential, listFile)
        } else {
            emptyList()
        }
    }

    /**
     * Delete Attachment by [attachmentId].
     */
    fun deleteAttachment(credentialId: UUID, attachmentId: UUID) =
        credentialsRepository.findById(credentialId).orElseThrow { throw UserNotFoundException("User not found") }
            .let { attachmentRepository.deleteById(attachmentId) }

    /**
     * Delete Attachment by [credentialId].
     */
    fun deleteAttachmentByCredentialId(credentialId: UUID) =
        credentialsRepository.findById(credentialId).orElseThrow { throw UserNotFoundException("User not found") }.let {
            attachmentRepository.findByCredentialsId(credentialId).forEach {
                deleteAttachment(credentialId, it.id)
            }
        }

    /**
     * Get Attachment by [credentialId].
     */
    fun getAttachment(credentialId: UUID, attachmentId: UUID, outputStream: OutputStream) {
        credentialsRepository.findById(credentialId).orElseThrow { throw UserNotFoundException("User not found") }

        attachmentRepository.getOne(attachmentId).fileId.let(objectIdMapper::objectId).let {
            try {
                gridFsBucket.openDownloadStream(it).use { input ->
                    outputStream.use { output ->
                        input.copyTo(output)
                    }
                }
            } catch (e: MongoGridFSException) {
                throw AttachmentNotFoundException(e.message, e)
            }
        }
    }
}
