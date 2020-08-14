/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.handler

import com.fasterxml.jackson.databind.ObjectMapper
import jp.co.trillium.secureskye.common.exception.EcuIdExtractionException
import jp.co.trillium.secureskye.common.extension.toApiError
import org.springframework.http.HttpStatus.BAD_REQUEST
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus
import javax.persistence.EntityNotFoundException

/**
 * Global handling of specific exceptions.
 */
@ControllerAdvice
class CommonExceptionHandler(private val objectMapper: ObjectMapper) {

    /**
     * Handle invalid ECU ID exception.
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = BAD_REQUEST)
    fun handle(e: EcuIdExtractionException) = e.toApiError(
        "length" to e.length,
        "id" to e.id
    )

    /**
     * Handle all exceptions without a specific handler.
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = INTERNAL_SERVER_ERROR)
    fun handle(e: Exception): String = objectMapper.writeValueAsString(e)

    /**
     * Handle all EntityNotFoundException exceptions.
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = BAD_REQUEST)
    fun handle(e: EntityNotFoundException) = e.toApiError()

    /**
     * Handle all IllegalArgumentException exceptions.
     */
    @ExceptionHandler
    @ResponseBody
    @ResponseStatus(code = BAD_REQUEST)
    fun handle(e: IllegalArgumentException) = e.toApiError()
}
