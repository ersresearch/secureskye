/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.repository

import jp.co.trillium.secureskye.notification.main.model.Channel
import jp.co.trillium.secureskye.notification.main.model.ChannelType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * Repository for managing [Channel] entities.
 */
@Transactional
interface ChannelRepository : JpaRepository<Channel, UUID> {

    /**
     * Find channel by [type].
     */
    fun findByType(type: ChannelType): Channel?
}
