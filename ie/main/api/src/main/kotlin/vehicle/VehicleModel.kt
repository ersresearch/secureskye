/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.model.vehicle

import java.util.UUID
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

/**
 * A specific vehicle model (ex. Prius).
 *
 * @property id Unique identifier of this model.
 * @property name The name.
 */
@Entity(name = "VehicleModelIe")
@Table(name = "vehicle_model")
data class VehicleModel(
    @Id
    var id: UUID = UUID(0, 0),

    var name: String = ""
)
