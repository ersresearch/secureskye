/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.handlers

import jp.co.trillium.secureskye.common.extension.toApiError
import jp.co.trillium.secureskye.ota.vehicle.exception.ImageIntegrityException
import jp.co.trillium.secureskye.ota.vehicle.exception.ImageNotFoundException
import jp.co.trillium.secureskye.ota.vehicle.exception.InvalidMetadataException
import jp.co.trillium.secureskye.ota.vehicle.exception.MetadataImageNotFoundException
import jp.co.trillium.secureskye.ota.vehicle.exception.MetadataNotFoundException
import jp.co.trillium.secureskye.ota.vehicle.exception.NotApplicableVehicleException
import jp.co.trillium.secureskye.ota.vehicle.exception.UnknownImageException
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus

/**
 * Global handling of specific exceptions.
 */
@ControllerAdvice
class GlobalExceptionHandler {

    /**
     * Handle [ImageIntegrityException].
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    fun handle(e: ImageIntegrityException) = e.toApiError(
        "imageName" to e.image.name,
        "digest" to e.image.checksum,
        "newDigest" to e.newDigest
    )

    /**
     * Handle [NotApplicableVehicleException].
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    fun handle(e: NotApplicableVehicleException) = e.toApiError(
        "id" to e.id,
        "vehicleId" to e.vehicleId,
        "family" to e.family,
        "applicableFamily" to e.applicableFamily
    )

    /**
     * Handle [ImageNotFoundException].
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    fun handle(e: ImageNotFoundException) = e.toApiError(
        "imageId" to e.imageId
    )

    /**
     * Handle [InvalidMetadataException].
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    fun handle(e: InvalidMetadataException) = e.toApiError()

    /**
     * Handle [MetadataImageNotFoundException].
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    fun handle(e: MetadataImageNotFoundException) = e.toApiError()

    /**
     * Handle [MetadataNotFoundException].
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    fun handle(e: MetadataNotFoundException) = e.toApiError(
        "name" to e.name
    )

    /**
     * Handle [UnknownImageException].
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    fun handle(e: UnknownImageException) = e.toApiError(
        "name" to e.name
    )
}
