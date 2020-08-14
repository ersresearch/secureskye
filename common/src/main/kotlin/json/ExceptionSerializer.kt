/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.json

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import jp.co.trillium.secureskye.common.exception.ApiError
import kotlin.reflect.full.declaredMemberProperties

/**
 * A Jackson serializer to extract as much information as possible from any exception and turn it into the same
 * format as an [ApiError].
 */
class ExceptionSerializer : StdSerializer<Exception>(Exception::class.java) {

    /**
     * [StdSerializer.serialize].
     */
    override fun serialize(value: Exception, gen: JsonGenerator, provider: SerializerProvider) {
        gen.writeStartObject()
        gen.writeStringField("message", value.localizedMessage ?: value.message ?: "")

        if (value.javaClass.`package`.name.startsWith("jp.co.trillium")) {
            gen.writeObjectFieldStart("details")
            for (prop in value.javaClass.kotlin.declaredMemberProperties)
                gen.writeObjectField(prop.name, prop.get(value))
            gen.writeEndObject()
        }

        if (value.cause != null)
            gen.writeObjectField("cause", value.cause)

        gen.writeEndObject()
    }
}
