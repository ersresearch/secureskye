/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.model.export

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import jp.co.trillium.secureskye.common.util.Timestamps
import java.io.Serializable
import java.time.LocalDateTime
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Transient

/**
 * An event that reports the current GPS location of a vehicle.
 *
 * @property id The unique identifier of this metric
 * @property exportDate Time when doing exporting
 * @property format Format of export
 * @property numberEntity The number of each exported entity
 * @property userInfo User
 */
@Entity
data class Metric(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    @JsonProperty("exportdate")
    var exportDate: LocalDateTime = Timestamps.nowTime(),

    @Column(nullable = false)
    var format: String = "json",

    @Transient
    val numberEntity: MutableMap<String, Int> = mutableMapOf(
        "battery_energy_event" to 0,
        "can_bus_message" to 0,
        "fuel_consumption_event" to 0,
        "gear_shift_event" to 0,
        "gps_event" to 0,
        "gps_route" to 0,
        "odometer_event" to 0,
        "rpm_event" to 0,
        "speed_event" to 0,
        "wheel_speed_event" to 0,
        "user" to 0,
        "authority" to 0,
        "vehicle" to 0,
        "model" to 0
    ),

    @JsonIgnore
    @Column(nullable = false)
    var hash: String = "",

    @JsonIgnore
    @Column(nullable = false)
    var userInfo: String = ""

) : Serializable
