/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

import javax.persistence.Column
import javax.persistence.Embeddable

/**
 * Information of gateway interface.
 *
 * @property ip address of gateway.
 * @property vin vin number.
 */
@Embeddable
data class GatewayInterfaceInfo(
    @Column(nullable = false)
    var ip: String = "",

    @Column(nullable = false)
    var vin: String = ""
)
