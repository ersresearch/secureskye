/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.exception

/**
 * Vehicle image could not be loaded from the database.
 */
class VehicleImageNotFoundException(message: String?, cause: Throwable) : RuntimeException(message, cause)
