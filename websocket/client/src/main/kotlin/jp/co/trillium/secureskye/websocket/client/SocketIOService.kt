/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.websocket.client

import com.fasterxml.jackson.databind.ObjectMapper
import io.socket.client.IO
import io.socket.client.Socket
import io.socket.emitter.Emitter
import jp.co.trillium.secureskye.websocket.client.model.WebSocketMessage
import mu.KLogging
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct

/**
 * Socket IO service.
 */
@Service
class SocketIOService(
    @Qualifier("objectMapper")
    private val mapper: ObjectMapper,
    private val webSocketConfigurationProperties: WebSocketConfigurationProperties,
    private val loadBalancerClient: LoadBalancerClient
) : WebSocketService {
    private companion object : KLogging()

    @Volatile
    private lateinit var socket: Socket

    /**
     * Initial socket instance.
     */
    @PostConstruct
    override fun initialize() {
        socketConn(true)
    }

    /**
     * Get a socket.io connection.
     */
    private fun socketConn(forceNewConnection: Boolean = false): Socket {
        if (forceNewConnection || !socket.connected()) {
            return synchronized(this) {
                val uri = loadBalancerClient.choose(webSocketConfigurationProperties.serviceId).uri
                socket = IO.socket(
                    uri,
                    IO.Options().apply {
                        query = "token=INTERNAL_SYSTEM"
                        path = webSocketConfigurationProperties.path
                    }
                )
                socket.once("connect") {
                    logger.debug {
                        "Connected to socket.io(Host=$uri, " +
                                "Path=${webSocketConfigurationProperties.path}). ConnectionID=${socket.id()}"
                    }
                }
                socket.once("reconnect_failed") {
                    logger.debug {
                        "Failed to reconnect to socket.io(Host=$uri, " +
                                "Path=${webSocketConfigurationProperties.path}). Trying another one..."
                    }
                    socketConn(forceNewConnection)
                }
                socket.connect()
                logger.debug {
                    socket.id()
                }
                socket
            }
        }
        return socket
    }

    /**
     * Sends message to web socket.
     * @param room room name.
     * @param topicName topic name.
     * @param data data.
     */
    override fun sendMessage(room: String, topicName: String, data: WebSocketMessage) {
        val jsonObject = JSONObject(mapper.writeValueAsString(data))
        socketConn().emit("room_msg", room, topicName, jsonObject)
    }

    /**
     * Listens on the event.
     * @param eventName event name.
     * @param function
     */
    override fun onMessage(eventName: String, function: Any) {
        socketConn().on(eventName, function as Emitter.Listener)
    }
}
