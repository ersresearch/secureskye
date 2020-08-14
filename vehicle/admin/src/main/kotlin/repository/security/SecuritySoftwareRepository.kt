/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.repository.security

import jp.co.trillium.secureskye.vehicle.admin.model.security.SecuritySoftware
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

/**
 * Repository for managing [SecuritySoftware] entities.
 */
interface SecuritySoftwareRepository : JpaRepository<SecuritySoftware, UUID>
