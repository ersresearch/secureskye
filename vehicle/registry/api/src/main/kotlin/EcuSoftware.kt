/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany

/**
 * ECU software.
 *
 * @property id software id
 * @property name software name
 * @property description software description
 * @property versions all versions of software
 */
@Entity
data class EcuSoftware(
    @Id
    @GeneratedValue(generator = "custom-uuid")
    var id: UUID = UUID(0, 0),

    @Column(nullable = false)
    var name: String = "",

    @Column(nullable = false)
    var description: String = "",

    @OneToMany(mappedBy = "software")
    var versions: List<EcuSoftwareVersion> = mutableListOf()
)
