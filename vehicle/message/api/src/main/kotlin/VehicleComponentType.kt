/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

/**
 * The enumeration standing for OBD2 component type.
 * @property value input data
 */
enum class VehicleComponentType(val value: String) {

    /**
     * Unknown.
     */
    UNKNOWN("UNKNOWN"),

    /**
     * Engine.
     */
    ENGINE("ENGINE"),

    /**
     * Tire Pressure.
     */
    TIRE_PRESSURE("TIRE_PRESSURE"),

    /**
     * Engine Oil.
     */
    ENGINE_OIL("ENGINE_OIL"),

    /**
     * Brakes.
     */
    BRAKES("BRAKES"),

    /**
     * Engine Coolant.
     */
    ENGINE_COOLANT("ENGINE_COOLANT"),

    /**
     * Battery.
     */
    BATTERY("BATTERY")
}
