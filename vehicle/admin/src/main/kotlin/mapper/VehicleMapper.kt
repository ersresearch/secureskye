/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.TimestampMapper
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.RegisteredVehicleProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleAlertCountProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleBodyTypeProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleConnectionProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleTrackingStatusProto
import jp.co.trillium.secureskye.vehicle.admin.model.Vehicle
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleAlertCount
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleBodyType
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleConnection
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleTrackingStatus
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.mapstruct.ValueMapping
import org.mapstruct.ValueMappings
import org.springframework.stereotype.Component

/**
 * Mapper between Protobuf models and database models of vehicle messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [UuidMapper::class, TimestampMapper::class, VehicleMapper.BuilderFactory::class]
)
abstract class VehicleMapper {

    /**
     * Map [vehicleConnection] to [VehicleConnectionProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "ipAddressBytes", ignore = true),
        Mapping(target = "statusValue", ignore = true),
        Mapping(target = "idBytes", ignore = true)
    )
    protected abstract fun vehicleConnectionBuilder(vehicleConnection: VehicleConnection):
            VehicleConnectionProto.Builder

    /**
     * Map [vehicleConnection] to [VehicleConnectionProto].
     */
    fun vehicleConnection(vehicleConnection: VehicleConnection): VehicleConnectionProto =
        vehicleConnectionBuilder(vehicleConnection).build()

    /**
     * Map [vehicleConnectionProto] to [VehicleConnection].
     */
    @Mappings(
        Mapping(target = "vehicle", ignore = true),
        Mapping(target = "id", ignore = true),
        Mapping(target = "lastReceivingTimestamp", ignore = true),
        Mapping(target = "connected", source = "connected")
    )
    abstract fun vehicleConnection(vehicleConnectionProto: VehicleConnectionProto): VehicleConnection

    /**
     * Map [trackingStatus] to [VehicleTrackingStatusProto].
     */
    fun trackingStatus(trackingStatus: VehicleTrackingStatus): VehicleTrackingStatusProto =
        VehicleTrackingStatusProto.forNumber(trackingStatus.value)

    /**
     * Map [VehicleTrackingStatusProto] to [trackingStatus].
     */
    fun trackingStatus(trackingStatus: VehicleTrackingStatusProto): VehicleTrackingStatus =
        VehicleTrackingStatus.values().first { it.value == trackingStatus.number }

    /**
     * Map [vehicleAlertCount] to [VehicleAlertCountProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true)
    )
    protected abstract fun vehicleAlertCountBuilder(vehicleAlertCount: VehicleAlertCount):
            VehicleAlertCountProto.Builder

    /**
     * Map [vehicleAlertCount] to [VehicleAlertCountProto].
     */
    fun vehicleAlertCount(vehicleAlertCount: VehicleAlertCount): VehicleAlertCountProto =
        vehicleAlertCountBuilder(vehicleAlertCount).build()

    /**
     * Map [vehicleBodyType] to [VehicleBodyTypeProto].
     */
    @ValueMappings(
        ValueMapping(target = "CUSTOM", source = "Custom"),
        ValueMapping(target = "HATCHBACK", source = "Hatchback"),
        ValueMapping(target = "SEDAN", source = "Sedan"),
        ValueMapping(target = "MUV", source = "Muv"),
        ValueMapping(target = "SUV", source = "Suv"),
        ValueMapping(target = "COUPE", source = "Coupe"),
        ValueMapping(target = "CONVERTIBLE", source = "Convertible"),
        ValueMapping(target = "WAGON", source = "Wagon"),
        ValueMapping(target = "VAN", source = "Van"),
        ValueMapping(target = "JEEP", source = "Jeep")
    )
    abstract fun vehicleBodyType(vehicleBody: VehicleBodyType): VehicleBodyTypeProto

    /**
     * Map [vehicle] to [VehicleProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "modelIdBytes", ignore = true),
        Mapping(target = "modelNameBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "tfa", ignore = true),
        Mapping(target = "tfaValue", ignore = true),
        Mapping(target = "makerIdBytes", ignore = true),
        Mapping(target = "makerNameBytes", ignore = true),
        Mapping(target = "vinBytes", ignore = true),
        Mapping(target = "colorBytes", ignore = true),
        Mapping(target = "bodyTypeValue", ignore = true),
        Mapping(target = "imageUrlBytes", ignore = true),

        Mapping(target = "modelId", source = "model.id"),
        Mapping(target = "modelName", source = "model.name"),
        Mapping(target = "makerId", source = "model.maker.id"),
        Mapping(target = "makerName", source = "model.maker.name"),
        Mapping(target = "bodyType", expression = "java(vehicleBodyType(vehicle.getModel().getBody()))"),
        Mapping(target = "deleted", defaultValue = "false")
    )
    protected abstract fun vehicleBuilder(vehicle: Vehicle): VehicleProto.Builder

    /**
     * Map [vehicle] to [VehicleProto].
     */
    fun vehicle(vehicle: Vehicle): VehicleProto = vehicleBuilder(vehicle).build()

    /**
     * Map [list] to [VehicleListProto].
     */
    fun vehicleList(list: List<Vehicle>): VehicleListProto = VehicleListProto.newBuilder()
        .addAllData(list.map(::vehicle))
        .build()

    /**
     * Map [vehicle] to [RegisteredVehicleProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "clientIdBytes", ignore = true),
        Mapping(target = "vehicle", source = "vehicle")
    )
    protected abstract fun registeredVehicleBuilder(vehicle: Vehicle): RegisteredVehicleProto.Builder

    /**
     * Map [vehicle] to [RegisteredVehicleProto].
     */
    fun registeredVehicle(vehicle: Vehicle): RegisteredVehicleProto = registeredVehicleBuilder(vehicle).build()

    /**
     * Map [vehicle] to [VehicleProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "modelIdBytes", ignore = true),
        Mapping(target = "modelNameBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "makerIdBytes", ignore = true),
        Mapping(target = "makerNameBytes", ignore = true),
        Mapping(target = "vinBytes", ignore = true),
        Mapping(target = "colorBytes", ignore = true),
        Mapping(target = "tfaValue", ignore = true),
        Mapping(target = "bodyTypeValue", ignore = true),
        Mapping(target = "imageUrlBytes", ignore = true),

        Mapping(target = "modelId", source = "vehicle.model.id"),
        Mapping(target = "modelName", source = "vehicle.model.name"),
        Mapping(target = "makerId", source = "vehicle.model.maker.id"),
        Mapping(target = "makerName", source = "vehicle.model.maker.name"),
        Mapping(target = "bodyType", expression = "java(vehicleBodyType(vehicle.getModel().getBody()))")
    )
    protected abstract fun vehicleBuilder(
        vehicle: Vehicle,
        tfa: TwoFactorAuthenticationStatusProto
    ): VehicleProto.Builder

    /**
     * Map [vehicle] to [VehicleProto].
     */
    fun vehicle(vehicle: Vehicle, tfa: TwoFactorAuthenticationStatusProto): VehicleProto =
        vehicleBuilder(vehicle, tfa).build()

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [VehicleProto] builder.
         */
        fun vehicleBuilder(): VehicleProto.Builder = VehicleProto.newBuilder()

        /**
         * Create a [RegisteredVehicleProto] builder.
         */
        fun registeredVehicleBuilder(): RegisteredVehicleProto.Builder = RegisteredVehicleProto.newBuilder()

        /**
         * Create a [VehicleConnectionProto] builder.
         */
        fun vehicleConnectionBuilder(): VehicleConnectionProto.Builder = VehicleConnectionProto.newBuilder()

        /**
         * Create a [VehicleAlertCountProto] builder.
         */
        fun vehicleAlertCountBuilder(): VehicleAlertCountProto.Builder = VehicleAlertCountProto.newBuilder()
    }
}
