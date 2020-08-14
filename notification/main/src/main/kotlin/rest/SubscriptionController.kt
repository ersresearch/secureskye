/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.rest

import jp.co.trillium.secureskye.notification.main.service.SubscriptionService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import java.util.UUID

/**
 * REST endpoints for subscriptions.
 */
@RestController
@RequestMapping("/api/notifications/subscriptions")
class SubscriptionController(private val subscriptionService: SubscriptionService) {

    /**
     * List all subscriptions of [user].
     */
    @GetMapping
    @PreAuthorize("hasAuthority('subscription:read')")
    fun userSubscriptions(user: Principal) =
        subscriptionService.findSubscriptionsByUser(user)

    /**
     * List all subscriptions of [user].
     */
    @GetMapping("{channel}")
    @PreAuthorize("hasAuthority('subscription:read')")
    fun userSubscriptionsViaChannel(user: Principal, @PathVariable channel: String) =
        subscriptionService.findSubscriptionsByUserViaChannel(user, channel)

    /**
     * List available topics for notification subscriptions.
     */
    @GetMapping("topics")
    @PreAuthorize("hasAuthority('subscription:read')")
    fun listTopics() = subscriptionService.listTopics()

    /**
     * List available channels for notification subscriptions.
     */
    @GetMapping("channels")
    @PreAuthorize("hasAuthority('subscription:read')")
    fun listChannels() = subscriptionService.listChannels()

    /**
     * Subscribe current [user] to notification for topics of [topics] via channel [channel].
     */
    @PostMapping("{channel}")
    @PreAuthorize("hasAuthority('subscription:create')")
    fun subscribe(
        user: Principal,
        @PathVariable channel: String,
        @RequestParam topics: List<UUID>
    ) = subscriptionService.subscribeTopic(user, channel, topics)

    /**
     * Unsubscribe current [user] from notification for topics of [topics] via channel [channel].
     */
    @DeleteMapping("{channel}")
    @PreAuthorize("hasAuthority('subscription:delete')")
    fun unsubscribe(
        user: Principal,
        @PathVariable channel: String,
        @RequestParam topics: List<UUID>
    ) = subscriptionService.unsubscribeTopic(user, channel, topics)
}
