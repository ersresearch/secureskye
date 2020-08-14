/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.exception

/**
 * The extraction of an ECU's ID into its components failed.
 */
class EcuIdExtractionException(val length: Int, val id: String, message: String, cause: Throwable? = null) :
    Exception(message, cause)
