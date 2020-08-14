/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleProto
import jp.co.trillium.secureskye.vehicle.admin.model.NewVehicle
import jp.co.trillium.secureskye.vehicle.admin.service.VehicleService
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.util.UUID
import javax.servlet.http.HttpServletResponse
import javax.validation.constraints.NotBlank

/**
 * Endpoints for vehicle administration (registering, listing, ...).
 */
@RestController
@RequestMapping("/api/vehicles")
@Validated
class VehicleController(private val vehicleService: VehicleService) {

    /**
     * Create a new vehicle from the provided model and name of [newVehicle].
     */
    @PostMapping
    @PreAuthorize("hasAuthority('vehicle:create')")
    fun create(@RequestBody newVehicle: NewVehicle) =
        vehicleService.registerVehicle(newVehicle.modelId, newVehicle.name, newVehicle.vin, newVehicle.color)

    /**
     * Rename an existing vehicle identified by [id] to [newName].
     */
    @PutMapping("{id}/rename")
    @PreAuthorize("hasAuthority('vehicle:update')")
    fun rename(
        @PathVariable id: UUID,
        @RequestParam @NotBlank newName: String
    ) {
        vehicleService.renameVehicle(id, newName)
    }

    /**
     * Update a vehicle by its [id], returning it as a [VehicleProto].
     */
    @PutMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle:update')")
    fun update(
        @PathVariable id: UUID,
        @RequestBody vehicle: VehicleProto
    ) = vehicleService.updateVehicle(id, vehicle)

    /**
     * Update the vin of an existing vehicle identified by [id] to [value].
     */
    @PutMapping("{id}/vin")
    @PreAuthorize("hasAuthority('vehicle:update')")
    fun updateVehicleVin(
        @PathVariable id: UUID,
        @RequestParam @NotBlank value: String
    ) = vehicleService.updateVehicleVin(id, value)

    /**
     * Update the vin of an existing vehicle identified by [id] to [value].
     */
    @PutMapping("{id}/color")
    @PreAuthorize("hasAuthority('vehicle:update')")
    fun updateVehicleColor(
        @PathVariable id: UUID,
        @RequestParam @NotBlank value: String
    ) = vehicleService.updateVehicleColor(id, value)

    /**
     * Update the model of an existing vehicle identified by [id] to [modelId].
     */
    @PutMapping("{id}/model")
    @PreAuthorize("hasAuthority('vehicle:update')")
    fun updateVehicleModel(
        @PathVariable id: UUID,
        @RequestParam modelId: UUID
    ) = vehicleService.updateVehicleModel(id, modelId)

    /**
     * Delete an existing vehicle identified by [id].
     */
    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle:delete')")
    fun delete(@PathVariable id: UUID) = vehicleService.deleteVehicle(id)

    /**
     * Delete existing vehicle identified by list id.
     */
    @PatchMapping()
    @PreAuthorize("hasAuthority('vehicle:delete')")
    fun deleteList(@RequestBody listVehicleId: List<UUID>) = vehicleService.deleteListVehicle(listVehicleId)

    /**
     * Get a specific vehicle by its [id] or client [id], depending of the setting of [clientId].
     *
     * In case [clientId] is set to false or not provided, the [id] is treated as id of the vehicle.
     * In case [clientId] is set to true, the [id] is treated as OAuth client id.
     */
    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle:read')")
    fun get(
        @PathVariable @NotBlank id: String,
        @RequestParam(defaultValue = "false") clientId: Boolean
    ) =
        if (clientId) vehicleService.findVehicleByCliendId(id)
        else vehicleService.findVehicle(UUID.fromString(id))

    /**
     * Get image of a specific vehicle by its [id].
     */
    @GetMapping("{id}/image")
    fun getVehicleImage(@PathVariable id: UUID, response: HttpServletResponse) =
        vehicleService.getVehicleImage(id, response.outputStream)

    /**
     * Upload [file] as an image of vehicle [id].
     */
    @PatchMapping("{id}/image")
    @PreAuthorize("hasAuthority('vehicle:update')")
    fun uploadVehicleImage(@PathVariable id: UUID, @RequestParam file: MultipartFile) =
        vehicleService.uploadVehicleImage(id, file)

    /**
     * List all vehicles base on custom parameter.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('vehicle:read')")
    fun searchByCustomParameter(
        @PageableDefault pageable: Pageable,
        @RequestParam(value = "search", defaultValue = "DEFAULT") searchStr: String
    ) = vehicleService.searchByString(pageable, searchStr)

    /**
     * Get model's display settings by vehicle [id].
     */
    @GetMapping("{id}/display-settings")
    @PreAuthorize("hasAuthority('vehicle:read')")
    fun getModelSettingsByVehicle(@PathVariable id: UUID) = vehicleService.getModelSettings(id)
}
