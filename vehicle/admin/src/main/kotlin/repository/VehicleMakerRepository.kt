/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.repository

import jp.co.trillium.secureskye.vehicle.admin.model.VehicleMaker
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

/**
 * Repository for managing [VehicleMaker] entities.
 */
@Repository
interface VehicleMakerRepository : JpaRepository<VehicleMaker, UUID> {
    /**
     * Find maker by [makerName].
     */
    fun findByName(makerName: String): VehicleMaker?
}
