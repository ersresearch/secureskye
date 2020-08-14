/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration
import org.springframework.security.oauth2.provider.expression.OAuth2MethodSecurityExpressionHandler

/**
 * Method security specific configuration.
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
class MethodSecurityConfiguration : GlobalMethodSecurityConfiguration() {

    /**
     * [GlobalMethodSecurityConfiguration.createExpressionHandler].
     */
    override fun createExpressionHandler(): MethodSecurityExpressionHandler =
        OAuth2MethodSecurityExpressionHandler()
}
