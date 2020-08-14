/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.rest

import jp.co.trillium.secureskye.vehicle.message.api.proto.EcuAlertListProto
import jp.co.trillium.secureskye.vehicle.message.model.EcuAlertDto
import jp.co.trillium.secureskye.vehicle.message.model.FilterAlertType
import jp.co.trillium.secureskye.vehicle.message.service.EcuAlertService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import java.util.UUID

/**
 * The REST controller to manage.
 */
@RestController
class EcuAlertController(
    private val ecuAlertService: EcuAlertService
) {

    /**
     * Create alert api.
     */
    @PutMapping("/api/vehicles/ecus/alerts")
    @PreAuthorize("hasAuthority('event:create')")
    fun createEcuAlert(@RequestBody ecuAlertDto: List<EcuAlertDto>, principal: Principal): List<EcuAlertDto> =
        ecuAlertService.createAlert(ecuAlertDto, principal.name)

    /**
     * Support protobuf create alert api.
     */
    @PostMapping("/api/vehicles/ecus/alerts/v2")
    @PreAuthorize("hasAuthority('event:create')")
    fun createEcuAlertProto(@RequestBody ecuAlertList: EcuAlertListProto, principal: Principal): EcuAlertListProto =
        ecuAlertService.createAlertProto(ecuAlertList, principal.name)

    /**
     * Find alert list for a vehicle.
     */
    @GetMapping("/api/vehicles/{id}/ecus/alerts")
    @PreAuthorize("hasAuthority('event:read')")
    fun findAlertForVehicle(
        @PathVariable id: UUID,
        @RequestParam(defaultValue = "DEFAULT") filterType: FilterAlertType = FilterAlertType.DEFAULT,
        @PageableDefault pageable: Pageable
    ): Page<EcuAlertDto> =
        ecuAlertService.findAlertForVehicle(id, filterType, pageable)

    /**
     * Find alert list for an ECU.
     */
    @GetMapping("/api/vehicles/ecus/{id}/alerts")
    @PreAuthorize("hasAuthority('event:read')")
    fun findAlertForEcu(
        @PathVariable id: UUID,
        @RequestParam(defaultValue = "DEFAULT") filterType: FilterAlertType = FilterAlertType.DEFAULT,
        @PageableDefault pageable: Pageable
    ): Page<EcuAlertDto> =
        ecuAlertService.findAlert(id, filterType, pageable)

    /**
     * Find all alerts for all vehicles.
     */
    @GetMapping("/api/vehicles/ecus/alerts")
    @PreAuthorize("hasAuthority('event:read')")
    fun findAllAlert(
        @PageableDefault pageable: Pageable
    ): Page<EcuAlertDto> = ecuAlertService.findAll(pageable)

    /**
     * calculate all ECUs's status for a vehicle
     */
//    @GetMapping("/api/vehicles/{id}/ecus/status")
//    @PreAuthorize("hasAuthority('event:read')")
//    fun calEcuAlertStatus(@PathVariable id: UUID): List<EcuStatusDto> = ecuAlertService.calEcuStatus(id)

    /**
     * calculate specific ECU status for a vehicle.
     */
//    @GetMapping("/api/vehicles/ecus/{id}/status")
//    @PreAuthorize("hasAuthority('event:read')")
//    fun calEcuAlertStatusForEcu(@PathVariable id: UUID): EcuStatusDto {
//        val ecuInfo = ecuAlertService.fetchEcuInfo(id)
//        if (ecuInfo != null) {
//            return ecuAlertService.calEcuStatusByEcu(ecuInfo)
//        }
//        return EcuStatusDto(id, "", EcuStatus.UNKNOWN, 0, 0)
//    }

    /**
     * update vehicle alerts status to FIXED.
     */
    @PostMapping("/api/vehicles/ecus/alerts/{id}")
    @PreAuthorize("hasAuthority('event:read')")
    fun updateVehicleAlert(@PathVariable id: UUID): EcuAlertDto = ecuAlertService.fixAlert(id)

    /**
     * data for support protobuf create alert api.
     */
//    @PostMapping("/api/vehicles/ecus/alerts/data")
//    @PreAuthorize("hasAuthority('event:create')")
//    fun fakeAPI(principal: Principal) {
//        ecuAlertService.initialTestProtobuf(principal.name)
//    }
}
