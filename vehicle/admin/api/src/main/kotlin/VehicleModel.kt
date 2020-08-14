/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.OneToMany

/**
 * A specific vehicle model (ex. Prius).
 *
 * @property id Unique identifier of this model.
 * @property name The name.
 * @property maker Vehicle maker.
 * @property body Vehicle body type.
 * @property displaySettings display settings of a model.
 */
@Entity
data class VehicleModel(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    var name: String = "",

    @ManyToOne(optional = false, cascade = [CascadeType.REMOVE])
    var maker: VehicleMaker = VehicleMaker(),

    @Column(nullable = false)
    var body: VehicleBodyType = VehicleBodyType.Custom,

    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "model")
    var displaySettings: List<ModelDisplaySettings> = mutableListOf()
)
