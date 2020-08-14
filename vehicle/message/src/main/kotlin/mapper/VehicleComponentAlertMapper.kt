/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.TimestampMapper
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlert
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlertDto
import org.mapstruct.Mapper

/**
 * The mapper interface to transform OBD2 component alert between entity/dto.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [TimestampMapper::class]
)
abstract class VehicleComponentAlertMapper {
    /**
     * To DTO object.
     */
    abstract fun toDto(vehicleComponentAlert: VehicleComponentAlert): VehicleComponentAlertDto

    /**
     * To model object.
     */
    abstract fun toModel(vehicleComponentAlertDto: VehicleComponentAlertDto): VehicleComponentAlert
}
