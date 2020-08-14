/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.rest

import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareInstallationResponseProto
import jp.co.trillium.secureskye.vehicle.registry.exception.EcuSoftwareInstallationException
import jp.co.trillium.secureskye.vehicle.registry.mapper.RegistryMapper
import jp.co.trillium.secureskye.vehicle.registry.service.EcuInfoService
import jp.co.trillium.secureskye.vehicle.registry.service.EcuSoftwareInstallationService
import jp.co.trillium.secureskye.vehicle.registry.service.EcuSoftwareVersionService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import java.util.UUID

/**
 * ECU software version controller.
 */
@RestController
@RequestMapping("/api/vehicles/ecus/{ecuId}/software")
class EcuSoftwareInstallationController(
    private val ecuSoftwareInstallationService: EcuSoftwareInstallationService,
    private val ecuSoftwareVersionService: EcuSoftwareVersionService,
    private val ecuInfoService: EcuInfoService,
    private val registryMapper: RegistryMapper
) {

    /**
     * Install version [version] of software [softwareId] to ECU [ecuId].
     * @param force force installing software
     * @param message custom status message for the installation
     * @throws EcuSoftwareInstallationException
     */
    @PutMapping("{softwareId}/versions/{versionName}/install")
    @PreAuthorize("hasAuthority('software-install:create')")
    fun installSoftware(
        principal: Principal,
        @PathVariable ecuId: UUID,
        @PathVariable softwareId: UUID,
        @PathVariable versionName: String,
        @RequestParam(defaultValue = "false") force: Boolean = false,
        @RequestParam(defaultValue = "") message: String = ""
    ) {
        val ecuDeviceId =
            ecuInfoService.getEcuDeviceId(ecuId) ?: throw IllegalArgumentException("ECU Id does not exist")

        val targetVersionName = if (versionName == "latest") {
            val latestVersion = ecuSoftwareVersionService.getLatestVersion(softwareId, ecuDeviceId)
                ?: throw IllegalArgumentException(
                    "There is no version of software $softwareId for ECU $ecuId [$ecuDeviceId]"
                )
            latestVersion.versionName
        } else {
            versionName
        }

        return ecuSoftwareInstallationService.installVersion(
            principal.name, ecuId, softwareId, targetVersionName, force, message
        ).let { registryMapper.softwareInstallation(it) }
    }

    /**
     * Update software [installation] status of [softwareId].
     */
    @PutMapping("{softwareId}/versions/{versionName}/status")
    @PreAuthorize("hasAuthority('software-install:update')")
    fun installationStatus(
        principal: Principal,
        @PathVariable ecuId: UUID,
        @PathVariable softwareId: UUID,
        @PathVariable versionName: String,
        @RequestBody installation: SoftwareInstallationResponseProto
    ) {
        val ecuDeviceId = ecuInfoService.getEcuDeviceId(ecuId)
            ?: throw IllegalArgumentException("ECU Id does not exist")

        val targetVersionName = if (versionName == "latest") {
            val latestVersion = ecuSoftwareVersionService.getLatestVersion(softwareId, ecuDeviceId)
                ?: throw IllegalArgumentException(
                    "There is no version of software $softwareId for ECU $ecuId [$ecuDeviceId]"
                )
            latestVersion.versionName
        } else {
            versionName
        }

        return ecuSoftwareInstallationService.installationStatus(
            principal.name, ecuId, softwareId, targetVersionName, installation
        ).let { registryMapper.softwareInstallation(it) }
    }

    /**
     * Uninstall software installation [installationId].
     * @param force force installing software
     * @throws EcuSoftwareInstallationException
     */
    @PatchMapping("uninstall/{installationId}")
    @PreAuthorize("hasAuthority('software-install:delete')")
    fun uninstall(
        principal: Principal,
        @PathVariable installationId: UUID,
        @RequestParam(defaultValue = "false") force: Boolean = false
    ) =
        ecuSoftwareInstallationService.uninstall(principal.name, installationId, force)
            .let { registryMapper.softwareInstallation(it) }

    /**
     * Notify ECU software [installationId] uninstall completed.
     */
    @DeleteMapping("uninstall/{installationId}")
    @PreAuthorize("hasAuthority('software-install:delete')")
    fun uninstallCompleted(principal: Principal, @PathVariable installationId: UUID) =
        ecuSoftwareInstallationService.uninstallCompleted(principal.name, installationId)
}
