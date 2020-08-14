/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.event.repository

import jp.co.trillium.secureskye.obd2device.event.model.Obd2Event
import org.bson.types.ObjectId
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.UUID

/**
 * Repository for managing [Obd2Event] entities.
 */
interface Obd2EventRepository : Obd2EventRepositoryBase,
    Obd2EventRepositoryCustom

/**
 * Base repository, containing functions that can be defined by query named methods.
 */
interface Obd2EventRepositoryBase : MongoRepository<Obd2Event, ObjectId> {

    /**
     * Find all items of one vehicle by its [vehicleId].
     */
    fun findByVehicleId(vehicleId: UUID, page: Pageable): List<Obd2Event>

    /**
     * Find all items of one device by its [deviceId].
     */
    fun findByDeviceId(deviceId: UUID, page: Pageable): List<Obd2Event>

    /**
     * Find all items of one vehicle that occurred after a specific [timestamp].
     */
    fun findByVehicleIdAndTimestampAfter(
        vehicleId: UUID,
        timestamp: Long,
        page: Pageable
    ): List<Obd2Event>

    /**
     * Find all items of one vehicle that occurred after a specific [timestamp].
     */
    fun findByDeviceIdAndTimestampAfter(
        deviceId: UUID,
        timestamp: Long,
        page: Pageable
    ): List<Obd2Event>
}

/**
 * Custom repository, containing functions that need manual implementation.
 */
interface Obd2EventRepositoryCustom : FindLatestLimit<Obd2Event>

/**
 * Implementation of the custom repository.
 */
class Obd2EventRepositoryCustomImpl(
    private val Obd2EventRepositoryBase: Obd2EventRepositoryBase
) : Obd2EventRepositoryCustom {
    override fun findLatestLimitByVehicle(vehicleId: UUID, limit: Int): List<Obd2Event> =
        Obd2EventRepositoryBase.findByVehicleId(
            vehicleId,
            PageRequest.of(0, limit, Sort.Direction.DESC, "timestamp")
        )

    override fun findLatestSinceByVehicle(vehicleId: UUID, since: Long): List<Obd2Event> =
        Obd2EventRepositoryBase.findByVehicleIdAndTimestampAfter(
            vehicleId,
            since,
            PageRequest.of(0, FindLatestLimit.DEFAULT_LIMIT, Sort.Direction.DESC, "timestamp")
        )

    override fun findLatestLimitByDevice(deviceId: UUID, limit: Int): List<Obd2Event> =
        Obd2EventRepositoryBase.findByDeviceId(
            deviceId,
            PageRequest.of(0, limit, Sort.Direction.DESC, "timestamp")
        )

    override fun findLatestSinceByDevice(deviceId: UUID, since: Long): List<Obd2Event> =
        Obd2EventRepositoryBase.findByDeviceIdAndTimestampAfter(
            deviceId,
            since,
            PageRequest.of(0, FindLatestLimit.DEFAULT_LIMIT, Sort.Direction.DESC, "timestamp")
        )
}
