/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.model.obd

import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.message.model.EventEntity
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.CompoundIndex
import org.springframework.data.mongodb.core.index.CompoundIndexes
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime
import java.util.UUID

/**
 * An event that reports the current MIL status of the vehicle.
 *
 * @property id The unique identifier of this event.
 * @property vehicleId The unique identifier of vehicle that produced this event.
 * @property timestamp The timestamp when this event occurred.
 * @property systemTimestamp The timestamp when this event was saved on the server.
 * @property mil Whether the MIL signal light is currently light up or not.
 * @property dtcCount The DTC count.
 * @property engineType The engine type this vehicle uses.
 * @property componentsTest Status of the vehicle's components test.
 * @property fuelSystemTest Status of the vehicle's fuel system test.
 * @property misfireTest Status of the vehicle's misfire test.
 * @property engineTests Status of the vehicle's engine tests.
 */
@Document(collection = "vehicles.events.obd.milStatus")
@CompoundIndexes(
    CompoundIndex(name = "event_id", def = "{'vehicleId': 1, 'systemTimestamp.dt': -1, 'systemTimestamp.ns': -1}"),
    CompoundIndex(name = "timestamp", def = "{'timestamp.dt': -1, 'timestamp.ns': -1}"),
    CompoundIndex(name = "systemTimestamp", def = "{'systemTimestamp.dt': -1, 'systemTimestamp.ns': -1}")
)
data class MilStatusEvent(
    @Id
    override var id: ObjectId = ObjectId(),
    @Indexed
    override var vehicleId: UUID = UUID(0, 0),
    override var timestamp: LocalDateTime = Timestamps.nowTime(),
    override var systemTimestamp: LocalDateTime = Timestamps.nowTime(),

    var mil: Boolean = false,
    var dtcCount: Int = 0,
    var engineType: EngineType = EngineType.Undefined,

    var componentsTest: OnBoardTest = OnBoardTest(),
    var fuelSystemTest: OnBoardTest = OnBoardTest(),
    var misfireTest: OnBoardTest = OnBoardTest(),

    var engineTests: EngineTests = EngineTests.SparkTests()
) : EventEntity {

    /**
     * Engine tests for different types of engines defined by [EngineType].
     */
    sealed class EngineTests {

        /**
         * Tests for spark ignition engines.
         *
         * @property egrSystem EGR system test.
         * @property oxygenSensorHeater Oxygen Sensor Heater test.
         * @property oxygenSensor Oxygen Sensor test.
         * @property acRefrigerant A/C Refrigerant test.
         * @property secondaryAirSystem Secondary Air System test.
         * @property evaporativeSystem Evaporative System test.
         * @property heatedCatalyst Heated Catalyst test.
         * @property catalyst Catalyst test.
         */
        data class SparkTests(
            var egrSystem: OnBoardTest = OnBoardTest(),
            var oxygenSensorHeater: OnBoardTest = OnBoardTest(),
            var oxygenSensor: OnBoardTest = OnBoardTest(),
            var acRefrigerant: OnBoardTest = OnBoardTest(),
            var secondaryAirSystem: OnBoardTest = OnBoardTest(),
            var evaporativeSystem: OnBoardTest = OnBoardTest(),
            var heatedCatalyst: OnBoardTest = OnBoardTest(),
            var catalyst: OnBoardTest = OnBoardTest()
        ) : EngineTests()

        /**
         * Tests for compression ignition engines.
         *
         * @property egrVvtSystem EGR and/or VVT System test.
         * @property pmFilterMonitoring PM filter monitoring test.
         * @property exhaustGasSensor Exhaust Gas Sensor test.
         * @property boostPressure Boost Pressure test.
         * @property noxScrMonitor NOx/SCR Monitor test.
         * @property nmhcCatalyst NMHC Catalyst test.
         */
        data class CompressionTests(
            var egrVvtSystem: OnBoardTest = OnBoardTest(),
            var pmFilterMonitoring: OnBoardTest = OnBoardTest(),
            var exhaustGasSensor: OnBoardTest = OnBoardTest(),
            var boostPressure: OnBoardTest = OnBoardTest(),
            var noxScrMonitor: OnBoardTest = OnBoardTest(),
            var nmhcCatalyst: OnBoardTest = OnBoardTest()
        ) : EngineTests()
    }

    /**
     * An on-board test that can be run for several components.
     */
    data class OnBoardTest(

        /**
         * Whether a test for the component is available.
         */
        var available: Boolean = false,

        /**
         * Whether the test of this component is incomplete or not.
         */
        var incomplete: Boolean = false
    )

    /**
     * The engine types a vehicle can have.
     */
    enum class EngineType(val value: Int) {
        /**
         * Unknown engine type.
         */
        Undefined(-1),

        /**
         * Spark ignition engine (e.g. Otto or Wankel engines).
         */
        Spark(0),

        /**
         * Compression ignition engine (e.g. Diesel engines).
         */
        Compression(1)
    }
}
