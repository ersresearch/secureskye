/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

/**
 * The display name for ecu.
 */

enum class EcuDisplayName(val value: String) {
    /**
     * Unknown.
     */
    Unknown("Unknown"),

    /**
     * Vehicle Speed.
     */
    Speed("Vehicle Speed"),

    /**
     * Steering Position.
     */
    Steering("Steering Position"),

    /**
     * Brakes.
     */
    Brakes("Brakes"),

    /**
     * Transmission Gear Selector.
     */
    Gear("Transmission Gear Selector"),

    /**
     * Airbag Control Module.
     */
    Airbag("Airbag Control Module"),

    /**
     * Tire Pressure Sensor.
     */
    Tire("Tire Pressure Sensor"),

    /**
     * Battery Level.
     */
    Battery("Battery Level"),

    /**
     * Engine Temperature.
     */
    Engine("Engine Temperature"),

    /**
     * Gateway.
     */
    Gateway("Gateway")
}
