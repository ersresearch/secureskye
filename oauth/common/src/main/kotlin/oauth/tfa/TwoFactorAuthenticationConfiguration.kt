/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa

import com.warrenstrange.googleauth.GoogleAuthenticator
import com.warrenstrange.googleauth.GoogleAuthenticatorConfig
import jp.co.trillium.secureskye.oauth.tfa.otp.totp.OauthTotpAccessRepository
import jp.co.trillium.secureskye.oauth.tfa.otp.totp.TotpConfigurationProperties
import jp.co.trillium.secureskye.oauth.tfa.otp.totp.OauthTotpRepository
import jp.co.trillium.secureskye.oauth.tfa.otp.totp.TwoFactorAuthenticationTotpProvider
import jp.co.trillium.secureskye.oauth.tfa.otp.totp.TwoFactorAuthenticationTotpRememberService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
import org.springframework.security.oauth2.provider.ClientDetailsService
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken
import java.util.concurrent.TimeUnit

/**
 * 2FA configuration.
 */
class TwoFactorAuthenticationConfiguration {

    /**
     * Default 2FA provider with [TwoFactorAuthenticationTotpProvider].
     */
    @ConditionalOnMissingBean(TwoFactorAuthenticationProvider::class)
    class TwoFactorAuthenticationTotpConfiguration {
        /**
         * Configuration properties bean for TOTP.
         */
        @Bean
        @ConfigurationProperties("security.oauth2.2fa.totp")
        fun totpConfigurationProperties() = TotpConfigurationProperties()

        /**
         * Google authenticator config bean.
         */
        @Bean
        fun googleAuthenticatorConfig(totpConfigurationProperties: TotpConfigurationProperties):
                GoogleAuthenticatorConfig {
            val builder = GoogleAuthenticatorConfig.GoogleAuthenticatorConfigBuilder()
            totpConfigurationProperties.timeStepSizeInSeconds
                ?.let(TimeUnit.SECONDS::toMillis)
                ?.let(builder::setTimeStepSizeInMillis)
            totpConfigurationProperties.windowSize?.let(builder::setWindowSize)
            totpConfigurationProperties.codeDigits?.let(builder::setCodeDigits)
            totpConfigurationProperties.keyRepresentation?.let(builder::setKeyRepresentation)
            totpConfigurationProperties.hmacHashFunction?.let(builder::setHmacHashFunction)
            return builder.build()
        }

        /**
         * Google authenticator bean.
         */
        @Bean
        fun googleAuthenticator(googleAuthenticatorConfig: GoogleAuthenticatorConfig) =
            GoogleAuthenticator(googleAuthenticatorConfig)

        /**
         * 2FA TOTP provider.
         */
        @Bean
        fun twoFactorAuthenticationTotpProvider(
            oauthTotpRepository: OauthTotpRepository,
            oauthTotpAccessRepository: OauthTotpAccessRepository,
            googleAuthenticator: GoogleAuthenticator
        ): TwoFactorAuthenticationProvider =
            TwoFactorAuthenticationTotpProvider(oauthTotpRepository, oauthTotpAccessRepository, googleAuthenticator)

        /**
         * 2FA TOTP remember service.
         */
        @Bean
        fun twoFactorAuthenticationRememberService(
            oauthTotpAccessRepository: OauthTotpAccessRepository
        ): TwoFactorAuthenticationRememberService =
            TwoFactorAuthenticationTotpRememberService(oauthTotpAccessRepository)
    }

    /**
     * 2FA request factory.
     */
    @Bean
    fun twoFactorAuthenticationRequestFactory(
        clientDetailsService: ClientDetailsService,
        twoFactorAuthenticationProvider: TwoFactorAuthenticationProvider
    ) = TwoFactorAuthenticationRequestFactory(clientDetailsService, twoFactorAuthenticationProvider)

    /**
     * OAuth server configuration.
     */
    class AuthorizationServerConfig(
        private val twoFactorAuthenticationRequestFactory: TwoFactorAuthenticationRequestFactory,
        private val userDetailsService: UserDetailsService,
        @Autowired(required = false)
        private val twoFactorAuthenticationRememberService: TwoFactorAuthenticationRememberService?
    ) : AuthorizationServerConfigurerAdapter() {
        override fun configure(endpoints: AuthorizationServerEndpointsConfigurer) {
            endpoints.requestFactory(twoFactorAuthenticationRequestFactory)

            twoFactorAuthenticationRememberService?.let {
                TwoFactorAuthenticationTokenServices(it).apply {
                    setTokenStore(endpoints.tokenStore)
                    setSupportRefreshToken(true)
                    setReuseRefreshToken(true)
                    setClientDetailsService(endpoints.clientDetailsService)
                    setTokenEnhancer(endpoints.tokenEnhancer)
                    setAuthenticationManager(ProviderManager(listOf(
                        PreAuthenticatedAuthenticationProvider().apply {
                            setPreAuthenticatedUserDetailsService(
                                UserDetailsByNameServiceWrapper<PreAuthenticatedAuthenticationToken>(
                                    userDetailsService
                                )
                            )
                        }
                    )))
                }
            }?.let(endpoints::tokenServices)
        }
    }
}
