/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jp.co.trillium.secureskye.common.util.Timestamps
import java.util.UUID

/**
 * The DTO object to response ECU alert to web application.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
data class EcuAlertDto(

    /**
     * Id.
     */
    var id: UUID = UUID(0, 0),

    /**
     * The random UUID for ecu.
     */
    var ecuId: UUID = UUID(0, 0),

    /**
     * Vehicle ID.
     */
    var vehicleId: UUID = UUID(0, 0),

    /**
     * ECU Alert location.
     */
    var ecuAlertLocation: EcuAlertLocation = EcuAlertLocation(),

    /**
     * Alert Title information.
     */
    var alertTitle: String = "",

    /**
     * Detail alert information.
     */
    var detailAlert: String = "",

    /**
     * Type.
     */
    var alertType: EcuAlertType = EcuAlertType.INFORMATION,

    /**
     * Status.
     */
    var alertStatus: EcuAlertStatus = EcuAlertStatus.NEW,

    /**
     * Timestamp.
     */
    var timestamp: Long = Timestamps.now()
)
