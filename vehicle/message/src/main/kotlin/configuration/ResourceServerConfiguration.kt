/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.configuration

import jp.co.trillium.secureskye.jwt.EnableJwtOAuth2ResourceServer
import jp.co.trillium.secureskye.jwt.JwtOAuth2BearerTokenExtractor
import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationManager

/**
 * OAuth2 resource server specific configuration.
 */
@Configuration
@EnableResourceServer
@EnableJwtOAuth2ResourceServer
class ResourceServerConfiguration(
    private val jwtOAuth2TokenExtractor: JwtOAuth2BearerTokenExtractor,
    private val jwtOAuth2AuthenticationManager: OAuth2AuthenticationManager
) : ResourceServerConfigurerAdapter() {

    /**
     * [ResourceServerConfigurerAdapter.configure].
     */
    override fun configure(resources: ResourceServerSecurityConfigurer) {
        resources
            .resourceId("vehicle-message")
            .tokenExtractor(jwtOAuth2TokenExtractor)
            .authenticationManager(jwtOAuth2AuthenticationManager)
    }

    /**
     * [ResourceServerConfigurerAdapter.configure].
     */
    override fun configure(http: HttpSecurity) {
        http.httpBasic().disable()
            .authorizeRequests()
            .requestMatchers(EndpointRequest.to("health", "info", "metrics", "prometheus")).permitAll()
            .anyRequest().authenticated()
    }
}
