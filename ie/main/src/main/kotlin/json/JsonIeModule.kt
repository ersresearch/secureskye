/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.json

import com.fasterxml.jackson.databind.BeanDescription
import com.fasterxml.jackson.databind.DeserializationConfig
import com.fasterxml.jackson.databind.JsonDeserializer
import com.fasterxml.jackson.databind.deser.BeanDeserializerModifier
import com.fasterxml.jackson.databind.module.SimpleModule
import jp.co.trillium.secureskye.vehicle.message.model.obd.MilStatusEvent
import org.springframework.stereotype.Component

/**
 * JSON module for the import/export service.
 */
@Component
class JsonIeModule : SimpleModule() {
    init {
        setDeserializerModifier(MilStatusEventBeanModifier())
    }

    /**
     * Modifier to use a customized deserializer for the [MilStatusEvent].
     */
    class MilStatusEventBeanModifier : BeanDeserializerModifier() {

        /**
         * [BeanDeserializerModifier.modifyDeserializer].
         */
        override fun modifyDeserializer(
            config: DeserializationConfig,
            beanDesc: BeanDescription,
            deserializer: JsonDeserializer<*>
        ): JsonDeserializer<*> {
            if (beanDesc.beanClass == MilStatusEvent::class.java)
                return MilStatusEventDeserializer(deserializer)

            return super.modifyDeserializer(config, beanDesc, deserializer)
        }
    }
}
