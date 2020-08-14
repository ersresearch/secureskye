/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.model

/**
 * The channel describes a notification channel where users can get informed.
 *
 * @property value Integer representation of the channel.
 */
enum class ChannelType(val value: Int) {
    /**
     * Standard channel, auto-selected by the service.
     */
    Default(0),

    /**
     * Inform by E-Mail.
     */
    Email(1)
}
