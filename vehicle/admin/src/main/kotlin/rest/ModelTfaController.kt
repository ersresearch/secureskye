/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

import jp.co.trillium.secureskye.oauth.model.OauthTotpListProto
import jp.co.trillium.secureskye.vehicle.admin.feign.UaaClient
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Endpoints for vehicle model management.
 */
@RestController
@RequestMapping("/api/vehicles/models/{id}/2fa")
class ModelTfaController(private val uaaClient: UaaClient) {

    /**
     * Get 2fa information by model [id].
     */
    @GetMapping
    @PreAuthorize("hasAuthority('vehicle-model:read')")
    fun getTotpSecretList(@PathVariable id: UUID): OauthTotpListProto? =
        uaaClient.getTotpSecretList(id)

    /**
     * Update [secretList] by model [id]. Preserve existing secrets and remove all orphans.
     */
    @PutMapping
    @PreAuthorize("hasAuthority('vehicle-model:update')")
    fun updateTotpSecretList(
        @PathVariable id: UUID,
        @RequestBody secretList: OauthTotpListProto
    ): OauthTotpListProto? = uaaClient.updateTotpSecretList(id, secretList)

    /**
     * Remove (disable) 2fa by model [id].
     */
    @DeleteMapping
    @PreAuthorize("hasAuthority('vehicle-model:update')")
    fun disable2FactorAuthenticationForGroup(@PathVariable id: UUID) =
        uaaClient.disable2FactorAuthenticationForGroup(id)
}
