/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.mapper

import org.mapstruct.Mapper
import java.util.UUID

/**
 * Mapper between Protobuf models and database models of UUIDs.
 */
@Mapper(config = GlobalMapperConfig::class)
abstract class UuidMapper {
    /**
     * Map [uuid] to [String].
     */
    fun uuidString(uuid: UUID): String = uuid.toString()

    /**
     * Map [uuidString] to [UUID].
     */
    fun uuidString(uuidString: String): UUID = if (uuidString.isBlank()) UUID(0, 0) else UUID.fromString(uuidString)
}
