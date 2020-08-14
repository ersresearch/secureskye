/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.repository.security

import jp.co.trillium.secureskye.vehicle.admin.model.security.SecuritySettingConfig
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.UUID

/**
 * Repository for managing [SecuritySettingConfig] entities.
 */
interface SecuritySettingConfigRepository : JpaRepository<SecuritySettingConfig, UUID> {
    /**
     * Find distinct security setting config.
     */
    @Query(
        "SELECT DISTINCT(e.vehicleSecurityConfig.id) FROM #{#entityName} e " +
                "WHERE e.securitySetting.securitySoftware.id = ?1"
    )
    fun findBySecuritySoftwareIdAndDistinctVehicleSecurityConfig(securitySoftwareId: UUID): List<UUID>
}
