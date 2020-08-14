/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.TimestampMapper
import jp.co.trillium.secureskye.vehicle.message.api.proto.BatteryEnergyEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.BatteryEnergyEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.FuelConsumptionEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.FuelConsumptionEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.GearShiftEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GearShiftEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.OdometerEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.OdometerEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.WheelSpeedEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.WheelSpeedEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.model.BatteryEnergyEvent
import jp.co.trillium.secureskye.vehicle.message.model.FuelConsumptionEvent
import jp.co.trillium.secureskye.vehicle.message.model.GearShiftEvent
import jp.co.trillium.secureskye.vehicle.message.model.GpsEvent
import jp.co.trillium.secureskye.vehicle.message.model.OdometerEvent
import jp.co.trillium.secureskye.vehicle.message.model.WheelSpeedEvent
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.springframework.stereotype.Component
import java.util.UUID

/**
 * Mapper between Protobuf models and database models of vehicle messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [TimestampMapper::class, EventMapper.BuilderFactory::class]
)
abstract class EventMapper {

    /**
     * Map [id] and [event] to [GpsEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun gpsEvent(id: UUID, event: GpsEventProtoOrBuilder): GpsEvent

    /**
     * Map [event] to [GpsEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun gpsEventBuilder(event: GpsEvent): GpsEventProto.Builder

    /**
     * Map [event] to [GpsEventProto].
     */
    fun gpsEvent(event: GpsEvent): GpsEventProto = gpsEventBuilder(event).build()

    /**
     * Map [id] and [event] to [OdometerEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun odometerEvent(id: UUID, event: OdometerEventProtoOrBuilder): OdometerEvent

    /**
     * Map [event] to [OdometerEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun odometerEventBuilder(event: OdometerEvent): OdometerEventProto.Builder

    /**
     * Map [event] to [OdometerEventProto].
     */
    fun odometerEvent(event: OdometerEvent): OdometerEventProto = odometerEventBuilder(event).build()

    /**
     * Map [id] and [event] to [BatteryEnergyEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun batteryEnergyEvent(id: UUID, event: BatteryEnergyEventProtoOrBuilder): BatteryEnergyEvent

    /**
     * Map [event] to [BatteryEnergyEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun batteryEnergyEventBuilder(event: BatteryEnergyEvent): BatteryEnergyEventProto.Builder

    /**
     * Map [event] to [BatteryEnergyEventProto].
     */
    fun batteryEnergyEvent(event: BatteryEnergyEvent): BatteryEnergyEventProto =
        batteryEnergyEventBuilder(event).build()

    /**
     * Map [id] and [event] to [FuelConsumptionEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun fuelConsumptionEvent(id: UUID, event: FuelConsumptionEventProtoOrBuilder): FuelConsumptionEvent

    /**
     * Map [event] to [FuelConsumptionEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun fuelConsumptionEventBuilder(event: FuelConsumptionEvent): FuelConsumptionEventProto.Builder

    /**
     * Map [event] to [FuelConsumptionEventProto].
     */
    fun fuelConsumptionEvent(event: FuelConsumptionEvent): FuelConsumptionEventProto =
        fuelConsumptionEventBuilder(event).build()

    /**
     * Map [id] and [event] to [GearShiftEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun gearShiftEvent(id: UUID, event: GearShiftEventProtoOrBuilder): GearShiftEvent

    /**
     * Map [event] to [GearShiftEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun gearShiftEventBuilder(event: GearShiftEvent): GearShiftEventProto.Builder

    /**
     * Map [event] to [GearShiftEventProto].
     */
    fun gearShiftEvent(event: GearShiftEvent): GearShiftEventProto = gearShiftEventBuilder(event).build()

    /**
     * Map [id] and [event] to [WheelSpeedEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun wheelSpeedEvent(id: UUID, event: WheelSpeedEventProtoOrBuilder): WheelSpeedEvent

    /**
     * Map [event] to [WheelSpeedEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun wheelSpeedEventBuilder(event: WheelSpeedEvent): WheelSpeedEventProto.Builder

    /**
     * Map [event] to [WheelSpeedEventProto].
     */
    fun wheelSpeedEvent(event: WheelSpeedEvent): WheelSpeedEventProto = wheelSpeedEventBuilder(event).build()

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [GpsEventProto] builder.
         */
        fun gpsEventBuilder(): GpsEventProto.Builder = GpsEventProto.newBuilder()

        /**
         * Create a [OdometerEventProto] builder.
         */
        fun odometerEventBuilder(): OdometerEventProto.Builder = OdometerEventProto.newBuilder()

        /**
         * Create a [BatteryEnergyEventProto] builder.
         */
        fun batteryEnergyEventBuilder(): BatteryEnergyEventProto.Builder = BatteryEnergyEventProto.newBuilder()

        /**
         * Create a [FuelConsumptionEventProto] builder.
         */
        fun fuelConsumptionEventBuilder(): FuelConsumptionEventProto.Builder = FuelConsumptionEventProto.newBuilder()

        /**
         * Create a [GearShiftEventProto] builder.
         */
        fun gearShiftEventBuilder(): GearShiftEventProto.Builder = GearShiftEventProto.newBuilder()

        /**
         * Create a [WheelSpeedEventProto] builder.
         */
        fun wheelSpeedEventBuilder(): WheelSpeedEventProto.Builder = WheelSpeedEventProto.newBuilder()
    }
}
