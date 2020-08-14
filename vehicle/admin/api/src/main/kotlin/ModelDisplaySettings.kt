/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne

/**
 * Settings to on/off parameter base on vehicle model.
 * @property [id] Unique identifier of the model settings.
 * @property [settings] Type of the setting.
 * @property [value] Boolean value of the setting. `true` = `on` and `false` = `off`.
 * @property [model] The model for this setting.
 */
@Entity
data class ModelDisplaySettings(

    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    var settings: ModelDisplaySettingsType = ModelDisplaySettingsType.UNDEFINED,

    @Column(nullable = false)
    var value: Boolean = true,

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    var model: VehicleModel = VehicleModel()
)
