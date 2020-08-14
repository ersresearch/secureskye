/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.repository

import jp.co.trillium.secureskye.vehicle.admin.model.VehicleModel
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * Repository for managing [VehicleModel] entities.
 */
@Transactional
interface VehicleModelRepository : JpaRepository<VehicleModel, UUID> {
    /**
     * Find vehicle model by [modelName].
     */
    fun findByName(modelName: String): VehicleModel?

    /**
     * Count the model by their maker [id].
     */
    fun countByMakerId(id: UUID): Long
}
