/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.util

import jp.co.trillium.secureskye.common.exception.InvalidImageException
import org.apache.commons.codec.binary.Base64
import javax.imageio.ImageIO

/**
 * Utility for common image tasks.
 */
object Images {
    /**
     * Maximum file size of an avatar image.
     */
    private const val IMAGE_MAX_FILE_SIZE = 1024 * 1024 * 5

    /**
     * Maximum horizontal dimension of an avatar image.
     */
    private const val IMAGE_MAX_WIDTH = 2048

    /**
     * Maximum vertical dimension of an avatar image.
     */
    private const val IMAGE_MAX_HEIGHT = 2048

    /**
     * Validate an [imageBase64] which has to be a Base64 encoded image in the specified [format].
     *
     * @throws IllegalArgumentException If the [format] wasn't specified.
     * @throws InvalidImageException If the [imageBase64] is not formatted as described, has a non supported image
     * format, exceeds a total size of [maxFileSize] MB or exceeds the dimensions of [maxWidth] x [maxHeight].
     */
    fun validate(
        imageBase64: String?,
        format: String?,
        maxFileSize: Int = IMAGE_MAX_FILE_SIZE,
        maxWidth: Int = IMAGE_MAX_WIDTH,
        maxHeight: Int = IMAGE_MAX_HEIGHT
    ) {
        if (imageBase64 == null || imageBase64.isBlank()) return

        if (format == null || format.isBlank())
            throw IllegalArgumentException("Image format has to be specified")

        if (!ImageIO.getReaderFormatNames().contains(format))
            throw InvalidImageException("Image format is none of '${ImageIO.getReaderFormatNames().joinToString()}'")

        if (!Base64.isBase64(imageBase64))
            throw InvalidImageException("Image is not Base64 encoded")

        val bytes = Base64.decodeBase64(imageBase64)
        if (bytes.size > maxFileSize)
            throw InvalidImageException("Image exceeds $maxFileSize MB")

        val image = ImageIO.read(bytes.inputStream())
        if (image.width > maxWidth || image.height > maxHeight)
            throw InvalidImageException("Image dimensions exceed $maxWidth x $maxHeight")
    }
}
