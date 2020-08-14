/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToOne

/**
 * Vehicle alert count.
 *
 * @property id Unique identifier of the vehicle alert count.
 * @property danger Number of danger alerts.
 * @property warning Number of warning alerts.
 * @property info Number of info alerts.
 * @property vehicle Vehicle information.
 */
@Entity
data class VehicleAlertCount(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    var danger: Int = 0,
    var warning: Int = 0,
    var info: Int = 0,

    @OneToOne(optional = false, cascade = [CascadeType.REMOVE])
    var vehicle: Vehicle = Vehicle()
)
