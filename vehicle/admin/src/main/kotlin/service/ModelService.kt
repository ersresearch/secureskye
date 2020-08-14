/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.oauth.model.OauthTotpListProto
import jp.co.trillium.secureskye.oauth.model.OauthTotpProto
import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.ModelDisplaySettingsListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleMakerProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleModelListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleModelProto
import jp.co.trillium.secureskye.vehicle.admin.exception.ModelDeleteFailedException
import jp.co.trillium.secureskye.vehicle.admin.feign.UaaClient
import jp.co.trillium.secureskye.vehicle.admin.mapper.ModelMapper
import jp.co.trillium.secureskye.vehicle.admin.model.ModelDisplaySettings
import jp.co.trillium.secureskye.vehicle.admin.model.ModelDisplaySettingsType
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleMaker
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleModel
import jp.co.trillium.secureskye.vehicle.admin.repository.ModelDisplaySettingsRepository
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleMakerRepository
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleModelRepository
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleRepository
import org.springframework.stereotype.Service
import java.util.UUID
import javax.persistence.EntityExistsException
import javax.persistence.EntityNotFoundException

/**
 * Business logic for managing vehicle models.
 */
@Service
class ModelService(
    private val modelMapper: ModelMapper,
    private val vehicleModelRepository: VehicleModelRepository,
    private val vehicleRepository: VehicleRepository,
    private val settingsRepository: ModelDisplaySettingsRepository,
    private val uaaClient: UaaClient,
    private val vehicleMakerRepository: VehicleMakerRepository,
    private val uuidMapper: UuidMapper
) {
    companion object {
        private const val DEFAULT_MAKER = "Default Maker"
    }

    /**
     * Check vehicle maker existence.
     * Throw error if maker's id doesn't exist.
     * Return a Default maker if no maker found.
     */
    fun checkMakerExistence(maker: VehicleMakerProto): VehicleMaker {
        return if (!maker.id.isNullOrEmpty()) {
            vehicleMakerRepository.findById(uuidMapper.uuidString(maker.id)).orElseThrow {
                EntityNotFoundException("No maker with the given ID exist.")
            }
        } else if (!maker.name.isNullOrEmpty()) {
            vehicleMakerRepository.findByName(maker.name)
                ?: vehicleMakerRepository.save(VehicleMaker(name = maker.name))
        } else {
            vehicleMakerRepository.findByName(DEFAULT_MAKER)
                ?: vehicleMakerRepository.save(VehicleMaker(name = DEFAULT_MAKER))
        }
    }

    /**
     * Create a new vehicle model with the given [model] and return it as a [VehicleModelProto].
     */
    fun createModel(model: VehicleModelProto): VehicleModelProto {
        vehicleModelRepository.findByName(model.name)?.let {
            throw EntityExistsException("This model name already exist.")
        }
        return vehicleModelRepository.save(
            VehicleModel(
                name = model.name,
                maker = checkMakerExistence(model.maker),
                body = modelMapper.bodyType(model.body)
            )
        ).also { initDefaultModelDisplaySettings(it) }
            .let(modelMapper::vehicleModel)
    }

    /**
     * Rename an existing vehicle model (identified by [id]) to the given [model] info.
     */
    fun update(id: UUID, model: VehicleModelProto): VehicleModelProto {
        vehicleModelRepository.findByName(model.name)?.let {
            throw EntityExistsException("This model name already exist.")
        }
        // Update model
        val updatedModel = vehicleModelRepository.findById(id)
            .orElseThrow { EntityNotFoundException("Cannot find vehicle model.") }
            .apply {
                name = model.name

                if (model.maker != null) {
                    maker = checkMakerExistence(model.maker)
                }

                body = modelMapper.bodyType(model.body)
            }
            .let(vehicleModelRepository::save)

        // Find all vehicles
        val vehicles = vehicleRepository.findByModelId(id)

        // Update vehicle TOTP
        if (vehicles.isEmpty() || model.vehicle2FaStatus == TwoFactorAuthenticationStatusProto.DISABLED) {
            uaaClient.disable2FactorAuthenticationForGroup(id)

            return modelMapper.vehicleModel(
                updatedModel,
                vehicles, // Vehicle info
                emptyList()
            )
        } else {
            val modelIdStr = id.toString()

            // Map to [OauthTotpListProto]
            val otpList = vehicles.map {
                OauthTotpProto.newBuilder()
                    .setOauthId(it.clientId)
                    .setOauthGroup(modelIdStr)
                    .setEnabled(model.vehicle2FaStatus != TwoFactorAuthenticationStatusProto.DISABLED)
                    .build()
            }.let { OauthTotpListProto.newBuilder().addAllData(it).build() }
            // Update 2FA
            val totpSecretList = uaaClient.updateTotpSecretList(id, otpList)

            return modelMapper.vehicleModel(
                updatedModel,
                vehicles, // Vehicle info
                totpSecretList?.dataList.orEmpty()
            )
        }
    }

    /**
     * Delete an existing vehicle model (identified by [id]), only if it doesn't have any vehicle assigned.
     */
    fun deleteModel(id: UUID) {
        if (vehicleRepository.countByModelId(id) > 0)
            throw ModelDeleteFailedException(id, "Can't delete model while related vehicles exist")

        vehicleModelRepository.getOne(id).let(vehicleModelRepository::delete)
    }

    /**
     * List all existing vehicle models as a [VehicleModelListProto].
     */
    fun listAllModels(): VehicleModelListProto = vehicleModelRepository.findAll()
        .let(modelMapper::vehicleModelList)

    /**
     * Find a vehicle model by its [id], returning it as a [VehicleModelProto].
     *
     * @throws EntityNotFoundException When the vehicle model doesn't exist.
     */
    fun findModel(id: UUID): VehicleModelProto = vehicleModelRepository.findById(id)
        .orElseThrow { EntityNotFoundException() }
        .let { model ->
            modelMapper.vehicleModel(
                model,
                vehicleRepository.findByModelId(model.id), // Vehicle info
                uaaClient.getTotpSecretList(model.id)?.dataList.orEmpty() // Vehicle OTP info
            )
        }

    /**
     * Init default display setting values for model.
     */
    private fun initDefaultModelDisplaySettings(model: VehicleModel) {
        val list: MutableList<ModelDisplaySettings> = mutableListOf()
        for (i in ModelDisplaySettingsType.values()) {
            if (i != ModelDisplaySettingsType.UNDEFINED && i != ModelDisplaySettingsType.OTHER) {
                list.add(
                    ModelDisplaySettings(
                        settings = i,
                        value = true,
                        model = model
                    ).let(settingsRepository::save)
                )
            }
        }
    }

    /**
     * Update model display settings by model's ID.
     */
    fun updateDisplaySettings(modelId: UUID, settings: ModelDisplaySettingsListProto): ModelDisplaySettingsListProto {
        vehicleModelRepository.getOne(modelId).apply {
            this.displaySettings = modelMapper.modelDisplaySettingsList(settings).apply {
                this.forEach { it.model.id = modelId }
            }
        }.let(vehicleModelRepository::save)
        return getDisplaySettings(modelId)
    }

    /**
     * Get model's display settings.
     */
    fun getDisplaySettings(modelId: UUID): ModelDisplaySettingsListProto {
        val list = ModelDisplaySettingsListProto.newBuilder()
        settingsRepository.findByModelId(modelId).map {
            list.addList(modelMapper.modelDisplaySettings(it))
        }
        return list.build()
    }
}
