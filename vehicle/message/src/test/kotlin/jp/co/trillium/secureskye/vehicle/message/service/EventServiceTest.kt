/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.service

import com.google.protobuf.GeneratedMessageV3
import com.nhaarman.mockitokotlin2.any
import com.nhaarman.mockitokotlin2.times
import com.nhaarman.mockitokotlin2.verify
import com.nhaarman.mockitokotlin2.whenever
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.AmbientTemperatureEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.BatteryEnergyEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.CodeClearDistanceEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.ControlModuleVoltageEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineCoolantEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineLoadEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EngineRuntimeEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EventBatchProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.FuelConsumptionEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.FuelLevelEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GearShiftEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.IntakeAirEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.MassAirFlowEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.MilStatusEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.Obd2EventBatchProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.OdometerEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.RpmEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.SpeedEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.ThrottleEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.TroubleCodeEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.VinEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.WheelSpeedEventProto
import jp.co.trillium.secureskye.vehicle.message.feign.VehicleAdminClient
import jp.co.trillium.secureskye.vehicle.message.mapper.EventMapper
import jp.co.trillium.secureskye.vehicle.message.mapper.ObdEventMapper
import jp.co.trillium.secureskye.vehicle.message.repository.BatteryEnergyEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.FindLatestLimit
import jp.co.trillium.secureskye.vehicle.message.repository.FuelConsumptionEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.GearShiftEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.GpsEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.OdometerEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.WheelSpeedEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.AmbientTemperatureEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.CodeClearDistantEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.ControlModuleVoltageEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.EngineCoolantEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.EngineLoadEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.EngineRuntimeEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.FuelLevelEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.IntakeAirEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.MassAirFlowEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.MilStatusEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.RpmEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.SpeedEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.ThrottleEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.TroubleCodeEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.obd.VinEventRepository
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.ListAssert
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.verification.VerificationMode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.UUID

@ExtendWith(SpringExtension::class)
class EventServiceTest {

    @TestConfiguration
    @ComponentScan(basePackageClasses = [ObdEventMapper::class, EventMapper::class, UuidMapper::class])
    class TestContextConfiguration {
        @Bean
        fun eventService(
            obdEventMapper: ObdEventMapper,
            eventMapper: EventMapper,
            uuidMapper: UuidMapper,
            milStatusEventRepository: MilStatusEventRepository,
            engineLoadEventRepository: EngineLoadEventRepository,
            engineCoolantEventRepository: EngineCoolantEventRepository,
            rpmEventRepository: RpmEventRepository,
            speedEventRepository: SpeedEventRepository,
            intakeAirEventRepository: IntakeAirEventRepository,
            massAirFlowEventRepository: MassAirFlowEventRepository,
            throttleEventRepository: ThrottleEventRepository,
            engineRuntimeEventRepository: EngineRuntimeEventRepository,
            fuelLevelEventRepository: FuelLevelEventRepository,
            codeClearDistantEventRepository: CodeClearDistantEventRepository,
            controlModuleVoltageEventRepository: ControlModuleVoltageEventRepository,
            ambientTemperatureEventRepository: AmbientTemperatureEventRepository,
            troubleCodeEventRepository: TroubleCodeEventRepository,
            vinEventRepository: VinEventRepository,
            batteryEnergyEventRepository: BatteryEnergyEventRepository,
            fuelConsumptionEventRepository: FuelConsumptionEventRepository,
            gearShiftEventRepository: GearShiftEventRepository,
            gpsEventRepository: GpsEventRepository,
            odometerEventRepository: OdometerEventRepository,
            wheelSpeedEventRepository: WheelSpeedEventRepository,
            vehicleAdminClient: VehicleAdminClient
        ) =
            EventService(
                obdEventMapper,
                eventMapper,
                uuidMapper,
                milStatusEventRepository,
                engineLoadEventRepository,
                engineCoolantEventRepository,
                rpmEventRepository,
                speedEventRepository,
                intakeAirEventRepository,
                massAirFlowEventRepository,
                throttleEventRepository,
                engineRuntimeEventRepository,
                fuelLevelEventRepository,
                codeClearDistantEventRepository,
                controlModuleVoltageEventRepository,
                ambientTemperatureEventRepository,
                troubleCodeEventRepository,
                vinEventRepository,
                batteryEnergyEventRepository,
                fuelConsumptionEventRepository,
                gearShiftEventRepository,
                gpsEventRepository,
                odometerEventRepository,
                wheelSpeedEventRepository,
                vehicleAdminClient
            )
    }

    @Autowired
    private lateinit var eventService: EventService

    @MockBean
    private lateinit var milStatusEventRepository: MilStatusEventRepository

    @MockBean
    private lateinit var engineLoadEventRepository: EngineLoadEventRepository

    @MockBean
    private lateinit var engineCoolantEventRepository: EngineCoolantEventRepository

    @MockBean
    private lateinit var rpmEventRepository: RpmEventRepository

    @MockBean
    private lateinit var speedEventRepository: SpeedEventRepository

    @MockBean
    private lateinit var intakeAirEventRepository: IntakeAirEventRepository

    @MockBean
    private lateinit var massAirFlowEventRepository: MassAirFlowEventRepository

    @MockBean
    private lateinit var throttleEventRepository: ThrottleEventRepository

    @MockBean
    private lateinit var engineRuntimeEventRepository: EngineRuntimeEventRepository

    @MockBean
    private lateinit var fuelLevelEventRepository: FuelLevelEventRepository

    @MockBean
    private lateinit var codeClearDistantEventRepository: CodeClearDistantEventRepository

    @MockBean
    private lateinit var controlModuleVoltageEventRepository: ControlModuleVoltageEventRepository

    @MockBean
    private lateinit var ambientTemperatureEventRepository: AmbientTemperatureEventRepository

    @MockBean
    private lateinit var troubleCodeEventRepository: TroubleCodeEventRepository

    @MockBean
    private lateinit var vinEventRepository: VinEventRepository

    @MockBean
    private lateinit var batteryEnergyEventRepository: BatteryEnergyEventRepository

    @MockBean
    private lateinit var fuelConsumptionEventRepository: FuelConsumptionEventRepository

    @MockBean
    private lateinit var gearShiftEventRepository: GearShiftEventRepository

    @MockBean
    private lateinit var gpsEventRepository: GpsEventRepository

    @MockBean
    private lateinit var odometerEventRepository: OdometerEventRepository

    @MockBean
    private lateinit var wheelSpeedEventRepository: WheelSpeedEventRepository

    @MockBean
    private lateinit var vehicleAdminClient: VehicleAdminClient

    @Test
    fun `Save basic events calls the proper repositories`() {
        whenever(vehicleAdminClient.getVehicle(any(), any())).thenReturn(
            VehicleProto.newBuilder()
                .setId(UUID.randomUUID().toString())
                .build()
        )

        eventService.saveEvents(
            "test", EventBatchProto.newBuilder()
                .addBatteryEnergy(BatteryEnergyEventProto.getDefaultInstance())
                .addFuelConsumption(FuelConsumptionEventProto.getDefaultInstance())
                .addGearShift(GearShiftEventProto.getDefaultInstance())
                .addGps(GpsEventProto.getDefaultInstance())
                .addOdometer(OdometerEventProto.getDefaultInstance())
                .addWheelSpeed(WheelSpeedEventProto.getDefaultInstance())
                .build()
        )
    }

    @Test
    fun `Save OBD2 events calls the proper repositories`() {
        whenever(vehicleAdminClient.getVehicle(any(), any())).thenReturn(
            VehicleProto.newBuilder()
                .setId(UUID.randomUUID().toString())
                .build()
        )

        eventService.saveEvents(
            "test", EventBatchProto.newBuilder()
                .setObd2(
                    Obd2EventBatchProto.newBuilder()
                        .addMilStatus(MilStatusEventProto.getDefaultInstance())
                        .addEngineLoad(EngineLoadEventProto.getDefaultInstance())
                        .addEngineCoolant(EngineCoolantEventProto.getDefaultInstance())
                        .addRpm(RpmEventProto.getDefaultInstance())
                        .addSpeed(SpeedEventProto.getDefaultInstance())
                        .addIntakeAir(IntakeAirEventProto.getDefaultInstance())
                        .addMassAirFlow(MassAirFlowEventProto.getDefaultInstance())
                        .addThrottle(ThrottleEventProto.getDefaultInstance())
                        .addEngineRuntime(EngineRuntimeEventProto.getDefaultInstance())
                        .addFuelLevel(FuelLevelEventProto.getDefaultInstance())
                        .addCodeClearDistance(CodeClearDistanceEventProto.getDefaultInstance())
                        .addControlModuleVoltage(ControlModuleVoltageEventProto.getDefaultInstance())
                        .addAmbientTemperature(AmbientTemperatureEventProto.getDefaultInstance())
                        .addTroubleCodes(TroubleCodeEventProto.getDefaultInstance())
                        .addVin(VinEventProto.getDefaultInstance())
                )
                .build()
        )
    }

    @Test
    fun `Listing real events calls all repositories`() {
        eventService.listEvents(UUID.randomUUID(), 5)

        verifyRepos<FindLatestLimit<*>>(times(1)) {
            it.findLatestLimit(any(), any())
        }
    }

    private fun assertThatEvents(batch: EventBatchProto, func: (ListAssert<GeneratedMessageV3>) -> Unit) {
        val events = listOf(
            batch.obd2.milStatusList,
            batch.obd2.engineLoadList,
            batch.obd2.engineCoolantList,
            batch.obd2.rpmList,
            batch.obd2.speedList,
            batch.obd2.intakeAirList,
            batch.obd2.massAirFlowList,
            batch.obd2.throttleList,
            batch.obd2.engineRuntimeList,
            batch.obd2.fuelLevelList,
            batch.obd2.codeClearDistanceList,
            batch.obd2.controlModuleVoltageList,
            batch.obd2.ambientTemperatureList,
            batch.obd2.troubleCodesList,
            batch.obd2.vinList,
            batch.batteryEnergyList,
            batch.fuelConsumptionList,
            batch.gearShiftList,
            batch.gpsList,
            batch.odometerList,
            batch.wheelSpeedList
        )

        for (e in events)
            func(assertThat(e))
    }

    private fun repos() = listOf(
        milStatusEventRepository,
        engineLoadEventRepository,
        engineCoolantEventRepository,
        rpmEventRepository,
        speedEventRepository,
        intakeAirEventRepository,
        massAirFlowEventRepository,
        throttleEventRepository,
        engineRuntimeEventRepository,
        fuelLevelEventRepository,
        codeClearDistantEventRepository,
        controlModuleVoltageEventRepository,
        ambientTemperatureEventRepository,
        troubleCodeEventRepository,
        vinEventRepository,
        batteryEnergyEventRepository,
        fuelConsumptionEventRepository,
        gearShiftEventRepository,
        gpsEventRepository,
        odometerEventRepository,
        wheelSpeedEventRepository
    )

    private inline fun <reified T : Any> verifyRepos(mode: VerificationMode, func: (T) -> Any) {
        for (r in repos()) {
            if (r !is T)
                throw RuntimeException("${r::class.qualifiedName} is not a ${T::class.qualifiedName}")
            func(verify(r, mode))
        }
    }
}