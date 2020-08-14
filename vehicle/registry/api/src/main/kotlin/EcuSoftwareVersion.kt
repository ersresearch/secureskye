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
import javax.persistence.OneToMany

/**
 * Software version.
 *
 * @property id entity id
 * @property software software
 * @property versionCode numeric identifier for version
 * @property versionName semantic version string
 * @property availableSince version available time
 * @property changelog version changelog or description
 * @property imageId Object Id of image file in database
 * @property softwareInstallation List of Installation record for this version
 * @property ecuDeviceId 64-byte version Id specify the ECU available to upgrade
 */
@Entity
data class EcuSoftwareVersion(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @ManyToOne(optional = false)
    var software: EcuSoftware = EcuSoftware(),

    @Column(nullable = false)
    var ecuDeviceId: String = "",

    var versionCode: Long = 0,

    @Column(nullable = false)
    var versionName: String = "",

    @Column(nullable = false)
    var availableSince: LocalDateTime = Timestamps.nowTime(),

    @Column(nullable = false)
    var changelog: String = "",

    @Column(nullable = false)
    var imageId: String = "",

    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "softwareVersion")
    var softwareInstallation: List<EcuSoftwareInstallation> = mutableListOf()
)
