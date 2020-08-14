/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

/**
 * Status of an ECU.
 * [value] enum value
 */
enum class EcuType(val value: Int) {

    /**
     * Undefine.
     */
    UNDEFINED(0),

    /**
     * Normal.
     */
    GATEWAY(1),

    /**
     * Information.
     */
    GENERIC(2)
}
