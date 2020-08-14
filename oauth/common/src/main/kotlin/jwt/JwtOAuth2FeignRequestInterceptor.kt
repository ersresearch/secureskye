/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.jwt

import feign.RequestTemplate
import org.springframework.cloud.client.loadbalancer.LoadBalancerInterceptor
import org.springframework.cloud.security.oauth2.client.feign.OAuth2FeignRequestInterceptor
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext
import org.springframework.security.oauth2.client.token.AccessTokenProvider
import org.springframework.security.oauth2.client.token.AccessTokenProviderChain
import org.springframework.security.oauth2.client.token.OAuth2AccessTokenSupport
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsAccessTokenProvider
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeAccessTokenProvider
import org.springframework.security.oauth2.client.token.grant.implicit.ImplicitAccessTokenProvider
import org.springframework.security.oauth2.client.token.grant.password.ResourceOwnerPasswordAccessTokenProvider

/**
 * JWT OAuth2 Feign request interceptor.
 */
class JwtOAuth2FeignRequestInterceptor(
    private val resource: SecureSkyeClientCredentialsResourceDetails,
    private val loadBalancerInterceptor: LoadBalancerInterceptor
) : OAuth2FeignRequestInterceptor(DefaultOAuth2ClientContext(), resource) {

    init {
        // Default providers for access token
        val accessTokenProviderList = listOf<AccessTokenProvider>(
            AuthorizationCodeAccessTokenProvider(),
            ImplicitAccessTokenProvider(),
            ResourceOwnerPasswordAccessTokenProvider(),
            ClientCredentialsAccessTokenProvider()
        )
        // Add load balancer interceptor to those providers
        accessTokenProviderList.forEach {
            if (it is OAuth2AccessTokenSupport) {
                it.setInterceptors(listOf(loadBalancerInterceptor))
            }
        }

        // Set access token provider to feign interceptor
        super.setAccessTokenProvider(AccessTokenProviderChain(accessTokenProviderList))
    }

    override fun apply(template: RequestTemplate) {

        // Authorization added info to header
        if (this.resource.addedInfo.isNotEmpty()) {
            template.header(
                SecureSkyeClientCredentialsResourceDetails.AUTH_ADDED_INFO_HEADER_KEY,
                this.resource.addedInfo
            )
        }

        // apply OAuth interceptor
        super.apply(template)
    }
}
