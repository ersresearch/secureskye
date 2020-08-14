/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.repository

import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftware
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.UUID

/**
 * Repository for managing [EcuSoftware] entities.
 */
interface EcuSoftwareRepository : JpaRepository<EcuSoftware, UUID> {

    /**
     * Get software information [softwareId] along with all its versions.
     */
    @EntityGraph(attributePaths = ["versions"])
    fun getById(softwareId: UUID): EcuSoftware?

    /**
     * Find all available software in system and fetch its version.
     */
    @Query("select s from EcuSoftware s left join fetch s.versions")
    fun findAllEagerVersion(): MutableList<EcuSoftware>
}
