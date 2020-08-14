/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import feign.FeignException
import feign.Request
import feign.codec.Decoder
import feign.codec.Encoder
import feign.codec.ErrorDecoder
import jp.co.trillium.secureskye.jwt.JwtOAuth2FeignRequestInterceptor
import jp.co.trillium.secureskye.jwt.SecureSkyeClientCredentialsResourceDetails
import mu.KLogging
import org.springframework.beans.factory.ObjectFactory
import org.springframework.boot.autoconfigure.http.HttpMessageConverters
import org.springframework.cloud.client.loadbalancer.LoadBalancerInterceptor
import org.springframework.cloud.openfeign.support.SpringDecoder
import org.springframework.cloud.openfeign.support.SpringEncoder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.oauth2.common.exceptions.UnauthorizedClientException
import org.springframework.web.client.HttpServerErrorException
import java.time.Duration

/**
 * Feign client specific configuration.
 */
@Configuration
class FeignConfiguration(private val messageConverters: ObjectFactory<HttpMessageConverters>) {

    /**
     * Increase timeout for feign client.
     */
    @Bean
    fun options(): Request.Options {
        return Request.Options(CONNECT_TIMEOUT.toMillis().toInt(), READ_TIMEOUT.toMillis().toInt())
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
            val message = error.get("message").textValue()
            val status: Int = response.status()

            when (status) {
                HttpStatus.BAD_REQUEST.value() -> IllegalArgumentException(message).apply {
                    objectMapper.updateValue(this, error.get("details"))
                }
                HttpStatus.UNAUTHORIZED.value() -> UnauthorizedClientException(message)
                HttpStatus.FORBIDDEN.value() -> AccessDeniedException(message)
                HttpStatus.INTERNAL_SERVER_ERROR.value() ->
                    HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR, message)
                else -> FeignException.errorStatus(methodKey, response)
            }
        } catch (e: Exception) {
            logger.error(e) { "Error when decoding the error response" }
            FeignException.errorStatus(methodKey, response)
        }
    }

    private companion object : KLogging() {

        /**
         * Timeout when connect target server.
         */
        private val CONNECT_TIMEOUT = Duration.ofSeconds(10)

        /**
         * Timeout when read from target server.
         */
        private val READ_TIMEOUT = Duration.ofMinutes(5)
    }
}
