/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.model

import com.fasterxml.jackson.annotation.JsonProperty
import jp.co.trillium.secureskye.oauth.model.Credentials
import java.io.Serializable
import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.IdClass
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

/**
 * `notification_subscription` table entity.
 *
 * @property userId user ID.
 * @property topicId topic ID.
 * @property channelId channel ID.
 */
@Entity
@Table(name = "notification_subscription")
@IdClass(Subscription.PK::class)
data class Subscription(
    @Id
    @Column(name = "user_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var userId: UUID = UUID(0, 0),

    @Id
    @Column(name = "topic_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var topicId: UUID = UUID(0, 0),

    @Id
    @Column(name = "channel_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var channelId: UUID = UUID(0, 0),

    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = [CascadeType.REMOVE])
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    var user: Credentials = Credentials(userId),

    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = [CascadeType.REMOVE])
    @JoinColumn(name = "topic_id", insertable = false, updatable = false)
    var topic: Topic = Topic(topicId),

    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = [CascadeType.REMOVE])
    @JoinColumn(name = "channel_id", insertable = false, updatable = false)
    var channel: Channel = Channel(channelId)
) {
    /**
     * `notification_subscription` table's primary key.
     */
    data class PK(
        var userId: UUID = UUID(0, 0),
        var topicId: UUID = UUID(0, 0),
        var channelId: UUID = UUID(0, 0)
    ) : Serializable
}
