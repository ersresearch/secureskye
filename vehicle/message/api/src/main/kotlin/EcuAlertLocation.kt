/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

import javax.persistence.Embeddable

/**
 * The location for an ECU alert.
 */
@Embeddable
data class EcuAlertLocation(

    /**
     * Latitude.
     */
    var latitude: Double = 0.0,

    /**
     * Longitude.
     */
    var longitude: Double = 0.0
)
