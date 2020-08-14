/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.service

import com.mongodb.MongoGridFSException
import com.mongodb.client.gridfs.GridFSBucket
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.common.util.Uris
import jp.co.trillium.secureskye.oauth.model.Credentials
import jp.co.trillium.secureskye.user.admin.exception.AvatarNotFoundException
import org.apache.commons.codec.binary.Base64InputStream
import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.data.mongodb.gridfs.GridFsOperations
import org.springframework.stereotype.Service
import java.io.OutputStream

/**
 * Business logic for avatar image management.
 */
@Service
class AvatarService(
    private val gridFsOperations: GridFsOperations,
    private val gridFsBucket: GridFSBucket
) {

    /**
     * Save the avatar of the [user] in MongoDB.
     */
    fun save(user: Credentials) {
        val avatar = user.avatar.orEmpty()
        if (avatar.isBlank()) return

        val id = Base64InputStream(avatar.byteInputStream()).use {
            val fileName = "user-avatar-${user.name}-${Timestamps.now()}"
            gridFsOperations.store(it, fileName, "image/${user.avatarFormat}")
        }

        user.avatar = Uris.build("api", "users", id.toString(), "avatar")
    }

    /**
     * Remove avatar of [user] from MongoDB.
     */
    fun remove(user: Credentials) {
        val avatar = user.avatar.orEmpty()
        if (avatar.isBlank()) return

        val id = avatar.split('/').last { it !== "avatar" }
        gridFsOperations.delete(Query.query(Criteria.where("_id").isEqualTo(id)))
    }

    /**
     * Load the avatar into [outputStream] for the given [avatarId].
     */
    fun get(avatarId: ObjectId, outputStream: OutputStream) {
        try {
            gridFsBucket.openDownloadStream(avatarId).use { input ->
                outputStream.use { output ->
                    input.copyTo(output)
                }
            }
        } catch (e: MongoGridFSException) {
            throw AvatarNotFoundException(e.message, e)
        }
    }
}
