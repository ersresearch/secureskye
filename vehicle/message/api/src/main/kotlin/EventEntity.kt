/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

import org.bson.types.ObjectId
import java.time.LocalDateTime
import java.util.UUID

/**
 * The base of any event.
 *
 * @property id Unique identifier.
 * @property vehicleId Identifier of the vehicle this event was sent from.
 * @property timestamp The date and time this event occurred.
 * @property systemTimestamp The date and time when this event was saved on the server.
 */
interface EventEntity {
    var id: ObjectId
    var vehicleId: UUID
    var timestamp: LocalDateTime
    var systemTimestamp: LocalDateTime
}
