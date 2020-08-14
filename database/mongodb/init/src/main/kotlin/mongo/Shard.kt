/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.mongo

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * A shard of the router configuration.
 *
 * @property id Name of the shard.
 * @property host The full description of this shard and all members as one string.
 */
data class Shard(
    @JsonProperty("_id")
    var id: String = "",
    var host: String = ""
)
