/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.notification.main.api.proto.ChannelListProto
import jp.co.trillium.secureskye.notification.main.api.proto.ChannelProto
import jp.co.trillium.secureskye.notification.main.api.proto.ChannelProtoOrBuilder
import jp.co.trillium.secureskye.notification.main.api.proto.ChannelTypeProto
import jp.co.trillium.secureskye.notification.main.api.proto.NotificationProto
import jp.co.trillium.secureskye.notification.main.api.proto.NotificationProtoOrBuilder
import jp.co.trillium.secureskye.notification.main.api.proto.SubscriptionListProto
import jp.co.trillium.secureskye.notification.main.api.proto.SubscriptionProto
import jp.co.trillium.secureskye.notification.main.api.proto.SubscriptionProtoOrBuilder
import jp.co.trillium.secureskye.notification.main.api.proto.TopicListProto
import jp.co.trillium.secureskye.notification.main.api.proto.TopicProto
import jp.co.trillium.secureskye.notification.main.api.proto.TopicProtoOrBuilder
import jp.co.trillium.secureskye.notification.main.api.proto.UserProto
import jp.co.trillium.secureskye.notification.main.api.proto.UserProtoOrBuilder
import jp.co.trillium.secureskye.notification.main.model.Channel
import jp.co.trillium.secureskye.notification.main.model.ChannelType
import jp.co.trillium.secureskye.notification.main.model.Notification
import jp.co.trillium.secureskye.notification.main.model.Subscription
import jp.co.trillium.secureskye.notification.main.model.Topic
import jp.co.trillium.secureskye.oauth.model.Credentials
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.springframework.stereotype.Component

/**
 * Mapper between Protobuf models and database models of notification messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [UuidMapper::class, NotificationMapper.BuilderFactory::class]
)
abstract class NotificationMapper {

    /**
     * Map [NotificationProtoOrBuilder] to [Notification].
     */
    abstract fun notification(notification: NotificationProtoOrBuilder): Notification

    /**
     * Map [subscription] to builder.
     */
    @Mappings(
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "unknownFields", ignore = true)
    )
    abstract fun subscriptionBuilder(subscription: Subscription): SubscriptionProto.Builder

    /**
     * Map [SubscriptionProtoOrBuilder] to [Subscription].
     */
    @Mappings(
        Mapping(target = "userId", ignore = true),
        Mapping(target = "topicId", ignore = true),
        Mapping(target = "channelId", ignore = true)
    )
    abstract fun subscription(subscription: SubscriptionProtoOrBuilder): Subscription

    /**
     * Map [subscription] to [SubscriptionProto].
     */
    fun subscription(subscription: Subscription): SubscriptionProto = subscriptionBuilder(subscription).build()

    /**
     * Map [subscriptions] to [SubscriptionListProto].
     */
    fun subscriptionList(subscriptions: List<Subscription>): SubscriptionListProto =
        SubscriptionListProto.newBuilder().addAllSubscriptions(subscriptions.map(::subscription))
            .build()

    /**
     * Map [Credentials] to builder.
     */
    @Mappings(
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "firstNameBytes", ignore = true),
        Mapping(target = "lastNameBytes", ignore = true),
        Mapping(target = "emailBytes", ignore = true),
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    abstract fun userBuilder(user: Credentials): UserProto.Builder

    /**
     * Map [UserProtoOrBuilder] to [Credentials].
     */
    @Mappings(
        Mapping(target = "version", ignore = true),
        Mapping(target = "password", ignore = true),
        Mapping(target = "enabled", ignore = true),
        Mapping(target = "avatar", ignore = true),
        Mapping(target = "avatarFormat", ignore = true),
        Mapping(target = "roles", ignore = true),
        Mapping(target = "phoneAreaCode", ignore = true),
        Mapping(target = "phoneNumber", ignore = true),
        Mapping(target = "gender", ignore = true),
        Mapping(target = "birthday", ignore = true),
        Mapping(target = "nationality", ignore = true),
        Mapping(target = "address", ignore = true),
        Mapping(target = "additionalInfo", ignore = true),
        Mapping(target = "attachments", ignore = true)
    )
    abstract fun user(user: UserProtoOrBuilder): Credentials

    /**
     * Map [Credentials] to [UserProto].
     */
    fun user(user: Credentials): UserProto = userBuilder(user).build()

    /**
     * Map [Topic] to builder.
     */
    @Mappings(
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true),
        Mapping(target = "subjectPrefixBytes", ignore = true),
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    abstract fun topicBuilder(topic: Topic): TopicProto.Builder

    /**
     * Map [TopicProtoOrBuilder] to [Topic].
     */
    abstract fun topic(topic: TopicProtoOrBuilder): Topic

    /**
     * Map [topic] to [TopicProto].
     */
    fun topic(topic: Topic): TopicProto = topicBuilder(topic).build()

    /**
     * Map [topics] to [TopicListProto].
     */
    fun topicList(topics: List<Topic>): TopicListProto =
        TopicListProto.newBuilder().addAllTopics(topics.map(::topic))
            .build()

    /**
     * Map [Channel] to builder.
     */
    @Mappings(
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "typeValue", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true),
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    abstract fun channelBuilder(channel: Channel): ChannelProto.Builder

    /**
     * Map [ChannelProtoOrBuilder] to [Channel].
     */
    abstract fun channel(channel: ChannelProtoOrBuilder): Channel

    /**
     * Map [Channel] to [ChannelProto].
     */
    fun channel(channel: Channel): ChannelProto = channelBuilder(channel).build()

    /**
     * Map [channels] to [ChannelListProto].
     */
    fun channelList(channels: List<Channel>): ChannelListProto =
        ChannelListProto.newBuilder().addAllChannels(channels.map(::channel))
            .build()

    /**
     * Map [channelType] to [ChannelTypeProto].
     */
    protected fun channelType(channelType: ChannelType): ChannelTypeProto =
        ChannelTypeProto.forNumber(channelType.value)

    /**
     * Map [ChannelTypeProto] to [ChannelType].
     */
    protected fun channelType(channelType: ChannelTypeProto): ChannelType =
        ChannelType.values().first { it.value == channelType.number }

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [NotificationProto] builder.
         */
        fun notificationBuilder(): NotificationProto.Builder = NotificationProto.newBuilder()

        /**
         * Create a [SubscriptionProto] builder.
         */
        fun subscriptionBuilder(): SubscriptionProto.Builder = SubscriptionProto.newBuilder()

        /**
         * Create a [TopicProto] builder.
         */
        fun topicBuilder(): TopicProto.Builder = TopicProto.newBuilder()

        /**
         * Create a [ChannelProto] builder.
         */
        fun channelBuilder(): ChannelProto.Builder = ChannelProto.newBuilder()

        /**
         * Create a [UserProto] builder.
         */
        fun userBuilder(): UserProto.Builder = UserProto.newBuilder()
    }
}
