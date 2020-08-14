/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.rest

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.registry.api.proto.EcuInfoProto
import jp.co.trillium.secureskye.vehicle.registry.mapper.RegistryMapper
import jp.co.trillium.secureskye.vehicle.registry.model.EcuStatus
import jp.co.trillium.secureskye.vehicle.registry.service.EcuInfoService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import java.util.UUID

/**
 * Endpoints for ecu management.
 */
@RestController
@RequestMapping("/api/vehicles/ecus")
class EcuInfoController(
    private val ecuInfoService: EcuInfoService,
    private val registryMapper: RegistryMapper,
    private val uuidMapper: UuidMapper
) {

    /**
     * Save gateway information.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('vehicle-registry:create')")
    fun save(@RequestBody ecuInfo: EcuInfoProto, principal: Principal): EcuInfoProto {
        System.out.println("Received gateway: $ecuInfo")
        return ecuInfo.let(registryMapper::ecuInfo)
            .also {
                if (!ecuInfo.parentEcuId.isNullOrEmpty()) {
                    it.parentId = uuidMapper.uuidString(ecuInfo.parentEcuId)
                }
            }
            .let { ecuInfoService.save(principal.name, it) }
            .let(registryMapper::ecuInfoProto)
    }

    /**
     * Register new child ecu [ecuInfo] to gateway [id].
     */
    @PostMapping("{id}/ecus")
    @PreAuthorize("hasAuthority('vehicle-registry:create')")
    fun saveChild(@PathVariable id: UUID, @RequestBody ecuInfo: EcuInfoProto, principal: Principal): EcuInfoProto {
        System.out.println("Received ECU: $ecuInfo")
        return ecuInfo.let(registryMapper::ecuInfo)
            .apply { parentId = id }
            .let { ecuInfoService.save(principal.name, it) }
            .let(registryMapper::ecuInfoProto)
    }

    /**
     * List child Ecus of a Gateway or Ecu.
     */
    @GetMapping("{id}/ecus")
    @PreAuthorize("hasAuthority('vehicle-registry:read')")
    fun loadChildEcuOfGateway(@PathVariable id: UUID) = ecuInfoService.load(id).children.toList()
        .let { registryMapper.ecuInfoList(it) }

    /**
     * Update ECU information.
     */
    @PutMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle-registry:update')")
    fun update(@PathVariable id: UUID, @RequestBody ecuInfo: EcuInfoProto) = ecuInfoService.update(id, ecuInfo)
        .let(registryMapper::ecuInfoProto)

    /**
     * Get Ecu detail information.
     */
    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle-registry:read')")
    fun load(@PathVariable id: UUID) = ecuInfoService.load(id)
        .let(registryMapper::ecuInfoProto)

    /**
     * List all gateway or parent ECU and their detail information.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('vehicle-registry:read')")
    fun list(@RequestParam(defaultValue = "false") filterGateway: Boolean = false) =
        (if (filterGateway) ecuInfoService.listGateway() else ecuInfoService.list())
            .let(registryMapper::ecuInfoList)

    /**
     * Delete ECU information by [id].
     */
    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('vehicle-registry:delete')")
    fun delete(@PathVariable id: UUID) = ecuInfoService.delete(id)

    /**
     * get software update by [id].
     */
    @GetMapping("{id}/software")
    @PreAuthorize("hasAuthority('vehicle-registry:read')")
    fun getSoftwareUpdateByEuId(@PathVariable id: UUID): EcuInfoProto = ecuInfoService.load(id)
        .let { registryMapper.ecuInfoBuilder(it) }
        .apply {
            clearChildren()
            clearErrorCode()
        }.build()

    /**
     * Update alert [id] status.
     */
    @PutMapping("{id}/status")
    @PreAuthorize("hasAuthority('vehicle-status:update')")
    fun updateAlertStatus(
        @PathVariable id: UUID,
        @RequestBody status: EcuStatus
    ) = ecuInfoService.updateAlertStatus(id, status)
}
