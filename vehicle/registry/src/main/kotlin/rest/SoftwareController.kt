/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.rest

import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareListProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareProto
import jp.co.trillium.secureskye.vehicle.registry.mapper.RegistryMapper
import jp.co.trillium.secureskye.vehicle.registry.service.EcuSoftwareService
import org.bson.types.ObjectId
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Controller for managing software.
 */
@RestController
@RequestMapping("/api/software")
class SoftwareController(
    private val ecuSoftwareService: EcuSoftwareService,
    private val registryMapper: RegistryMapper
) {

    /**
     * Create new [software] for ECU.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('software:create')")
    fun save(@RequestBody software: SoftwareProto) =
        ecuSoftwareService.createSoftware(software).let(registryMapper::software)

    /**
     * List all available software.
     */
    @GetMapping()
    @PreAuthorize("hasAuthority('software:read')")
    fun list(): SoftwareListProto = ecuSoftwareService.getAllSoftware()
        .map {
            SoftwareProto.newBuilder()
                .setId(it.id.toString())
                .setName(it.name)
                .setDescription(it.description)
                .setLatest(
                    it.versions.maxBy { v -> v.versionCode }?.let(registryMapper::softwareVersion)
                )
                .build()
        }
        .let {
            SoftwareListProto.newBuilder()
                .addAllData(it)
                .build()
        }

    /**
     * Get specific software [softwareId] and all its versions.
     */
    @GetMapping("{softwareId}")
    @PreAuthorize("hasAuthority('software:read')")
    fun get(@PathVariable softwareId: UUID): SoftwareProto =
        ecuSoftwareService.getSoftware(softwareId)
            .let {
                registryMapper.softwareBuilder(it)
                    // TODO fix this
                    .setLatest(it.versions.maxBy { v -> v.versionCode }?.let(registryMapper::softwareVersion))
                    .addAllVersions(it.versions.map(registryMapper::softwareVersion))
                    .build()
            }

    /**
     * Update software info [software] of [softwareId].
     */
    @PutMapping("{softwareId}")
    @PreAuthorize("hasAuthority('software:update')")
    fun update(@PathVariable softwareId: UUID, @RequestBody software: SoftwareProto) =
        ecuSoftwareService.updateSoftware(softwareId, software).let(registryMapper::software)

    /**
     * Delete software info.
     */
    @DeleteMapping("{softwareId}")
    @PreAuthorize("hasAuthority('software:delete')")
    fun delete(@PathVariable softwareId: UUID) = ecuSoftwareService.deleteSoftware(softwareId)

    /**
     * Publish Ecu Software.
     */
    @PutMapping("{otaId}/vehicles/{vehicleId}/publish")
    @PreAuthorize("hasAuthority('software:update')")
    fun publishByVin(@PathVariable otaId: ObjectId, @PathVariable vehicleId: UUID) =
        ecuSoftwareService.publishByVin(otaId, vehicleId)
}
