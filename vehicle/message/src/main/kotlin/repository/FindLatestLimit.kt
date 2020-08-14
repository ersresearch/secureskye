/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.repository

import java.time.LocalDateTime
import java.util.UUID

/**
 * Definition of finding the latest items with a count limit.
 */
interface FindLatestLimit<out T> {

    /**
     * Find the latest [limit] items filtered by [vehicleId].
     */
    fun findLatestLimit(vehicleId: UUID, limit: Int): List<T>

    /**
     * Find the latest items after [since] filtered by [vehicleId].
     */
    fun findLatestSince(vehicleId: UUID, since: LocalDateTime): List<T>

    companion object {
        internal const val DEFAULT_LIMIT = 200
    }
}
