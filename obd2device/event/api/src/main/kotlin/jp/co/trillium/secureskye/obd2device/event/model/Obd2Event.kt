/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.event.model

import jp.co.trillium.secureskye.common.util.Timestamps
import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.index.CompoundIndex
import org.springframework.data.mongodb.core.index.CompoundIndexes
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID
import javax.persistence.Id

/**
 * OBD-II event document.
 * @property id Object ID.
 * @property data Raw data saved as [org.bson.Document]
 * @property deviceId ID of OBD-II device.
 * @property vehicleId ID of vehicle which device attaching to.
 * @property timestamp Timestamp of event.
 */
@Document(collection = "obd2device.events.all")
@CompoundIndexes(
    CompoundIndex(name = "vehicle_index", def = "{'vehicleId': 1, 'timestamp': -1}")
)
data class Obd2Event(
    @Id
    var id: ObjectId = ObjectId(),

    @Indexed
    var deviceId: UUID = UUID(0, 0),

    @Indexed(sparse = true)
    var vehicleId: UUID? = null,

    @Indexed
    var timestamp: Long = Timestamps.now(),

    var data: Map<String, Any?> = mutableMapOf()
) {

    /**
     * The method is to get field value.
     * @param fieldName such as "parent.child".
     */
    operator fun <T> get(fieldName: String, clazz: Class<T>): T? {
        val fieldParts = fieldName.split('.')
        var i = 1
        var obj = data[fieldParts[0]]

        while (i < fieldParts.size && obj is Map<*, *>) {
            obj = obj[fieldParts[i]]
            i++
        }
        return clazz.cast(obj)
    }
}
