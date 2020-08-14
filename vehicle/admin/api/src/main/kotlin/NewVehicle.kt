/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

import java.util.UUID

/**
 * A new vehicle to be registered.
 *
 * @property modelId The vehicle model.
 * @property name A free choosable name for this vehicle.
 */
data class NewVehicle(
    var modelId: UUID = UUID(0, 0),
    var name: String = "",
    var vin: String = "",
    var color: String = ""
)
