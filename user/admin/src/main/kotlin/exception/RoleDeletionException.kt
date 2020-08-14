/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.exception

/**
 * Cannot remove ADMIN role.
 */
class RoleDeletionException(message: String?) : RuntimeException(message)
