/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

import jp.co.trillium.secureskye.vehicle.admin.api.proto.ModelDisplaySettingsListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleModelProto
import jp.co.trillium.secureskye.vehicle.admin.service.ModelService
import org.springframework.security.access.prepost.PreAuthorize
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
 * Endpoints for vehicle model management.
 */
@RestController
@RequestMapping("/api/vehicles/models")
class ModelController(
    private val modelService: ModelService
) {

    /**
     * Create a new vehicle model with the given [model] info.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('vehicle-model:create')")
    fun create(@RequestBody model: VehicleModelProto) = modelService.createModel(model)

    /**
     * Update an existing vehicle model identified by [id] with new [model] info.
     */
    @PutMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle-model:update')")
    fun update(@PathVariable id: UUID, @RequestBody model: VehicleModelProto) = modelService.update(id, model)

    /**
     * Delete an existing vehicle model identified by [id].
     */
    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle-model:delete')")
    fun delete(@PathVariable id: UUID) = modelService.deleteModel(id)

    /**
     * Load a single vehicle model identified by [id].
     */
    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle-model:read')")
    fun get(@PathVariable id: UUID) = modelService.findModel(id)

    /**
     * List all existing vehicle models.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('vehicle-model:read')")
    fun list() = modelService.listAllModels()

    /**
     * Update or create a new model's settings by model's ID.
     */
    @PutMapping("{modelId}/settings")
    @PreAuthorize("hasAuthority('vehicle-model:update')")
    fun setDisplaySettings(@PathVariable modelId: UUID, @RequestBody settings: ModelDisplaySettingsListProto):
            ModelDisplaySettingsListProto = modelService.updateDisplaySettings(modelId, settings)

    /**
     * Get Model display settings.
     */
    @GetMapping("{modelId}/settings")
    @PreAuthorize("hasAuthority('vehicle-model:read')")
    fun getDisplaySettings(@PathVariable modelId: UUID): ModelDisplaySettingsListProto =
        modelService.getDisplaySettings(modelId)
}
