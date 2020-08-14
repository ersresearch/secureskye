/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.configuration

import jp.co.trillium.secureskye.oauth.tfa.EnableTwoFactorAuthentication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer
import org.springframework.security.oauth2.provider.approval.ApprovalStore
import org.springframework.security.oauth2.provider.approval.JdbcApprovalStore
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService
import org.springframework.security.oauth2.provider.code.AuthorizationCodeServices
import org.springframework.security.oauth2.provider.code.JdbcAuthorizationCodeServices
import org.springframework.security.oauth2.provider.token.TokenStore
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore
import javax.sql.DataSource

/**
 * OAuth2 authorization server configuration.
 */
@Configuration
@EnableAuthorizationServer
@EnableTwoFactorAuthentication
class AuthorizationServerConfig(
    private val dataSource: DataSource,
    private val authenticationManager: AuthenticationManager,
    private val userDetailsService: UserDetailsService,
    private val passwordEncoder: PasswordEncoder
) : AuthorizationServerConfigurerAdapter() {

    /**
     * BEAN: clientDetailsService using [JdbcClientDetailsService].
     */
    @Bean
    fun clientDetailsService() = JdbcClientDetailsService(dataSource)

    /**
     * BEAN: tokenStore using [JdbcTokenStore].
     */
    @Bean
    fun tokenStore(): TokenStore = JdbcTokenStore(dataSource)

    /**
     * BEAN: approvalStore using [JdbcApprovalStore].
     */
    @Bean
    fun approvalStore(): ApprovalStore = JdbcApprovalStore(dataSource)

    /**
     * BEAN: authorizationCodeServices using [JdbcAuthorizationCodeServices].
     */
    @Bean
    fun authorizationCodeServices(): AuthorizationCodeServices = JdbcAuthorizationCodeServices(dataSource)

    /**
     * [AuthorizationServerConfigurerAdapter.configure].
     */
    override fun configure(clients: ClientDetailsServiceConfigurer) {
        clients.withClientDetails(clientDetailsService())
    }

    /**
     * [AuthorizationServerConfigurerAdapter.configure].
     */
    @Suppress("DEPRECATION")
    override fun configure(oauthServer: AuthorizationServerSecurityConfigurer) {
        oauthServer
            .allowFormAuthenticationForClients()
            .passwordEncoder(passwordEncoder)
    }

    /**
     * [AuthorizationServerConfigurerAdapter.configure].
     */
    override fun configure(endpoints: AuthorizationServerEndpointsConfigurer) {
        endpoints
            .approvalStore(approvalStore())
            .authorizationCodeServices(authorizationCodeServices())
            .tokenStore(tokenStore())
            .authenticationManager(authenticationManager)
            .userDetailsService(userDetailsService)
    }
}
