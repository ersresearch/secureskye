/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.configuration

import com.mongodb.MongoCredential
import com.mongodb.ServerAddress
import com.mongodb.async.client.MongoClientSettings
import com.mongodb.connection.ClusterSettings
import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import org.springframework.boot.autoconfigure.mongo.MongoProperties
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration

/**
 * MongoDB specific configuration.
 */
@Configuration
class ReactiveMongoConfiguration(private val mongoProperties: MongoProperties) : AbstractReactiveMongoConfiguration() {

    /**
     * [AbstractReactiveMongoConfiguration.getDatabaseName].
     */
    override fun getDatabaseName(): String = mongoProperties.database

    /**
     * [AbstractReactiveMongoConfiguration.reactiveMongoClient].
     */
    override fun reactiveMongoClient(): MongoClient = MongoClients.create(
        MongoClientSettings.builder()
            .clusterSettings(
                ClusterSettings.builder()
                    .hosts(
                        mongoProperties.host.split(",")
                            .map { ServerAddress(it, mongoProperties.port ?: MongoProperties.DEFAULT_PORT) }
                    )
                    .build()
            )
            .credential(
                MongoCredential.createCredential(
                    mongoProperties.username,
                    mongoProperties.authenticationDatabase,
                    mongoProperties.password
                )
            )
            .build()
    )
}
