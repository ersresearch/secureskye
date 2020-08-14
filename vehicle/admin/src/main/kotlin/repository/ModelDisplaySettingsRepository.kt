/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.repository

import jp.co.trillium.secureskye.vehicle.admin.model.ModelDisplaySettings
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

/**
 * Repository for managing [ModelDisplaySettings] entities.
 */
@Repository
interface ModelDisplaySettingsRepository : JpaRepository<ModelDisplaySettings, UUID> {

    /**
     * List out display settings list of a modal by model's [uuid].
     */
    fun findByModelId(uuid: UUID): List<ModelDisplaySettings>
}
