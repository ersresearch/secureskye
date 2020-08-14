/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.rest

import jp.co.trillium.secureskye.ota.vehicle.mapper.MetadataMapper
import jp.co.trillium.secureskye.ota.vehicle.service.ImageArchiveService
import org.bson.types.ObjectId
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

/**
 *  Endpoints for retrieving metadata about available updates.
 */
@RestController
@RequestMapping("/api/ota/metadata")
class OtaMetadataController(
    private val imageArchiveService: ImageArchiveService,
    private val metadataMapper: MetadataMapper
) {

    /**
     * List all available metadata with optional filters for vehicle [family] and [fromVersion]. The [fromVersion] is a
     * minimum version number, to filter out older updates.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('ota-images:read') or #oauth2.clientHasRole('ota-images:read')")
    fun metadataList(
        @RequestParam(required = false) family: String?
    ) = imageArchiveService.listMetadata(family.orEmpty())
        .let(metadataMapper::metadataList)

    /**
     * Get metadata about a single image archive identified by [metadataId].
     */
    @GetMapping("/{metadataId}")
    @PreAuthorize("hasAuthority('ota-images:read') or #oauth2.clientHasRole('ota-images:read')")
    fun metadata(@PathVariable metadataId: ObjectId, client: Principal) =
        imageArchiveService.loadMetadata(metadataId, client)
}
