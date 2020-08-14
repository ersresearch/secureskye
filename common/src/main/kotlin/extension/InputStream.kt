/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.extension

import org.apache.commons.compress.archivers.ArchiveException
import org.apache.commons.compress.archivers.ArchiveInputStream
import org.apache.commons.compress.archivers.ArchiveStreamFactory
import org.apache.commons.compress.compressors.CompressorException
import org.apache.commons.compress.compressors.CompressorInputStream
import org.apache.commons.compress.compressors.CompressorStreamFactory
import java.io.InputStream

/**
 * Turn the [InputStream] into a [CompressorInputStream], auto-detecting the format.
 *
 * @throws CompressorException If the [InputStream]s format couldn't be detected.
 */
fun InputStream.decompress(name: String): InputStream = try {
    CompressorStreamFactory().createCompressorInputStream(name, this)
} catch (e: CompressorException) {
    // If the reason for the exception is something else than an
    // unknown compression format, close the stream and fail.
    if (e.cause != null) {
        try {
            close()
        } catch (e: Throwable) {
            // Ignore any exception during close
        }
        throw e
    }
    this
}

/**
 * Turn the [InputStream] into an [ArchiveInputStream], auto-detecting the format.
 *
 * @throws ArchiveException If the [InputStream]s format couldn't be detected.
 */
fun InputStream.asArchive(name: String): ArchiveInputStream = try {
    ArchiveStreamFactory().createArchiveInputStream(name, this)
} catch (e: ArchiveException) {
    try {
        close()
    } catch (e: Throwable) {
        // Ignore any exception during close
    }
    throw e
}
