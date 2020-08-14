/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.repository

import jp.co.trillium.secureskye.vehicle.registry.model.EcuInfo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional
import java.util.Optional
import java.util.UUID

/**
 * Repository for managing [EcuInfo] entities.
 */
@Transactional
interface EcuInfoRepository : JpaRepository<EcuInfo, UUID> {
    /**
     * Find all ECU information belonging to a [vehicleId].
     */
    fun findByInterfaceInfoVehicleId(vehicleId: UUID): List<EcuInfo>

    /**
     * Find all ECU with no parent aka Gateways information belonging to a [vehicleId].
     */
    fun findByInterfaceInfoVehicleIdAndParentIdIsNull(vehicleId: UUID): List<EcuInfo>

    /**
     * Find all ECU with no parent aka Gateways.
     */
    @Query("Select e from EcuInfo e where e.type = 1")
    fun findAllGateway(): List<EcuInfo>

    /**
     * Find all normal ECU information belonging to a [vehicleId] .
     */
    @Query(
        "SELECT DISTINCT e FROM  #{#entityName} e WHERE e.interfaceInfo.vehicleId = ?1 AND e.securityStatus = '1'"
    )
    fun findByVehicleIdAndNormal(vehicleId: UUID): List<EcuInfo>

    /**
     * Find all normal ECU information belonging to a [vehicleId] with no parent.
     */
    @Query(
        "SELECT DISTINCT e FROM  #{#entityName} e " +
                "WHERE e.interfaceInfo.vehicleId = ?1 AND e.securityStatus = '1' AND e.parentId IS NULL"
    )
    fun findByVehicleIdAndNormalAndParentIdIsNull(vehicleId: UUID): List<EcuInfo>

    /**
     * Find all  available update ECU information belonging to a [vehicleId] .
     */
    @Query(
        "SELECT DISTINCT e FROM  #{#entityName} e JOIN  e.softwareInstallation installation " +
                "WHERE e.interfaceInfo.vehicleId = ?1 AND installation.softwareVersion.versionCode " +
                "< (SELECT MAX(version.versionCode) FROM EcuSoftwareVersion version " +
                "WHERE version.software.id=installation.softwareId)"
    )
    fun findByVehicleIdAndAvailableUpdate(vehicleId: UUID): List<EcuInfo>

    /**
     * Find all  available update ECU  information belonging to a [vehicleId] with no parent .
     */
    @Query(
        "SELECT DISTINCT e FROM  #{#entityName} e JOIN  e.softwareInstallation installation " +
                "WHERE e.interfaceInfo.vehicleId = ?1 AND e.parentId IS NULL " +
                "AND installation.softwareVersion.versionCode " +
                "< (SELECT MAX(version.versionCode) FROM EcuSoftwareVersion version " +
                "WHERE version.software.id=installation.softwareId)"
    )
    fun findByVehicleIdAndAvailableUpdateAndParentIdIsNull(vehicleId: UUID): List<EcuInfo>

    /**
     * Get ecu by ecu_id.
     */
    @Query(
        "SELECT e FROM #{#entityName} e WHERE e.interfaceInfo.ecuDeviceId = ?1 AND e.interfaceInfo.vehicleId = ?2"
    )
    fun findByInterfaceInfoEcuId(ecuDeviceId: String, vehicleId: UUID): List<EcuInfo>

    /**
     * Check gateway is exist or not by [vehicleId] .
     */
    @Query(
        "SELECT DISTINCT e FROM  #{#entityName} e WHERE e.interfaceInfo.vehicleId = ?1 AND e.type = '1'"
    )
    fun findByVehicleIdAndGateway(vehicleId: UUID): Optional<EcuInfo>

    /**
     * Get Ecu Device Id by its uuid.
     */
    @Query("SELECT e.interfaceInfo.ecuDeviceId FROM EcuInfo e WHERE e.id = ?1")
    fun getEcuDeviceId(id: UUID): String?
}
