/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleAlertCountDto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EcuAlertListProto
import jp.co.trillium.secureskye.vehicle.message.feign.EcuInfoClient
import jp.co.trillium.secureskye.vehicle.message.feign.VehicleAdminClient
import jp.co.trillium.secureskye.vehicle.message.mapper.EcuAlertMapper
import jp.co.trillium.secureskye.vehicle.message.model.EcuAlert
import jp.co.trillium.secureskye.vehicle.message.model.EcuAlertDto
import jp.co.trillium.secureskye.vehicle.message.model.EcuAlertStatus
import jp.co.trillium.secureskye.vehicle.message.model.EcuAlertType
import jp.co.trillium.secureskye.vehicle.message.model.EcuInfoDto
import jp.co.trillium.secureskye.vehicle.message.model.EcuStatusDto
import jp.co.trillium.secureskye.vehicle.message.model.FilterAlertType
import jp.co.trillium.secureskye.vehicle.message.repository.EcuAlertRepository
import jp.co.trillium.secureskye.vehicle.registry.model.EcuStatus
import jp.co.trillium.secureskye.websocket.client.WebSocketService
import jp.co.trillium.secureskye.websocket.client.model.WebSocketMessage
import jp.co.trillium.secureskye.websocket.client.model.WebSocketMessageLevel
import org.springframework.cache.annotation.Cacheable
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.util.CollectionUtils
import java.util.UUID

/**
 * The business service class to manage ECU alert.
 */
@Service
class EcuAlertService(
    private val ecuAlertRepository: EcuAlertRepository,
    private val ecuAlertMapper: EcuAlertMapper,
    private val ecuInfoClient: EcuInfoClient,
    private val vehicleAdminClient: VehicleAdminClient,
    private val webSocketService: WebSocketService,
    private val uuidMapper: UuidMapper
) {

    private companion object {

        private const val ECU_STATUS_CHANNEL: String = "ECU-STATUS"
        private const val DEVICE_DATA_CHANNEL: String = "DeviceData"
        private const val ECU_ALERT__FOR_VEHICLE_TOPIC_FORMAT: String = "ecu-alert-for-vehicle-%s"
    }

    /**
     * Create alert list from embed site.
     */
    fun createAlert(
        alertList: List<EcuAlertDto>,
        clientId: String
    ): List<EcuAlertDto> {

        // load vehicle id
        val vehicleId = loadVehicleId(clientId)

        // load ECU information
        val vehicleEcus = ecuInfoClient.listEcus(vehicleId, "application/json")
        if (CollectionUtils.isEmpty(vehicleEcus.ecuInfo)) {
            return emptyList()
        }

        alertList.forEach {
            it.vehicleId = vehicleId
        }

        // save alert.
        var entities = alertList.map(ecuAlertMapper::toModel)
        entities = ecuAlertRepository.saveAll(entities)

        // Trigger function to calculate ecu status and stream to web application.
        vehicleEcus.ecuInfo.forEach {
            val ecuStatus = calEcuStatusByEcu(it)
            ecuInfoClient.updateAlertStatus(ecuStatus.id, ecuStatus.status)
            streamEcuStatus(ecuStatus)
        }
//
//        // Trigger function to re-calculate vehicle alert count
        updateAlertCountForVehicle(vehicleId)

        // return info
        return entities.map(ecuAlertMapper::toDto)
            // trigger function to stream newest ECU alerts into Vehicle View screen
            .also { streamNewestEcuAlert(vehicleId, it) }
    }

    /**
     * Change alert status to FIXED.
     */
    fun fixAlert(alertId: UUID): EcuAlertDto {
        val entity = ecuAlertRepository.getOne(alertId)
            .apply { alertStatus = EcuAlertStatus.FIXED }
            .let(ecuAlertRepository::save)
        // Trigger function to calculate ecu status and stream to webu application.
        // load ECU information
        val vehicleEcus = ecuInfoClient.listEcus(entity.vehicleId, "application/json")
        if (!CollectionUtils.isEmpty(vehicleEcus.ecuInfo)) {
            val ecu = vehicleEcus.ecuInfo.first { e -> e.id == entity.ecuId }
            val ecuStatus = calEcuStatusByEcu(ecu)
            ecuInfoClient.updateAlertStatus(ecuStatus.id, ecuStatus.status)
            streamEcuStatus(ecuStatus)

            // Trigger function to re-calculate vehicle alert count
            updateAlertCountForVehicle(entity.vehicleId)
        }

        return ecuAlertMapper.toDto(entity)
    }

    /**
     * Find alert by ECU id.
     */
    fun findAlert(ecuId: UUID, filterAlertType: FilterAlertType, pageable: Pageable): Page<EcuAlertDto> {
        val page: Page<EcuAlert>
        when (filterAlertType) {
            FilterAlertType.DEFAULT -> page = ecuAlertRepository.findByEcuIdAndAlertStatus(
                ecuId,
                EcuAlertStatus.NEW,
                pageable
            )
            else -> {
                page = ecuAlertRepository.findByEcuIdAndAlertStatusAndAlertType(
                    ecuId,
                    EcuAlertStatus.NEW,
                    EcuAlertType.valueOf(filterAlertType.value),
                    pageable
                )
            }
        }
        return page.map(ecuAlertMapper::toDto)
    }

    /**
     * Find alert for a vehicle.
     */
    fun findAlertForVehicle(
        vehicleId: UUID,
        filterAlertType: FilterAlertType,
        pageable: Pageable
    ): Page<EcuAlertDto> {
        val page: Page<EcuAlert>
        when (filterAlertType) {
            FilterAlertType.DEFAULT -> page =
                    ecuAlertRepository.findByVehicleIdAndAlertStatus(vehicleId, EcuAlertStatus.NEW, pageable)
            else -> {
                page = ecuAlertRepository.findByVehicleIdAndAlertStatusAndAlertType(
                    vehicleId,
                    EcuAlertStatus.NEW,
                    EcuAlertType.valueOf(filterAlertType.value),
                    pageable
                )
            }
        }
        return page.map(ecuAlertMapper::toDto)
    }

    /**
     * Find all alert and support pagination.
     */
    fun findAll(pageable: Pageable): Page<EcuAlertDto> =
        ecuAlertRepository.findByAlertStatus(EcuAlertStatus.NEW, pageable).map(ecuAlertMapper::toDto)

    /**
     * Get ECU info.
     */
//    @Cacheable(value = "ecu-info", key = "ecu-#id")
    fun fetchEcuInfo(id: UUID): EcuInfoDto? {
        // validate ECU information
        val response = ecuInfoClient.findEcuInfo(id, "application/json")
        return response
    }

    /**
     * Calculate ecu status.
     */
    fun calEcuStatusByEcu(ecuInfo: EcuInfoDto): EcuStatusDto {
        val id = ecuInfo.id
        val interfaceInfo = ecuInfo.interfaceInfo
        val alerts = ecuAlertRepository.findByEcuIdAndAlertStatus(id, EcuAlertStatus.NEW)
        if (alerts.isNotEmpty()) {
            if (alerts.any { alert -> alert.alertType == EcuAlertType.CRITICAL }) {
                return EcuStatusDto(
                    id,
                    interfaceInfo.ecuId,
                    EcuStatus.CRITICAL
                )
            } else if (alerts.any { alert -> alert.alertType == EcuAlertType.WARNING }) {
                return EcuStatusDto(
                    id,
                    interfaceInfo.ecuId,
                    EcuStatus.WARNING
                )
            }
            return EcuStatusDto(
                id,
                interfaceInfo.ecuId,
                EcuStatus.INFORMATION
            )
        }
        return EcuStatusDto(
            id,
            interfaceInfo.ecuId,
            EcuStatus.NORMAL
        )
    }

    /**
     * Asynchronous task to stream newest ecu status to SocketIO server.
     * TODO fix stream function later - QuanTD
     */
//    @Async
    fun streamEcuStatus(ecuStatus: EcuStatusDto) {
        val response = WebSocketMessage(
            Timestamps.now(),
            "EcuStatus",

            ecuStatus,
            WebSocketMessageLevel.INFO
        )
        webSocketService.sendMessage(ECU_STATUS_CHANNEL, ecuStatus.id.toString(), response)
    }

    /**
     * Stream newest ECU alert into web application with vehicle ID key.
     */
    @Async
    fun streamNewestEcuAlert(vehicleId: UUID, ecuAlerts: List<EcuAlertDto>) {
        val response = WebSocketMessage(
            Timestamps.now(),
            "NewestEcuAlert",
            ecuAlerts,
            WebSocketMessageLevel.INFO
        )
        val topicName = String.format(ECU_ALERT__FOR_VEHICLE_TOPIC_FORMAT, vehicleId.toString())
        webSocketService.sendMessage(DEVICE_DATA_CHANNEL, topicName, response)
    }

    /**
     * Count vehicle alert status.
     */
    fun updateAlertCountForVehicle(vehicleId: UUID) {
        // count total alert in table EcuAlert by vehicle id
        val criticals = ecuAlertRepository.countByVehicleIdAndAlertTypeAndAlertStatus(
            vehicleId,
            EcuAlertType.CRITICAL,
            EcuAlertStatus.NEW
        )
        val warnings = ecuAlertRepository.countByVehicleIdAndAlertTypeAndAlertStatus(
            vehicleId,
            EcuAlertType.WARNING,
            EcuAlertStatus.NEW
        )
        val infomations = ecuAlertRepository.countByVehicleIdAndAlertTypeAndAlertStatus(
            vehicleId,
            EcuAlertType.INFORMATION,
            EcuAlertStatus.NEW
        )
        val vehicleAlertCountDto = VehicleAlertCountDto(
            danger = criticals,
            warning = warnings,
            info = infomations
        )
        vehicleAdminClient.updateAlertCount(
            vehicleId,
            vehicleAlertCountDto
        )
    }

    /**
     * Load the vehicle ID for the given [clientId] to associate events to it.
     */
    @Cacheable("client-id-to-vehicle-id")
    private fun loadVehicleId(clientId: String) =
        uuidMapper.uuidString(vehicleAdminClient.getVehicle(clientId, true).id)

    /**
     * Support protobuf for create ecu alert.
     */
    fun createAlertProto(
        alertList: EcuAlertListProto,
        clientId: String
    ): EcuAlertListProto {

        // load vehicle id
        val vehicleId = loadVehicleId(clientId)

        // load ECU information
        val vehicleEcus = ecuInfoClient.listEcus(vehicleId, "application/json")
        if (CollectionUtils.isEmpty(vehicleEcus.ecuInfo)) {
            return EcuAlertListProto.getDefaultInstance()
        }

        // save alert.
        var entities = alertList.dataList.map(ecuAlertMapper::toModel)
        entities = ecuAlertRepository.saveAll(entities)

        // Trigger function to calculate ecu status and stream to web application.
        vehicleEcus.ecuInfo.forEach {
            val ecuStatus = calEcuStatusByEcu(it)
            ecuInfoClient.updateAlertStatus(ecuStatus.id, ecuStatus.status)
            streamEcuStatus(ecuStatus)
        }

        // Trigger function to re-calculate vehicle alert count
        updateAlertCountForVehicle(vehicleId)

        // return info
        return entities.map(ecuAlertMapper::toDto)
            .also { streamNewestEcuAlert(vehicleId, it) }
            .let(ecuAlertMapper::toListProto)
    }

    /**
     * data for support protobuf create alert api.
     */
//    fun initialTestProtobuf(clientId: String) =
//        EcuAlertListProto.newBuilder()
//            .addData(
//                EcuAlertProto.newBuilder()
//                    .setEcuId("3b4ff8d5-c13e-11e8-a558-e0d55e402654") // sample data
//                    .setVehicleId("c365e254-c13d-11e8-8d28-e0d55e402654") // sample data
//                    .setEcuAlertLocation(
//                        EcuAlertLocationProto.newBuilder()
//                            .setLatitude(10.8453786)
//                            .setLongitude(106.7780029)
//                    )
//                    .setAlertTitle("Back-door detected")
//                    .setDetailAlert("A back-door has been detected")
//                    .setAlertType(EcuAlertType.WARNING.value)
//                    .setAlertStatus(EcuAlertStatus.NEW.value)
//            )
//            .build()
//            .let { createAlertProto(it, clientId) }
}
