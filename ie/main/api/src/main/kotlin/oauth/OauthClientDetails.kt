/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.model.oauth

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

/**
 * `oauth_client_details` table entity.
 *
 * @property clientId client id.
 * @property resourceIds resource ids.
 * @property clientSecret client secret.
 * @property scope scope.
 * @property authorizedGrantTypes grant types.
 * @property webServerRedirectUri redirect URI.
 * @property authorities authorities.
 * @property accessTokenValidity access token validity.
 * @property refreshTokenValidity refresh token validity.
 * @property additionalInformation additional info.
 * @property autoapprove auto approve.
 */
@Entity
@Table(name = "oauth_client_details")
data class OauthClientDetails(
    @Id
    @Column(name = "client_id")
    var clientId: String? = null,
    @Column(name = "resource_ids")
    var resourceIds: String? = null,
    @Column(name = "client_secret")
    var clientSecret: String? = null,
    @Column(name = "scope")
    var scope: String? = null,
    @Column(name = "authorized_grant_types")
    var authorizedGrantTypes: String? = null,
    @Column(name = "web_server_redirect_uri")
    var webServerRedirectUri: String? = null,
    @Column(name = "authorities")
    var authorities: String? = null,
    @Column(name = "access_token_validity")
    var accessTokenValidity: Int? = null,
    @Column(name = "refresh_token_validity")
    var refreshTokenValidity: Int? = null,
    @Column(name = "additional_information")
    var additionalInformation: String? = null,
    @Column(name = "autoapprove")
    var autoapprove: String? = null
)
