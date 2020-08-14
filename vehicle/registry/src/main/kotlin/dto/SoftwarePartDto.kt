/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.dto

import jp.co.trillium.secureskye.common.util.Timestamps
import java.time.LocalDateTime

/**
 * Software part dto.
 */
data class SoftwarePartDto(
    /**
     * Name Software Part.
     */
    var name: String = "",
    /**
     * Current Version ECU.
     */
    var currentVersion: String = "",
    /**
     * Date Current Version ECU.
     */
    var dateCurrentVersion: LocalDateTime = Timestamps.nowTime(),
    /**
     * Last Version ECU.
     */
    var lastVersion: String = "",
    /**
     * Date Last Version ECU.
     */
    var dateLastVersion: LocalDateTime = Timestamps.nowTime(),
    /**
     * Status Update Available.
     */
    var updateAvailable: Boolean = false

)
