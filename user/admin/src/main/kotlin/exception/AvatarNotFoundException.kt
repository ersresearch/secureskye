/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.exception

/**
 * An avatar could not be loaded from the database.
 */
class AvatarNotFoundException(message: String?, cause: Throwable) : RuntimeException(message, cause)
