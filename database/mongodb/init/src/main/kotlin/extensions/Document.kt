/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.mongodb.init.extensions

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.bson.Document
import org.bson.json.JsonWriterSettings

/**
 * Convert a [Document] into a class instance [T].
 */
inline fun <reified T : Any> Document.toObject(objectMapper: ObjectMapper): T =
    objectMapper.readValue(toJson())

/**
 * Settings for indented JSON output.
 */
private val jsonIndentSettings = JsonWriterSettings.builder()
    .indent(true)
    .build()

/**
 * Convert a [Document] into an indented JSON string.
 */
fun Document.toIndentedJson(): String =
    toJson(jsonIndentSettings)
