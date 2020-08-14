/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.admin.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.obd2device.admin.api.proto.Obd2DeviceListProto
import jp.co.trillium.secureskye.obd2device.admin.api.proto.Obd2DeviceProto
import jp.co.trillium.secureskye.obd2device.admin.api.proto.RegisteredObd2DeviceProto
import jp.co.trillium.secureskye.obd2device.admin.model.Obd2Device
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.springframework.stereotype.Component

/**
 * Mapper between Protobuf models and database models of [Obd2Device].
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [UuidMapper::class, Obd2DeviceMapper.BuilderFactory::class]
)
abstract class Obd2DeviceMapper {

    /**
     * Mapping [obd2Device] to [Obd2DeviceProto.Builder].
     */
    @Mappings(
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "familyBytes", ignore = true),
        Mapping(target = "kernelBytes", ignore = true),
        Mapping(target = "macAddressBytes", ignore = true),
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "vehicleIdBytes", ignore = true)
    )
    abstract fun obd2DeviceProtoBuilder(obd2Device: Obd2Device): Obd2DeviceProto.Builder

    /**
     * Mapping [obd2Device] to [Obd2DeviceProto].
     */
    fun obd2DeviceProto(obd2Device: Obd2Device): Obd2DeviceProto = obd2DeviceProtoBuilder(obd2Device).build()

    /**
     * Mapping [obd2DeviceProto] to [Obd2Device].
     */
    @Mappings(
        Mapping(target = "clientId", ignore = true)
    )
    abstract fun obd2Device(obd2DeviceProto: Obd2DeviceProto): Obd2Device

    /**
     * Mapping [obd2DeviceList] to [Obd2DeviceListProto].
     */
    fun obd2DeviceListProto(obd2DeviceList: List<Obd2Device>): Obd2DeviceListProto = Obd2DeviceListProto.newBuilder()
        .addAllData(obd2DeviceList.map(::obd2DeviceProto))
        .build()

    /**
     * Map [obd2Device] to [Obd2DeviceProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "clientIdBytes", ignore = true),
        Mapping(target = "device", source = "device")
    )
    protected abstract fun registeredObd2DeviceProtoBuilder(device: Obd2Device): RegisteredObd2DeviceProto.Builder

    /**
     * Map [vehicle] to [RegisteredObd2DeviceProto].
     */
    fun registeredObd2DeviceProto(device: Obd2Device): RegisteredObd2DeviceProto =
        registeredObd2DeviceProtoBuilder(device).build()

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [Obd2DeviceProto] builder.
         */
        fun obd2DeviceMapper(): Obd2DeviceProto.Builder = Obd2DeviceProto.newBuilder()

        /**
         * Create a [RegisteredObd2DeviceProto] builder.
         */
        fun registeredObd2DeviceProtoBuilder(): RegisteredObd2DeviceProto.Builder =
            RegisteredObd2DeviceProto.newBuilder()
    }
}
