/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.admin.api.proto.SecuritySettingConfigProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleSecurityConfigProto
import jp.co.trillium.secureskye.vehicle.admin.mapper.SecurityMapper
import jp.co.trillium.secureskye.vehicle.admin.model.security.SecuritySetting
import jp.co.trillium.secureskye.vehicle.admin.model.security.SecuritySettingConfig
import jp.co.trillium.secureskye.vehicle.admin.model.security.VehicleSecurityConfig
import jp.co.trillium.secureskye.vehicle.admin.repository.security.SecuritySettingConfigRepository
import jp.co.trillium.secureskye.vehicle.admin.repository.security.SecuritySettingRepository
import jp.co.trillium.secureskye.vehicle.admin.repository.security.SecuritySoftwareRepository
import jp.co.trillium.secureskye.vehicle.admin.repository.security.VehicleSecurityConfigRepository
import org.springframework.stereotype.Service
import java.util.UUID
import javax.persistence.EntityNotFoundException

/**
 * Business logic for managing vehicle security.
 */
@Service
class VehicleSecurityService(
    private val vehicleSecurityConfigRepository: VehicleSecurityConfigRepository,
    private val securitySettingRepository: SecuritySettingRepository,
    private val securitySettingConfigRepository: SecuritySettingConfigRepository,
    private val securitySoftwareRepository: SecuritySoftwareRepository,
    private val uuidMapper: UuidMapper,
    private val securityMapper: SecurityMapper
) {

    /**
     * List all available vehicle security information by [vehicleId].
     */
    fun list(vehicleId: UUID) = vehicleSecurityConfigRepository.findByVehicleId(vehicleId)

    /**
     * Get a vehicle security information by [id].
     */
    fun get(id: UUID): VehicleSecurityConfig =
        vehicleSecurityConfigRepository.findById(id).orElseThrow { EntityNotFoundException() }

    /**
     *  Create new vehicle security and  its setting.
     */
    fun save(vehicleSecurity: VehicleSecurityConfig) {
        val vehicleSecurityObject = vehicleSecurityConfigRepository.save(vehicleSecurity)
        securitySettingRepository.findBySecuritySoftwareId(vehicleSecurityObject.securitySoftware.id).map {
            SecuritySettingConfig(
                vehicleSecurityConfig = vehicleSecurityObject,
                securitySetting = it
            )
        }.also { securitySettingConfigRepository.saveAll(it) }
    }

    /**
     * Function for enable/disable vehicle security.
     */
    fun enableVehicleSecurity(
        vehicleId: UUID,
        vehicleSecurity: VehicleSecurityConfigProto
    ): VehicleSecurityConfigProto {
        return vehicleSecurityConfigRepository.findByVehicleIdAndSecuritySoftwareId(
            vehicleId,
            uuidMapper.uuidString(vehicleSecurity.securitySoftware.id)
        )
            .orElseThrow { EntityNotFoundException() }
            .let {
                it.isActive = vehicleSecurity.isActive
                securityMapper.vehicleSecurity(vehicleSecurityConfigRepository.save(it))
            }
    }

    /**
     * Function for enable/disable vehicle security.
     */
    fun enableSecuritySettingConfig(securitySettingConfig: SecuritySettingConfigProto): SecuritySettingConfigProto {
        return securitySettingConfigRepository.findById(uuidMapper.uuidString(securitySettingConfig.id))
            .orElseThrow { EntityNotFoundException() }
            .let {
                it.isActive = securitySettingConfig.isActive
                securityMapper.securitySettingConfig(securitySettingConfigRepository.save(it))
            }
    }

    /**
     *  Create new security setting and call trigger to add new security setting config.
     */
    fun saveSecuritySetting(securitySetting: SecuritySetting) {
        val securitySettingObject = securitySettingRepository.save(securitySetting)
        securitySettingConfigRepository
            .findBySecuritySoftwareIdAndDistinctVehicleSecurityConfig(securitySettingObject.securitySoftware.id)
            .map {
                SecuritySettingConfig(
                    vehicleSecurityConfig = VehicleSecurityConfig(
                        id = it
                    ),
                    securitySetting = securitySettingObject
                )
            }.also { securitySettingConfigRepository.saveAll(it) }
    }

    /**
     * Delete security setting.
     */
    fun deleteSecuritySetting(id: UUID) {
        securitySettingConfigRepository.findById(id).orElseThrow { EntityNotFoundException() }
            .also(securitySettingConfigRepository::delete)
    }

    /**
     * Init data for Vehicle Security.
     */
    fun vehicleSecurityInitData(vehicle: VehicleProto) {
        val securitySoftwareList = securitySoftwareRepository.findAll()
        securitySoftwareList.forEach {
            VehicleSecurityConfig(
                vehicleId = uuidMapper.uuidString(vehicle.id),
                securitySoftware = it
            ).let(::save)
        }
    }
}
