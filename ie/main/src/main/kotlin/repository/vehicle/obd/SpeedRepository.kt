/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.vehicle.obd

import jp.co.trillium.secureskye.vehicle.message.model.obd.SpeedEvent
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

/**
 * Repository for managing [SpeedEvent] entities.
 */
interface SpeedRepository : ReactiveMongoRepository<SpeedEvent, ObjectId>
