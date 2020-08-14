/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.feign

import jp.co.trillium.secureskye.ie.main.configuration.FeignConfiguration
import jp.co.trillium.secureskye.notification.main.api.proto.NotificationProto
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam

/**
 * Feign client for communication with 'notification-main'.
 */
@FeignClient("notification-main", configuration = [FeignConfiguration::class])
interface NotificationClient {

    /**
     * Send email to list users in template.
     */
    @PostMapping
    fun notify(@RequestBody info: NotificationProto, @RequestParam all: Boolean)
}
