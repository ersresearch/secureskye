/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.settings.model

/**
 * Different units for temperature.
 */
enum class TemperatureUnitDto {
    /**
     * Metric system.
     */
    Celsius,

    /**
     * Imperial system.
     */
    Fahrenheit,

    /**
     * System independent unit.
     */
    Kelvin
}
