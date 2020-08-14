/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.repository

import jp.co.trillium.secureskye.notification.main.model.ChannelType
import jp.co.trillium.secureskye.notification.main.model.Subscription
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * Repository for managing [Subscription] entities.
 */
@Transactional
interface SubscriptionRepository : JpaRepository<Subscription, Subscription.PK> {

    /**
     * Find subscriptions by [userId].
     */
    fun findByUserId(userId: UUID): List<Subscription>

    /**
     * Find subscriptions by [userId] via channel [channelType].
     */
    @Query("select s from Subscription s where s.userId = :userId and s.channel.type = :channelType")
    fun findByUserIdAndChannelType(
        @Param("userId") userId: UUID,
        @Param("channelType") channelType: ChannelType
    ): List<Subscription>
}
