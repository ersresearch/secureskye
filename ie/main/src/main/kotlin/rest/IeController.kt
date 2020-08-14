/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.rest

import jp.co.trillium.secureskye.ie.main.model.export.Filter
import jp.co.trillium.secureskye.ie.main.service.ExportType
import jp.co.trillium.secureskye.ie.main.service.IeService
import jp.co.trillium.secureskye.ie.main.service.IeService.Companion.EXPORT_FILE_NAME
import org.bson.types.ObjectId
import org.springframework.http.ContentDisposition
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.util.UUID
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Endpoints for import/export.
 *
 * @property ieService Service containing the business logic for Ie.
 */
@RestController
class IeController(private val ieService: IeService) {

    /**
     * Endpoint for exporting data to mongoFS and sending notification.
     *
     */
    @GetMapping("/exports")
    @PreAuthorize("hasAuthority('ie:read')")
    fun streamExport(request: HttpServletRequest) {
        ieService.export(ExportType.NotifyExport(request))
    }

    /**
     * Endpoint for exporting data directly to local machine.
     *
     */
    @GetMapping("/exports/direct", produces = [MediaType.APPLICATION_OCTET_STREAM_VALUE])
    @PreAuthorize("hasAuthority('ie:read')")
    @Suppress("LongParameterList")
    fun streamExport(
        @RequestParam(defaultValue = "json") format: String,
        response: HttpServletResponse,
        @RequestParam(defaultValue = 0L.toString()) begin: Long,
        @RequestParam(defaultValue = Long.MAX_VALUE.toString()) end: Long,
        @RequestParam(defaultValue = "") vehicleIds: List<UUID>,
        @RequestParam(defaultValue = "") fieldName: String
    ) {
        response.setHeader(
            HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.builder("attachment")
                .filename(EXPORT_FILE_NAME)
                .build()
                .toString()
        )
        ieService.export(
            ExportType.DirectExport(response.outputStream),
            Filter(begin, end, vehicleIds, fieldName),
            format
        )
    }

    /**
     * Endpoint for downloading the exporting file.
     *
     */
    @GetMapping("/exports/{id}", produces = [MediaType.APPLICATION_OCTET_STREAM_VALUE])
    fun streamDownload(@PathVariable id: ObjectId, response: HttpServletResponse) {
        response.setHeader(
            HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.builder("attachment")
                .filename(EXPORT_FILE_NAME)
                .build()
                .toString()
        )
        ieService.download(id, response.outputStream)
    }

    /**
     * Endpoint for import data from local machine.
     *
     */
    @PostMapping("/imports")
    @PreAuthorize("hasAuthority('ie:create')")
    fun streamImport(@RequestParam file: MultipartFile, @RequestParam format: String) =
        ieService.import(file, format)
}
