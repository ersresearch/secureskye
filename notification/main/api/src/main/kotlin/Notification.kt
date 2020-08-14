/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.model

import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

/**
 * A notification to any or all user(s).
 *
 * @property recipient The receiver of this notification.
 * @property subject Short topic line.
 * @property message The actual content.
 * @property channel On which channel to inform the user (Email, etc.).
 */
@Document
data class Notification(
    var recipient: UUID = UUID(0, 0),
    var subject: String = "",
    var message: String = "",
    var channel: ChannelType = ChannelType.Default
)
