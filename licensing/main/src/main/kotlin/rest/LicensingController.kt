/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.licensing.main.rest

import jp.co.trillium.secureskye.licensing.main.service.LicensingService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

/**
 * REST endpoints for licensing.
 *
 * @property licensingService Service containing the business logic for OTA.
 */
@RestController
class LicensingController(private val licensingService: LicensingService) {

    /**
     * Sample endpoint for checking the service works.
     *
     * @return A nice greeting.
     */
    @GetMapping("licensing/test")
    fun hello() = licensingService.sayHello()
}
