/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import jp.co.trillium.secureskye.common.json.JsonCommonModule
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder

/**
 * Configuration for different Jackson [ObjectMapper]s of diverse data formats.
 */
@Configuration
class CommonObjectMapperConfiguration {

    /**
     * Object mapper for JSON and the standard one by default.
     */
    @Bean
    fun jackson2ObjectMapperBuilder(): Jackson2ObjectMapperBuilder = Jackson2ObjectMapperBuilder.json()
        .modulesToInstall(JsonCommonModule())

    /**
     * Mapper for default JSON format.
     */
    @Bean
    @Primary
    @ConditionalOnMissingBean
    fun objectMapper(): ObjectMapper = jackson2ObjectMapperBuilder().build()

    /**
     * Mapper for YAML format.
     */
    @Bean
    fun yamlMapper(): ObjectMapper = Jackson2ObjectMapperBuilder()
        .factory(YAMLFactory())
        .propertyNamingStrategy(PropertyNamingStrategy.KEBAB_CASE)
        .modulesToInstall(JsonCommonModule())
        .build()

    /**
     * Mapper for XML format.
     */
    @Bean
    fun xmlMapper(): ObjectMapper = Jackson2ObjectMapperBuilder
        .xml()
        .modulesToInstall(JsonCommonModule())
        .build()
}
