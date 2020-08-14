/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.TimestampMapper
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.message.api.proto.EcuAlertListProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EcuAlertLocationProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EcuAlertProto
import jp.co.trillium.secureskye.vehicle.message.model.EcuAlert
import jp.co.trillium.secureskye.vehicle.message.model.EcuAlertDto
import jp.co.trillium.secureskye.vehicle.message.model.EcuAlertLocation
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.springframework.stereotype.Component

/**
 * The mapper interface to convert EcuAlert between entity/dto.
 */

@Mapper(
    config = GlobalMapperConfig::class,
    uses = [UuidMapper::class, TimestampMapper::class, EcuAlertMapper.BuilderFactory::class]
)
abstract class EcuAlertMapper {
    /**
     * To DTO object.
     */
    abstract fun toDto(ecuAlert: EcuAlert): EcuAlertDto

    /**
     * To Entity object.
     */
    abstract fun toModel(ecuAlertDto: EcuAlertDto): EcuAlert

    /**
     * From proto To Entity object.
     */
    abstract fun toModel(ecuAlertProto: EcuAlertProto): EcuAlert

    /**
     * From [EcuAlert] To Proto object.
     */
    @Mappings(
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "ecuIdBytes", ignore = true),
        Mapping(target = "vehicleIdBytes", ignore = true),
        Mapping(target = "alertTitleBytes", ignore = true),
        Mapping(target = "detailAlertBytes", ignore = true),
        Mapping(target = "alertTypeBytes", ignore = true),
        Mapping(target = "alertStatusBytes", ignore = true),
        Mapping(target = "timestamp", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "unknownFields", ignore = true)
    )
    abstract fun toProtoBuilder(ecuAlertDto: EcuAlertDto): EcuAlertProto.Builder

    /**
     * From [EcuAlert] To Proto object.
     */
    @Mappings(
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "ecuIdBytes", ignore = true),
        Mapping(target = "vehicleIdBytes", ignore = true),
        Mapping(target = "detailAlertBytes", ignore = true),
        Mapping(target = "alertTypeValue", ignore = true),
        Mapping(target = "alertStatusValue", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "unknownFields", ignore = true)
    )
    fun toProto(ecuAlertDto: EcuAlertDto) = toProtoBuilder(ecuAlertDto).build()

    /**
     * From List [EcuAlert] To List Proto object.
     */
    fun toListProto(ecuAlertList: List<EcuAlertDto>): EcuAlertListProto = EcuAlertListProto.newBuilder()
        .addAllData(ecuAlertList.map(::toProto))
        .build()

    /**
     * Map [EcuAlertLocationProto] to [alertLocation].
     */
    abstract fun ecuAlertLocation(alertLocation: EcuAlertLocationProto): EcuAlertLocation

    /**
     * Map [alertLocation] to [EcuAlertLocationProto].
     */
    @Mappings(
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "unknownFields", ignore = true)
    )
    abstract fun ecuAlertLocationBuilder(alertLocation: EcuAlertLocation): EcuAlertLocationProto.Builder

    /**
     * Map [EcuAlertLocation] to [EcuAlertLocationProto].
     */
    @Mappings(
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "unknownFields", ignore = true)
    )
    fun ecuAlertLocation(alertLocation: EcuAlertLocation): EcuAlertLocationProto =
        ecuAlertLocationBuilder(alertLocation).build()

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [EcuAlertProto] builder.
         */
        fun toProtoBuilder(): EcuAlertProto.Builder = EcuAlertProto.newBuilder()

        /**
         * Create a [EcuAlertLocationProto] builder.
         */
        fun ecuAlertLocationBuilder(): EcuAlertLocationProto.Builder = EcuAlertLocationProto.newBuilder()
    }
}
