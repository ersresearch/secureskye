/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

/**
 * Tracking status of vehicle.
 *
 * @property value Integer representation of the tracking status.
 */
enum class VehicleTrackingStatus(val value: Int) {
    /**
     * Status unknown.
     */
    Unknown(0),
    /**
     * Vehicle stopped.
     */
    Stopped(1),
    /**
     * Vehicle moving.
     */
    Moving(2),
}
