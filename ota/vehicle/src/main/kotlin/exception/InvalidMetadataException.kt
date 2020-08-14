/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.exception

/**
 * The metadata was not proper formatted or contained logical errors.
 */
class InvalidMetadataException(message: String? = null, cause: Throwable? = null) : RuntimeException(message, cause)
