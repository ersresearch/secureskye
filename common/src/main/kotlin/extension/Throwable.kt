/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.extension

import jp.co.trillium.secureskye.common.exception.ApiError

/**
 * Convert any [Throwable] into an [ApiError]. Further [details] can be given to enrich the information for the user.
 */
fun Throwable.toApiError(vararg details: Pair<String, Any>): ApiError = ApiError(
    message = localizedMessage ?: message ?: "",
    details = details.toMap(),
    cause = if (cause == null) ApiError(javaClass.name) else cause?.toApiError()
)
