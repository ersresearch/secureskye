/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

/**
 * Information of code.
 *
 * @property id id of code.
 * @property code value.
 * @property detail code detail.
 */
@Entity
@Table(name = "vehicle_registry_code_info")
data class CodeInfo(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),
    var code: Long = 0,

    @Column(nullable = false)
    var detail: String = ""
)
