/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.mapper

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.message.api.proto.BatteryEnergyEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.FuelConsumptionEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GearShiftEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.OdometerEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.WheelSpeedEventProto
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.UUID

@ExtendWith(SpringExtension::class)
class EventMapperTest {

    @TestConfiguration
    @ComponentScan(basePackageClasses = [EventMapper::class, UuidMapper::class])
    class TestContextConfiguration

    @Autowired
    private lateinit var mapper: EventMapper

    @Test
    fun `GPS event should be same after mapping`() {
        val event = GpsEventProto.newBuilder()
            .setTimestamp(10)
            .setLatitude(11.111)
            .setLongitude(22.222)
            .build()

        val temp = mapper.gpsEvent(UUID(0, 0), event)
        val mapped = mapper.gpsEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Odometer event should be same after mapping`() {
        val event = OdometerEventProto.newBuilder()
            .setTimestamp(10)
            .setValue(12345)
            .build()

        val temp = mapper.odometerEvent(UUID(0, 0), event)
        val mapped = mapper.odometerEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Battery energy event should be same after mapping`() {
        val event = BatteryEnergyEventProto.newBuilder()
            .setTimestamp(10)
            .build()

        val temp = mapper.batteryEnergyEvent(UUID(0, 0), event)
        val mapped = mapper.batteryEnergyEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Fuel consumption event should be same after mapping`() {
        val event = FuelConsumptionEventProto.newBuilder()
            .setTimestamp(10)
            .build()

        val temp = mapper.fuelConsumptionEvent(UUID(0, 0), event)
        val mapped = mapper.fuelConsumptionEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Gear shift event should be same after mapping`() {
        val event = GearShiftEventProto.newBuilder()
            .setTimestamp(10)
            .setGear(8)
            .build()

        val temp = mapper.gearShiftEvent(UUID(0, 0), event)
        val mapped = mapper.gearShiftEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }

    @Test
    fun `Wheel speed event should be same after mapping`() {
        val event = WheelSpeedEventProto.newBuilder()
            .setTimestamp(10)
            .setFrontLeft(4)
            .setFrontRight(8)
            .setRearLeft(12)
            .setRearRight(16)
            .build()

        val temp = mapper.wheelSpeedEvent(UUID(0, 0), event)
        val mapped = mapper.wheelSpeedEvent(temp)

        assertThat(mapped).isEqualTo(event)
    }
}