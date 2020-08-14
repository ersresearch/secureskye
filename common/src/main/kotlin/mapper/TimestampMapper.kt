/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.mapper

import jp.co.trillium.secureskye.common.util.Timestamps
import org.mapstruct.Mapper
import java.time.LocalDateTime

/**
 * Mapper between Protobuf models and database models of UUIDs.
 */
@Mapper(config = GlobalMapperConfig::class)
abstract class TimestampMapper {
    /**
     * Map [timestamp] to [LocalDateTime].
     */
    fun timestamp(timestamp: Long): LocalDateTime = Timestamps.toLocalDateTime(timestamp)

    /**
     * Map [localDateTime] to [Long].
     */
    fun timestamp(localDateTime: LocalDateTime): Long = Timestamps.toTimestamp(localDateTime)
}
