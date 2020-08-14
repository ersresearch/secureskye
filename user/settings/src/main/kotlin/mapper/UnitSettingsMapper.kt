/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.settings.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.user.settings.model.UnitSettings
import jp.co.trillium.secureskye.user.settings.model.UnitSettingsDto
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingTarget
import java.util.UUID

/**
 * Mapper between Protobuf models and database models of credential messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [UuidMapper::class]
)
abstract class UnitSettingsMapper {

    /**
     * Map [settings] to [UnitSettingsDto].
     */
    abstract fun settings(settings: UnitSettings): UnitSettingsDto

    /**
     * Map [id] and [settings] to [UnitSettings].
     */
    abstract fun settings(id: UUID, settings: UnitSettingsDto): UnitSettings

    /**
     * Update the [target] with [source].
     */
    @Mapping(target = "id", ignore = true)
    abstract fun update(source: UnitSettingsDto, @MappingTarget target: UnitSettings)
}
