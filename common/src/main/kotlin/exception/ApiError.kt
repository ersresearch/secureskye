/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.exception

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY

/**
 * Generic error to describe an exception in the backend.
 * This is used to uniformly respond to the client when an error occurs.
 */
@JsonInclude(NON_EMPTY)
data class ApiError(
    var message: String = "",
    var details: Map<String, Any> = mapOf(),
    var cause: ApiError? = null
)
