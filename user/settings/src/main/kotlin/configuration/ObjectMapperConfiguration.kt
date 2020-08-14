/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.settings.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder

/**
 * Configuration for different Jackson [ObjectMapper]s of diverse data formats.
 */
@Configuration
class ObjectMapperConfiguration {

    /**
     * Customized standard JSON mapper to write Enums as indexes.
     */
    @Bean
    @Primary
    fun objectMapper(jackson2ObjectMapperBuilder: Jackson2ObjectMapperBuilder): ObjectMapper =
        jackson2ObjectMapperBuilder
            .featuresToEnable(SerializationFeature.WRITE_ENUMS_USING_INDEX)
            .build()
}
