/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.protobuf.ProtobufHttpMessageConverter

/**
 * Protobuf protocol specific configuration.
 */
@Configuration
class ProtobufConfiguration {

    /**
     * Converter for Protobuf messages.
     *
     * Enables automatic conversion of outgoing and ingoing HTTP messages to/from Protobuf.
     */
    @Bean
    fun protobufConverter() = ProtobufHttpMessageConverter()
}
