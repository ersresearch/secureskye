/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.rest

import jp.co.trillium.secureskye.ota.vehicle.service.ImageArchiveService
import org.bson.types.ObjectId
import org.springframework.http.ContentDisposition
import org.springframework.http.HttpHeaders
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import javax.servlet.http.HttpServletResponse

/**
 * Endpoint for retrieving single images of an archive.
 */
@RestController
@RequestMapping("/api/ota/images")
class OtaImageController(private val imageArchiveService: ImageArchiveService) {

    /**
     * Download a single image by [imageId]. The [client] needs to have proper access rights and the image needs to
     * be targeted to that specific vehicle to be downloadable.
     */
    @GetMapping("/{imageId}")
    @PreAuthorize("hasAuthority('ota-images:read') or #oauth2.clientHasRole('ota-images:read')")
    fun imageArchiveDownload(@PathVariable imageId: ObjectId, response: HttpServletResponse, client: Principal) {
        imageArchiveService.checkApplicable(imageId, client)
        response.setHeader(
            HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.builder("attachment")
                .filename(imageId.toString())
                .build()
                .toString()
        )
        imageArchiveService.loadImage(imageId, response.outputStream)
    }
}
