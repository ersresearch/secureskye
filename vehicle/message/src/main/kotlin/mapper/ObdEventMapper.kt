/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.TimestampMapper
import jp.co.trillium.secureskye.vehicle.message.api.proto.AmbientTemperatureEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.AmbientTemperatureEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.CodeClearDistanceEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.CodeClearDistanceEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.ControlModuleVoltageEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.ControlModuleVoltageEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineCoolantEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineCoolantEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineLoadEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineLoadEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineRuntimeEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineRuntimeEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.FuelLevelEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.FuelLevelEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.IntakeAirEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.IntakeAirEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.MassAirFlowEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.MassAirFlowEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.MilStatusEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.MilStatusEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.RpmEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.RpmEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.SpeedEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.SpeedEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.ThrottleEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.ThrottleEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.TroubleCodeEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.TroubleCodeEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.VinEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.VinEventProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.exception.UnknownEngineTypeException
import jp.co.trillium.secureskye.vehicle.message.model.obd.AmbientTemperatureEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.CodeClearDistanceEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.ControlModuleVoltageEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.EngineCoolantEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.EngineLoadEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.EngineRuntimeEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.FuelLevelEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.IntakeAirEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.MassAirFlowEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.MilStatusEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.RpmEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.SpeedEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.ThrottleEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.TroubleCodeEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.VinEvent
import org.mapstruct.AfterMapping
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingTarget
import org.mapstruct.Mappings
import org.springframework.stereotype.Component
import java.util.UUID

/**
 * Mapper between Protobuf models and database models of vehicle messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [TimestampMapper::class, ObdEventMapper.BuilderFactory::class]
)
abstract class ObdEventMapper {

    /**
     * Map [id] and [event] to [MilStatusEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "engineTests", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun milStatusEvent(id: UUID, event: MilStatusEventProtoOrBuilder): MilStatusEvent

    @AfterMapping
    protected fun milStatusEvent(source: MilStatusEventProtoOrBuilder, @MappingTarget target: MilStatusEvent) {
        when (source.engineTestsCase) {
            MilStatusEventProto.EngineTestsCase.SPARK_TESTS -> {
                if (source.engineType != MilStatusEventProto.EngineType.SPARK)
                    throw IllegalArgumentException()
                if (source.hasSparkTests())
                    target.engineTests = source.sparkTests.let(::sparkTests)
            }
            MilStatusEventProto.EngineTestsCase.COMPRESSION_TESTS -> {
                if (source.engineType != MilStatusEventProto.EngineType.COMPRESSION)
                    throw IllegalArgumentException()
                if (source.hasCompressionTests())
                    target.engineTests = source.compressionTests.let(::compressionTests)
            }
            else -> {
            }
        }
    }

    /**
     * Map [event] to [MilStatusEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "engineTypeValue", ignore = true),
        Mapping(target = "sparkTests", ignore = true),
        Mapping(target = "compressionTests", ignore = true)
    )
    protected abstract fun milStatusEventBuilder(event: MilStatusEvent): MilStatusEventProto.Builder

    @AfterMapping
    protected fun milStatusEventBuilder(source: MilStatusEvent, @MappingTarget target: MilStatusEventProto.Builder) {
        source.engineTests.also {
            when (it) {
                is MilStatusEvent.EngineTests.SparkTests -> {
                    if (source.engineType != MilStatusEvent.EngineType.Spark)
                        throw IllegalArgumentException()
                    target.sparkTests = it.let(::sparkTests)
                }
                is MilStatusEvent.EngineTests.CompressionTests -> {
                    if (source.engineType != MilStatusEvent.EngineType.Compression)
                        throw IllegalArgumentException()
                    target.compressionTests = it.let(::compressionTests)
                }
            }
        }
    }

    /**
     * Map [event] to [MilStatusEventProto].
     */
    fun milStatusEvent(event: MilStatusEvent): MilStatusEventProto = milStatusEventBuilder(event).build()

    /**
     * Map [event] to [MilStatusEvent.EngineTests.SparkTests].
     */
    protected abstract fun sparkTests(event: MilStatusEventProto.SparkTests): MilStatusEvent.EngineTests.SparkTests

    /**
     * Map [event] to [MilStatusEventProto.SparkTests.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun sparkTestsBuilder(
        event: MilStatusEvent.EngineTests.SparkTests
    ): MilStatusEventProto.SparkTests.Builder

    /**
     * Map [event] to [MilStatusEventProto.SparkTests].
     */
    protected fun sparkTests(event: MilStatusEvent.EngineTests.SparkTests): MilStatusEventProto.SparkTests =
        sparkTestsBuilder(event).build()

    /**
     * Map [event] to [MilStatusEvent.EngineTests.CompressionTests].
     */
    protected abstract fun compressionTests(
        event: MilStatusEventProto.CompressionTests
    ): MilStatusEvent.EngineTests.CompressionTests

    /**
     * Map [event] to [MilStatusEventProto.CompressionTests.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun compressionTestsBuilder(
        event: MilStatusEvent.EngineTests.CompressionTests
    ): MilStatusEventProto.CompressionTests.Builder

    /**
     * Map [event] to [MilStatusEventProto.CompressionTests].
     */
    protected fun compressionTests(
        event: MilStatusEvent.EngineTests.CompressionTests
    ): MilStatusEventProto.CompressionTests =
        compressionTestsBuilder(event).build()

    /**
     * Map [event] to [MilStatusEvent.OnBoardTest].
     */
    protected abstract fun onBoardTest(event: MilStatusEventProto.OnBoardTest): MilStatusEvent.OnBoardTest

    /**
     * Map [event] to [MilStatusEventProto.OnBoardTest.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun onBoardTestBuilder(
        event: MilStatusEvent.OnBoardTest
    ): MilStatusEventProto.OnBoardTest.Builder

    /**
     * Map [event] to [MilStatusEventProto.OnBoardTest].
     */
    protected fun onBoardTest(event: MilStatusEvent.OnBoardTest): MilStatusEventProto.OnBoardTest =
        onBoardTestBuilder(event).build()

    /**
     * Map [engineType] to [MilStatusEvent.EngineType].
     */
    protected fun engineType(engineType: MilStatusEventProto.EngineType): MilStatusEvent.EngineType =
        MilStatusEvent.EngineType.values().find { it.value == engineType.number }
                ?: throw UnknownEngineTypeException(engineType.number)

    /**
     * Map [engineType] to [MilStatusEventProto.EngineType].
     */
    protected fun engineType(engineType: MilStatusEvent.EngineType): MilStatusEventProto.EngineType =
        MilStatusEventProto.EngineType.forNumber(engineType.value)

    /**
     * Map [id] and [event] to [EngineLoadEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun engineLoadEvent(id: UUID, event: EngineLoadEventProtoOrBuilder): EngineLoadEvent

    /**
     * Map [event] to [EngineLoadEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun engineLoadEventBuilder(event: EngineLoadEvent): EngineLoadEventProto.Builder

    /**
     * Map [event] to [EngineLoadEventProto].
     */
    fun engineLoadEvent(event: EngineLoadEvent): EngineLoadEventProto = engineLoadEventBuilder(event).build()

    /**
     * Map [id] and [event] to [EngineCoolantEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun engineCoolantEvent(id: UUID, event: EngineCoolantEventProtoOrBuilder): EngineCoolantEvent

    /**
     * Map [event] to [EngineCoolantEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun engineCoolantEventBuilder(event: EngineCoolantEvent): EngineCoolantEventProto.Builder

    /**
     * Map [event] to [EngineCoolantEventProto].
     */
    fun engineCoolantEvent(event: EngineCoolantEvent): EngineCoolantEventProto =
        engineCoolantEventBuilder(event).build()

    /**
     * Map [id] and [event] to [RpmEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun rpmEvent(id: UUID, event: RpmEventProtoOrBuilder): RpmEvent

    /**
     * Map [event] to [RpmEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun rpmEventBuilder(event: RpmEvent): RpmEventProto.Builder

    /**
     * Map [event] to [RpmEventProto].
     */
    fun rpmEvent(event: RpmEvent): RpmEventProto = rpmEventBuilder(event).build()

    /**
     * Map [id] and [event] to [SpeedEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun speedEvent(id: UUID, event: SpeedEventProtoOrBuilder): SpeedEvent

    /**
     * Map [event] to [SpeedEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun speedEventBuilder(event: SpeedEvent): SpeedEventProto.Builder

    /**
     * Map [event] to [SpeedEventProto].
     */
    fun speedEvent(event: SpeedEvent): SpeedEventProto = speedEventBuilder(event).build()

    /**
     * Map [id] and [event] to [IntakeAirEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun intakeAirEvent(id: UUID, event: IntakeAirEventProtoOrBuilder): IntakeAirEvent

    /**
     * Map [event] to [IntakeAirEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun intakeAirEventBuilder(event: IntakeAirEvent): IntakeAirEventProto.Builder

    /**
     * Map [event] to [IntakeAirEventProto].
     */
    fun intakeAirEvent(event: IntakeAirEvent): IntakeAirEventProto = intakeAirEventBuilder(event).build()

    /**
     * Map [id] and [event] to [MassAirFlowEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun massAirFlowEvent(id: UUID, event: MassAirFlowEventProtoOrBuilder): MassAirFlowEvent

    /**
     * Map [event] to [MassAirFlowEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun massAirFlowEventBuilder(event: MassAirFlowEvent): MassAirFlowEventProto.Builder

    /**
     * Map [event] to [MassAirFlowEventProto].
     */
    fun massAirFlowEvent(event: MassAirFlowEvent): MassAirFlowEventProto = massAirFlowEventBuilder(event).build()

    /**
     * Map [id] and [event] to [ThrottleEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun throttleEvent(id: UUID, event: ThrottleEventProtoOrBuilder): ThrottleEvent

    /**
     * Map [event] to [ThrottleEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun throttleEventBuilder(event: ThrottleEvent): ThrottleEventProto.Builder

    /**
     * Map [event] to [ThrottleEventProto].
     */
    fun throttleEvent(event: ThrottleEvent): ThrottleEventProto = throttleEventBuilder(event).build()

    /**
     * Map [id] and [event] to [EngineRuntimeEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun engineRuntimeEvent(id: UUID, event: EngineRuntimeEventProtoOrBuilder): EngineRuntimeEvent

    /**
     * Map [event] to [EngineRuntimeEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun engineRuntimeEventBuilder(event: EngineRuntimeEvent): EngineRuntimeEventProto.Builder

    /**
     * Map [event] to [EngineRuntimeEventProto].
     */
    fun engineRuntimeEvent(event: EngineRuntimeEvent): EngineRuntimeEventProto =
        engineRuntimeEventBuilder(event).build()

    /**
     * Map [id] and [event] to [FuelLevelEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun fuelLevelEvent(id: UUID, event: FuelLevelEventProtoOrBuilder): FuelLevelEvent

    /**
     * Map [event] to [FuelLevelEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun fuelLevelEventBuilder(event: FuelLevelEvent): FuelLevelEventProto.Builder

    /**
     * Map [event] to [FuelLevelEventProto].
     */
    fun fuelLevelEvent(event: FuelLevelEvent): FuelLevelEventProto = fuelLevelEventBuilder(event).build()

    /**
     * Map [id] and [event] to [CodeClearDistanceEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun codeClearDistanceEvent(id: UUID, event: CodeClearDistanceEventProtoOrBuilder): CodeClearDistanceEvent

    /**
     * Map [event] to [CodeClearDistanceEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun codeClearDistanceEventBuilder(
        event: CodeClearDistanceEvent
    ): CodeClearDistanceEventProto.Builder

    /**
     * Map [event] to [CodeClearDistanceEventProto].
     */
    fun codeClearDistanceEvent(event: CodeClearDistanceEvent): CodeClearDistanceEventProto =
        codeClearDistanceEventBuilder(event).build()

    /**
     * Map [id] and [event] to [ControlModuleVoltageEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun controlModuleVoltageEvent(
        id: UUID,
        event: ControlModuleVoltageEventProtoOrBuilder
    ): ControlModuleVoltageEvent

    /**
     * Map [event] to [ControlModuleVoltageEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun controlModuleVoltageEventBuilder(
        event: ControlModuleVoltageEvent
    ): ControlModuleVoltageEventProto.Builder

    /**
     * Map [event] to [ControlModuleVoltageEventProto].
     */
    fun controlModuleVoltageEvent(event: ControlModuleVoltageEvent): ControlModuleVoltageEventProto =
        controlModuleVoltageEventBuilder(event).build()

    /**
     * Map [id] and [event] to [AmbientTemperatureEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun ambientTemperatureEvent(
        id: UUID,
        event: AmbientTemperatureEventProtoOrBuilder
    ): AmbientTemperatureEvent

    /**
     * Map [event] to [AmbientTemperatureEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun ambientTemperatureEventBuilder(
        event: AmbientTemperatureEvent
    ): AmbientTemperatureEventProto.Builder

    /**
     * Map [event] to [AmbientTemperatureEventProto].
     */
    fun ambientTemperatureEvent(event: AmbientTemperatureEvent): AmbientTemperatureEventProto =
        ambientTemperatureEventBuilder(event).build()

    /**
     * Map [id] and [event] to [TroubleCodeEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun troubleCodeEvent(id: UUID, event: TroubleCodeEventProtoOrBuilder): TroubleCodeEvent

    /**
     * Map [event] to [TroubleCodeEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "codeBytes", ignore = true)
    )
    protected abstract fun troubleCodeEventBuilder(event: TroubleCodeEvent): TroubleCodeEventProto.Builder

    /**
     * Map [event] to [TroubleCodeEventProto].
     */
    fun troubleCodeEvent(event: TroubleCodeEvent): TroubleCodeEventProto = troubleCodeEventBuilder(event).build()

    /**
     * Map [id] and [event] to [VinEvent].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id")
    )
    abstract fun vinEvent(id: UUID, event: VinEventProtoOrBuilder): VinEvent

    /**
     * Map [event] to [VinEventProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "valueBytes", ignore = true)
    )
    protected abstract fun vinEventBuilder(event: VinEvent): VinEventProto.Builder

    /**
     * Map [event] to [VinEventProto].
     */
    fun vinEvent(event: VinEvent): VinEventProto = vinEventBuilder(event).build()

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [MilStatusEventProto] builder.
         */
        fun milStatusEventBuilder(): MilStatusEventProto.Builder = MilStatusEventProto.newBuilder()

        /**
         * Create a [MilStatusEventProto.SparkTests] builder.
         */
        fun sparkTestsBuilder(): MilStatusEventProto.SparkTests.Builder = MilStatusEventProto.SparkTests.newBuilder()

        /**
         * Create a [MilStatusEventProto.CompressionTests] builder.
         */
        fun compressionTestsBuilder(): MilStatusEventProto.CompressionTests.Builder =
            MilStatusEventProto.CompressionTests.newBuilder()

        /**
         * Create a [MilStatusEventProto.OnBoardTest] builder.
         */
        fun onBoardTestBuilder(): MilStatusEventProto.OnBoardTest.Builder = MilStatusEventProto.OnBoardTest.newBuilder()

        /**
         * Create a [EngineLoadEventProto] builder.
         */
        fun engineLoadEventBuilder(): EngineLoadEventProto.Builder = EngineLoadEventProto.newBuilder()

        /**
         * Create a [EngineCoolantEventProto] builder.
         */
        fun engineCoolantEventBuilder(): EngineCoolantEventProto.Builder = EngineCoolantEventProto.newBuilder()

        /**
         * Create a [RpmEventProto] builder.
         */
        fun rpmEventBuilder(): RpmEventProto.Builder = RpmEventProto.newBuilder()

        /**
         * Create a [SpeedEventProto] builder.
         */
        fun speedEventBuilder(): SpeedEventProto.Builder = SpeedEventProto.newBuilder()

        /**
         * Create a [SpeedEventProto] builder.
         */
        fun intakeAirEventBuilder(): IntakeAirEventProto.Builder = IntakeAirEventProto.newBuilder()

        /**
         * Create a [MassAirFlowEventProto] builder.
         */
        fun massAirFlowEventBuilder(): MassAirFlowEventProto.Builder = MassAirFlowEventProto.newBuilder()

        /**
         * Create a [ThrottleEventProto] builder.
         */
        fun throttleEventBuilder(): ThrottleEventProto.Builder = ThrottleEventProto.newBuilder()

        /**
         * Create a [EngineRuntimeEventProto] builder.
         */
        fun engineRuntimeEventBuilder(): EngineRuntimeEventProto.Builder = EngineRuntimeEventProto.newBuilder()

        /**
         * Create a [FuelLevelEventProto] builder.
         */
        fun fuelLevelEventBuilder(): FuelLevelEventProto.Builder = FuelLevelEventProto.newBuilder()

        /**
         * Create a [CodeClearDistanceEventProto] builder.
         */
        fun codeClearDistanceEventBuilder(): CodeClearDistanceEventProto.Builder =
            CodeClearDistanceEventProto.newBuilder()

        /**
         * Create a [ControlModuleVoltageEventProto] builder.
         */
        fun controlModuleVoltageEventBuilder(): ControlModuleVoltageEventProto.Builder =
            ControlModuleVoltageEventProto.newBuilder()

        /**
         * Create a [AmbientTemperatureEventProto] builder.
         */
        fun ambientTemperatureEventBuilder(): AmbientTemperatureEventProto.Builder =
            AmbientTemperatureEventProto.newBuilder()

        /**
         * Create a [TroubleCodeEventProto] builder.
         */
        fun troubleCodeEventBuilder(): TroubleCodeEventProto.Builder = TroubleCodeEventProto.newBuilder()

        /**
         * Create a [VinEventProto] builder.
         */
        fun vinEventBuilder(): VinEventProto.Builder = VinEventProto.newBuilder()
    }
}
