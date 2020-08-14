/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.util

import java.time.Clock
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZoneOffset

/**
 * Utility for creating new timestamps and converting existing ones into other formats.
 */
@Suppress("MagicNumber")
object Timestamps {

    private val nanoClock = NanoClock()

    /**
     * Create a new timestamp for the current time with nanoseconds.
     */
    fun now() = Instant.now(nanoClock).run { epochSecond * 1_000_000_000 + nano }

    /**
     * Create a new [LocalDateTime] for the current time with nanoseconds.
     */
    fun nowTime(): LocalDateTime = LocalDateTime.now(nanoClock)

    /**
     * Convert the [timestamp] into a [LocalDateTime] including nanoseconds.
     */
    fun toLocalDateTime(timestamp: Long): LocalDateTime =
        Instant.ofEpochSecond(timestamp / 1_000_000_000, timestamp % 1_000_000_000)
            .atZone(ZoneOffset.UTC)
            .toLocalDateTime()

    /**
     * Convert the [localDateTime] into a timestamp including nanoseconds.
     */
    fun toTimestamp(localDateTime: LocalDateTime): Long =
        localDateTime.toEpochSecond(ZoneOffset.UTC) * 1_000_000_000 + localDateTime.nano

    /**
     * A [Clock] that supports nano-second precision.
     *
     * @property clock The clock to use as base for calculations.
     */
    private class NanoClock(private val clock: Clock = Clock.systemUTC()) : Clock() {

        /**
         * The instant set at initialization.
         */
        private val initialInstant = clock.instant()

        /**
         * The nanoseconds at initialization.
         */
        private val initialNanos = System.nanoTime()

        /**
         * [Clock.withZone].
         */
        override fun withZone(zone: ZoneId?): Clock = NanoClock(clock.withZone(zone))

        /**
         * [Clock.getZone].
         */
        override fun getZone(): ZoneId = clock.zone

        /**
         * [Clock.instant].
         */
        override fun instant(): Instant = initialInstant.plusNanos(System.nanoTime() - initialNanos)
    }
}
