/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.mapper

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.message.api.proto.AmbientTemperatureEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.CodeClearDistanceEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.ControlModuleVoltageEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineCoolantEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineLoadEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineRuntimeEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.FuelLevelEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.IntakeAirEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.MassAirFlowEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.MilStatusEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.RpmEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.SpeedEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.ThrottleEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.TroubleCodeEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.VinEventProto
import jp.co.trillium.secureskye.vehicle.message.model.obd.MilStatusEvent
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.UUID

@ExtendWith(SpringExtension::class)
class ObdEventMapperTest {

    @TestConfiguration
    @ComponentScan(basePackageClasses = [ObdEventMapper::class, UuidMapper::class])
    class TestContextConfiguration

    @Autowired
    private lateinit var mapper: ObdEventMapper

    @Test
    fun `Mil Status event with spark engine should be same after mapping`() {
        fun onBoardTest() = MilStatusEventProto.OnBoardTest.newBuilder()
            .setAvailable(true)
            .setIncomplete(true)

        val event = MilStatusEventProto.newBuilder()
            .setTimestamp(10)
            .setMil(true)
            .setDtcCount(2)
            .setEngineType(MilStatusEventProto.EngineType.SPARK)
            .setComponentsTest(onBoardTest())
            .setFuelSystemTest(onBoardTest())
            .setMisfireTest(onBoardTest())
            .setSparkTests(
                MilStatusEventProto.SparkTests.newBuilder()
                    .setEgrSystem(onBoardTest())
                    .setOxygenSensorHeater(onBoardTest())
                    .setOxygenSensor(onBoardTest())
                    .setAcRefrigerant(onBoardTest())
                    .setSecondaryAirSystem(onBoardTest())
                    .setEvaporativeSystem(onBoardTest())
                    .setHeatedCatalyst(onBoardTest())
                    .setCatalyst(onBoardTest())
            )
            .build()

        val temp = mapper.milStatusEvent(UUID(0, 0), event)
        val mapped = mapper.milStatusEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Mil Status event with compression engine should be same after mapping`() {
        fun onBoardTest() = MilStatusEventProto.OnBoardTest.newBuilder()
            .setAvailable(true)
            .setIncomplete(true)

        val event = MilStatusEventProto.newBuilder()
            .setTimestamp(10)
            .setMil(true)
            .setDtcCount(2)
            .setEngineType(MilStatusEventProto.EngineType.COMPRESSION)
            .setComponentsTest(onBoardTest())
            .setFuelSystemTest(onBoardTest())
            .setMisfireTest(onBoardTest())
            .setCompressionTests(
                MilStatusEventProto.CompressionTests.newBuilder()
                    .setEgrVvtSystem(onBoardTest())
                    .setPmFilterMonitoring(onBoardTest())
                    .setExhaustGasSensor(onBoardTest())
                    .setBoostPressure(onBoardTest())
                    .setNoxScrMonitor(onBoardTest())
                    .setNmhcCatalyst(onBoardTest())
            )
            .build()

        val temp = mapper.milStatusEvent(UUID(0, 0), event)
        val mapped = mapper.milStatusEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Mapping MIL Status event with spark engine and compression tests should fail`() {
        val event = MilStatusEventProto.newBuilder()
            .setEngineType(MilStatusEventProto.EngineType.SPARK)
            .setCompressionTests(MilStatusEventProto.CompressionTests.newBuilder())
            .build()

        assertThrows<IllegalArgumentException> {
            mapper.milStatusEvent(UUID(0, 0), event)
        }
    }

    @Test
    fun `Mapping MIL Status event with compression engine and spark tests should fail`() {
        val event = MilStatusEventProto.newBuilder()
            .setEngineType(MilStatusEventProto.EngineType.COMPRESSION)
            .setSparkTests(MilStatusEventProto.SparkTests.newBuilder())
            .build()

        assertThrows<IllegalArgumentException> {
            mapper.milStatusEvent(UUID(0, 0), event)
        }
    }

    @Test
    fun `Mapping MIL Status event DB class with spark engine and compression tests should fail`() {
        val event = MilStatusEvent(
            engineType = MilStatusEvent.EngineType.Spark,
            engineTests = MilStatusEvent.EngineTests.CompressionTests()
        )

        assertThrows<IllegalArgumentException> {
            mapper.milStatusEvent(event)
        }
    }

    @Test
    fun `Mapping MIL Status event DB class with compression engine and spark tests should fail`() {
        val event = MilStatusEvent(
            engineType = MilStatusEvent.EngineType.Compression,
            engineTests = MilStatusEvent.EngineTests.SparkTests()
        )

        assertThrows<IllegalArgumentException> {
            mapper.milStatusEvent(event)
        }
    }

    @Test
    fun `Engine load event should be same after mapping`() {
        val event = EngineLoadEventProto.newBuilder()
            .setTimestamp(10)
            .setValue(5)
            .build()

        val temp = mapper.engineLoadEvent(UUID(0, 0), event)
        val mapped = mapper.engineLoadEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Engine coolant event should be same after mapping`() {
        val event = EngineCoolantEventProto.newBuilder()
            .setTimestamp(10)
            .setTemperature(5)
            .build()

        val temp = mapper.engineCoolantEvent(UUID(0, 0), event)
        val mapped = mapper.engineCoolantEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `RPM event should be same after mapping`() {
        val event = RpmEventProto.newBuilder()
            .setTimestamp(10)
            .setValue(5)
            .build()

        val temp = mapper.rpmEvent(UUID(0, 0), event)
        val mapped = mapper.rpmEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Speed event should be same after mapping`() {
        val event = SpeedEventProto.newBuilder()
            .setTimestamp(10)
            .setKmh(5)
            .build()

        val temp = mapper.speedEvent(UUID(0, 0), event)
        val mapped = mapper.speedEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Intake air event should be same after mapping`() {
        val event = IntakeAirEventProto.newBuilder()
            .setTimestamp(10)
            .setTemperature(5)
            .build()

        val temp = mapper.intakeAirEvent(UUID(0, 0), event)
        val mapped = mapper.intakeAirEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Mass air flow event should be same after mapping`() {
        val event = MassAirFlowEventProto.newBuilder()
            .setTimestamp(10)
            .setRate(2.222)
            .build()

        val temp = mapper.massAirFlowEvent(UUID(0, 0), event)
        val mapped = mapper.massAirFlowEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Throttle event should be same after mapping`() {
        val event = ThrottleEventProto.newBuilder()
            .setTimestamp(10)
            .setValue(5)
            .build()

        val temp = mapper.throttleEvent(UUID(0, 0), event)
        val mapped = mapper.throttleEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Engine runtime event should be same after mapping`() {
        val event = EngineRuntimeEventProto.newBuilder()
            .setTimestamp(10)
            .setSeconds(32)
            .build()

        val temp = mapper.engineRuntimeEvent(UUID(0, 0), event)
        val mapped = mapper.engineRuntimeEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Fuel level event should be same after mapping`() {
        val event = FuelLevelEventProto.newBuilder()
            .setTimestamp(10)
            .setValue(5)
            .build()

        val temp = mapper.fuelLevelEvent(UUID(0, 0), event)
        val mapped = mapper.fuelLevelEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Code clear distance event should be same after mapping`() {
        val event = CodeClearDistanceEventProto.newBuilder()
            .setTimestamp(10)
            .setValue(5)
            .build()

        val temp = mapper.codeClearDistanceEvent(UUID(0, 0), event)
        val mapped = mapper.codeClearDistanceEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Control module voltage event should be same after mapping`() {
        val event = ControlModuleVoltageEventProto.newBuilder()
            .setTimestamp(10)
            .setVoltage(5)
            .build()

        val temp = mapper.controlModuleVoltageEvent(UUID(0, 0), event)
        val mapped = mapper.controlModuleVoltageEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Ambient temperature event should be same after mapping`() {
        val event = AmbientTemperatureEventProto.newBuilder()
            .setTimestamp(10)
            .setTemperature(5)
            .build()

        val temp = mapper.ambientTemperatureEvent(UUID(0, 0), event)
        val mapped = mapper.ambientTemperatureEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Trouble code event should be same after mapping`() {
        val event = TroubleCodeEventProto.newBuilder()
            .setTimestamp(10)
            .setCode("test")
            .build()

        val temp = mapper.troubleCodeEvent(UUID(0, 0), event)
        val mapped = mapper.troubleCodeEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `VIN event should be same after mapping`() {
        val event = VinEventProto.newBuilder()
            .setTimestamp(10)
            .setValue("test")
            .build()

        val temp = mapper.vinEvent(UUID(0, 0), event)
        val mapped = mapper.vinEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }
}