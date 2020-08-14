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
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

/**
 * Controller for user unit settings of the authenticated user.
 */
@RestController
@Validated
@RequestMapping("/api/me/settings/units")
class MeController(
    private val unitSettingsMapper: UnitSettingsMapper,
    private val unitSettingsService: UnitSettingsService
) {

    /**
     * Get unit settings for the current user.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('user-settings:read')")
    fun getMeUnitSettings(principal: Principal): UnitSettingsDto = unitSettingsService.getMeSettings(principal.name)
        .let(unitSettingsMapper::settings)

    /**
     * Set all unit settings of the current user to a specific [system].
     */
    @PutMapping
    @PreAuthorize("hasAuthority('user-settings:update')")
    fun setUnitSettingsBySystem(principal: Principal, @RequestParam system: UnitSystem): UnitSettingsDto =
        unitSettingsService.setMeSettingsBySystem(principal.name, system)
            .let(unitSettingsMapper::settings)

    /**
     * Update one or more unit [settings] of the current user.
     */
    @PatchMapping
    @PreAuthorize("hasAuthority('user-settings:update')")
    fun updateUnitSettings(principal: Principal, @RequestBody settings: UnitSettingsDto): UnitSettingsDto =
        unitSettingsService.updateMeSettings(principal.name, settings)
            .let(unitSettingsMapper::settings)
}
