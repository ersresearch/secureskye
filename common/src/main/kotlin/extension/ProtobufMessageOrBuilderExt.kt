/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.extension

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.google.protobuf.MessageOrBuilder
import com.google.protobuf.util.JsonFormat

/**
 * Convert protobuf to json object map for sending via websocket service.
 */
fun MessageOrBuilder.json(): Map<String, Any> =
    Gson().fromJson(JsonFormat.printer().print(this), object : TypeToken<Map<String, Any>>() {}.type)
