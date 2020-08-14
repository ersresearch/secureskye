/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.util.UUID

/**
 * The DTO to store ECU information.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
data class EcuInfoDto(

    /**
     * ID.
     */
    var id: UUID = UUID(0, 0),

    /**
     * Interface information.
     */
    var interfaceInfo: EcuInterfaceDto = EcuInterfaceDto(),

    /**
     * ErrorCode.
     */
    var errorCode: EcuErrorCodeDto = EcuErrorCodeDto()
)
