/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.tfa

import org.springframework.context.annotation.Import

/**
 * Enable 2FA after oauth2.
 */
@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
@Import(
    TwoFactorAuthenticationConfiguration::class,
    TwoFactorAuthenticationConfiguration.TwoFactorAuthenticationTotpConfiguration::class,
    TwoFactorAuthenticationConfiguration.AuthorizationServerConfig::class
)
annotation class EnableTwoFactorAuthentication
