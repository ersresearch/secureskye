/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

/**
 * The enumeration standing for alert status.
 * @property value input data
 */
enum class VehicleComponentAlertStatus(val value: String) {

    /**
     * New.
     */
    NEW("NEW"),

    /**
     * Fixed.
     */
    FIXED("FIXED")
}
