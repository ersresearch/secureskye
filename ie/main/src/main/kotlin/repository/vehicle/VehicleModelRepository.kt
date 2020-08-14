/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.vehicle

import jp.co.trillium.secureskye.ie.main.model.vehicle.VehicleModel
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional
import java.util.UUID
import java.util.stream.Stream

/**
 * Repository for managing [VehicleModel] entities.
 */
@Transactional
interface VehicleModelRepository : JpaRepository<VehicleModel, UUID> {

    /**
     * List all vehicle model in a Java 8 [Stream].
     */
    @Query("SELECT vm FROM VehicleModelIe vm")
    fun streamAll(): Stream<VehicleModel>
}
