/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.exception

/**
 * A file could not be found in the archive.
 */
class ExportFileNotFoundException(message: String? = null, cause: Throwable? = null) : RuntimeException(message, cause)
