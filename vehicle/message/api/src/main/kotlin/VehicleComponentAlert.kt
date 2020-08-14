/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

import jp.co.trillium.secureskye.common.util.Timestamps
import java.time.LocalDateTime
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

/**
 * The entity to manage OBD2 component alert.
 */
@Entity
data class VehicleComponentAlert(

    /**
     * ID.
     */
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    /**
     * Vehicle ID.
     */
    @Column(nullable = false)
    var vehicleId: UUID = UUID(0, 0),

    /**
     * Component type.
     */
    var componentType: VehicleComponentType = VehicleComponentType.UNKNOWN,

    /**
     * Alert type.
     */
    var alertType: VehicleComponentAlertType = VehicleComponentAlertType.WARNING,

    /**
     * Alert status.
     */
    var alertStatus: VehicleComponentAlertStatus = VehicleComponentAlertStatus.NEW,

    /**
     * Timestamp.
     */
    @Column(nullable = false)
    var timestamp: LocalDateTime = Timestamps.nowTime(),

    /**
     * Detail information if need.
     */
    @Column(nullable = false)
    var detailInfo: String = ""
)
