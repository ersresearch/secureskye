/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

/**
 * The enumeration for filter vehicle mode.
 */
enum class FilterAlertType(val value: String) {
    /**
     * Default filter.
     */
    DEFAULT("DEFAULT"),

    /**
     * Has type critical.
     */
    CRITICAL("CRITICAL"),

    /**
     * Has type warning.
     */
    WARNING("WARNING"),

    /**
     * Has type information.
     */
    INFORMATION("INFORMATION"),
}
