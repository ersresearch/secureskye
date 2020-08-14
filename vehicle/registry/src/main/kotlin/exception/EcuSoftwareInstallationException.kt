/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.exception

import java.util.UUID

/**
 * ECU software installation failed exception.
 */
class EcuSoftwareInstallationException(
    val ecuId: UUID,
    val software: String?,
    val currentVersionId: String?,
    val targetVersionId: String?,
    message: String?
) : RuntimeException(message ?: "ECU software installation failed")
