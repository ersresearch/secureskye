/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.exception

/**
 * Vehicle could not be loaded from the database or is deleted.
 */
class VehicleNotFoundException(message: String?) : RuntimeException(message)
