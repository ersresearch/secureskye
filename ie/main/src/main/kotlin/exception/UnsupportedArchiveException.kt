/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.exception

/**
 * The requested archive type is not known by the service.
 */
class UnsupportedArchiveException(val archiveType: String) :
    RuntimeException("Unknown archive entry type '$archiveType'")
