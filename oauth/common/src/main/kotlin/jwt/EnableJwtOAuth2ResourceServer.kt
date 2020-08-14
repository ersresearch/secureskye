/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.jwt

import org.springframework.context.annotation.Import

/**
 * Support configuration for Jwt OAuth2 resource server.
 */
@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
@Import(JwtOAuth2ResourceServerConfiguration::class)
annotation class EnableJwtOAuth2ResourceServer
