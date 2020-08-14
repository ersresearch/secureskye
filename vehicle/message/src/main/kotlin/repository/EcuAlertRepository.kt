/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.repository

import jp.co.trillium.secureskye.vehicle.message.model.EcuAlert
import jp.co.trillium.secureskye.vehicle.message.model.EcuAlertStatus
import jp.co.trillium.secureskye.vehicle.message.model.EcuAlertType
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

/**
 * The repository to persist @EcuAlert entity.
 */
@Repository
interface EcuAlertRepository : JpaRepository<EcuAlert, UUID> {

    /**
     * Find alert by ECU id and status.
     */
    fun findByEcuIdAndAlertStatus(
        ecuId: UUID,
        alertStatus: EcuAlertStatus,
        pageable: Pageable
    ): Page<EcuAlert>

    /**
     * Find by ECU id, alert status, alert type and pagination info.
     */
    fun findByEcuIdAndAlertStatusAndAlertType(
        ecuId: UUID,
        alertStatus: EcuAlertStatus,
        alertType: EcuAlertType,
        pageable: Pageable
    ): Page<EcuAlert>

    /**
     * Find alert by list ECU id and status.
     */
    fun findByEcuIdAndAlertStatus(
        ecuId: UUID,
        alertStatus: EcuAlertStatus
    ): List<EcuAlert>

    /**
     * Find by vehicle id and status.
     */
    fun findByVehicleIdAndAlertStatus(
        vehicleId: UUID,
        alertStatus: EcuAlertStatus
    ): List<EcuAlert>

    /**
     * Count by vehicle id, alert type and alert status.
     */
    fun countByVehicleIdAndAlertTypeAndAlertStatus(
        vehicleId: UUID,
        ecuAlertType: EcuAlertType,
        alertStatus: EcuAlertStatus
    ): Int

    /**
     * Find by vehicle id, alert status and pagination info.
     */
    fun findByVehicleIdAndAlertStatus(
        vehicleId: UUID,
        alertStatus: EcuAlertStatus,
        pageable: Pageable
    ): Page<EcuAlert>

    /**
     * Find by vehicle id, alert status, alert type and pagination info.
     */
    fun findByVehicleIdAndAlertStatusAndAlertType(
        vehicleId: UUID,
        alertStatus: EcuAlertStatus,
        alertType: EcuAlertType,
        pageable: Pageable
    ): Page<EcuAlert>

    /**
     * Find all alert and pagination info.
     */
    fun findByAlertStatus(
        alertStatus: EcuAlertStatus,
        pageable: Pageable
    ): Page<EcuAlert>
}
