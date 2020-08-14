/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.repository

import jp.co.trillium.secureskye.ota.vehicle.model.Metadata
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.Optional

/**
 * Mongo repository for [Metadata].
 */
interface MetadataRepository : MongoRepository<Metadata, ObjectId> {

    /**
     * Find metadata of vehicle [family].
     */
    fun findByFamily(family: String): List<Metadata>

    /**
     * Check if there is any metadata with [name].
     */
    fun existsByName(name: String): Boolean

    /**
     * Find metadata by its [name].
     */
    fun findByName(name: String): Optional<Metadata>
}
