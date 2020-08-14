/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.service

import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleTrackingStatus
import jp.co.trillium.secureskye.vehicle.admin.properties.VehicleConnectionProperties
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleConnectionRepository
import mu.KLogging
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service

/**
 *  Vehicle connection scheduling task.
 */
@Service
class VehicleConnectionScheduling(
    private val vehicleConnectionProperties: VehicleConnectionProperties,
    private val vehicleConnectionService: VehicleConnectionService,
    private val vehicleConnectionRepository: VehicleConnectionRepository
) {
    private companion object : KLogging()

    /**
     * check lost signal connection of vehicles every 1 second.
     */
    @Scheduled(fixedDelay = 1000)
    fun checkLostSignalConnection() {
        logger.debug { "check lost signal connection..." }
        val lostSignalTimeInNanosecond = vehicleConnectionProperties.lostSignalTime
        logger.debug { "the lost signal time in nanosecond: $lostSignalTimeInNanosecond" }
        lostSignalTimeInNanosecond?.let {
            val currentTimeInNanosecond = Timestamps.nowTime()
            logger.debug { "the current nanoseconds: $currentTimeInNanosecond" }
            // get a list vehicles which are losing signal.
            val vehicleConnections = vehicleConnectionService.getLostSignalVehicleConnections(
                currentTimeInNanosecond - lostSignalTimeInNanosecond
            )
            logger.debug { "the lost signal vehicle connections: $vehicleConnections" }
            if (vehicleConnections.isNotEmpty()) {
                vehicleConnections.forEach {
                    // update information for the lost signal vehicles.
                    it.connected = false
                    it.disconnectedTimestamp = currentTimeInNanosecond
                    it.status = VehicleTrackingStatus.Unknown
                    // save it to database.
                    vehicleConnectionRepository.save(it)
                }
                // notify webapp by web socket.
                val statistic = vehicleConnectionService.countOnlineStatistic()
                vehicleConnectionService.streamOnlineStatistic(statistic)
            }
        }
    }
}
