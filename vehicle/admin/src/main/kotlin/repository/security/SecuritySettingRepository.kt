/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.repository.security

import jp.co.trillium.secureskye.vehicle.admin.model.security.SecuritySetting
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

/**
 * Repository for managing [SecuritySetting] entities.
 */
interface SecuritySettingRepository : JpaRepository<SecuritySetting, UUID> {
    /**
     * Find  security setting by [securitySoftwareId].
     */
    fun findBySecuritySoftwareId(securitySoftwareId: UUID): List<SecuritySetting>
}
