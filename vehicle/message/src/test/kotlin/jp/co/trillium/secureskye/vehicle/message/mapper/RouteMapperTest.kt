/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.mapper

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.message.api.proto.FullGpsRouteProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsEventProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsRouteListProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsRouteProto
import org.assertj.core.api.Assertions.assertThat
import org.bson.types.ObjectId
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.UUID

@ExtendWith(SpringExtension::class)
class RouteMapperTest {

    @TestConfiguration
    @ComponentScan(basePackageClasses = [RouteMapper::class, UuidMapper::class])
    class TestContextConfiguration

    @Autowired
    private lateinit var mapper: RouteMapper

    @Test
    fun `GPS route should be same after mapping`() {
        val route = GpsRouteProto.newBuilder()
            .setId(ObjectId().toHexString())
            .setVehicleId(UUID.randomUUID().toString())
            .setTimestamp(10)
            .setStart(20)
            .setStop(30)
            .setName("test")
            .setFinished(true)
            .build()

        val temp = mapper.gpsRoute(route)
        val mapped = mapper.gpsRoute(temp)

        assertThat(mapped).isEqualTo(route)
    }

    @Test
    fun `GPS route list should be same after mapping`() {
        val list = GpsRouteListProto.newBuilder()
            .addData(
                GpsRouteProto.newBuilder()
                    .setId(ObjectId().toHexString())
                    .setVehicleId(UUID.randomUUID().toString())
                    .setTimestamp(10)
                    .setStart(20)
                    .setStop(30)
                    .setName("test")
                    .setFinished(true)
            )
            .build()

        val temp = mapper.routeList(list)
        val mapped = mapper.routeList(temp)

        assertThat(mapped).isEqualTo(list)
    }

    @Test
    fun `Full GPS route should be same after mapping`() {
        val fullRoute = FullGpsRouteProto.newBuilder()
            .setRoute(
                GpsRouteProto.newBuilder()
                    .setId(ObjectId().toHexString())
                    .setVehicleId(UUID.randomUUID().toString())
                    .setTimestamp(10)
                    .setStart(20)
                    .setStop(30)
                    .setName("test")
                    .setFinished(true)
            )
            .addEvents(
                GpsEventProto.newBuilder()
                    .setTimestamp(10)
                    .setLatitude(11.111)
                    .setLongitude(22.222)
            )
            .build()

        val (route, events) = mapper.fullGpsRoute(UUID(0, 0), fullRoute)
        val mapped = mapper.fullGpsRoute(route, events)

        assertThat(mapped).isEqualTo(fullRoute)
    }
}