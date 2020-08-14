/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.websocket.client

import jp.co.trillium.secureskye.websocket.client.model.WebSocketMessage

/**
 * Web socket service interface.
 */
interface WebSocketService {
    /**
     * Init web socket service.
     */
    fun initialize()

    /**
     * Send message to socket service.
     */
    fun sendMessage(room: String, topicName: String, data: WebSocketMessage)

    /**
     * TBA.
     */
    fun onMessage(eventName: String, function: Any)
}
