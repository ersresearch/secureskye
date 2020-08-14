/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

import jp.co.trillium.secureskye.common.util.Timestamps
import java.time.LocalDateTime
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToOne

/**
 * Vehicle connection status.
 *
 * @property id Unique identifier of the vehicle connection.
 * @property connected Vehicle is connected.
 * @property connectedTimestamp Connected timestamp.
 * @property disconnectedTimestamp Disconnected timestamp.
 * @property ipAddress IP Address of connected vehicle.
 * @property status Vehicle tracking status (unknown, stopped, moving).
 * @property vehicle vehicle information.
 */
@Entity
data class VehicleConnection(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    var connected: Boolean = false,
    var connectedTimestamp: LocalDateTime = Timestamps.nowTime(),
    var disconnectedTimestamp: LocalDateTime = Timestamps.nowTime(),

    /**
     * The last receiving timestamp (nanosecond).
     */
    var lastReceivingTimestamp: LocalDateTime = Timestamps.nowTime(),

    @Column(nullable = false)
    var ipAddress: String = "",

    var status: VehicleTrackingStatus = VehicleTrackingStatus.Unknown,

    @OneToOne(optional = false)
    var vehicle: Vehicle = Vehicle()
)
