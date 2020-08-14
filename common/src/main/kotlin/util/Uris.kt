/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.util

import org.springframework.web.util.UriComponentsBuilder
import javax.servlet.http.HttpServletRequest

/**
 * Uris.
 */
@Suppress("SpreadOperator")
object Uris {

    /**
     * Header for the original request URL protocol/scheme when behind a gateway.
     */
    private const val HEADER_X_FORWARDED_PROTO = "X-Forwarded-Proto"

    /**
     * Header for the original request URL host when behind a gateway.
     */
    private const val HEADER_X_FORWARDED_HOST = "X-Forwarded-Host"

    /**
     * Header for the original request URL port when behind a gateway.
     */
    private const val HEADER_X_FORWARDED_PORT = "X-Forwarded-Port"

    /**
     * Header for the original request URL prefix when behind a gateway.
     */
    private const val HEADER_X_FORWARDED_PREFIX = "X-Forwarded-Prefix"

    /**
     * Build a Uri to the current service, based on information of the [request], respecting special headers when behind
     * a gateway. The [segments] define the path segments.
     */
    fun buildFull(request: HttpServletRequest, vararg segments: String) = UriComponentsBuilder.newInstance()
        .scheme(request.getHeader(HEADER_X_FORWARDED_PROTO) ?: request.scheme)
        .host(request.getHeader(HEADER_X_FORWARDED_HOST) ?: request.serverName)
        .port(request.getHeader(HEADER_X_FORWARDED_PORT) ?: request.serverPort.toString())
        .path(request.getHeader(HEADER_X_FORWARDED_PREFIX) ?: request.contextPath)
        .pathSegment(*segments)
        .toUriString()

    /**
     * Build a Uri from the path [segments].
     */
    fun build(vararg segments: String) = UriComponentsBuilder.newInstance()
        .pathSegment(*segments)
        .toUriString()
}
