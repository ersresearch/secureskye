/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.model.vehicle

import java.util.UUID
import javax.persistence.Entity
import javax.persistence.ForeignKey
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

/**
 * A specific vehicle that represents an actual car.
 *
 * @property id Unique identifier of the vehicle.
 * @property model The vehicle model.
 * @property name A free choosable name for this vehicle.
 */
@Entity(name = "VehicleIe")
@Table(name = "vehicle")
data class Vehicle(
    @Id
    var id: UUID = UUID(0, 0),

    var clientId: String = "",

    @ManyToOne(optional = false)
    @JoinColumn(
        name = "vehicle_model_id", nullable = false,
        foreignKey = ForeignKey(name = "fk_vehicle_model_id")
    )
    var model: VehicleModel = VehicleModel(),

    var name: String = ""
)
