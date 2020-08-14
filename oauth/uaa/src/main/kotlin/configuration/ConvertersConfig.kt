/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.converter.Converter
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.Date

/**
 * Some string converters.
 */
@Configuration
class ConvertersConfig {

    /**
     * Converter for the format `yyyy-MM-dd HH:mm:ss`.
     *
     * Currently needed for the approval revoke form that needs to bind the expiresAt and lastUpdatedAt
     * dates of an approval.
     *
     * @throws IllegalArgumentException If the [String] could not be parsed.
     */
    @Bean
    fun stringDateConverter(): Converter<String, Date> {
        val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
        // We can not use a lambda here since Spring can't detect the generic types that way.
        return Converter { source ->
            try {
                return@Converter sdf.parse(source)
            } catch (e: ParseException) {
                throw IllegalArgumentException(e)
            }
        }
    }
}
