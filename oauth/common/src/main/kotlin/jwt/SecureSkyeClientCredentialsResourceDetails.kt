/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.jwt

import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails

/**
 * Configuration properties for OAuth2 secureskye client detail.
 */
class SecureSkyeClientCredentialsResourceDetails : ClientCredentialsResourceDetails() {

    companion object {
        /**
         * Authorization added info header key.
         */
        const val AUTH_ADDED_INFO_HEADER_KEY = "Authorization-Added-Info"
    }

    /**
     * Authorization additional info for passing in headers.
     */
    var addedInfo: List<String> = emptyList()
}
