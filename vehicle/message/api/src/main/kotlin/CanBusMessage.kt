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
import java.util.Arrays
import java.util.UUID

/**
 * A raw CAN bus message.
 *
 * @property id The unique identifier of this message.
 * @property vehicleId The unique identifier of vehicle that produced this event.
 * @property timestamp The timestamp when this event occurred.
 * @property systemTimestamp The timestamp when this event was saved on the server.
 * @property messageId Identifier of this message in the CAN bus.
 * @property data The message content.
 * @property dlc Length of the content containing the data.
 */
@Document(collection = "vehicles.messages.canBus")
@CompoundIndexes(
    CompoundIndex(name = "event_id", def = "{'vehicleId': 1, 'systemTimestamp.dt': -1, 'systemTimestamp.ns': -1}"),
    CompoundIndex(name = "timestamp", def = "{'timestamp.dt': -1, 'timestamp.ns': -1}"),
    CompoundIndex(name = "systemTimestamp", def = "{'systemTimestamp.dt': -1, 'systemTimestamp.ns': -1}")
)
data class CanBusMessage(
    @Id
    override var id: ObjectId = ObjectId(),
    @Indexed
    override var vehicleId: UUID = UUID(0, 0),
    override var timestamp: LocalDateTime = Timestamps.nowTime(),
    override var systemTimestamp: LocalDateTime = Timestamps.nowTime(),

    @Indexed
    var messageId: Int = 0,
    var data: ByteArray = byteArrayOf(),
    var dlc: Int = 0
) : EventEntity {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as CanBusMessage

        if (id != other.id) return false
        if (vehicleId != other.vehicleId) return false
        if (timestamp != other.timestamp) return false
        if (systemTimestamp != other.systemTimestamp) return false
        if (messageId != other.messageId) return false
        if (!Arrays.equals(data, other.data)) return false
        if (dlc != other.dlc) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + vehicleId.hashCode()
        result = 31 * result + timestamp.hashCode()
        result = 31 * result + systemTimestamp.hashCode()
        result = 31 * result + messageId
        result = 31 * result + Arrays.hashCode(data)
        result = 31 * result + dlc
        return result
    }
}
