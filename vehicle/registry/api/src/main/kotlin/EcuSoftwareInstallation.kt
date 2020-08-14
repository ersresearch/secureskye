/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

import jp.co.trillium.secureskye.common.util.Timestamps
import java.time.LocalDateTime
import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne

/**
 * Software info installed on ECU.
 *
 * @property id entity ID
 * @property ecu ECU installed on
 * @property softwareVersion installed version
 * @property status status of current installation [EcuSoftwareInstallationStatus]
 * @property message status message of current installation
 * @property lastModified last modified time
 * @property softwareId software info
 * @property active active status of installation
 * @property previousInstallationId ecu device id before installation
 */
@Entity
data class EcuSoftwareInstallation(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @ManyToOne(optional = false, cascade = [CascadeType.REMOVE])
    var ecu: EcuInfo = EcuInfo(),

    @Column(nullable = false)
    var softwareId: UUID = UUID(0, 0),

    @ManyToOne(optional = false, cascade = [CascadeType.REMOVE])
    var softwareVersion: EcuSoftwareVersion = EcuSoftwareVersion(),

    var status: EcuSoftwareInstallationStatus = EcuSoftwareInstallationStatus.UNKNOWN,

    @Column(nullable = false)
    var message: String = "",

    @Column(nullable = false)
    var lastModified: LocalDateTime = Timestamps.nowTime(),

    var active: Boolean = false,

    var previousInstallationId: UUID? = null
)
