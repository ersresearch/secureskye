/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.feign

import jp.co.trillium.secureskye.notification.main.configuration.FeignConfiguration
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialListProto
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialProto
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import java.util.UUID

/**
 * Feign client for communication with 'user-admin'.
 */
@FeignClient("user-admin", configuration = [FeignConfiguration::class])
interface UserAdminClient {

    /**
     * Get a user by [name] as a [CredentialProto].
     */
    @GetMapping("/api/internal/users")
    fun listUsers(@RequestParam name: String? = null): CredentialListProto

    /**
     * Get a user by [id] as a [CredentialProto].
     */
    @GetMapping("/api/internal/users/{id}")
    fun get(@PathVariable id: UUID): CredentialProto
}
