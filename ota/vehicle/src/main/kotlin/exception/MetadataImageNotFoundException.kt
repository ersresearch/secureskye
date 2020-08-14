/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.exception

/**
 * One or more images in the metadata couldn't be found in the archive.
 *
 * @property images The image names that were missing from the archive.
 */
class MetadataImageNotFoundException(val images: Set<String>, message: String) : RuntimeException(message)
