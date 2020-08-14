/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.rest

import jp.co.trillium.secureskye.ota.vehicle.api.proto.MetadataProto
import jp.co.trillium.secureskye.ota.vehicle.mapper.MetadataMapper
import jp.co.trillium.secureskye.ota.vehicle.model.PackageStatus
import jp.co.trillium.secureskye.ota.vehicle.service.ImageArchiveService
import org.bson.types.ObjectId
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.security.Principal

/**
 * Endpoints for managing image archives.
 */
@RestController
@RequestMapping("/api/ota")
class OtaController(
    private val imageArchiveService: ImageArchiveService,
    private val metadataMapper: MetadataMapper
) {

    /**
     * Upload an image archive [file] for later publishing.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('ota-images:create')")
    fun uploadPackage(@RequestParam file: MultipartFile, @RequestParam(required = true) name: String) =
        imageArchiveService.upload(file, name).let(metadataMapper::metadata)

    /**
     * List all OTA Packages (not deleted) with optional filters for vehicle [family].
     */
    @GetMapping
    @PreAuthorize("hasAuthority('ota-images:read') or #oauth2.clientHasRole('ota-images:read')")
    fun listPackage(
        @RequestParam(required = false) family: String?,
        @RequestParam(defaultValue = "false") release: Boolean
    ) =
        if (release) imageArchiveService.listMetadata(family.orEmpty(), true).let(metadataMapper::metadataList)
        else imageArchiveService.listMetadata(family.orEmpty()).let(metadataMapper::metadataList)

    /**
     * Delete multiple image archive.
     */
    @PatchMapping()
    @PreAuthorize("hasAuthority('ota-images:delete')")
    fun deleteMultipleImage(@RequestBody listId: List<ObjectId>) = imageArchiveService.deleteMultipleImage(listId)

    /**
     * Get metadata about a single OTA Package identified by [packageId].
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ota-images:read') or #oauth2.clientHasRole('ota-images:read')")
    fun getPackage(@PathVariable id: ObjectId, client: Principal) =
        imageArchiveService.loadMetadata(id, client)

    /**
     * Rename the OTA Package for the given [id].
     */
    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('ota-images:update')")
    fun renamePackage(@PathVariable id: ObjectId, @RequestBody body: Map<String, String>): MetadataProto {
        val name: String = body["name"] ?: throw IllegalArgumentException("Package name is empty")
        return imageArchiveService.rename(id, name).let(metadataMapper::metadata)
    }

    /**
     * Publish the OTA Package for the given [id]
     * and make it be available for upgrade.
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAuthority('ota-images:update')")
    fun publishPackage(@PathVariable id: ObjectId, @RequestBody body: Map<String, Int>): MetadataProto {
        val status = body["status"] ?: -1

        if (status != PackageStatus.Released.value) {
            throw IllegalArgumentException("Unknown status: $status")
        }
        return imageArchiveService.publishPackage(id).let(metadataMapper::metadata)
    }

    /**
     * Publish the image archive for the given [id].
     */
    @PutMapping("/{id}/publish")
    @PreAuthorize("hasAuthority('ota-images:update')")
    fun imageArchivePublish(@PathVariable id: ObjectId, @RequestParam vin: String?) {
        if (vin.isNullOrEmpty()) imageArchiveService.publish(id)
        else imageArchiveService.publishByVin(id, vin)
    }

    /**
     * Delete an image archive identified by [id].
     * TODO: Move to metadata?
     */
    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('ota-images:delete')")
    fun imageArchiveDelete(@PathVariable id: ObjectId) {
        imageArchiveService.delete(id)
    }

    /**
     * Get statistics about the stored image archives.
     */
    @GetMapping("/statistics")
    @PreAuthorize("hasAuthority('ota-images:read')")
    fun statistics() = imageArchiveService.statistics()
}
