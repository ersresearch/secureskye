/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.repository

import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftwareInstallation
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.UUID

/**
 * Repository for managing [EcuSoftwareInstallation] entities.
 */
interface EcuSoftwareInstallationRepository : JpaRepository<EcuSoftwareInstallation, UUID> {

    /**
     * Find software installation by [ecuId] and [versionId].
     */
    @Query(
        "SELECT i FROM EcuSoftwareInstallation i " +
                "WHERE i.ecu.id = ?1 " +
                "AND i.softwareVersion.id = ?2"
    )
    fun findByEcuIdAndVersionId(ecuId: UUID, versionId: UUID): EcuSoftwareInstallation?

    /**
     * Find software installation by [ecuId] and [softwareId].
     */
    fun findByEcuIdAndSoftwareIdAndActiveIsTrue(ecuId: UUID, softwareId: UUID): EcuSoftwareInstallation?

    /**
     * Count software installation by [softwareId].
     */
    fun countBySoftwareId(softwareId: UUID): Long
}
