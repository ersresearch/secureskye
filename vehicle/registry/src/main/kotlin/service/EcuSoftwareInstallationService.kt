/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.registry.api.proto.InstallationStatusProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareInstallationResponseProto
import jp.co.trillium.secureskye.vehicle.registry.exception.EcuSoftwareInstallationException
import jp.co.trillium.secureskye.vehicle.registry.feign.VehicleAdminClient
import jp.co.trillium.secureskye.vehicle.registry.mapper.RegistryMapper
import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftwareInstallation
import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftwareInstallationStatus
import jp.co.trillium.secureskye.vehicle.registry.repository.EcuInfoRepository
import jp.co.trillium.secureskye.vehicle.registry.repository.EcuSoftwareInstallationRepository
import mu.KLogging
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.Optional
import java.util.UUID

/**
 * ECU software version service for Software Version Management Function.
 */
@Service
class EcuSoftwareInstallationService(
    private val ecuSoftwareInstallationRepository: EcuSoftwareInstallationRepository,
    private val ecuSoftwareVersionService: EcuSoftwareVersionService,
    private val ecuInfoRepository: EcuInfoRepository,
    private val uuidMapper: UuidMapper,
    private val vehicleAdminClient: VehicleAdminClient,
    private val registryMapper: RegistryMapper
//    private val webSocketService: WebSocketService
) {

    /**
     * Install software [softwareId] with version [versionName] to ECU [ecuId].
     * Change status to [EcuSoftwareInstallationStatus.INSTALLING].
     * @param clientId client ID of vehicle
     * @param force force installing software
     * @param message custom status message for the installation
     */
    @Transactional
    fun installVersion(
        clientId: String,
        ecuId: UUID,
        softwareId: UUID,
        versionName: String,
        force: Boolean,
        message: String
    ): EcuSoftwareInstallation {
        validateVehicleEcu(ecuId, clientId)
        val ecu = ecuInfoRepository.getOne(ecuId)
        logger.trace { "ecu $ecuId install version $versionName" }
        val currentInstallation =
            ecuSoftwareInstallationRepository.findByEcuIdAndSoftwareIdAndActiveIsTrue(ecuId, softwareId)
        val targetVersion =
            ecuSoftwareVersionService.getSoftwareVersion(softwareId, versionName, ecu.interfaceInfo.ecuDeviceId)
                ?: throw IllegalArgumentException(
                    "There is no version $versionName of software $softwareId available for ECU $ecuId"
                )
        val newVerInstallation = EcuSoftwareInstallation(
            ecu = ecu,
            softwareId = softwareId,
            softwareVersion = targetVersion,
            status = EcuSoftwareInstallationStatus.INSTALLING,
            message = message,
            lastModified = Timestamps.nowTime(),
            active = true
        )

        if (currentInstallation != null) {
            if (currentInstallation.status != EcuSoftwareInstallationStatus.SUCCESS && !force) {
                throw EcuSoftwareInstallationException(
                    ecuId,
                    targetVersion.software.name,
                    currentInstallation.softwareVersion.versionName,
                    targetVersion.versionName,
                    "ECU is not ready for new install. Status = ${currentInstallation.status}"
                )
            }

            // upgrade
            currentInstallation.apply {
                this.active = false
            }.let(ecuSoftwareInstallationRepository::save)
            return newVerInstallation.apply {
                this.previousInstallationId = currentInstallation.id
            }.let(ecuSoftwareInstallationRepository::save)
        } else {
            return newVerInstallation.let(ecuSoftwareInstallationRepository::save)
        }
    }

    /**
     * Uninstall software [installationId] from ECU.
     */
    fun uninstall(
        clientId: String,
        installationId: UUID,
        force: Boolean
    ): EcuSoftwareInstallation {
        val currentInstallation = ecuSoftwareInstallationRepository.getOne(installationId)

        validateVehicleEcu(currentInstallation.ecu.id, clientId)

        if (currentInstallation.status != EcuSoftwareInstallationStatus.SUCCESS && !force) {
            throw EcuSoftwareInstallationException(
                currentInstallation.ecu.id,
                currentInstallation.softwareId.toString(),
                currentInstallation.softwareVersion.versionName,
                null,
                "ECU is not ready for uninstall. Status = ${currentInstallation.status}"
            )
        }
        currentInstallation.status = EcuSoftwareInstallationStatus.UNINSTALLING

        return ecuSoftwareInstallationRepository.save(currentInstallation)
    }

    /**
     * Update status for software installation of
     * ECU [ecuId] with the version [versionName] of software [softwareId].
     */
    @Transactional
    fun installationStatus(
        clientId: String,
        ecuId: UUID,
        softwareId: UUID,
        versionName: String,
        installation: SoftwareInstallationResponseProto
    ): EcuSoftwareInstallation {

        validateVehicleEcu(ecuId, clientId)

        val ecu = ecuInfoRepository.getOne(ecuId)

        val currentInstallation =
            ecuSoftwareInstallationRepository.findByEcuIdAndSoftwareIdAndActiveIsTrue(ecuId, softwareId)
                ?: throw EcuSoftwareInstallationException(
                    ecuId,
                    softwareId.toString(),
                    versionName,
                    null,
                    "There is no installation record for software $softwareId in ECU $ecuId"
                )

        val previousInstallation = currentInstallation.previousInstallationId.let {
            if (it != null) ecuSoftwareInstallationRepository.findById(it)
            else Optional.empty()
        }

        if (installation.status == InstallationStatusProto.ERROR) {
            // revert to last version.
            currentInstallation.apply {
                this.active = false
                this.status = EcuSoftwareInstallationStatus.ERROR
            }.let(ecuSoftwareInstallationRepository::save)
            if (previousInstallation.isPresent)
                previousInstallation.get().apply { this.active = true }.let(ecuSoftwareInstallationRepository::save)
        } else if (installation.status == InstallationStatusProto.SUCCESS) {
            // Update ecuDeviceId 64-byte
            ecu.apply {
                this.interfaceInfo.ecuDeviceId = installation.ecuDeviceId
            }.let(ecuInfoRepository::save)
            currentInstallation.apply {
                this.status = registryMapper.ecuSoftwareInstallationStatus(installation.status)
                this.active = true
            }.let(ecuSoftwareInstallationRepository::save)
        }
        return EcuSoftwareInstallation()
    }

    /**
     * Notify ECU software [installationId] uninstall completed. Remove installation entity.
     */
    fun uninstallCompleted(
        clientId: String,
        installationId: UUID
    ) {
        val currentInstallation = ecuSoftwareInstallationRepository.getOne(installationId)

        validateVehicleEcu(currentInstallation.ecu.id, clientId)

        if (currentInstallation.status != EcuSoftwareInstallationStatus.UNINSTALLING) {
            throw EcuSoftwareInstallationException(
                currentInstallation.ecu.id,
                currentInstallation.softwareId.toString(),
                currentInstallation.softwareVersion.versionName,
                null,
                "ECU is not ready for remove. Status = ${currentInstallation.status}"
            )
        }

        ecuSoftwareInstallationRepository.delete(currentInstallation)
    }

    /**
     * Stream newest ECU software version status to web application.
     */
//    @Async
//    fun streamNewestSoftwareInstallation(softwareInstallation: EcuSoftwareInstallation) {
//        val sth: SoftwareInstallationProto = registryMapper.softwareInstallation(softwareInstallation)
//        val response = WebSocketMessage(
//            Timestamps.now(),
//            "NewestEcuSoftwareVersion",
//            JsonFormat.printer().print(sth),
//            WebSocketMessageLevel.INFO
//        )
//        val title: String = String.format("newest-installation-status-ecu-%s", softwareInstallation.ecu.id.toString())
//        webSocketService.sendMessage(EcuSoftwareInstallationService.SOFTWARE_VERSION_CHANNEL, title, response)
//    }

    /**
     * Validate vehicle ECU [ecuId] of vehicle with [vehicleClientId].
     */
    fun validateVehicleEcu(ecuId: UUID, vehicleClientId: String) {
        val vehicleId = loadVehicleId(vehicleClientId)
        val ecu = ecuInfoRepository.getOne(ecuId)
        if (ecu.interfaceInfo.vehicleId != vehicleId)
            throw EcuSoftwareInstallationException(ecuId, null, null, null, "ECU does not belong to this vehicle.")
    }

    /**
     * Load the vehicle ID for the given [clientId] to associate events to it.
     */
    @Cacheable("client-id-to-vehicle-id")
    fun loadVehicleId(clientId: String) =
        uuidMapper.uuidString(vehicleAdminClient.getVehicle(clientId, true).id)

    private companion object : KLogging() {

        /**
         *  Software version channel constant.
         */
        private const val SOFTWARE_VERSION_CHANNEL = "software-version-channel"
    }
}
