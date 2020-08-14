/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.service

import jp.co.trillium.secureskye.notification.main.api.proto.NotificationProto
import jp.co.trillium.secureskye.notification.main.mapper.NotificationMapper
import jp.co.trillium.secureskye.notification.main.model.ChannelType
import org.springframework.stereotype.Service

/**
 * Service for business logic of notifications.
 */
@Service
class NotificationService(
    private val emailService: EmailService,
    private val notificationMapper: NotificationMapper
) {

    /**
     * Send a [notification] to all users in the system.
     * The [NotificationProto.getRecipient] is ignored in this case.
     */
    fun notify(notification: NotificationProto) {
        val notif = notificationMapper.notification(notification)
        when (notif.channel) {
            ChannelType.Default,
            ChannelType.Email -> emailService.notify(notif)
        }
    }

    /**
     * Send a [notification] to a single user.
     */
    fun send(notification: NotificationProto) {
        val notif = notificationMapper.notification(notification)
        when (notif.channel) {
            ChannelType.Default,
            ChannelType.Email -> emailService.send(notif)
        }
    }
}
