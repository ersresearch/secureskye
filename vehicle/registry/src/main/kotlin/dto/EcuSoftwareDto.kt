/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.dto

/**
 * Ecu software information.
 */
data class EcuSoftwareDto(
    /**
     * Id ECU.
     */
    var ecuId: String = "",
    /**
     * FW Version.
     */
    var fw: SoftwarePartDto = SoftwarePartDto(),
    /**
     * Secure GO.
     */
    var secureGo: SoftwarePartDto = SoftwarePartDto(),
    /**
     * Secure IXS.
     */
    var secureIxs: SoftwarePartDto = SoftwarePartDto(),
    /**
     * Secure Skye.
     */
    var secureSkye: SoftwarePartDto = SoftwarePartDto(),
    /**
     * ixs Rule.
     */
    var ixsRule: SoftwarePartDto = SoftwarePartDto()
)
