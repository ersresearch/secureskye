/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.jpa

import jp.co.trillium.secureskye.common.util.Uuids
import org.hibernate.engine.spi.SharedSessionContractImplementor
import org.hibernate.id.UUIDGenerationStrategy
import java.util.UUID

/**
 * Custom UUID generation strategy for Hibernate to generate new UUIDs.
 * This implementation already gives the wanted default for a version 1 UUID.
 */
@Suppress("unused")
class TimedUuidGenerationStrategy : UUIDGenerationStrategy {

    /**
     * [UUIDGenerationStrategy.getGeneratedVersion].
     */
    override fun getGeneratedVersion(): Int = Uuids.type

    /**
     * [UUIDGenerationStrategy.generateUUID].
     */
    override fun generateUUID(session: SharedSessionContractImplementor?): UUID = Uuids.generate()
}
