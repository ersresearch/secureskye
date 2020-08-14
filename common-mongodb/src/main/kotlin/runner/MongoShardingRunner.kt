/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.runner

import mu.KLogging
import org.springframework.boot.CommandLineRunner
import org.springframework.data.mongodb.core.MongoTemplate

/**
 * Runner to set up all MongoDB collections as sharded.
 */
class MongoShardingRunner(
    private val mongoTemplate: MongoTemplate,
    private val prefix: String
) : CommandLineRunner {

    /**
     * [CommandLineRunner.run].
     */
    override fun run(vararg args: String?) {
        // Disable sharding for now
        /*val unshardedCollections = mongoTemplate.collectionNames.asSequence()
            .filter { col -> col.startsWith(prefix) && !col.endsWith(".files") }
            .filter { col ->
                mongoTemplate.execute {
                    try {
                        val doc = it.runCommand(Document("collStats", col))
                        doc.getDouble("ok") ?: 0.0 == 1.0 &&
                                !doc.getBoolean("sharded", false)
                    } catch (e: MongoException) {
                        logger.warn(e) { "Failed getting collection stats for '$col'" }
                        false
                    }
                }
            }
            .map { "${mongoTemplate.db.name}.$it" }

        for (col in unshardedCollections) {
            try {
                mongoTemplate.mongoDbFactory.getDb("admin").runCommand(
                    Document(
                        mapOf(
                            "shardCollection" to col,
                            "key" to if (col.endsWith(".chunks"))
                                mapOf("files_id" to 1, "n" to 1)
                            else
                                mapOf("_id" to "hashed")
                        )
                    )
                )
                logger.info { "Sharded collection '$col'" }
            } catch (e: MongoException) {
                logger.warn(e) { "Failed sharding collection '$col'" }
            }
        }*/
    }

    private companion object : KLogging()
}
