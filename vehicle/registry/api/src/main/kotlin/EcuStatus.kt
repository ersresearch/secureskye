/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

/**
 * Status of an ECU.
 * [value] enum value
 */
enum class EcuStatus(val value: Int) {

    /**
     * Unclear.
     */
    UNCLEAR(0),

    /**
     * Normal.
     */
    NORMAL(1),

    /**
     * Information.
     */
    INFORMATION(2),

    /**
     * Warning.
     */
    WARNING(3),

    /**
     * Critical.
     */
    CRITICAL(4)
}
