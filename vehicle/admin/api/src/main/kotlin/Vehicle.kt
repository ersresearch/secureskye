/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

import org.hibernate.annotations.Where
import java.io.Serializable
import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.OneToOne

/**
 * A specific vehicle that represents an actual car.
 *
 * @property id Unique identifier of the vehicle.
 * @property clientId client id of vehicle.
 * @property model The vehicle model.
 * @property name A preferred name for this vehicle.
 * @property vin Vehicle identification number.
 * @property color Vehicle color.
 * @property imageId Vehicle image id in mongodb (org.bson.types.ObjectId).
 * @property imageUrl Vehicle image url.
 * @property updateCount Vehicle update count.
 * @property connection Vehicle connection status.
 * @property alertCount Vehicle alert count.
 * @property deleted Vehicle deleted status.
 */
@Entity
@Where(clause = "deleted=false")
data class Vehicle(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    var clientId: String = "",

    @ManyToOne(optional = false)
    var model: VehicleModel = VehicleModel(),

    @Column(nullable = false)
    var name: String = "",

    @Column(nullable = false, unique = true)
    var vin: String = "",

    @Column(nullable = false)
    var color: String = "",

    @Column(nullable = false)
    var imageId: String = "",

    var updateCount: Int = 0,

    @OneToOne(mappedBy = "vehicle", cascade = [CascadeType.REMOVE])
    var connection: VehicleConnection? = null,

    @OneToOne(mappedBy = "vehicle", cascade = [CascadeType.REMOVE])
    var alertCount: VehicleAlertCount? = null,

    var deleted: Boolean = false

) : Serializable {
    val imageUrl: String
        get() = if (imageId.isNotEmpty()) "/api/vehicles/$id/image"
        else imageId
}
