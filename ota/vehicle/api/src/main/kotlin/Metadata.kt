/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.model

import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.index.CompoundIndex
import org.springframework.data.mongodb.core.index.CompoundIndexes
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

/**
 * Metadata of image archive.
 *
 * @property id Unique identifier after saved to the database.
 * @property name The name of package for identify
 * @property family A specific vehicle model or a group of models.
 * @property category The kind of update (for example production, experimental, ...)
 * @property status The status of Package (New, Released, Reviewing, ...)
 * @property ecus One or more ECU updates.
 * @property date The date that OTA  Package uploaded
 * @property deleted The flag to mark whether this package is deleted or not
 */
@Document(collection = "ota.metadata")
@CompoundIndexes(
    CompoundIndex(
        name = "versionName",
        def = "{'ecus._id': 1, 'ecus.items.softwareId': 1, 'ecus.items.versionName': 1}",
        unique = true
    ),
    CompoundIndex(
        name = "versionCode",
        def = "{'ecus._id': 1, 'ecus.items.softwareId': 1, 'ecus.items.versionCode': 1}",
        unique = true
    )
)
data class Metadata(
    var id: ObjectId = ObjectId(),
    var name: String = "",
    var family: String = "",
    var category: String = "",
    var status: PackageStatus = PackageStatus.New,
    var ecus: List<Ecu> = emptyList(),
    var date: LocalDate = LocalDate.now(),
    var deleted: Boolean = false
)
