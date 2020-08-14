/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.properties

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import java.time.Duration

/**
 * Configuration properties for vehicle connection.
 * @property lostSignalTime The lost signal time.
 */
@Configuration
@ConfigurationProperties(prefix = "device-configuration.connection")
class VehicleConnectionProperties(
    var lostSignalTime: Duration? = null
)
