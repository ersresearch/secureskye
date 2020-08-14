import { notification } from './index';

/**
 * Email notification subscription
 */
export class EmailNotificationSubscription {
    /**
     * Subscription topic
     */
    topic: notification.ITopicProto;
    /**
     * Subscription check
     */
    checked = false;

    constructor(topic: notification.ITopicProto, subscriptionList: notification.ISubscriptionProto[]) {
        this.topic = topic;
        this.checked = subscriptionList.some((sub) => sub.topic.id === topic.id);
    }
}
