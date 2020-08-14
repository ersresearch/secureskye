/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.json

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.deser.ResolvableDeserializer
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.node.ObjectNode
import jp.co.trillium.secureskye.vehicle.message.model.obd.MilStatusEvent

/**
 * Custom deserializer for the [MilStatusEvent] to handle its sealed class.
 */
class MilStatusEventDeserializer(private val deserializer: JsonDeserializer<*>) :
    StdDeserializer<MilStatusEvent>(MilStatusEvent::class.java), ResolvableDeserializer {

    /**
     * [StdDeserializer.deserialize].
     */
    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): MilStatusEvent {
        val tree = p.readValueAsTree<JsonNode>() as ObjectNode
        val engineTestsTree = tree.remove("engineTests")

        // Turn the modified tree into a new JsonParser
        val p2 = p.codec.treeAsTokens(tree)
        if (!p2.hasCurrentToken())
            p2.nextToken()

        // Use the standard deserializer instead
        val bean = deserializer.deserialize(p2, ctxt) as MilStatusEvent

        return bean.apply {
            if (engineTestsTree != null) {
                // Afterwards try to parse the engine tests base on the engine type
                when (engineType) {
                    MilStatusEvent.EngineType.Spark ->
                        engineTests = p.codec.treeToValue(
                            engineTestsTree,
                            MilStatusEvent.EngineTests.SparkTests::class.java
                        )
                    MilStatusEvent.EngineType.Compression ->
                        engineTests = p.codec.treeToValue(
                            engineTestsTree,
                            MilStatusEvent.EngineTests.CompressionTests::class.java
                        )
                    else -> {
                        // If the engine type is unknown, skip.
                    }
                }
            }
        }
    }

    /**
     * Required to avoid exceptions.
     */
    override fun resolve(ctxt: DeserializationContext?) {
        if (deserializer is ResolvableDeserializer)
            deserializer.resolve(ctxt)
    }
}
