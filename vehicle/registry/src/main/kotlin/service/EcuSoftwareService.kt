/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.service

import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareProto
import jp.co.trillium.secureskye.vehicle.registry.exception.EcuSoftwareDeleteException
import jp.co.trillium.secureskye.vehicle.registry.feign.OtaVehicleClient
import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftware
import jp.co.trillium.secureskye.vehicle.registry.repository.EcuInfoRepository
import jp.co.trillium.secureskye.vehicle.registry.repository.EcuSoftwareInstallationRepository
import jp.co.trillium.secureskye.vehicle.registry.repository.EcuSoftwareRepository
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import java.util.UUID
import javax.persistence.EntityNotFoundException

/**
 * ECU software service.
 */
@Service
class EcuSoftwareService(
    private val ecuSoftwareRepository: EcuSoftwareRepository,
    private val ecuInfoRepository: EcuInfoRepository,
    private val otaVehicleClient: OtaVehicleClient,
    private val ecuSoftwareInstallationRepository: EcuSoftwareInstallationRepository
) {
    /**
     * Get all software available with its version.
     */
    fun getAllSoftware() = ecuSoftwareRepository.findAllEagerVersion()

    /**
     * Get software information [softwareId].
     */
    fun getSoftware(softwareId: UUID): EcuSoftware =
        ecuSoftwareRepository.getById(softwareId) ?: throw EntityNotFoundException()

    /**
     * Create new [software] for ECU.
     */
    fun createSoftware(software: SoftwareProto): EcuSoftware = EcuSoftware(
        name = software.name,
        description = software.description
    ).let(ecuSoftwareRepository::save)

    /**
     * Update [software] for ECU.
     */
    fun updateSoftware(softwareId: UUID, software: SoftwareProto): EcuSoftware =
        ecuSoftwareRepository.getOne(softwareId).apply {
            name = software.name
            description = software.description
        }.let(ecuSoftwareRepository::save)

    /**
     * Delete software [softwareId].
     */
    fun deleteSoftware(softwareId: UUID) {
        val installCount = ecuSoftwareInstallationRepository.countBySoftwareId(softwareId)

        if (installCount > 0) {
            throw EcuSoftwareDeleteException("Software is being installed on ECUs. Cannot be removed.")
        }

        // Remove all version
        ecuSoftwareRepository.getById(softwareId)?.let(ecuSoftwareRepository::delete)
    }

    /**
     * Publish ecu software by ota.
     */
    fun publishByVin(otaId: ObjectId, vehicleId: UUID) {
        ecuInfoRepository.findByVehicleIdAndGateway(vehicleId).also {
            if (!it.isPresent) {
                throw IllegalArgumentException("Gateway does not exist")
            }
        }.get().gatewayInterfaceInfo.let {
            if (it.vin.isBlank())
                throw IllegalArgumentException("Vin is null")
            otaVehicleClient.imageArchivePublish(otaId, it.vin)
        }
    }
}
