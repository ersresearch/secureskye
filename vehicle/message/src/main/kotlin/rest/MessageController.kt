/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.rest

import jp.co.trillium.secureskye.vehicle.message.api.proto.MessageBatchProto
import jp.co.trillium.secureskye.vehicle.message.service.MessageService
import org.hibernate.validator.constraints.Range
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import java.util.UUID

/**
 * Endpoints for vehicle messages.
 *
 * @property messageService Business logic for vehicle messages.
 */
@RestController
@RequestMapping("api/vehicles")
@Validated
class MessageController(private val messageService: MessageService) {

    /**
     * Save a [batch] of vehicle messages on the server.
     */
    @PostMapping("/messages")
    @PreAuthorize("#oauth2.clientHasRole('message:create')")
    fun save(@RequestBody batch: MessageBatchProto, principal: Principal) {
        messageService.saveMessages(principal.name, batch)
    }

    /**
     * List the recent [limit] messages of a vehicle (identified by [vehicleId]).
     *
     * If [fake] is set to true, fake messages are generated instead of loading real data.
     */
    @GetMapping("/{vehicleId}/messages")
    @PreAuthorize("hasAuthority('message:read')")
    fun listRecent(
        @PathVariable vehicleId: UUID,
        @RequestParam since: Long? = null,
        @RequestParam(defaultValue = "100") @Range(min = 1, max = 100) limit: Int
    ) =
        messageService.listMessages(vehicleId, since, limit)
}
