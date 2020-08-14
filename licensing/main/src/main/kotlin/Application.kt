/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.licensing.main

import jp.co.trillium.secureskye.common.CommonModule
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient

/**
 * Main entry class for Spring Boot.
 */
@SpringBootApplication(scanBasePackageClasses = [Application::class, CommonModule::class])
@EnableDiscoveryClient
class Application

/**
 * Application entry point.
 */
@Suppress("SpreadOperator")
fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
