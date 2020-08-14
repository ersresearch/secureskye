/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.registry.api.proto.EcuInfoProto
import jp.co.trillium.secureskye.vehicle.registry.feign.VehicleAdminClient
import jp.co.trillium.secureskye.vehicle.registry.mapper.RegistryMapper
import jp.co.trillium.secureskye.vehicle.registry.model.EcuDisplayName
import jp.co.trillium.secureskye.vehicle.registry.model.EcuFilterType
import jp.co.trillium.secureskye.vehicle.registry.model.EcuInfo
import jp.co.trillium.secureskye.vehicle.registry.model.EcuStatus
import jp.co.trillium.secureskye.vehicle.registry.model.EcuType
import jp.co.trillium.secureskye.vehicle.registry.repository.EcuInfoRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import java.util.UUID
import java.util.concurrent.ThreadLocalRandom

/**
 * Business logic for managing ecu registration.
 */
@Service
class EcuInfoService(
    private val registryMapper: RegistryMapper,
    private val ecuInfoRepository: EcuInfoRepository,
    private val uuidMapper: UuidMapper,
    private val vehicleAdminClient: VehicleAdminClient
) {

    /**
     * Register new ECU information [ecuInfo] via client (vehicle) [clientId].
     */
    fun save(clientId: String, ecuInfo: EcuInfo): EcuInfo {
        // Try get vehicle ID from client
        val vehicleId = loadVehicleId(clientId)

        // Check existing gateway in vehicle
        if (ecuInfo.type == EcuType.GATEWAY) {
            if (ecuInfoRepository.findByVehicleIdAndGateway(vehicleId).isPresent) {
                throw IllegalArgumentException("The vehicle already have gateway")
            }
        }
        ecuInfo.interfaceInfo.vehicleId = vehicleId
        if (vehicleId != UUID(0, 0)) {
            // validate duplicated ecu
            val ecuDeviceId = ecuInfo.interfaceInfo.ecuDeviceId
            validateEcuDeviceId(ecuDeviceId)
            // Check duplicated ecu
            val duplicatedEcu = ecuInfoRepository.findByInterfaceInfoEcuId(ecuDeviceId, vehicleId)
            if (duplicatedEcu.isNotEmpty())
                throw IllegalArgumentException("ECU device id is duplicated in vehicle $vehicleId")

            // Get [displayName] base on [EcuType] and [ecuDeviceId]
            initDisplayNameAndPositionForEcu(ecuInfo)

            return ecuInfoRepository.save(ecuInfo)
        }
        throw NoSuchElementException("Not found vehicle id with client id $clientId")
    }

    /**
     * Update ECU information.
     */
    fun update(id: UUID, ecuInfo: EcuInfoProto) =
        ecuInfoRepository.getOne(id)
            .also { registryMapper.update(ecuInfo, it) }
            .also {
                // validate duplicated ecu
                val ecuDeviceId = ecuInfo.interfaceInfo.ecuDeviceId
                validateEcuDeviceId(ecuDeviceId)

                // Get [displayName] base on [EcuType] and [ecuDeviceId]
                initDisplayNameAndPositionForEcu(it)
                if (!ecuInfo.parentEcuId.isNullOrEmpty()) {
                    it.parentId = uuidMapper.uuidString(ecuInfo.parentEcuId)
                }
                if (it.children.isNotEmpty()) {
                    it.children.forEach { child -> child.interfaceInfo.vehicleId = it.interfaceInfo.vehicleId }
                }
            }
            .let(ecuInfoRepository::save)

    /**
     * Validate the ECU device Id.
     */
    private fun validateEcuDeviceId(ecuDeviceId: String) {
        if (ecuDeviceId.isEmpty())
            throw NoSuchElementException("ECU device id can't be null or empty")
    }

    /**
     * Get display name of ecu.
     */
    private fun initDisplayNameAndPositionForEcu(ecuInfo: EcuInfo) {
        val ecuDeviceId = ecuInfo.interfaceInfo.ecuDeviceId
        var topPosition = ThreadLocalRandom.current().nextDouble(MIN_TOP_VALUES, MAX_TOP_VALUES)
        var leftPosition = ThreadLocalRandom.current().nextDouble(MIN_LEFT_VALUES, MAX_LEFT_VALUES)
        var displayName = EcuDisplayName.Unknown
        if (ecuInfo.type == EcuType.GATEWAY) {
            displayName = EcuDisplayName.Gateway
            topPosition = TOP_VALUES[DEFAULT_INDEX]
            leftPosition = LEFT_VALUES[DEFAULT_INDEX]
        } else if (ecuInfo.type == EcuType.GENERIC && ecuDeviceId.length >= DISPLAY_POSITION[1]) {
            val index = ecuDeviceId.substring(
                DISPLAY_POSITION[0], DISPLAY_POSITION[1]
            ).toIntOrNull()
            if (index != null && index in 1..TOTAL_ECU) {
                displayName = EcuDisplayName.values()[index]
                topPosition = TOP_VALUES[index]
                leftPosition = LEFT_VALUES[index]
            }
        }
        ecuInfo.displayName = displayName.value
        ecuInfo.topPosition = topPosition
        ecuInfo.leftPosition = leftPosition
    }

    /**
     * Load the ECU information for a specific [ecuId].
     */
    fun load(ecuId: UUID): EcuInfo = ecuInfoRepository.findById(ecuId)
        .orElseThrow { IllegalArgumentException("ECU UUID doesn't exist") }

    /**
     * List all available ECU information.
     */
    fun list(): List<EcuInfo> = ecuInfoRepository.findAll()

    /**
     * Find all ECU with no parent aka Gateways.
     */
    fun listGateway() = ecuInfoRepository.findAllGateway()

    /**
     * List all available ECU information of a single [vehicleId].
     * @param filterGateway List gateway ECUS only
     */
    fun listByVehicle(vehicleId: UUID, filterGateway: Boolean = false, filterType: EcuFilterType): List<EcuInfo> {
        return when (filterType) {
            EcuFilterType.NORMAL ->
                if (filterGateway) ecuInfoRepository.findByVehicleIdAndNormalAndParentIdIsNull(vehicleId)
                else ecuInfoRepository.findByVehicleIdAndNormal(vehicleId)
            EcuFilterType.AVAILABLE_UPDATE ->
                if (filterGateway) ecuInfoRepository.findByVehicleIdAndAvailableUpdateAndParentIdIsNull(vehicleId)
                else ecuInfoRepository.findByVehicleIdAndAvailableUpdate(vehicleId)
            else ->
                if (filterGateway) ecuInfoRepository.findByInterfaceInfoVehicleIdAndParentIdIsNull(vehicleId)
                else ecuInfoRepository.findByInterfaceInfoVehicleId(vehicleId)
        }
    }

    /**
     * Delete ECU information identified by its [ecuId].
     */
    fun delete(ecuId: UUID) = ecuInfoRepository.deleteById(ecuId)

    /**
     * Load the vehicle ID for the given [clientId] to associate events to it.
     */
    @Cacheable("client-id-to-vehicle-id")
    fun loadVehicleId(clientId: String) =
        uuidMapper.uuidString(vehicleAdminClient.getVehicle(clientId, true).id)

    /**
     * Remove all ECUs belonging to vehicle [vehicleId].
     */
    fun removeEcuByVehicleId(vehicleId: UUID) =
        ecuInfoRepository.findByInterfaceInfoVehicleIdAndParentIdIsNull(vehicleId).let(ecuInfoRepository::deleteAll)

    /**
     * Update ecu's alert count.
     * [id] ecu's id.
     * [ecuStatus] ecu's alert count.
     */
    fun updateAlertStatus(id: UUID, ecuStatus: EcuStatus) =
        ecuInfoRepository.getOne(id)
            .also { it.securityStatus = ecuStatus }
            .let(ecuInfoRepository::save)

    /**
     * Get ECU by its uuid [ecuId].
     */
    fun getEcuDeviceId(ecuId: UUID) = ecuInfoRepository.getEcuDeviceId(ecuId)

    private companion object {
        private val TOP_VALUES = listOf(10.0, 6.0, 90.0, 58.0, 58.0, 33.0, 86.0, 14.0, 82.0)
        private const val MAX_TOP_VALUES = 90.0
        private const val MIN_TOP_VALUES = 6.0
        private val LEFT_VALUES = listOf(40.0, 34.0, 34.0, 61.0, 72.0, 80.0, 83.0, 93.0, 93.0)
        private const val MAX_LEFT_VALUES = 93.0
        private const val MIN_LEFT_VALUES = 34.0

        private const val DEFAULT_INDEX = 0

        private const val TOTAL_ECU = 8

        private val DISPLAY_POSITION = listOf(24, 32)
    }
}
