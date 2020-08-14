/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.model

import org.apache.commons.io.FilenameUtils
import org.bson.types.ObjectId
import java.util.UUID

/**
 * Image metadata.
 *
 * @property name Unique name of the image.
 * @property checksum SHA-256 hash for integrity verification.
 * @property id Identifier for the image metadata after saving it to the database.
 * @property softwareId the software id.
 * @property versionCode the software version number used to compare.
 * @property versionName the software version name.
 * @property changelog the change log information.
 */
data class Image(
    var id: ObjectId = ObjectId(),
    var name: String = "",
    var checksum: String = "",
    var softwareId: UUID = UUID(0, 0),
    var versionName: String = "",
    var versionCode: Long = 0,
    var changelog: String = ""
) {
    /**
     * Create the full path of the image inside the archive.
     */
    fun fullPath(ecu: Ecu): String = FilenameUtils.separatorsToUnix("ecus/${ecu.id}/$name")

    /**
     * The final URL after upload to send back to the client for downloading it directly.
     */
    val url: String
        get() = "/api/ota/images/$id"

    /**
     * Additional metadata stored with the image file.
     *
     * @property parent Update information this image is part of.
     * @property ecu ECU information this image belongs to.
     */
    data class Metadata(
        var parent: Parent = Parent(),
        var ecu: Ecu = Ecu()
    ) {

        /**
         * Update information.
         *
         * @property family Vehicle family.
         * @property category Type of update.
         */
        data class Parent(
            var family: String = "",
            var category: String = ""
        )

        /**
         * ECU information.
         *
         * @property id Unique identifier.
         * @property description Update description.
         */
        data class Ecu(
            var id: String = "",
            var description: String = ""
        )
    }
}
