/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.websocket.client.model

/**
 * Web socket response level.
 */
enum class WebSocketMessageLevel(val value: Int) {
    /**
     * Default level for info message.
     */
    INFO(0),
    /**
     * Warning level for warning message.
     */
    WARNING(1),
    /**
     * Danger level for critical message.
     */
    DANGER(2)
}
