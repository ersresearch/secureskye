/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

import jp.co.trillium.secureskye.common.util.Timestamps
import java.time.LocalDateTime
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Embedded
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

/**
 * The entity to manage ECU Alert.
 */
@Entity
data class EcuAlert(

    /**
     * Id.
     */
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    /**
     * The random UUID for ecu.
     */
    @Column(nullable = false)
    var ecuId: UUID = UUID(0, 0),

//    /**
//     * The string stand for ecu id will work with embed site.
//     */
//    @Column(nullable = false)
//    var clientEcuId: String = "",

    /**
     * Vehicle ID.
     */
    @Column(nullable = false)
    var vehicleId: UUID = UUID(0, 0),

    /**
     * Alert location.
     */
    @Embedded
    var ecuAlertLocation: EcuAlertLocation = EcuAlertLocation(),

    /**
     * Alert Title.
     */
    @Column(nullable = false)
    var alertTitle: String = "",

    /**
     * Detail alert.
     */
    @Column(nullable = false)
    var detailAlert: String = "",

    /**
     * Alert type.
     */
    var alertType: EcuAlertType = EcuAlertType.INFORMATION,

    /**
     * Alert status.
     */
    var alertStatus: EcuAlertStatus = EcuAlertStatus.NEW,

    @Column(nullable = false)
    var timestamp: LocalDateTime = Timestamps.nowTime()
)
