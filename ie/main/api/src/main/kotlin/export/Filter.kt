/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.model.export

import jp.co.trillium.secureskye.common.util.Timestamps
import java.time.LocalDateTime
import java.util.UUID

/**
 * An event that reports the current GPS location of a vehicle.
 *
 * @property begin starting time range
 * @property end ending time range
 * @property vehicleIds list vehicle ids
 * @property fieldName list field
 */
data class Filter(
    var begin: LocalDateTime = LocalDateTime.MIN,
    var end: LocalDateTime = LocalDateTime.MAX,
    var vehicleIds: List<UUID> = listOf(),
    var fieldName: String = ""
) {
    constructor(begin: Long, end: Long, vehicleIds: List<UUID>, fieldName: String) :
            this(Timestamps.toLocalDateTime(begin), Timestamps.toLocalDateTime(end), vehicleIds, fieldName)
}
