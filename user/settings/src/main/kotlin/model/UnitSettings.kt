/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.settings.model

import java.util.UUID
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

/**
 * User specific settings regarding the display of several units.
 *
 * @property id Unique identifier of the user.
 * @property length Units used for displaying length and distance.
 * @property mass Units used for displaying mass and weight.
 * @property temperature Units used for displaying temperature.
 */
@Entity
@Table(name = "user_settings_units")
data class UnitSettings(
    @Id
    var id: UUID = UUID(0, 0),
    var length: LengthUnit = LengthUnit.Kilometers,
    var mass: MassUnit = MassUnit.Kilograms,
    var temperature: TemperatureUnit = TemperatureUnit.Celsius
)
