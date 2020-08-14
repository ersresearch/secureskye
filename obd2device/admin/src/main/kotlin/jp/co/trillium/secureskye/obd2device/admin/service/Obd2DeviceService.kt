/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.admin.service

import jp.co.trillium.secureskye.common.util.Uuids
import jp.co.trillium.secureskye.obd2device.admin.model.Obd2Device
import jp.co.trillium.secureskye.obd2device.admin.repository.Obd2DeviceRepository
import org.springframework.security.oauth2.provider.ClientRegistrationService
import org.springframework.security.oauth2.provider.client.BaseClientDetails
import org.springframework.stereotype.Service
import java.util.UUID
import javax.persistence.EntityNotFoundException

/**
 * Business logic for administering [Obd2Device].
 */
@Service
class Obd2DeviceService(
    private val obd2DeviceRepository: Obd2DeviceRepository,
    private val clientRegistrationService: ClientRegistrationService
) {

    private companion object {
        /**
         * Time in seconds until an access token for device expires.
         */
        private const val DEVICE_ACCESS_TOKEN_VALIDITY = 86400

        /**
         * Time in seconds until a refresh token for device expires.
         */
        private const val DEVICE_REFRESH_TOKEN_VALIDITY = 0

        private const val deviceScopes = "none"

        private val deviceResources = listOf(
            "uaa",
            "vehicle-message",
            "obd2device-event"
        ).joinToString(",")

        private val authorities = listOf(
            "event:create",
            "message:create",
            "vehicle-status:update",
            "vehicle:read"
        ).joinToString(",")
    }

    /**
     * Find all registered OBD-II devices.
     */
    fun list(): List<Obd2Device> = obd2DeviceRepository.findAll()

    /**
     * Get OBD-II device info of device with clientId [clientId].
     */
    fun getByClientId(clientId: String): Obd2Device =
        obd2DeviceRepository.findByClientId(clientId) ?: throw EntityNotFoundException()

    /**
     * Get OBD-II device info of [id].
     */
    fun get(id: UUID): Obd2Device = obd2DeviceRepository.getOne(id)

    /**
     * Register new OBD-II device with [obd2Device] info.
     */
    fun create(obd2Device: Obd2Device): Obd2Device = BaseClientDetails(
        "obd2device-${Uuids.generate()}",
        deviceResources,
        deviceScopes,
        "client_credentials",
        authorities
    ).apply {
        accessTokenValiditySeconds = DEVICE_ACCESS_TOKEN_VALIDITY
        refreshTokenValiditySeconds = DEVICE_REFRESH_TOKEN_VALIDITY
    }.also(clientRegistrationService::addClientDetails).let {
        obd2DeviceRepository.save(
            Obd2Device(
                family = obd2Device.family,
                kernel = obd2Device.kernel,
                macAddress = obd2Device.macAddress,
                clientId = it.clientId,
                vehicleId = obd2Device.vehicleId
            )
        )
    }

    /**
     * Add new OBD-II device of [id] with [obd2Device] info.
     */
    fun update(id: UUID, obd2Device: Obd2Device): Obd2Device = get(id)
        .apply {
            family = obd2Device.family
            kernel = obd2Device.kernel
            macAddress = obd2Device.macAddress
        }.let(obd2DeviceRepository::save)

    /**
     * Remove OBD-II device of [id].
     */
    fun delete(id: UUID) = get(id).let(obd2DeviceRepository::delete)

    /**
     * Register OBD-II device with vehicleId [registerVehicleId].
     */
    fun registerVehicleId(deviceId: UUID, registerVehicleId: UUID) =
        obd2DeviceRepository.getOne(deviceId).apply { vehicleId = registerVehicleId }.let(obd2DeviceRepository::save)

    /**
     * UnRegister vehicleId for OBD-II device.
     */
    fun unRegisterVehicleId(deviceId: UUID) =
        obd2DeviceRepository.getOne(deviceId).apply { vehicleId = null }.let(obd2DeviceRepository::save)

    /**
     * Find all devices attached to vehicle [vehicleId].
     */
    fun getObd2DeviceOfVehicle(vehicleId: UUID): List<Obd2Device> = obd2DeviceRepository.findByVehicleId(vehicleId)
}
