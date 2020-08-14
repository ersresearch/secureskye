/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

/**
 * The type for an ECU alert.
 * @property value input data
 */
enum class EcuAlertType(val value: String) {

    /**
     * Information.
     */
    INFORMATION("INFORMATION"),

    /**
     * Warning.
     */
    WARNING("WARNING"),

    /**
     * Critical.
     */
    CRITICAL("CRITICAL")
}
