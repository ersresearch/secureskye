/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.exception

/**
 * The metadata file was missing in the provided archive or not the first entry.
 *
 * @property name Name of the entry that was found instead.
 */
class MetadataNotFoundException(val name: String = "", message: String) : RuntimeException(message)
