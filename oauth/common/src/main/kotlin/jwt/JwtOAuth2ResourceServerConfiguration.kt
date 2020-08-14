/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.jwt

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Primary
import org.springframework.security.oauth2.provider.ClientDetailsService
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationManager
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService
import org.springframework.security.oauth2.provider.token.DefaultTokenServices
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore
import javax.sql.DataSource

/**
 * Configuration for JWT OAuth2 resource server.
 */
class JwtOAuth2ResourceServerConfiguration {

    /**
     * BEAN: clientDetailsService using JdbcClientDetailsService.
     */
    @Bean
    @ConditionalOnMissingBean
    fun jdbcClientDetailsService(dataSource: DataSource) = JdbcClientDetailsService(dataSource)

    /**
     * Access token converter for jwt.
     */
    @Bean
    fun jwtAccessTokenConverter() = JwtAccessTokenConverterFactory.forClient()

    /**
     * Token store for jwt.
     */
    @Bean
    @Primary
    fun jwtTokenStore(jwtAccessTokenConverter: JwtAccessTokenConverter) = JwtTokenStore(jwtAccessTokenConverter)

    /**
     * Token services for jwt.
     */
    @Bean("jwtTokenServices")
    @Primary
    fun jwtTokenServices(jwtTokenStore: JwtTokenStore): ResourceServerTokenServices {
        val tokenServices = DefaultTokenServices()
        tokenServices.setTokenStore(jwtTokenStore)
        return tokenServices
    }

    /**
     * Token store for oauth (jdbc).
     */
    @Bean
    fun jdbcTokenStore(dataSource: DataSource) = JdbcTokenStore(dataSource)

    /**
     * Token services for oauth (jdbc).
     */
    @Bean("jdbcTokenServices")
    fun jdbcTokenServices(
        jdbcClientDetailsService: ClientDetailsService,
        jdbcTokenStore: JdbcTokenStore
    ): ResourceServerTokenServices {
        val tokenServices = DefaultTokenServices()
        tokenServices.setTokenStore(jdbcTokenStore)
        tokenServices.setClientDetailsService(jdbcClientDetailsService)
        return tokenServices
    }

    /**
     * Token extractor to accept token type in header.
     */
    @Bean
    fun tokenExtractor() = JwtOAuth2BearerTokenExtractor()

    /**
     * OAuth2 authentication manager with mixed type jwt & oauth token.
     */
    @Bean
    fun jwtOAuth2AuthenticationManager(
        jdbcClientDetailsService: ClientDetailsService,
        @Qualifier("jwtTokenServices") jwtTokenServices: ResourceServerTokenServices,
        @Qualifier("jdbcTokenServices") jdbcTokenServices: ResourceServerTokenServices
    ): OAuth2AuthenticationManager {
        val authenticationManager = JwtOAuth2AuthenticationManager(
            jwtTokenServices,
            jdbcTokenServices,
            jdbcClientDetailsService
        )
        authenticationManager.setTokenServices(jwtTokenServices)
        return authenticationManager
    }
}
