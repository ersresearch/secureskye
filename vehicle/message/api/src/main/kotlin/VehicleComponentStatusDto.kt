/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model

/**
 * The DTO object to response OBD2 component status to web application.
 */
data class VehicleComponentStatusDto(
    /**
     * Component name.
     */
    var componentName: VehicleComponentType = VehicleComponentType.UNKNOWN,

    /**
     * Status.
     */
    var status: VehicleComponentStatus = VehicleComponentStatus.NORMAL,

    /**
     * Alert list.
     */
    var alerts: List<VehicleComponentAlertDto> = emptyList()
)
