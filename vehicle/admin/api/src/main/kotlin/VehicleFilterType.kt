/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

/**
 * The filter type for vehicle.
 * @property value input data.
 */
enum class VehicleFilterType(val value: String) {
    /**
     * Has alert.
     */
    HAS_ALERT("HAS_ALERT"),

    /**
     * Available update.
     */
    AVAILABLE_UPDATE("AVAILABLE_UPDATE"),

    /**
     * Default filter.
     */
    DEFAULT("DEFAULT"),
}
