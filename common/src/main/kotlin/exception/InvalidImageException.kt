/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.exception

/**
 * Avatar validation (checking for image file size, dimensions, format, etc.) failed.
 */
class InvalidImageException(message: String, cause: Throwable? = null) : Exception(message, cause)
