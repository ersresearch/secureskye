/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jp.co.trillium.secureskye.common.util.Timestamps
import java.util.UUID

/**
 * The DTO object to response OBD2 component alert to web application.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
data class VehicleComponentAlertDto(

    /**
     * Id.
     */
    var id: UUID = UUID(0, 0),

    /**
     * Vehicle Id.
     */
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
     * timestamp.
     */
    var timestamp: Long = Timestamps.now(),

    /**
     * detail information.
     */
    var detailInfo: String = ""
)
