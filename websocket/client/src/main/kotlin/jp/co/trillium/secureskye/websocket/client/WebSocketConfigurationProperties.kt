/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.websocket.client

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

/**
 * Configuration properties for websocket connection.
 * @property serviceId websocket service
 * @property path socketio path
 */
@Configuration
@ConfigurationProperties(prefix = "socketio")
class WebSocketConfigurationProperties(
    var serviceId: String = "socketio",
    var path: String = "/socketio/socket.io"
)
