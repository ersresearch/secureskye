/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.rest

import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareVersionListProto
import jp.co.trillium.secureskye.vehicle.registry.mapper.RegistryMapper
import jp.co.trillium.secureskye.vehicle.registry.service.EcuSoftwareVersionService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Controller for managing software.
 */
@RestController
@RequestMapping("/api/software/version")
class SoftwareVersionController(
    private val ecuSoftwareVersionService: EcuSoftwareVersionService,
    private val registryMapper: RegistryMapper
) {
    /**
     * Save new software version.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('software:create')")
    fun saveListVersion(@RequestBody softwareVersions: SoftwareVersionListProto) =
        ecuSoftwareVersionService.saveNewVersion(softwareVersions)
            .let(registryMapper::ecuSoftwareVersionList)
}
