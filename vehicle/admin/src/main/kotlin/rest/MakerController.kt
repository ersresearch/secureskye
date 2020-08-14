/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleMakerProto
import jp.co.trillium.secureskye.vehicle.admin.service.MakerService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

/**
 * Endpoints for vehicle marker management.
 */
@RestController
@RequestMapping("/api/vehicles/makers")
@Validated
class MakerController(
    private val makerService: MakerService
) {

    /**
     * Create a new vehicle maker with the given [maker] information.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('vehicle-model:create')")
    fun create(@RequestBody maker: VehicleMakerProto) = makerService.createMaker(maker)

    /**
     * List all existing vehicle makers.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('vehicle-model:read')")
    fun list() = makerService.listAllMaker()

    /**
     * Load a single vehicle maker identified by [id].
     */
    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle-model:read')")
    fun get(@PathVariable id: UUID) = makerService.findMaker(id)

    /**
     * Update an existing vehicle maker identified by [id] with new [maker] information.
     */
    @PutMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle-model:update')")
    fun update(@PathVariable id: UUID, @RequestBody maker: VehicleMakerProto) = makerService.update(id, maker)

    /**
     * Delete an existing vehicle maker identified by [id].
     */
    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle-model:delete')")
    fun delete(@PathVariable id: UUID) = makerService.deleteMaker(id)
}
