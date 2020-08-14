/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.websocket.client.model

/**
 * A specific WebSocket message model.
 *
 * @property dateTime The current time of the message.
 * @property header The message will be returned to client.
 * @property body Data will be returned to client.
 * @property level The level of the message [WebSocketMessageLevel].
 */
data class WebSocketMessage(
    var dateTime: Long,
    var header: String,
    var body: Any,
    var level: WebSocketMessageLevel = WebSocketMessageLevel.INFO
)
