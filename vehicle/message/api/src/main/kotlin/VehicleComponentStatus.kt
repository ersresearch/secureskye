/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

/**
 * The enumeration standing for OBD2 component status.
 * @property value input data
 */
enum class VehicleComponentStatus(val value: String) {

    /**
     * Normal.
     */
    NORMAL("NORMAL"),

    /**
     * Warning.
     */
    WARNING("WARNING"),

    /**
     * Critical.
     */
    CRITICAL("CRITICAL")
}
