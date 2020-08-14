/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Embedded
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import javax.persistence.Table

/**
 * Information about the ECU hardware/software.
 *
 * @property id Unique identifier of the ECU information.
 * @property interfaceInfo interface information.
 * @property gatewayInterfaceInfo interface information for gateway ecu only.
 * @property errorCode error code data structure.
 * @property parent parent ECU
 * @property type Type of ECu is Gateway or Generic
 * @property children child ECUs
 * @property softwareInstallation software installed on ECU.
 * @property topPosition the top position of the ECU.
 * @property leftPosition the left position of the ECU.
 * @property securityStatus the alert status of the ECU.
 * @property displayName the display of ecu base on their type
 */
@Entity
@Table(name = "ecu")
data class EcuInfo(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    var type: EcuType = EcuType.UNDEFINED,

    @Column(nullable = false)
    var displayName: String = "",

    @Embedded
    var interfaceInfo: EcuInterfaceInfo = EcuInterfaceInfo(),

    @OneToOne(optional = false, cascade = [CascadeType.ALL])
    var errorCode: ErrorCodeInfo = ErrorCodeInfo(),

    @Embedded
    var gatewayInterfaceInfo: GatewayInterfaceInfo = GatewayInterfaceInfo(),

    var parentId: UUID? = null,

    @OneToMany(fetch = FetchType.LAZY, cascade = [CascadeType.REMOVE], mappedBy = "parentId")
    var children: Set<EcuInfo> = mutableSetOf(),

    @OneToMany(fetch = FetchType.LAZY, cascade = [CascadeType.ALL], mappedBy = "ecu")
    var softwareInstallation: List<EcuSoftwareInstallation> = mutableListOf(),

    var topPosition: Double = 0.0,
    var leftPosition: Double = 0.0,
    var securityStatus: EcuStatus = EcuStatus.NORMAL
)
