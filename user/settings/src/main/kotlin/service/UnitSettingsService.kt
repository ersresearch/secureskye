/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.settings.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.user.settings.feign.UserAdminClient
import jp.co.trillium.secureskye.user.settings.mapper.UnitSettingsMapper
import jp.co.trillium.secureskye.user.settings.model.LengthUnit
import jp.co.trillium.secureskye.user.settings.model.MassUnit
import jp.co.trillium.secureskye.user.settings.model.TemperatureUnit
import jp.co.trillium.secureskye.user.settings.model.UnitSettings
import jp.co.trillium.secureskye.user.settings.model.UnitSettingsDto
import jp.co.trillium.secureskye.user.settings.model.UnitSystem
import jp.co.trillium.secureskye.user.settings.repository.UnitSettingsRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import java.util.UUID
import javax.persistence.EntityNotFoundException

/**
 * Business logic for administering unit settings.
 */
@Service
class UnitSettingsService(
    private val uuidMapper: UuidMapper,
    private val unitSettingsMapper: UnitSettingsMapper,
    private val unitSettingsRepository: UnitSettingsRepository,
    private val userAdminClient: UserAdminClient
) {

    /**
     * Get unit settings of the user defined by [id].
     *
     * @throws EntityNotFoundException In case the entity for given [id] doesn't exist.
     */
    fun getSettings(id: UUID): UnitSettings = unitSettingsRepository.findById(id)
        .orElse(UnitSettings(id))

    /**
     * Get unit settings of the currently authenticated user by its [name].
     *
     * @throws EntityNotFoundException IN case the entity with given [name] doesn't exist.
     */
    fun getMeSettings(name: String): UnitSettings = loadUserId(name).let(::getSettings)

    /**
     * Set all units related settings with given [id] at once by the [system].
     */
    fun setSettingsBySystem(id: UUID, system: UnitSystem): UnitSettings = unitSettingsRepository.save(
        when (system) {
            UnitSystem.Metric ->
                UnitSettings(id, LengthUnit.Kilometers, MassUnit.Kilograms, TemperatureUnit.Celsius)
            UnitSystem.Imperial ->
                UnitSettings(id, LengthUnit.Miles, MassUnit.Pounds, TemperatureUnit.Fahrenheit)
        }
    )

    /**
     * Sett all units related settings for the currently authenticated user at once by the [system].
     */
    fun setMeSettingsBySystem(name: String, system: UnitSystem): UnitSettings =
        loadUserId(name).let { setSettingsBySystem(it, system) }

    /**
     * Update one or more unit [settings] with given [id] for the user.
     */
    fun updateSettings(id: UUID, settings: UnitSettingsDto): UnitSettings =
        unitSettingsRepository.findById(id)
            .orElse(UnitSettings(id))
            .also { unitSettingsMapper.update(settings, it) }
            .let(unitSettingsRepository::save)

    /**
     * Update one ore more unit [settings] for the currently authenticated user.
     */
    fun updateMeSettings(name: String, settings: UnitSettingsDto): UnitSettings =
        loadUserId(name).let { updateSettings(it, settings) }

    /**
     * Load the user ID for the given [name].
     */
    @Cacheable("user-name-to-user-id")
    private fun loadUserId(name: String) =
        uuidMapper.uuidString(userAdminClient.getUser(name, "name").id)
}
