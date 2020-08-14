/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

/**
 * The DTO to display total vehicle/connected vehicle.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
data class VehicleConnectionCountDto(

    /**
     * Connected count.
     */
    var connectedCount: Long = 0,

    /**
     * Total vehicle.
     */
    var totalVehicle: Long = 0
)
