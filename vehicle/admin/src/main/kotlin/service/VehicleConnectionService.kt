/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.service

import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.admin.model.Vehicle
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleConnection
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleConnectionCountDto
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleTrackingStatus
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleConnectionRepository
import jp.co.trillium.secureskye.websocket.client.WebSocketService
import jp.co.trillium.secureskye.websocket.client.model.WebSocketMessage
import jp.co.trillium.secureskye.websocket.client.model.WebSocketMessageLevel
import mu.KLogging
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

/**
 * Business logic for vehicle connection status.
 */
@Service
class VehicleConnectionService(
    private val vehicleConnectionRepository: VehicleConnectionRepository,
    private val webSocketService: WebSocketService
) {
    private companion object : KLogging() {

        private const val VEHICLE_STATISTIC_CHANNEL: String = "VEHICLE_ONLINE_STATISTIC"
    }

    /**
     * Get connection info and save to database.
     * [id] vehicle's id.
     * [connect] connection info.
     */
    fun updateVehicleConnection(id: UUID, connect: VehicleConnection) {
        // get connection data by vehicle id, if not exist create a new connection data
        // and save new connection data to database
        (vehicleConnectionRepository.findByVehicleId(id) ?: VehicleConnection(vehicle = Vehicle(id)))
            .also {
                it.connected = connect.connected
                it.connectedTimestamp = connect.connectedTimestamp
                it.disconnectedTimestamp = connect.disconnectedTimestamp
                it.lastReceivingTimestamp = Timestamps.nowTime()
                it.status = connect.status
            }.let(vehicleConnectionRepository::save)

        // update connection statistic to UI
        val statistic = countOnlineStatistic()
        streamOnlineStatistic(statistic)
    }

    /**
     * Update v3hicle's connection status.
     * [id] vehicle's id.
     * [status] vehicle's status.
     */
    fun updateVehicleConnectionTracking(id: UUID, status: VehicleTrackingStatus) {
        val connection = vehicleConnectionRepository.findByVehicleId(id) ?: VehicleConnection(vehicle = Vehicle(id))
        vehicleConnectionRepository.getOne(connection.id).also {
            it.lastReceivingTimestamp = Timestamps.nowTime()
            it.status = status
        }.let(vehicleConnectionRepository::save)
    }

    /**
     * Get total vehicle connection and total vehicle.
     */
    fun countOnlineStatistic(): VehicleConnectionCountDto = VehicleConnectionCountDto(
        vehicleConnectionRepository.countByConnectedTrue(),
        vehicleConnectionRepository.count()
    )

    /**
     * Asynchronous task to stream vehicle online statistic to SocketIO server.
     */
    fun streamOnlineStatistic(vehicleConnectionCount: VehicleConnectionCountDto) {
        val response = WebSocketMessage(
            Timestamps.now(),
            "VehicleConnection",
            vehicleConnectionCount,
            WebSocketMessageLevel.INFO
        )
        webSocketService.sendMessage(VEHICLE_STATISTIC_CHANNEL, "vehicleStatistic", response)
    }

    /**
     * Get lost-signal vehicle connection by the last receiving time (nanoseconds).
     */
    fun getLostSignalVehicleConnections(lastReceivingTimestamp: LocalDateTime): List<VehicleConnection> {
        return vehicleConnectionRepository.findByLastReceivingTimestampLessThanAndConnectedTrue(lastReceivingTimestamp)
    }
}
