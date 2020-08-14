/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.rest

import jp.co.trillium.secureskye.user.admin.service.AttachmentService
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.util.UUID
import javax.servlet.http.HttpServletResponse

/**
 * Controller for additional info management.
 */
@RestController
@Validated
@RequestMapping("/api/users")
class AttachmentController(
    private val attachmentService: AttachmentService
) {
    /**
     * Get an Attachment by Credential_Id.
     */
    @GetMapping("{id}/attachments/{attachment_id}")
    fun getAttachment(
        @PathVariable id: UUID,
        @PathVariable(value = "attachment_id") attachmentId: UUID,
        response: HttpServletResponse
    ) = attachmentService.getAttachment(id, attachmentId, response.outputStream)

    /**
     * Update an Attachment by Credential_Id.
     */
    @PutMapping("{id}/attachments")
    fun updateAttachment(@PathVariable id: UUID, files: List<MultipartFile>?) =
        attachmentService.updateAttachment(id, files)
}
