/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.mapper

import org.bson.types.ObjectId
import org.mapstruct.Mapper

/**
 * Mapper between Protobuf models and database models of ObjectId.
 */
@Mapper(config = GlobalMapperConfig::class)
abstract class ObjectIdMapper {

    /**
     * Map [objectId] to [String].
     */
    fun objectId(objectId: ObjectId): String = objectId.toHexString()

    /**
     * Map [objectIdString] to [ObjectId].
     */
    fun objectId(objectIdString: String?): ObjectId =
        if (objectIdString.isNullOrBlank()) ObjectId() else ObjectId(objectIdString)
}
