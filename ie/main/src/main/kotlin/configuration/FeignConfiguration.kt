/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.configuration

import feign.Request
import feign.codec.Decoder
import feign.codec.Encoder
import jp.co.trillium.secureskye.jwt.JwtOAuth2FeignRequestInterceptor
import jp.co.trillium.secureskye.jwt.SecureSkyeClientCredentialsResourceDetails
import org.springframework.beans.factory.ObjectFactory
import org.springframework.boot.autoconfigure.http.HttpMessageConverters
import org.springframework.cloud.client.loadbalancer.LoadBalancerInterceptor
import org.springframework.cloud.openfeign.support.SpringDecoder
import org.springframework.cloud.openfeign.support.SpringEncoder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

/**
 * Feign client specific configuration.
 */
@Configuration
class FeignConfiguration(private val messageConverters: ObjectFactory<HttpMessageConverters>) {

    companion object {
        /**
         * Timeout when connect target server.
         */
        private const val TIMEOUT_CONNECT = 10000
        /**
         * Timeout when read from target server.
         */
        private const val TIMEOUT_READ = 300000
    }

    /**
     * Increase timeout for feign client.
     */
    @Bean
    fun options(): Request.Options {
        return Request.Options(TIMEOUT_CONNECT, TIMEOUT_READ)
    }

    /**
     * Encoder used to serialize data structures.
     */
    @Bean
    fun springEncoder(): Encoder = SpringEncoder(messageConverters)

    /**
     * Decoder used to deserialize data structures.
     */
    @Bean
    fun springDecoder(): Decoder = SpringDecoder(messageConverters)

    /**
     * Special OAuth2 request interceptor for Feign to forward tokens.
     */
    @Bean
    fun oAuth2FeignRequestInterceptor(
        secureSkyeClientCredentialsResourceDetails: SecureSkyeClientCredentialsResourceDetails,
        loadBalancerInterceptor: LoadBalancerInterceptor
    ) = JwtOAuth2FeignRequestInterceptor(secureSkyeClientCredentialsResourceDetails, loadBalancerInterceptor)
}
