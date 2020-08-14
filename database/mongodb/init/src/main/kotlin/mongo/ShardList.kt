/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

/**
 * A list of shards that are registered on a router.
 *
 * @property shards The list of shards.
 * @property ok State of this response, one of [CommandState].
 */
data class ShardList(
    var shards: List<Shard> = listOf(),
    var ok: Int = CommandState.Failed
)
