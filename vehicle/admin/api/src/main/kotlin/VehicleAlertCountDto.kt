/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

/**
 * The DTO to store vehicle alert count information.
 *
 * @property danger Number of danger alerts.
 * @property warning Number of warning alerts.
 * @property info Number of info alerts.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
data class VehicleAlertCountDto(

    /**
     * Number of danger alert.
     */
    var danger: Int = 0,

    /**
     * Number of warning alert.
     */
    var warning: Int = 0,

    /**
     * Number of info alert.
     */
    var info: Int = 0
)
