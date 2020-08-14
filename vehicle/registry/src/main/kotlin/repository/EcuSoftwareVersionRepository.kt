/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.repository

import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftwareVersion
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.UUID

/**
 * Repository for managing [EcuSoftwareVersion] entities.
 */
interface EcuSoftwareVersionRepository : JpaRepository<EcuSoftwareVersion, UUID> {

    /**
     * Get latest version of software [softwareId].
     */
    @Query(
        "select v from #{#entityName} v " +
                "where v.software.id = ?1 " +
                "and v.ecuDeviceId = ?2 " +
                "and v.versionCode = (select max(v2.versionCode) from #{#entityName} v2 " +
                "where v2.software.id = ?1 and v2.ecuDeviceId = ?2)"
    )
    fun findLatestSoftwareVersion(softwareId: UUID, ecuDeviceId: String): EcuSoftwareVersion?

    /**
     * Find specific software version by [softwareId] and [version].
     */
    fun findBySoftwareIdAndVersionNameAndEcuDeviceId(
        softwareId: UUID,
        version: String,
        ecuDeviceId: String
    ): EcuSoftwareVersion?

    /**
     * Check if there is any software version of software [softwareId] with [versionName] and available
     * for [ecuDeviceId].
     */
    fun existsBySoftwareIdAndVersionNameAndEcuDeviceId(
        softwareId: UUID,
        versionName: String,
        ecuDeviceId: String
    ): Boolean
}
