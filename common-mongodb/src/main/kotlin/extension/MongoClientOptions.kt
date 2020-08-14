/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.extension

import com.mongodb.MongoClient
import com.mongodb.MongoClientOptions
import org.bson.UuidRepresentation
import org.bson.codecs.UuidCodecProvider
import org.bson.codecs.configuration.CodecRegistries

/**
 * Setup default options for the [MongoClientOptions.Builder].
 */
fun MongoClientOptions.Builder.defaultOptions(): MongoClientOptions.Builder =
    codecRegistry(
        CodecRegistries.fromRegistries(
            CodecRegistries.fromProviders(UuidCodecProvider(UuidRepresentation.STANDARD)),
            MongoClient.getDefaultCodecRegistry()
        )
    )
