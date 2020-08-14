/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.configuration

import jp.co.trillium.secureskye.jwt.EnableJwtOAuth2ResourceServer
import jp.co.trillium.secureskye.jwt.JwtOAuth2BearerTokenExtractor
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationManager

/**
 * OAuth2 resource server configuration.
 */
@Configuration
@EnableResourceServer
@EnableJwtOAuth2ResourceServer
class ResourceServerConfig(
    private val jwtOAuth2TokenExtractor: JwtOAuth2BearerTokenExtractor,
    private val jwtOAuth2AuthenticationManager: OAuth2AuthenticationManager
) : ResourceServerConfigurerAdapter() {

    companion object {
        private const val USER_RESOURCE_ID = "uaa"
    }

    /**
     * [ResourceServerConfigurerAdapter.configure].
     */
    override fun configure(resources: ResourceServerSecurityConfigurer) {
        resources
            .resourceId(USER_RESOURCE_ID)
            .tokenExtractor(jwtOAuth2TokenExtractor)
            .authenticationManager(jwtOAuth2AuthenticationManager)
    }

    /**
     * [ResourceServerConfigurerAdapter.configure].
     */
    override fun configure(http: HttpSecurity) {
        http
            .antMatcher("/oauth/2fa/**")
            .authorizeRequests().anyRequest().authenticated()
    }
}
