/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.jwt

import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken

/**
 * Extension of PreAuthenticatedAuthenticationToken with additional `tokenType` for indication of jwt or oauth2 access
 * token.
 */
class JwtOAuth2PreAuthenticatedAuthenticationToken(principal: Any, val tokenType: BearerTokenType?) :
    PreAuthenticatedAuthenticationToken(principal, "")
