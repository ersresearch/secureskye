/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.exception

/**
 * The archive contained an image that was not defined in the metadata.
 *
 * @property name File name from the archive.
 */
class UnknownImageException(val name: String, message: String) : RuntimeException(message)
