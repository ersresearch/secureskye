/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.rest

import jp.co.trillium.secureskye.vehicle.message.api.proto.EventBatchProto
import jp.co.trillium.secureskye.vehicle.message.service.EventService
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
 * Endpoints for vehicle events.
 *
 * @property eventService Business logic for vehicle events.
 */
@RestController
@RequestMapping("api/vehicles")
@Validated
class EventController(private val eventService: EventService) {

    /**
     * Save a [batch] of vehicle events on the server.
     */
    @PostMapping("/events")
    @PreAuthorize("#oauth2.clientHasRole('event:create')")
    fun save(@RequestBody batch: EventBatchProto, principal: Principal) {
        eventService.saveEvents(principal.name, batch)
    }

    /**
     * List the recent [limit] events of a vehicle (identified by [vehicleId]).
     *
     * If [fake] is set to true, fake events are generated instead of loading real data.
     */
    @GetMapping("/{vehicleId}/events")
    @PreAuthorize("hasAuthority('event:read')")
    fun listRecent(
        @PathVariable vehicleId: UUID,
        @RequestParam(defaultValue = "10") @Range(min = 1, max = 10) limit: Int
    ) =
        eventService.listEvents(vehicleId, limit)
}
