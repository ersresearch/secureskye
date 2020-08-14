/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.admin.model

import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

/**
 * Entity represent a registered OBD-II device.
 *
 * @property id Unique ID.
 * @property family Device family.
 * @property kernel Kernel version of device.
 * @property macAddress MAC address of device.
 * @property clientId Client ID of device for OAuth2.
 * @property vehicleId The registered vehicle ID of device.
 */
@Entity
data class Obd2Device(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    var family: String = "",

    @Column(nullable = false)
    var kernel: String = "",

    @Column(nullable = false)
    var macAddress: String = "",

    @Column(nullable = false)
    var clientId: String = "",

    var vehicleId: UUID? = null
)
