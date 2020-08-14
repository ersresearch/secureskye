/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.service

import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.message.mapper.VehicleComponentAlertMapper
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlertDto
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlertStatus
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlertType
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentStatus
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentStatusDto
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentType
import jp.co.trillium.secureskye.vehicle.message.repository.VehicleComponentAlertRepository
import jp.co.trillium.secureskye.websocket.client.WebSocketService
import jp.co.trillium.secureskye.websocket.client.model.WebSocketMessage
import jp.co.trillium.secureskye.websocket.client.model.WebSocketMessageLevel
import org.springframework.cache.annotation.Cacheable
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import java.util.UUID

/**
 * The business service to control OBD2 component alert and status.
 */
@Service
class VehicleComponentService(

    private val vehicleComponentAlertRepository: VehicleComponentAlertRepository,
    private val vehicleComponentAlertMapper: VehicleComponentAlertMapper,
    private val webSocketService: WebSocketService
) {

    private companion object {
        private val COMPONENTS = listOf(
            VehicleComponentType.ENGINE,
            VehicleComponentType.TIRE_PRESSURE,
            VehicleComponentType.ENGINE_OIL,
            VehicleComponentType.BRAKES,
            VehicleComponentType.ENGINE_COOLANT,
            VehicleComponentType.BATTERY
        )

//        private const val OBD2_COMPONENT_STATUS_CHANNEL: String = "OBD2-COMPONENT-STATUS"

        private const val DEVICE_DATA_CHANNEL: String = "DeviceData"
        private const val OBD2_COMPONENT_STATUS_FOR_VEHICLE_TOPIC_FORMAT: String =
            "obd2-component-status-for-vehicle-%s"
    }

    /**
     * Create alert.
     */
    fun createAlert(
        requestDtoList: List<VehicleComponentAlertDto>
    ): List<VehicleComponentAlertDto> {
        // save alert
        var models = requestDtoList.map(vehicleComponentAlertMapper::toModel)
        models = vehicleComponentAlertRepository.saveAll(models)
        // Trigger function to calculate component status and stream to web application
        val vehicleId = models.map { e -> e.vehicleId }.first()
        return models.map(vehicleComponentAlertMapper::toDto)
            .also { streamObd2ComponentStatus(vehicleId, it) }
    }

    /**
     * Fix alert.
     */
    fun fixAlert(alertId: UUID): VehicleComponentAlertDto {
        val entity = vehicleComponentAlertRepository.getOne(alertId)
            .apply { alertStatus = VehicleComponentAlertStatus.FIXED }
            .let(vehicleComponentAlertRepository::save)
        // Trigger function to calculate component status and stream to web application.
        fetchVehicleComponentInfo(alertId)?.let {
            streamObd2ComponentStatus(it)
        }

        return vehicleComponentAlertMapper.toDto(entity)
    }

    /**
     * Find alert by id.
     */
    fun findByAlertId(alertId: UUID): VehicleComponentAlertDto {
        var componentAlert = vehicleComponentAlertRepository.findById(alertId).get()
        return vehicleComponentAlertMapper.toDto(componentAlert)
    }

    /**
     * Find alert by vehicle id.
     */
    fun findAlert(vehicleId: UUID): List<VehicleComponentAlertDto> {
        val list = vehicleComponentAlertRepository.findByVehicleIdAndAlertStatus(
            vehicleId,
            VehicleComponentAlertStatus.NEW
        )
        return list.map(vehicleComponentAlertMapper::toDto)
    }

    /**
     * Calculate components status.
     */
    fun calVehicleComponentStatus(
        vehicleId: UUID,
        alerts: List<VehicleComponentAlertDto>
    ): List<VehicleComponentStatusDto> {
        return COMPONENTS.map {
            val list = alerts.filter { e -> e.componentType == it }
            if (list.isNotEmpty()) {
                if (list.any { alert -> alert.alertType == VehicleComponentAlertType.CRITICAL }) {
                    return@map VehicleComponentStatusDto(
                        it,
                        VehicleComponentStatus.CRITICAL,
                        list
                    )
                } else {
                    return@map VehicleComponentStatusDto(
                        it,
                        VehicleComponentStatus.WARNING,
                        list
                    )
                }
            }
            return@map VehicleComponentStatusDto(
                it,
                VehicleComponentStatus.NORMAL
            )
        }
    }

    /**
     * Calculate component status.
     */
    fun calVehicleComponentStatus(alert: VehicleComponentAlertDto): VehicleComponentStatusDto {
        val component =
            vehicleComponentAlertRepository.findByIdAndAlertStatus(alert.id, VehicleComponentAlertStatus.NEW)
        if (component.alertType == VehicleComponentAlertType.CRITICAL) {
            return VehicleComponentStatusDto(
                alert.componentType,
                VehicleComponentStatus.CRITICAL
            )
        } else if (component.alertType == VehicleComponentAlertType.WARNING) {
            return VehicleComponentStatusDto(
                alert.componentType,
                VehicleComponentStatus.WARNING
            )
        }
        return VehicleComponentStatusDto(
            alert.componentType,
            VehicleComponentStatus.NORMAL
        )
    }

    /**
     * Asynchronous task to stream newest component status to SocketIO server with vehicle ID.
     */
    @Async
    fun streamObd2ComponentStatus(vehicleId: UUID, alerts: List<VehicleComponentAlertDto>) {
        val componentStatus = calVehicleComponentStatus(vehicleId, alerts)
        val response = WebSocketMessage(
            Timestamps.now(),
            "ComponentMilStatus",
            componentStatus,
            WebSocketMessageLevel.INFO
        )
        val topicName = String.format(OBD2_COMPONENT_STATUS_FOR_VEHICLE_TOPIC_FORMAT, vehicleId.toString())
        webSocketService.sendMessage(DEVICE_DATA_CHANNEL, topicName, response)
    }

    /**
     * Asynchronous task to stream newest component status to SocketIO server.
     */
//    @Async
    fun streamObd2ComponentStatus(alert: VehicleComponentAlertDto) {
        val componentStatus = calVehicleComponentStatus(alert)
        val response = WebSocketMessage(
            Timestamps.now(),
            "ComponentMilStatus",
            componentStatus,
            WebSocketMessageLevel.INFO
        )
        val topicName = String.format(OBD2_COMPONENT_STATUS_FOR_VEHICLE_TOPIC_FORMAT, alert.id.toString())
        webSocketService.sendMessage(DEVICE_DATA_CHANNEL, topicName, response)
    }

    /**
     * Get Component info.
     */
    @Cacheable("component-info", key = "component-#id")
    fun fetchVehicleComponentInfo(id: UUID): VehicleComponentAlertDto? {
        // validate Component information
        val response = findByAlertId(id)

        if (!response.equals(null)) {
            return response
        }
        return null
    }
}
