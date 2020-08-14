/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.message.api.proto.FullGpsRouteProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsRouteListProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsRouteProto
import jp.co.trillium.secureskye.vehicle.message.exception.RouteFinishedException
import jp.co.trillium.secureskye.vehicle.message.mapper.RouteMapper
import jp.co.trillium.secureskye.vehicle.message.model.GpsRoute
import jp.co.trillium.secureskye.vehicle.message.repository.GpsEventRepository
import jp.co.trillium.secureskye.vehicle.message.repository.GpsRouteRepository
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID
import javax.persistence.EntityNotFoundException

/**
 * Business logic for GPS routes.
 */
@Service
class RouteService(
    private val routeMapper: RouteMapper,
    private val uuidMapper: UuidMapper,
    private val gpsEventRepository: GpsEventRepository,
    private val gpsRouteRepository: GpsRouteRepository
) {

    /**
     * Start tracking a GPS route for [vehicleId] with the upper time [limit].
     *
     * This returns a [UUID] to control the new route later on.
     */
    fun startRoute(vehicleId: UUID, limit: Int, routeName: String): ObjectId {
        val route = GpsRoute(
            vehicleId = vehicleId
        ).apply {
            start = this.timestamp
            stop = this.timestamp.plusSeconds(limit.toLong())
            name = routeName
        }

        return gpsRouteRepository.save(route).id
    }

    /**
     * Finish the tracking of a GPS route (identified by [key].
     *
     * If the tracking started with [startRoute] already exceeded its limit, nothing will happen.
     *
     * @throws EntityNotFoundException When the route for [key] doesn't exist.
     */
    fun finishRoute(key: ObjectId): GpsRouteProto {
        val route = gpsRouteRepository.findById(key)
            .orElseThrow { EntityNotFoundException() }

        val now = Timestamps.nowTime()
        if (route.finished || route.stop < now)
            throw RouteFinishedException(route)

        route.finished = true
        route.stop = now
        return routeMapper.gpsRoute(gpsRouteRepository.save(route))
    }

    /**
     * Rename an existing route (identified by [key]) to the [newName] if it exists.
     */
    fun renameRoute(key: ObjectId, newName: String) {
        gpsRouteRepository.updateName(key, newName)
    }

    /**
     * Delete an existing route (identified by [key]).
     */
    fun deleteRoute(key: ObjectId) {
        gpsRouteRepository.deleteById(key)
    }

    /**
     * List all saved routes belonging to the [vehicleId] and return them as [GpsRouteListProto].
     */
    fun listRoutes(vehicleId: UUID): GpsRouteListProto =
        gpsRouteRepository.findByVehicleId(vehicleId)
            .let(routeMapper::routeList)

    /**
     * Load all GPS events for a specific route (identified by [key]) and return them as [FullGpsRouteProto],
     * containing the full information for the route as well as the GPS events.
     *
     * @param key Identifier of the route.
     *
     * @return Event batch with the GPS events.
     *
     * @throws EntityNotFoundException When the route for [key] doesn't exist.
     */
    fun loadRoute(key: ObjectId): FullGpsRouteProto {
        val route = gpsRouteRepository.findById(key)
            .orElseThrow { EntityNotFoundException() }
        val events = gpsEventRepository.findAllOfRoute(route.vehicleId, route.start, route.stop)

        return routeMapper.fullGpsRoute(route, events)
    }

    /**
     * Take a timestamp, convert it to a [LocalDateTime] to apply time operations in [func] on it.
     * After processing turn the result back into a timestamp.
     */
    private fun Long.applyTimeOperation(func: (LocalDateTime) -> LocalDateTime): Long {
        val updated = func(Timestamps.toLocalDateTime(this))
        return Timestamps.toTimestamp(updated)
    }
}
