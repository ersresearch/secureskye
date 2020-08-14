/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.service

import com.nhaarman.mockitokotlin2.any
import com.nhaarman.mockitokotlin2.inOrder
import com.nhaarman.mockitokotlin2.only
import com.nhaarman.mockitokotlin2.times
import com.nhaarman.mockitokotlin2.verify
import com.nhaarman.mockitokotlin2.whenever
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.message.mapper.RouteMapper
import jp.co.trillium.secureskye.vehicle.message.model.GpsRoute
import jp.co.trillium.secureskye.vehicle.message.repository.GpsEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.GpsRouteRepository
import org.assertj.core.api.Assertions.assertThat
import org.bson.types.ObjectId
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.time.LocalDateTime
import java.util.Optional
import java.util.UUID
import javax.persistence.EntityNotFoundException

@ExtendWith(SpringExtension::class)
class RouteServiceTest {

    @TestConfiguration
    @ComponentScan(basePackageClasses = [RouteMapper::class, UuidMapper::class])
    class TestContextConfiguration {
        @Bean
        fun routeService(
            routeMapper: RouteMapper,
            uuidMapper: UuidMapper,
            gpsEventRepository: GpsEventRepository,
            gpsRouteRepository: GpsRouteRepository
        ) =
            RouteService(
                routeMapper,
                uuidMapper,
                gpsEventRepository,
                gpsRouteRepository
            )
    }

    @Autowired
    private lateinit var routeService: RouteService

    @MockBean
    private lateinit var gpsEventRepository: GpsEventRepository

    @MockBean
    private lateinit var gpsRouteRepository: GpsRouteRepository

    @Test
    fun `Starting a new route saves to the repository`() {
        whenever(gpsRouteRepository.save(any<GpsRoute>())).then {
            it.getArgument(0)
        }

        routeService.startRoute(UUID.randomUUID(), 5, "test")

        verify(gpsRouteRepository, only()).save(any<GpsRoute>())
        verify(gpsRouteRepository, times(1)).save(any<GpsRoute>())
    }

    @Test
    fun `Finishing a route fails if the ID does not exist`() {
        whenever(gpsRouteRepository.findById(any())).thenReturn(Optional.empty())

        assertThrows<EntityNotFoundException> {
            routeService.finishRoute(ObjectId())
        }
    }

    @Test
    fun `Finishing a route fails if the route is already finished`() {
        whenever(gpsRouteRepository.findById(any())).thenReturn(
            Optional.of(
                GpsRoute(
                    finished = true,
                    stop = LocalDateTime.now().plusDays(1)
                )
            )
        )

        assertThrows<RuntimeException>("Route already finished") {
            routeService.finishRoute(ObjectId())
        }
    }

    @Test
    fun `Finishing a route fails if the route stop time is in the past`() {
        whenever(gpsRouteRepository.findById(any())).thenReturn(
            Optional.of(
                GpsRoute(
                    stop = LocalDateTime.now().minusDays(1)
                )
            )
        )

        assertThrows<RuntimeException>("Route already finished") {
            routeService.finishRoute(ObjectId())
        }
    }

    @Test
    fun `Finishing a route works if not finished or stop time is in the past`() {
        whenever(gpsRouteRepository.findById(any())).thenReturn(
            Optional.of(
                GpsRoute(
                    finished = false,
                    stop = LocalDateTime.now().plusDays(1)
                )
            )
        )
        whenever(gpsRouteRepository.save(any<GpsRoute>())).then {
            it.getArgument(0)
        }

        val route = routeService.finishRoute(ObjectId())

        assertThat(route.finished).isTrue()
        assertThat(route.stop).isLessThanOrEqualTo(Timestamps.now())

        verify(gpsRouteRepository, times(1)).save(any<GpsRoute>())
    }

    @Test
    fun `Renaming a route calls the repository`() {
        routeService.renameRoute(ObjectId(), "test")

        verify(gpsRouteRepository, only()).updateName(any(), any())
    }

    @Test
    fun `Deleting a route calls the repository`() {
        routeService.deleteRoute(ObjectId())

        verify(gpsRouteRepository, only()).deleteById(any())
    }

    @Test
    fun `Listing all routes for a vehicle calls the repository`() {
        routeService.listRoutes(UUID.randomUUID())

        verify(gpsRouteRepository, times(1)).findByVehicleId(any())
    }

    @Test
    fun `Loading a route throws an EntityNotFoundException if the ID is missing`() {
        whenever(gpsRouteRepository.findById(any())).thenReturn(Optional.empty())

        assertThrows<EntityNotFoundException> {
            routeService.loadRoute(ObjectId())
        }
    }

    @Test
    fun `Loading a route calls the repository`() {
        whenever(gpsRouteRepository.findById(any())).thenReturn(Optional.of(GpsRoute()))
        whenever(gpsEventRepository.findAllOfRoute(any(), any(), any())).thenReturn(listOf())

        routeService.loadRoute(ObjectId())

        inOrder(gpsRouteRepository, gpsEventRepository) {
            verify(gpsRouteRepository, times(1)).findById(any())
            verify(gpsEventRepository, times(1)).findAllOfRoute(any(), any(), any())
        }
    }
}