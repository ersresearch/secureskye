/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.model

import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

/**
 * `notification_topic` table entity.
 *
 * @property id topic ID.
 * @property name topic name.
 * @property description description.
 * @property subjectPrefix subject prefix.
 */
@Entity
@Table(name = "notification_topic")
data class Topic(
    @Id
    @Column(nullable = false)
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    var name: String = "",

    @Column(nullable = false)
    var description: String = "",

    @Column(nullable = false)
    var subjectPrefix: String = ""
)
