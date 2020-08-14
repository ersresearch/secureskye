/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

/**
 * The wrapper object to store list of ecu identity and their information.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
data class VehicleEcuDto(
    /**
     * ECU information.
     */
    var ecuInfo: List<EcuInfoDto>
)
