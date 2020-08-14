/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.exception

import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.message.model.GpsRoute
import java.time.LocalDateTime

/**
 * Tried to finish a route that was either already finished by the user before, or exceeded the
 * time limit and was therefore also considered finished.
 *
 * @property finished The route was finished by the user.
 * @property stopTime Time after which the route is considered finished.
 * @property currentTime Current time of the server.
 */
class RouteFinishedException(
    val finished: Boolean,
    val stopTime: LocalDateTime,
    val currentTime: LocalDateTime
) : RuntimeException("Route already finished") {

    constructor(route: GpsRoute) : this(
        route.finished,
        route.stop,
        Timestamps.nowTime()
    )
}
