/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ixs.main.rest

import jp.co.trillium.secureskye.ixs.main.service.IxsService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

/**
 * REST endpoints for IXS.
 *
 * @property ixsService Service containing the business logic for OTA.
 */
@RestController
class IxsController(private val ixsService: IxsService) {

    /**
     * Sample endpoint for checking the service works.
     *
     * @return A nice greeting.
     */
    @GetMapping("ixs/test")
    fun hello() = ixsService.sayHello()
}
