/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.repository

import jp.co.trillium.secureskye.vehicle.admin.model.Vehicle
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional
import java.util.Optional
import java.util.UUID

/**
 * Repository for managing [Vehicle] entities.
 */
@Transactional
interface VehicleRepository : JpaRepository<Vehicle, UUID>, JpaSpecificationExecutor<Vehicle> {

    /**
     * Search a specific vehicle by its associated [clientId].
     */
    fun findByClientId(clientId: String): Optional<Vehicle>

    /**
     * Count the vehicles by their model [id].
     */
    fun countByModelId(id: UUID): Long

    /**
     * Update the name of an existing model identified by [id] to [newName].
     */
    @Modifying
    @Query("UPDATE Vehicle SET name = ?2 WHERE id = ?1")
    fun updateName(id: UUID, newName: String)

    /**
     * Update the vin of an existing vehicle identified by [id] to [value].
     */
    @Modifying
    @Query("UPDATE #{#entityName} SET vin = ?2 WHERE id = ?1")
    fun updateVin(id: UUID, value: String)

    /**
     * Update the color of an existing vehicle identified by [id] to [value].
     */
    @Modifying
    @Query("UPDATE #{#entityName} SET color = ?2 WHERE id = ?1")
    fun updateColor(id: UUID, value: String)

    /**
     * Update the model of an existing vehicle identified by [id] to [modelId].
     */
    @Modifying
    @Query("UPDATE #{#entityName} SET model.id = ?2 WHERE id = ?1")
    fun updateModel(id: UUID, modelId: UUID)

    /**
     * Find all vehicle by [modelId].
     */
    fun findByModelId(modelId: UUID): List<Vehicle>

    /**
     * Filter vehicle by alert count.
     */
    @Query(
        "SELECT e FROM #{#entityName} e " +
                "WHERE e.alertCount.danger > 0 OR e.alertCount.warning > 0 OR  e.alertCount.info > 0"
    )
    fun filterByVehicleHasAlert(): List<Vehicle>

    /**
     * Filter vehicle available update.
     */
    @Query("SELECT e FROM #{#entityName} e WHERE e.updateCount > 0 ")
    fun filterByVehicleAvailableUpdate(): List<Vehicle>

    /**
     * Update vehicle deleted.
     */
    @Modifying
    @Query("UPDATE #{#entityName} SET deleted = true WHERE id = ?1")
    fun deletedVehicle(vehicleId: UUID)

    /**
     * Check vin is exist or not.
     */
    fun existsByVin(vin: String): Boolean
}
