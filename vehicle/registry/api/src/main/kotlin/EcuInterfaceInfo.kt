/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

import java.util.UUID
import javax.persistence.Column
import javax.persistence.Embeddable

/**
 * Information of ECU interface.
 *
 * @property ecuDeviceId ID of ECU.
 * @property commProtocol communication protocol.
 * @property messageId ID of message.
 * @property vehicleId vehicle ID.
 */
@Embeddable
data class EcuInterfaceInfo(
    @Column(nullable = false)
    var ecuDeviceId: String = "",

    var commProtocol: EcuCommProtocol = EcuCommProtocol.Can,

    @Column(nullable = false)
    var messageId: String = "",

    @Column(nullable = false)
    var vehicleId: UUID = UUID(0, 0)
)
