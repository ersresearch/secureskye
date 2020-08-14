/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.settings.repository

import jp.co.trillium.secureskye.user.settings.model.UnitSettings
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * Repository for managing [UnitSettings] entities.
 */
@Transactional
interface UnitSettingsRepository : JpaRepository<UnitSettings, UUID>
