/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

/**
 * The channel describes a notification channel where users can get informed.
 *
 * @property value Integer representation of the channel.
 */
enum class VehicleBodyType(val value: Int) {
    /**
     * Custom or unknown body type.
     */
    Custom(0),
    /**
     * Hatchback.
     */
    Hatchback(1),
    /**
     * Sedan.
     */
    Sedan(2),
    /**
     * Multi-utility vehicle.
     */
    Muv(3),
    /**
     * Sports utility vehicle.
     */
    Suv(4),
    /**
     * Coupe.
     */
    Coupe(5),
    /**
     * Convertible.
     */
    Convertible(6),
    /**
     * Wagon.
     */
    Wagon(7),
    /**
     * Van.
     */
    Van(8),
    /**
     * Jeep.
     */
    Jeep(9)
}
