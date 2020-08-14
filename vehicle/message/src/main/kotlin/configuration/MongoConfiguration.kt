/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.configuration

import com.mongodb.MongoClient
import com.mongodb.MongoClientOptions
import com.mongodb.MongoCredential
import com.mongodb.ServerAddress
import jp.co.trillium.secureskye.common.configuration.CommonMongoConfiguration
import jp.co.trillium.secureskye.common.extension.defaultOptions
import jp.co.trillium.secureskye.common.runner.MongoShardingRunner
import org.springframework.boot.autoconfigure.mongo.MongoProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.config.AbstractMongoConfiguration
import org.springframework.data.mongodb.core.MongoTemplate

/**
 * MongoDB specific configuration.
 */
@Configuration
class MongoConfiguration(private val mongoProperties: MongoProperties) : CommonMongoConfiguration() {

    /**
     * [AbstractMongoConfiguration.getDatabaseName].
     */
    override fun getDatabaseName(): String = mongoProperties.database

    /**
     * [AbstractMongoConfiguration.mongoClient].
     */
    @Bean
    override fun mongoClient() = MongoClient(
        mongoProperties.host.split(",")
            .map { ServerAddress(it, mongoProperties.port ?: MongoProperties.DEFAULT_PORT) },
        MongoCredential.createCredential(mongoProperties.username, "admin", mongoProperties.password),
        MongoClientOptions.builder()
            .defaultOptions()
            .build()
    )

    /**
     * Runner to setup all collections as sharded.
     */
    @Bean
    fun mongoShardingRunner(mongoTemplate: MongoTemplate) =
        MongoShardingRunner(mongoTemplate, "vehicles")
}
