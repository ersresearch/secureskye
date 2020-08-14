/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

/**
 * ECU software installation status.
 */
enum class EcuSoftwareInstallationStatus(val value: Int) {
    /**
     * UNKNOWN.
     */
    UNKNOWN(0),
    /**
     * INSTALLING.
     */
    INSTALLING(1),
    /**
     * UNINSTALLING.
     */
    UNINSTALLING(2),
    /**
     * SUCCESS.
     */
    SUCCESS(3),
    /**
     * ERROR.
     */
    ERROR(4)
}
