/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.repository

import jp.co.trillium.secureskye.vehicle.message.model.GpsEvent
import org.bson.types.ObjectId
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort.Direction.DESC
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.data.mongodb.core.find
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.data.mongodb.repository.MongoRepository
import java.time.LocalDateTime
import java.util.UUID

/**
 * Repository for managing [GpsEvent] entities.
 */
interface GpsEventRepository : GpsEventRepositoryBase, GpsEventRepositoryCustom

/**
 * Base repository, containing functions that can be defined by query named methods.
 */
interface GpsEventRepositoryBase : MongoRepository<GpsEvent, ObjectId> {

    /**
     * Find all items of one vehicle by its [vehicleId].
     */
    fun findByVehicleId(vehicleId: UUID, page: Pageable): List<GpsEvent>

    /**
     * Find all items of one vehicle that occurred after a specific [systemTimestamp].
     */
    fun findByVehicleIdAndSystemTimestampAfter(
        vehicleId: UUID,
        systemTimestamp: LocalDateTime,
        page: Pageable
    ): List<GpsEvent>
}

/**
 * Custom repository, containing functions that need manual implementation.
 */
interface GpsEventRepositoryCustom : FindLatestLimit<GpsEvent> {

    /**
     * Find all GPS events that fit into the time range (defined by [start] and [end]) of a route that belongs to a
     * specific [vehicleId].
     */
    fun findAllOfRoute(vehicleId: UUID, start: LocalDateTime, end: LocalDateTime): List<GpsEvent>
}

/**
 * Implementation of the custom repository.
 */
class GpsEventRepositoryCustomImpl(
    private val gpsEventRepositoryBase: GpsEventRepositoryBase,
    private val mongoOperations: MongoOperations
) : GpsEventRepositoryCustom {

    /**
     * Find the latest [limit] items filtered by [vehicleId].
     */
    override fun findLatestLimit(vehicleId: UUID, limit: Int): List<GpsEvent> =
        gpsEventRepositoryBase.findByVehicleId(
            vehicleId,
            PageRequest.of(0, limit, DESC, "systemTimestamp.dt", "systemTimestamp.ns")
        )

    /**
     * Find the latest items after [since].
     */
    override fun findLatestSince(vehicleId: UUID, since: LocalDateTime): List<GpsEvent> =
        gpsEventRepositoryBase.findByVehicleIdAndSystemTimestampAfter(
            vehicleId,
            since,
            PageRequest.of(0, FindLatestLimit.DEFAULT_LIMIT, DESC, "systemTimestamp.dt", "systemTimestamp.ns")
        )

    /**
     * [GpsEventRepositoryCustom.findAllOfRoute].
     */
    override fun findAllOfRoute(vehicleId: UUID, start: LocalDateTime, end: LocalDateTime): List<GpsEvent> =
        mongoOperations.find(
            Query()
                .addCriteria(where("vehicleId").isEqualTo(vehicleId))
                .addCriteria(where("timestamp").gte(start).lte(end))
        )
}
