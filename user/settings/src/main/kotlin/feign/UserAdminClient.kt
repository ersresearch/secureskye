/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.settings.feign

import jp.co.trillium.secureskye.user.admin.api.proto.CredentialListProto
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialProto
import jp.co.trillium.secureskye.user.settings.configuration.FeignConfiguration
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam

/**
 * Feign client for communication with 'user-admin'.
 */
@FeignClient("user-admin", configuration = [FeignConfiguration::class])
interface UserAdminClient {

    /**
     * Get a user by [name] as a [CredentialProto].
     *
     */
    @GetMapping("/api/internal/users")
    fun getUsers(@RequestParam name: String? = null): CredentialListProto

    /**
     * Get a user by [value] which is defined by [field] as a [CredentialProto].
     */
    @GetMapping("/api/internal/users/{value}")
    fun getUser(@PathVariable value: String, @RequestParam field: String): CredentialProto
}
