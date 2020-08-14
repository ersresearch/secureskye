/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.admin

import jp.co.trillium.secureskye.common.CommonModule
import jp.co.trillium.secureskye.jwt.EnableJwtOAuth2Client
import jp.co.trillium.secureskye.oauth.OAuth2CommonModule
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.runApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.cloud.openfeign.EnableFeignClients

/**
 * Main entry class for Spring Boot.
 */
@SpringBootApplication(scanBasePackageClasses = [Application::class, CommonModule::class])
@EntityScan(basePackageClasses = [Application::class, OAuth2CommonModule::class])
@EnableDiscoveryClient
@EnableFeignClients
@EnableJwtOAuth2Client
class Application

/**
 * Application entry point.
 */
@Suppress("SpreadOperator")
fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
