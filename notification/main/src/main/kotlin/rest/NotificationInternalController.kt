/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.rest

import jp.co.trillium.secureskye.notification.main.api.proto.NotificationProto
import jp.co.trillium.secureskye.notification.main.service.NotificationService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * REST endpoints for notifications.
 *
 * @property notificationService Service containing the business logic for notifications.
 */
@RestController
@RequestMapping("/api/internal/notifications")
class NotificationInternalController(private val notificationService: NotificationService) {

    /**
     * Send a [notification] to user in the system based on path variable.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('notification:create')")
    fun notify(@RequestBody notification: NotificationProto, @RequestParam all: Boolean) =
        if (all) notificationService.notify(notification)
        else notificationService.send(notification)
}
