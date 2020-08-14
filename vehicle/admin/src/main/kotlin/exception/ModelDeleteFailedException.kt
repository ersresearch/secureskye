/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.exception

import java.util.UUID

/**
 * Failed to update vehicle model info.
 * @property modelId model ID
 */
class ModelDeleteFailedException(val modelId: UUID, message: String) : Exception(message)
