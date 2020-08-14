/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jp.co.trillium.secureskye.vehicle.registry.model.EcuStatus
import java.util.UUID

/**
 * ECU information.
 *
 * @property ecuId ID of ECU.
 * @property status status of ECU.
 * @property ruleDbStatus status of rule db.
 * @property errorCount number of error which was generated.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
data class EcuStatusDto(

    /**
     * ID.
     */
    var id: UUID = UUID(0, 0),

    /**
     * ECU id.
     */
    var ecuId: String = "",

    /**
     * Status.
     */
    var status: EcuStatus = EcuStatus.NORMAL,

    /**
     * Rule DB status.
     */
    var ruleDbStatus: Int = 0,

    /**
     * Error count.
     */
    var errorCount: Long = 0
)
