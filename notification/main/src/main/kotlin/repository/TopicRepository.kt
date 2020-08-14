/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.repository

import jp.co.trillium.secureskye.notification.main.model.Topic
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

/**
 * Repository for managing [Topic] entities.
 */
interface TopicRepository : JpaRepository<Topic, UUID>
