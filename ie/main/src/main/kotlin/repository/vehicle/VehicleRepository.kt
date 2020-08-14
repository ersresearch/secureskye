/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.vehicle

import jp.co.trillium.secureskye.ie.main.model.vehicle.Vehicle
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional
import java.util.UUID
import java.util.stream.Stream

/**
 * Repository for managing [Vehicle] entities.
 */
@Transactional
interface VehicleRepository : JpaRepository<Vehicle, UUID> {

    /**
     * List all vehicle in a Java 8 [Stream].
     */
    @Query("SELECT v FROM VehicleIe v")
    fun streamAll(): Stream<Vehicle>
}
