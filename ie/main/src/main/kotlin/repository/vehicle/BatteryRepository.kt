/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.vehicle

import jp.co.trillium.secureskye.vehicle.message.model.BatteryEnergyEvent
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

/**
 * Repository for managing [BatteryEnergyEvent] entities.
 */
interface BatteryRepository : ReactiveMongoRepository<BatteryEnergyEvent, ObjectId>
