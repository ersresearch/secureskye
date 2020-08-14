/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.util

import com.fasterxml.uuid.EthernetAddress
import com.fasterxml.uuid.Generators
import java.util.UUID

/**
 * Utility for creating new [UUID]s.
 */
object Uuids {

    private val generator = Generators.timeBasedGenerator(
        EthernetAddress.fromInterface()
    )

    /**
     * The type of the UUID generated.
     */
    val type: Int
        get() = generator.type.raw()

    /**
     * Generate a new [UUID].
     */
    fun generate(): UUID = generator.generate()
}
