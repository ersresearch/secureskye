/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

/**
 * The status for an ECU alert.
 * @property value input data
 */
enum class EcuAlertStatus(val value: String) {

    /**
     * New.
     */
    NEW("NEW"),

    /**
     * Fixed.
     */
    FIXED("FIXED")
}
