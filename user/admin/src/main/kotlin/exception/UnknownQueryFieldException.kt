/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.exception

/**
 * The field that was used for querying an entity is not supported.
 */
class UnknownQueryFieldException(val field: String) :
    RuntimeException("Field '$field' to query by is unknown or not supported")
