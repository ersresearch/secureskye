/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.admin.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import feign.FeignException
import feign.Request
import feign.codec.Decoder
import feign.codec.Encoder
import feign.codec.ErrorDecoder
import jp.co.trillium.secureskye.jwt.JwtOAuth2FeignRequestInterceptor
import jp.co.trillium.secureskye.jwt.SecureSkyeClientCredentialsResourceDetails
import jp.co.trillium.secureskye.oauth.exception.TwoFactorAuthenticationSettingsException
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

    /**
     * Error decoder.
     */
    @Bean
    fun errorDecoder(objectMapper: ObjectMapper): ErrorDecoder = ErrorDecoder { methodKey, response ->
        // Try forward TwoFactorAuthenticationSettingsException
        try {
            val error = objectMapper.readTree(response.body().asReader())
            TwoFactorAuthenticationSettingsException(message = error.get("message").textValue()).apply {
                objectMapper.updateValue(this, error.get("details"))
            }
        } catch (e: Exception) {
            FeignException.errorStatus(methodKey, response)
        }
    }
}
