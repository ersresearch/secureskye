/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
@file:Suppress("NOTHING_TO_INLINE")

package jp.co.trillium.secureskye.mongodb.init.extensions

import com.mongodb.MongoClient

internal inline fun MongoClient.getAdminDatabase() = getDatabase("admin")

internal inline fun MongoClient.getConfigDatabase() = getDatabase("config")
