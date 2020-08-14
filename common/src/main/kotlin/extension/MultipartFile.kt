/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.extension

import org.springframework.web.multipart.MultipartFile

/**
 * Extract up to two file extensions. In case there is only one extension,
 * both values are the same.
 */
fun MultipartFile.extractExtensions(): Pair<String, String> {
    val fileName = this.originalFilename ?: ""
    val exts = fileName.split('.')
        .drop(1)
        .reversed()
    val ext1 = exts.getOrElse(0, { "" })
    val ext2 = exts.getOrElse(1, { ext1 })

    return ext1 to ext2
}
