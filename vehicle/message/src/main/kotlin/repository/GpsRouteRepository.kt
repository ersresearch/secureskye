/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.repository

import jp.co.trillium.secureskye.vehicle.message.model.GpsRoute
import org.bson.types.ObjectId
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.data.mongodb.core.updateFirst
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.UUID

/**
 * Repository for managing [GpsRoute] entities.
 */
interface GpsRouteRepository : GpsRouteRepositoryBase, GpsRouteRepositoryCustom

/**
 * Base repository, containing functions that can be defined by query named methods.
 */
interface GpsRouteRepositoryBase : MongoRepository<GpsRoute, ObjectId> {

    /**
     * Find all items of one vehicle by its [vehicleId].
     */
    fun findByVehicleId(vehicleId: UUID): List<GpsRoute>
}

/**
 * Custom repository, containing functions that need manual implementation.
 */
interface GpsRouteRepositoryCustom {

    /**
     * Update the name of an existing route (identified by [key]) to the [newName].
     */
    @Modifying
    fun updateName(key: ObjectId, newName: String)
}

/**
 * Implementation of the custom repository.
 */
class GpsRouteRepositoryCustomImpl(private val mongoOperations: MongoOperations) : GpsRouteRepositoryCustom {

    /**
     * [GpsRouteRepositoryCustom.updateName].
     */
    @Modifying
    override fun updateName(key: ObjectId, newName: String) {
        mongoOperations.updateFirst<GpsRoute>(
            Query.query(Criteria.where("_id").isEqualTo(key)),
            Update.update("name", newName)
        )
    }
}
