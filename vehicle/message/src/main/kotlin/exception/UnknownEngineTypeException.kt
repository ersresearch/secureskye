/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.exception

import jp.co.trillium.secureskye.vehicle.message.model.obd.MilStatusEvent

/**
 * The provided engine type is not known by the service.
 *
 * @property engineType The unknown type.
 * @property possibleValues A map of all possible values with their names.
 */
class UnknownEngineTypeException(
    val engineType: Int,
    val possibleValues: Map<String, Int>
) : RuntimeException("The engine type '$engineType' is unknown.") {

    constructor(engineType: Int) : this(engineType, allEngineTypes)

    companion object {
        private val allEngineTypes = MilStatusEvent.EngineType.values()
            .map { it.toString() to it.value }
            .toMap()
    }
}
