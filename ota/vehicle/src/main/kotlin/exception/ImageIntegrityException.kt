/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.exception

import jp.co.trillium.secureskye.ota.vehicle.model.Image

/**
 * Image integrity check (computing new digest and compare it to the given) failed.
 *
 * @property image The image whose checksum didn't match.
 * @property newDigest The new calculated digest.
 */
class ImageIntegrityException(val image: Image, val newDigest: String) :
    RuntimeException("Hash mismatch for file ${image.name}: ${image.checksum} <=> $newDigest")
