/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

/**
 * The filter type for ecu.
 * @property value input data.
 */
enum class EcuFilterType(val value: String) {
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

    /**
     * Normal ECU.
     */
    NORMAL("NORMAL")
}
