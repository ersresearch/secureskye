/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.json

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.readValue
import jp.co.trillium.secureskye.common.json.JsonCommonModule
import jp.co.trillium.secureskye.vehicle.message.model.obd.MilStatusEvent
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

class MilStatusEventDeserializerTest {
    private val objectMapper = ObjectMapper().registerModules(JavaTimeModule(), JsonCommonModule(), JsonIeModule())

    @Test
    fun deserialize() {
        val data = MilStatusEvent(
            engineType = MilStatusEvent.EngineType.Spark,
            engineTests = MilStatusEvent.EngineTests.SparkTests(
                MilStatusEvent.OnBoardTest(true, true)
            )
        )

        val json = objectMapper.writeValueAsString(data)

        assertThat(objectMapper.readValue<MilStatusEvent>(json)).isEqualTo(data)
    }
}