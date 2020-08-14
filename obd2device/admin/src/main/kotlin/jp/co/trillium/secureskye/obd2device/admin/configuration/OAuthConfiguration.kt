/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.admin.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.provider.ClientRegistrationService
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService
import javax.sql.DataSource

/**
 * OAuth specific configuration.
 */
@Configuration
class OAuthConfiguration(private val dataSource: DataSource) {

    /**
     * Bean for managing OAuth client registration.
     */
    @Bean
    fun clientRegistrationService(): ClientRegistrationService = JdbcClientDetailsService(dataSource).apply {
        setPasswordEncoder(passwordEncoder())
    }

    /**
     * Bean for any kind of password encoding.
     */
    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()
}
