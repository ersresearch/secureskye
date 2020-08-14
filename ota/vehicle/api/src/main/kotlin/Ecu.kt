/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.model

/**
 * Ecu metadata.
 *
 * @property id Unique identifier of the ECU (not database ID).
 * @property description Description of the ECU update.
 * @property items One ore more [Image]s that make up the update.
 */
data class Ecu(
    var id: String = "",
    var description: String = "",
    var items: List<Image> = emptyList()
)
