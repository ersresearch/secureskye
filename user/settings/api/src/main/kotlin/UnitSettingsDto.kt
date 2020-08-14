/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.settings.model

/**
 * User specific settings regarding the display of several units.
 *
 * @property length Units used for displaying length and distance.
 * @property mass Units used for displaying mass and weight.
 * @property temperature Units used for displaying temperature.
 */
data class UnitSettingsDto(
    var length: LengthUnitDto? = null,
    var mass: MassUnitDto? = null,
    var temperature: TemperatureUnitDto? = null
)
