/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

/**
 * The enumeration standing for OBD2 component alert type.
 * @property value input data
 */
enum class VehicleComponentAlertType(val value: String) {

    /**
     * Warning.
     */
    WARNING("WARNING"),

    /**
     * Critical.
     */
    CRITICAL("CRITICAL")
}
