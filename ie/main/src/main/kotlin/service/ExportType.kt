/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.service

import java.io.OutputStream
import javax.servlet.http.HttpServletRequest

/**
 * Different ways of export data.
 */
sealed class ExportType {

    /**
     * Directly export into an [outputStream], giving a direct download to the user.
     *
     * @property outputStream The stream to copy the data into.
     */
    data class DirectExport(val outputStream: OutputStream) : ExportType()

    /**
     * Create the export internally and use the [request] information to notify the user once
     * the download is ready.
     *
     * @property request The HTTP request to get user information from.
     */
    data class NotifyExport(val request: HttpServletRequest) : ExportType()
}
