/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.vehicle.obd

import jp.co.trillium.secureskye.vehicle.message.model.obd.EngineRuntimeEvent
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

/**
 * Repository for managing [EngineRuntimeEvent] entities.
 */
interface EngineRuntimeRepository : ReactiveMongoRepository<EngineRuntimeEvent, ObjectId>
