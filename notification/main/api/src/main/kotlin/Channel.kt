/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.model

import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

/**
 * `notification_channel` table entity.
 *
 * @property id channel id.
 * @property type channel types.
 * @property name channel name.
 * @property description description.
 */
@Entity
@Table(name = "notification_channel")
data class Channel(
    @Id
    @Column(nullable = false)
    var id: UUID = UUID(0, 0),

    var type: ChannelType = ChannelType.Default,

    @Column(nullable = false)
    var name: String = "",

    @Column(nullable = false)
    var description: String = ""
)
