/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.notification.main.api.proto.SubscriptionListProto
import jp.co.trillium.secureskye.notification.main.feign.UserAdminClient
import jp.co.trillium.secureskye.notification.main.mapper.NotificationMapper
import jp.co.trillium.secureskye.notification.main.model.ChannelType
import jp.co.trillium.secureskye.notification.main.model.Subscription
import jp.co.trillium.secureskye.notification.main.repository.ChannelRepository
import jp.co.trillium.secureskye.notification.main.repository.SubscriptionRepository
import jp.co.trillium.secureskye.notification.main.repository.TopicRepository
import org.springframework.stereotype.Service
import java.security.Principal
import java.util.UUID

/**
 * Subscription service.
 */
@Service
class SubscriptionService(
    private val notificationMapper: NotificationMapper,
    private val subscriptionRepository: SubscriptionRepository,
    private val channelRepository: ChannelRepository,
    private val topicRepository: TopicRepository,
    private val userAdminClient: UserAdminClient,
    private val uuidMapper: UuidMapper
) {

    /**
     * List all available channels for notification subscriptions.
     */
    fun listChannels() = notificationMapper.channelList(channelRepository.findAll())

    /**
     * List all available topics for notification subscriptions.
     */
    fun listTopics() = notificationMapper.topicList(topicRepository.findAll())

    /**
     * List all subscriptions of [user].
     */
    fun findSubscriptionsByUser(user: Principal) =
        notificationMapper.subscriptionList(subscriptionRepository.findByUserId(userId(user)))

    /**
     * List all subscriptions of [user] via channel [channelType].
     */
    fun findSubscriptionsByUserViaChannel(user: Principal, channelType: String) =
        notificationMapper.subscriptionList(
            subscriptionRepository.findByUserIdAndChannelType(
                userId(user),
                ChannelType.valueOf(channelType)
            )
        )

    /**
     * Subscribe [user] to list of [topics] via channel [channelType].
     */
    fun subscribeTopic(user: Principal, channelType: String, topics: List<UUID>): SubscriptionListProto {
        // Retrieve user info from `user-admin` service
        val userId = userId(user)
        // Find channel of type [channelType]
        val channel = channelRepository.findByType(ChannelType.valueOf(channelType))
                ?: throw IllegalArgumentException("Cannot find channel with type of $channelType")
        val channelId = channel.id
        // Process list of topic id
        val subscriptionsList = topics.map { topicId ->
            val sub = subscriptionRepository.findById(Subscription.PK(userId, topicId, channelId))
            if (sub.isPresent) {
                sub.get()
            } else {
                subscriptionRepository.save(
                    Subscription(
                        userId,
                        topicId,
                        channelId
                    )
                )
            }
        }
        return notificationMapper.subscriptionList(subscriptionsList)
    }

    /**
     * Unsubscribe [user] from list of [topics] via channel [channelType].
     */
    fun unsubscribeTopic(user: Principal, channelType: String, topics: List<UUID>) {
        // Retrieve user info from `user-admin` service
        val userId = userId(user)
        // Find channel of type [channelType]
        val channel = channelRepository.findByType(ChannelType.valueOf(channelType))
                ?: throw IllegalArgumentException("Cannot find channel with type of $channelType")
        val channelId = channel.id
        // Process list of topic id
        topics.forEach { topicId ->
            subscriptionRepository.findById(Subscription.PK(userId, topicId, channelId)).ifPresent {
                subscriptionRepository.delete(it)
            }
        }
    }

    /**
     * Find user ID from [user].
     */
    private fun userId(user: Principal): UUID {
        val result = userAdminClient.listUsers(user.name)
        if (result.dataCount == 1) {
            return result.dataList[0].id.let(uuidMapper::uuidString)
        }
        throw IllegalArgumentException("Invalid credential")
    }
}
