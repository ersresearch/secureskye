/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.settings.rest

import jp.co.trillium.secureskye.user.settings.mapper.UnitSettingsMapper
import jp.co.trillium.secureskye.user.settings.model.UnitSettingsDto
import jp.co.trillium.secureskye.user.settings.model.UnitSystem
import jp.co.trillium.secureskye.user.settings.service.UnitSettingsService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Controller for user unit settings management.
 */
@RestController
@Validated
@RequestMapping("/api/users/{id}/settings/units")
class UnitSettingsController(
    private val unitSettingsMapper: UnitSettingsMapper,
    private val unitSettingsService: UnitSettingsService
) {

    /**
     * Get unit settings for the user's defined by [id].
     */
    @GetMapping
    @PreAuthorize("hasAuthority('user-settings:read')")
    fun getUnitSettings(@PathVariable id: UUID): UnitSettingsDto = unitSettingsService.getSettings(id)
        .let(unitSettingsMapper::settings)

    /**
     * Set all unit settings to a specific [system].
     */
    @PutMapping
    @PreAuthorize("hasAuthority('user-settings:update')")
    fun setUnitSettingsBySystem(@PathVariable id: UUID, @RequestParam system: UnitSystem): UnitSettingsDto =
        unitSettingsService.setSettingsBySystem(id, system)
            .let(unitSettingsMapper::settings)

    /**
     * Update one or more unit [settings].
     */
    @PatchMapping
    @PreAuthorize("hasAuthority('user-settings:update')")
    fun updateUnitSettings(@PathVariable id: UUID, @RequestBody settings: UnitSettingsDto): UnitSettingsDto =
        unitSettingsService.updateSettings(id, settings)
            .let(unitSettingsMapper::settings)
}
