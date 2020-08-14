/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.configuration

import jp.co.trillium.secureskye.common.util.Timestamps
import org.bson.Document
import org.springframework.core.convert.converter.Converter
import org.springframework.data.convert.CustomConversions
import org.springframework.data.convert.Jsr310Converters
import org.springframework.data.convert.ReadingConverter
import org.springframework.data.convert.WritingConverter
import org.springframework.data.mongodb.config.AbstractMongoConfiguration
import org.springframework.data.mongodb.core.convert.MongoCustomConversions
import java.time.LocalDateTime
import java.util.Date

/**
 * Configuration for MongoDB.
 */
abstract class CommonMongoConfiguration : AbstractMongoConfiguration() {

    /**
     * Registers additional custom converters.
     */
    override fun customConversions(): CustomConversions = MongoCustomConversions(
        listOf(
            LocalDateTimeReadConverter(),
            LocalDateTimeWriteConverter(),
            LongToLocalDateTimeConverter()
        )
    )

    /**
     * MongoDB reading converter for [LocalDateTime] that preserves nano-seconds.
     */
    @ReadingConverter
    class LocalDateTimeReadConverter : Converter<Document, LocalDateTime> {

        /**
         * [Converter.convert].
         */
        override fun convert(source: Document): LocalDateTime {
            val dt = source["dt"] as Date? ?: throw IllegalArgumentException()
            val ns = source["ns"] as Int? ?: 0

            return Jsr310Converters.DateToLocalDateTimeConverter.INSTANCE.convert(dt)
                .plusNanos(ns.toLong())
        }
    }

    /**
     * MongoDB reading converter from legacy [Long] fields to [LocalDateTime].
     */
    @ReadingConverter
    class LongToLocalDateTimeConverter : Converter<Long, LocalDateTime> {

        /**
         * [Converter.convert].
         */
        override fun convert(source: Long): LocalDateTime {
            return Timestamps.toLocalDateTime(source)
        }
    }

    /**
     * MongoDB writing converter for [LocalDateTime] that preserves nano-seconds.
     */
    @WritingConverter
    class LocalDateTimeWriteConverter : Converter<LocalDateTime, Document> {

        /**
         * [Converter.convert].
         */
        override fun convert(source: LocalDateTime): Document {
            return Document(
                mapOf(
                    "dt" to Jsr310Converters.LocalDateTimeToDateConverter.INSTANCE.convert(source),
                    "ns" to source.nano % MICROSECOND // Remove µs, as they're already included in the dt field.
                )
            )
        }
    }

    companion object {
        private const val MICROSECOND = 1_000_000
    }
}
