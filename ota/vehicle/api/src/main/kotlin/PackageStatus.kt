/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.model

enum class PackageStatus(val value: Int) {
    /**
     * Status 'New' when packaged newly uploaded to server.
     */
    New(0),

    /**
     * Status 'Released' when packaged already published
     * and available to be updated.
     */
    Released(1),

    /**
     * Status 'Reviewing' when package is being reviewed by supervisor.
     */
    Reviewing(2),

    /**
     * Package has been reviewed and passed, ready to be published.
     */
    Passed(3),

    /**
     * Package has been review and it not good to be published.
     */
    NotGood(4)
}