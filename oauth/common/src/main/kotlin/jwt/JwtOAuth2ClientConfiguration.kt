/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.jwt

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean

/**
 * Configuration for JWT OAuth2 client.
 */
class JwtOAuth2ClientConfiguration {

    /**
     * Configuration properties for OAuth2 secureskye client detail `security.oauth2.secureskye.client`.
     */
    @Bean
    @ConfigurationProperties("security.oauth2.secureskye.client")
    fun secureSkyeClientCredentialsResourceDetails() = SecureSkyeClientCredentialsResourceDetails()
}
