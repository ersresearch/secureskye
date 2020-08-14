/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin

import jp.co.trillium.secureskye.common.CommonModule
import jp.co.trillium.secureskye.jwt.EnableJwtOAuth2Client
import jp.co.trillium.secureskye.oauth.OAuth2CommonModule
import jp.co.trillium.secureskye.vehicle.admin.model.Vehicle
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleRepository
import jp.co.trillium.secureskye.vehicle.admin.service.VehicleService
import jp.co.trillium.secureskye.websocket.WebsocketModule
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.runApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.cloud.openfeign.EnableFeignClients
import org.springframework.core.io.ClassPathResource
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.stereotype.Component
import java.util.UUID
import javax.persistence.EntityNotFoundException

/**
 * Main entry class for Spring Boot.
 */
@SpringBootApplication(
    scanBasePackageClasses = [
        Application::class,
        CommonModule::class,
        WebsocketModule::class
    ]
)
@EntityScan(basePackageClasses = [Application::class, OAuth2CommonModule::class])
@EnableDiscoveryClient
@EnableFeignClients
@EnableJwtOAuth2Client
@EnableScheduling
class Application

/**
 * Creates an initial vehicle if the database is empty.
 */
@Component
class InitialDataRunner(
    private val vehicleRepository: VehicleRepository,
    private val vehicleService: VehicleService
) : CommandLineRunner {

    /**
     * Specific initialization on startup of the service.
     */
    override fun run(vararg args: String?) {
        ClassPathResource("images/vehicle-default.png").inputStream.use {
            vehicleService.registerImgDefault(it)
        }

        val vehicleImages = mapOf(
            "dba7e828-f9f8-11e8-8f75-0242ac15000c" to "images/toyota-prius-pearl.png",
            "dca13c75-f9f8-11e8-8f75-0242ac15000c" to "images/volks-touareg-silver.png"
        )

        val vehiclesToUpdate = mutableListOf<Vehicle>()
        for ((vehicleId, imagePath) in vehicleImages) {
            val vehicle = vehicleRepository.findById(UUID.fromString(vehicleId))
                .orElseThrow { EntityNotFoundException() }

            if (vehicle.imageId.isBlank()) {
                ClassPathResource(imagePath).inputStream.use {
                    vehicleService.updateVehicleImage(vehicle, it, "image/png")
                }
                vehiclesToUpdate += vehicle
            }
        }
        vehicleRepository.saveAll(vehiclesToUpdate)
    }
}

/**
 * Application entry point.
 */
@Suppress("SpreadOperator")
fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
