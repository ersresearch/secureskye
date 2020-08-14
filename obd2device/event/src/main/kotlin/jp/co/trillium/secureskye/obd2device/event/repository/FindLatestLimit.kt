/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.event.repository

import java.util.UUID

/**
 * Definition of finding the latest items with a count limit.
 */
interface FindLatestLimit<out T> {

    /**
     * Find the latest [limit] items filtered by [vehicleId].
     */
    fun findLatestLimitByVehicle(vehicleId: UUID, limit: Int): List<T>

    /**
     * Find the latest items after [since] filtered by [vehicleId].
     */
    fun findLatestSinceByVehicle(vehicleId: UUID, since: Long): List<T>

    /**
     * Find the latest [limit] items filtered by [deviceId].
     */
    fun findLatestLimitByDevice(deviceId: UUID, limit: Int): List<T>

    /**
     * Find the latest items after [since] filtered by [deviceId].
     */
    fun findLatestSinceByDevice(deviceId: UUID, since: Long): List<T>

    companion object {
        internal const val DEFAULT_LIMIT = 200
    }
}
