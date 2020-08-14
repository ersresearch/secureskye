/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.rest

import jp.co.trillium.secureskye.vehicle.message.service.RouteService
import org.bson.types.ObjectId
import org.hibernate.validator.constraints.Range
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID
import javax.validation.constraints.NotBlank

/**
 * Endpoints for routes.
 *
 * @property routeService Business logic for routes.
 */
@RestController
@RequestMapping("api")
@Validated
class RouteController(private val routeService: RouteService) {

    /**
     * List all routes for a specific [vehicleId].
     */
    @GetMapping("/vehicles/{vehicleId}/routes")
    @PreAuthorize("hasAuthority('route:read')")
    fun getRoutesOfVehicle(@PathVariable vehicleId: UUID) = routeService.listRoutes(vehicleId)

    /**
     * Start tracking a GPS route for the given vehicle identified by its [vehicleId].
     * The route has an upper tracking [limit] to avoid endless long routes.
     */
    @PostMapping("/vehicles/{vehicleId}/routes")
    @PreAuthorize("hasAuthority('route:create')")
    fun startRouteOfVehicle(
        @PathVariable vehicleId: UUID,
        @RequestParam(defaultValue = "3600") @Range(min = 60, max = 86400) limit: Int,
        @RequestParam(defaultValue = "") name: String
    ) = routeService.startRoute(vehicleId, limit, name)

    /**
     * Load all GPS events of a route (identified by [key].
     */
    @GetMapping("/routes/{key}")
    @PreAuthorize("hasAuthority('route:read')")
    fun loadRoute(@PathVariable key: ObjectId) = routeService.loadRoute(key)

    /**
     * Delete an existing route (identified by [key]).
     */
    @DeleteMapping("/routes/{key}")
    @PreAuthorize("hasAuthority('route:delete')")
    fun deleteRoute(@PathVariable key: ObjectId) = routeService.deleteRoute(key)

    /**
     * Finish the tracking of a GPS route (identified by [key]), if it didn't already exceed the time limit.
     */
    @PutMapping("/routes/{key}/finish")
    @PreAuthorize("hasAuthority('route:update')")
    fun finishRoute(@PathVariable key: ObjectId) = routeService.finishRoute(key)

    /**
     * Rename an existing route (identified by [key]) to the [newName].
     */
    @PutMapping("/routes/{key}/rename")
    @PreAuthorize("hasAuthority('route:update')")
    fun rename(@PathVariable key: ObjectId, @RequestParam @NotBlank newName: String) =
        routeService.renameRoute(key, newName)
}
