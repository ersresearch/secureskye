/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

import jp.co.trillium.secureskye.common.util.Timestamps
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.CompoundIndex
import org.springframework.data.mongodb.core.index.CompoundIndexes
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime
import java.util.UUID

/**
 * An route that tracks all [GpsEvent]s over a time range.
 *
 * @property id The unique identifier of this track.
 * @property vehicleId The unique identifier of vehicle that produced this event.
 * @property timestamp The timestamp when this event occurred.
 * @property start The start timestamp of the route.
 * @property stop The end timestamp of the route.
 * @property name The optional name for this route.
 * @property finished Whether the route was finished by the user.
 */
@Document(collection = "vehicles.events.gpsRoute")
@CompoundIndexes(
    CompoundIndex(name = "event_id", def = "{'vehicleId': 1, 'systemTimestamp.dt': -1, 'systemTimestamp.ns': -1}"),
    CompoundIndex(name = "timestamp", def = "{'timestamp.dt': -1, 'timestamp.ns': -1}")
)
data class GpsRoute(
    @Id
    var id: ObjectId = ObjectId(),
    @Indexed
    var vehicleId: UUID = UUID(0, 0),
    var timestamp: LocalDateTime = Timestamps.nowTime(),

    var start: LocalDateTime = Timestamps.nowTime(),
    var stop: LocalDateTime = Timestamps.nowTime(),
    var name: String = "",
    var finished: Boolean = false
)
