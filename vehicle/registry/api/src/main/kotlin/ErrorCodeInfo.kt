/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

import java.util.UUID
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToMany
import javax.persistence.Table

/**
 * Information of error data structure.
 *
 * @property id id of error data structure.
 * @property ipsVersion version of ips.
 * @property ruleDbStatus status of rule db.
 * @property errorCount number of error which was generated.
 * @property errorCodes list code information.
 */
@Entity
@Table(name = "vehicle_registry_error_code_info")
data class ErrorCodeInfo(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    var ipsVersion: String = "",
    var ruleDbStatus: Int = 0,
    var errorCount: Long = 0,

    @ManyToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
    var errorCodes: List<CodeInfo> = mutableListOf()
)
