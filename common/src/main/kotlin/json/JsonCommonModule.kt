/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.json

import com.fasterxml.jackson.databind.Module
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import org.bson.types.ObjectId
import org.springframework.stereotype.Component

/**
 * A Jackson [Module] to configure commonly used serializers.
 */
@Component
class JsonCommonModule : SimpleModule() {
    init {
        addSerializer(Exception::class.java, ExceptionSerializer())
        addSerializer(ObjectId::class.java, ToStringSerializer.instance)
    }
}
