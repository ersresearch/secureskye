/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.exception

import org.bson.types.ObjectId

/**
 * The requested image id is not applicable for the requesting vehicle.
 *
 * @property id ID of requested image.
 * @property vehicleId ID of requesting vehicle.
 * @property family The family of the requesting vehicle.
 * @property applicableFamily Applicable vehicle family of image.
 */
class NotApplicableVehicleException(
    val id: ObjectId,
    val vehicleId: String,
    val family: String,
    val applicableFamily: String,
    message: String
) : RuntimeException(message)
