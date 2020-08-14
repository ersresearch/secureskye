/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import jp.co.trillium.secureskye.common.json.JsonCommonModule
import jp.co.trillium.secureskye.ie.main.json.JsonIeModule
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
     * Main JSON [ObjectMapper].
     */
    @Bean
    @Primary
    fun objectMapper(jackson2ObjectMapperBuilder: Jackson2ObjectMapperBuilder): ObjectMapper =
        jackson2ObjectMapperBuilder.modulesToInstall(JsonCommonModule(), JsonIeModule())
            .build()
}
