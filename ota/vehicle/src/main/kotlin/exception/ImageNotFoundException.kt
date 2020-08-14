/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.exception

import org.bson.types.ObjectId

/**
 * An image defined in the metadata could not be found in the archive.
 *
 * @property imageId The requested but missing ID.
 */
class ImageNotFoundException(val imageId: ObjectId, message: String?, cause: Throwable? = null) :
    RuntimeException(message, cause)
