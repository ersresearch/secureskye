/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

/**
 * The error code for an ECU.
 *
 * @property ruleDbStatus status of rule db.
 * @property errorCount number of error which was generated.
 */
data class EcuErrorCodeDto(
    var ruleDbStatus: Int = 0,
    var errorCount: Long = 0
)
