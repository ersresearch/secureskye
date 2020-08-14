/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.rest

import jp.co.trillium.secureskye.ota.vehicle.service.ImageArchiveService
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller

/**
 * WebSocket handler for sending out updates to different vehicles that are listening.
 */
@Controller
class VehicleUpdatesController(private val imageArchiveService: ImageArchiveService) {

    /**
     * Send newly available updates to a specific vehicle [family].
     */
    @MessageMapping("/updateFeeds/{family}")
    @SendTo("/updateFeeds/{family}")
    fun updateFeeds(
        @DestinationVariable family: String,
        version: String?
    ) = imageArchiveService.listMetadata(family)
}
