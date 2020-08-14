/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.specification

import jp.co.trillium.secureskye.common.extension.buildLikeExpression
import jp.co.trillium.secureskye.vehicle.admin.model.Vehicle
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleConnection
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleModel
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleTrackingStatus
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import java.util.ArrayList
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.JoinType
import javax.persistence.criteria.Predicate
import javax.persistence.criteria.Root

/**
 * Specification Service for search.
 */
@Service
class VehicleSpecification {
    companion object {
        /**
         * List Vehicles base on optional parameter.
         */
        fun toSpec(
            vin: String = "",
            model: String = "",
            ipAddress: String = "",
            status: String = "",
            connected: String = ""
        ): Specification<Vehicle> {
            return object : Specification<Vehicle> {
                override fun toPredicate(
                    root: Root<Vehicle>,
                    query: CriteriaQuery<*>,
                    cb: CriteriaBuilder
                ): Predicate? {
                    var searchCriteria: Predicate? = null
                    val allConditions = ArrayList<Predicate>()

                    if (vin.isNotEmpty()) {
                        allConditions.add(cb.buildLikeExpression(root.get<String>("vin"), vin))
                    }
                    if (model.isNotEmpty()) {
                        val vehicleModelConditions = ArrayList<Predicate>()
                        val vehicleModelJoin = root.join<Vehicle, VehicleModel>("model", JoinType.LEFT)
                        vehicleModelConditions.add(cb.buildLikeExpression(vehicleModelJoin.get("name"), model))
                        if (vehicleModelConditions.size > 0) {
                            allConditions.addAll(vehicleModelConditions)
                        }
                    }
                    val vehicleConnectionConditions = ArrayList<Predicate>()
                    val vehicleConnectionJoin = root.join<Vehicle, VehicleConnection>("connection", JoinType.LEFT)
                    if (ipAddress.isNotEmpty()) {
                        vehicleConnectionConditions.add(
                            cb.buildLikeExpression(
                                vehicleConnectionJoin.get("ipAddress"),
                                ipAddress
                            )
                        )
                    }
                    if (status.isNotEmpty()) {
                        vehicleConnectionConditions.add(
                            cb.equal(
                                vehicleConnectionJoin.get<VehicleTrackingStatus>("status"),
                                VehicleTrackingStatus.valueOf(status.toUpperCase())
                            )
                        )
                    }
                    if (connected.isNotEmpty()) {
                        vehicleConnectionConditions.add(
                            cb.equal(
                                vehicleConnectionJoin.get<Boolean>("connected"),
                                connected.toBoolean()
                            )
                        )
                    }

                    if (vehicleConnectionConditions.size > 0) {
                        allConditions.addAll(vehicleConnectionConditions)
                    }
                    if (allConditions.size > 0) {
                        @Suppress("SpreadOperator")
                        searchCriteria = cb.and(*(allConditions as List<Predicate>).toTypedArray())
                    }
                    return searchCriteria
                }
            }
        }
    }
}
