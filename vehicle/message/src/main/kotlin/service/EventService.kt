/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.service

import com.google.protobuf.MessageOrBuilder
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.message.api.proto.EventBatchProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.EventBatchProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.Obd2EventBatchProto
import jp.co.trillium.secureskye.vehicle.message.feign.VehicleAdminClient
import jp.co.trillium.secureskye.vehicle.message.mapper.EventMapper
import jp.co.trillium.secureskye.vehicle.message.mapper.ObdEventMapper
import jp.co.trillium.secureskye.vehicle.message.model.EventEntity
import jp.co.trillium.secureskye.vehicle.message.repository.BatteryEnergyEventRepository
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
import org.bson.types.ObjectId
import org.springframework.cache.annotation.Cacheable
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * Business logic for vehicle events.
 */
@Service
class EventService(
    private val obdEventMapper: ObdEventMapper,
    private val eventMapper: EventMapper,
    private val uuidMapper: UuidMapper,
    private val milStatusEventRepository: MilStatusEventRepository,
    private val engineLoadEventRepository: EngineLoadEventRepository,
    private val engineCoolantEventRepository: EngineCoolantEventRepository,
    private val rpmEventRepository: RpmEventRepository,
    private val speedEventRepository: SpeedEventRepository,
    private val intakeAirEventRepository: IntakeAirEventRepository,
    private val massAirFlowEventRepository: MassAirFlowEventRepository,
    private val throttleEventRepository: ThrottleEventRepository,
    private val engineRuntimeEventRepository: EngineRuntimeEventRepository,
    private val fuelLevelEventRepository: FuelLevelEventRepository,
    private val codeClearDistantEventRepository: CodeClearDistantEventRepository,
    private val controlModuleVoltageEventRepository: ControlModuleVoltageEventRepository,
    private val ambientTemperatureEventRepository: AmbientTemperatureEventRepository,
    private val troubleCodeEventRepository: TroubleCodeEventRepository,
    private val vinEventRepository: VinEventRepository,
    private val batteryEnergyEventRepository: BatteryEnergyEventRepository,
    private val fuelConsumptionEventRepository: FuelConsumptionEventRepository,
    private val gearShiftEventRepository: GearShiftEventRepository,
    private val gpsEventRepository: GpsEventRepository,
    private val odometerEventRepository: OdometerEventRepository,
    private val wheelSpeedEventRepository: WheelSpeedEventRepository,
    private val vehicleAdminClient: VehicleAdminClient
) {

    /**
     * Store a [batch] of several vehicle events belonging to the vehicle with [clientId] in the database.
     */
    @Transactional
    fun saveEvents(clientId: String, batch: EventBatchProtoOrBuilder) {
        val id = loadVehicleId(clientId)

        batch.apply {
            batteryEnergyList.save(id, eventMapper::batteryEnergyEvent, batteryEnergyEventRepository)
            fuelConsumptionList.save(id, eventMapper::fuelConsumptionEvent, fuelConsumptionEventRepository)
            gearShiftList.save(id, eventMapper::gearShiftEvent, gearShiftEventRepository)
            gpsList.save(id, eventMapper::gpsEvent, gpsEventRepository)
            odometerList.save(id, eventMapper::odometerEvent, odometerEventRepository)
            wheelSpeedList.save(id, eventMapper::wheelSpeedEvent, wheelSpeedEventRepository)

            if (hasObd2()) {
                obd2.apply {
                    milStatusList.save(id, obdEventMapper::milStatusEvent, milStatusEventRepository)
                    engineLoadList.save(id, obdEventMapper::engineLoadEvent, engineLoadEventRepository)
                    engineCoolantList.save(id, obdEventMapper::engineCoolantEvent, engineCoolantEventRepository)
                    rpmList.save(id, obdEventMapper::rpmEvent, rpmEventRepository)
                    speedList.save(id, obdEventMapper::speedEvent, speedEventRepository)
                    intakeAirList.save(id, obdEventMapper::intakeAirEvent, intakeAirEventRepository)
                    massAirFlowList.save(id, obdEventMapper::massAirFlowEvent, massAirFlowEventRepository)
                    throttleList.save(id, obdEventMapper::throttleEvent, throttleEventRepository)
                    engineRuntimeList.save(id, obdEventMapper::engineRuntimeEvent, engineRuntimeEventRepository)
                    fuelLevelList.save(id, obdEventMapper::fuelLevelEvent, fuelLevelEventRepository)
                    codeClearDistanceList.save(
                        id,
                        obdEventMapper::codeClearDistanceEvent,
                        codeClearDistantEventRepository
                    )
                    controlModuleVoltageList.save(
                        id,
                        obdEventMapper::controlModuleVoltageEvent,
                        controlModuleVoltageEventRepository
                    )
                    ambientTemperatureList.save(
                        id,
                        obdEventMapper::ambientTemperatureEvent,
                        ambientTemperatureEventRepository
                    )
                    troubleCodesList.save(id, obdEventMapper::troubleCodeEvent, troubleCodeEventRepository)
                    vinList.save(id, obdEventMapper::vinEvent, vinEventRepository)
                }
            }
        }
    }

    private inline fun <T : MessageOrBuilder, M : EventEntity> List<T>.save(
        id: UUID,
        mapperFunc: (UUID, T) -> M,
        repo: CrudRepository<M, ObjectId>
    ) {
        map { mapperFunc(id, it) }.let { repo.saveAll(it) }
    }

    /**
     * Load the most recent [limit] events of each event type for the given [vehicleId].
     */
    fun listEvents(vehicleId: UUID, limit: Int): EventBatchProto {
        return EventBatchProto.newBuilder()
            .addAllGps(
                gpsEventRepository.findLatestLimit(vehicleId, limit)
                    .map(eventMapper::gpsEvent)
            )
            .addAllOdometer(
                odometerEventRepository.findLatestLimit(vehicleId, limit)
                    .map(eventMapper::odometerEvent)
            )
            .addAllBatteryEnergy(
                batteryEnergyEventRepository.findLatestLimit(vehicleId, limit)
                    .map(eventMapper::batteryEnergyEvent)
            )
            .addAllFuelConsumption(
                fuelConsumptionEventRepository.findLatestLimit(vehicleId, limit)
                    .map(eventMapper::fuelConsumptionEvent)
            )
            .addAllGearShift(
                gearShiftEventRepository.findLatestLimit(vehicleId, limit)
                    .map(eventMapper::gearShiftEvent)
            )
            .addAllWheelSpeed(
                wheelSpeedEventRepository.findLatestLimit(vehicleId, limit)
                    .map(eventMapper::wheelSpeedEvent)
            )
            .setObd2(
                Obd2EventBatchProto.newBuilder()
                    .addAllMilStatus(
                        milStatusEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::milStatusEvent)
                    )
                    .addAllEngineLoad(
                        engineLoadEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::engineLoadEvent)
                    )
                    .addAllEngineCoolant(
                        engineCoolantEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::engineCoolantEvent)
                    )
                    .addAllRpm(
                        rpmEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::rpmEvent)
                    )
                    .addAllSpeed(
                        speedEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::speedEvent)
                    )
                    .addAllIntakeAir(
                        intakeAirEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::intakeAirEvent)
                    )
                    .addAllMassAirFlow(
                        massAirFlowEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::massAirFlowEvent)
                    )
                    .addAllThrottle(
                        throttleEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::throttleEvent)
                    )
                    .addAllEngineRuntime(
                        engineRuntimeEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::engineRuntimeEvent)
                    )
                    .addAllFuelLevel(
                        fuelLevelEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::fuelLevelEvent)
                    )
                    .addAllCodeClearDistance(
                        codeClearDistantEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::codeClearDistanceEvent)
                    )
                    .addAllControlModuleVoltage(
                        controlModuleVoltageEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::controlModuleVoltageEvent)
                    )
                    .addAllAmbientTemperature(
                        ambientTemperatureEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::ambientTemperatureEvent)
                    )
                    .addAllTroubleCodes(
                        troubleCodeEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::troubleCodeEvent)
                    )
                    .addAllVin(
                        vinEventRepository.findLatestLimit(vehicleId, limit)
                            .map(obdEventMapper::vinEvent)
                    )
            )
            .build()
    }

    /**
     * Load the vehicle ID for the given [clientId] to associate events to it.
     */
    @Cacheable("client-id-to-vehicle-id")
    private fun loadVehicleId(clientId: String) =
        uuidMapper.uuidString(vehicleAdminClient.getVehicle(clientId, true).id)
}
