/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.oauth.model.OauthTotpProto
import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.ModelDisplaySettingsListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.ModelDisplaySettingsProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.ModelDisplaySettingsTypeProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleBodyTypeProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleMakerListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleMakerProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleModelListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleModelProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleModelProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleOauthTotpProto
import jp.co.trillium.secureskye.vehicle.admin.model.Vehicle
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleBodyType
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleMaker
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleModel
import jp.co.trillium.secureskye.vehicle.admin.model.ModelDisplaySettings
import jp.co.trillium.secureskye.vehicle.admin.model.ModelDisplaySettingsType
import org.mapstruct.AfterMapping
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingTarget
import org.mapstruct.Mappings
import org.springframework.stereotype.Component

/**
 * Mapper between Protobuf models and database models of vehicle messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [UuidMapper::class, ModelMapper.BuilderFactory::class]
)
abstract class ModelMapper {

    /**
     * Map [bodyType] to [VehicleBodyTypeProto].
     */
    fun bodyType(bodyType: VehicleBodyType): VehicleBodyTypeProto =
        VehicleBodyTypeProto.forNumber(bodyType.value)

    /**
     * Map [VehicleBodyTypeProto] to [VehicleBodyType].
     */
    fun bodyType(bodyType: VehicleBodyTypeProto): VehicleBodyType =
        VehicleBodyType.values().first { it.value == bodyType.number }

    /**
     * Map [VehicleMakerProto] to [VehicleMaker].
     */
    abstract fun toMaker(vehicleMakerProto: VehicleMakerProto): VehicleMaker

    /**
     * Map [maker] to [VehicleMakerProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "idBytes", ignore = true)
    )
    protected abstract fun vehicleMakerBuilder(maker: VehicleMaker): VehicleMakerProto.Builder

    /**
     * Map [maker] to [VehicleMakerProto].
     */
    fun vehicleMaker(maker: VehicleMaker): VehicleMakerProto = vehicleMakerBuilder(maker).build()

    /**
     * Map [list] to [VehicleMakerListProto].
     */
    fun vehicleMakerList(list: List<VehicleMaker>): VehicleMakerListProto = VehicleMakerListProto.newBuilder()
        .addAllData(list.map(::vehicleMaker))
        .build()

    /**
     * Map [model] to [VehicleModelProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "vehicle2FaList", ignore = true),
        Mapping(target = "vehicle2FaOrBuilderList", ignore = true),
        Mapping(target = "vehicle2FaBuilderList", ignore = true),
        Mapping(target = "vehicle2FaStatus", ignore = true),
        Mapping(target = "vehicle2FaStatusValue", ignore = true),
        Mapping(target = "bodyValue", ignore = true),
        Mapping(target = "displaySettingsList", source = "displaySettings"),
        Mapping(target = "displaySettingsOrBuilderList", ignore = true),
        Mapping(target = "displaySettingsBuilderList", ignore = true)
    )
    protected abstract fun vehicleModelBuilder(model: VehicleModel): VehicleModelProto.Builder

    /**
     * Map [VehicleModel] to [VehicleModelProto].
     */
    fun vehicleModel(model: VehicleModel): VehicleModelProto = vehicleModelBuilder(model).build()

    /**
     * Map [VehicleModelProtoOrBuilder] to [VehicleModel].
     */
    @Mappings(
        Mapping(target = "displaySettings", source = "displaySettingsList")
    )
    abstract fun vehicleModel(model: VehicleModelProtoOrBuilder): VehicleModel

    /**
     * Map [list] to [VehicleModelListProto].
     */
    fun vehicleModelList(list: List<VehicleModel>): VehicleModelListProto = VehicleModelListProto.newBuilder()
        .addAllModel(list.map(::vehicleModel))
        .build()

    /**
     * Map [model] with [vehicles] and [otps] to [VehicleModelProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "vehicle2FaList", ignore = true),
        Mapping(target = "vehicle2FaOrBuilderList", ignore = true),
        Mapping(target = "vehicle2FaBuilderList", ignore = true),
        Mapping(target = "vehicle2FaStatus", ignore = true),
        Mapping(target = "vehicle2FaStatusValue", ignore = true),
        Mapping(target = "bodyValue", ignore = true),
        Mapping(target = "displaySettingsList", ignore = true),
        Mapping(target = "displaySettingsOrBuilderList", ignore = true),
        Mapping(target = "displaySettingsBuilderList", ignore = true)
    )
    protected abstract fun vehicleModelBuilder(
        model: VehicleModel,
        vehicles: List<Vehicle>,
        otps: List<OauthTotpProto>
    ): VehicleModelProto.Builder

    /**
     * Map [model] with [vehicles] and [otps] to [VehicleModelProto.Builder]. After mapping filler.
     */
    @AfterMapping
    fun vehicleModelBuilder(
        @MappingTarget builder: VehicleModelProto.Builder,
        model: VehicleModel,
        vehicles: List<Vehicle>,
        otps: List<OauthTotpProto>
    ) {
        val modelIdStr = model.id.toString()

        // OTP list to map for indexing
        val otpsMap = otps.associateBy { it.oauthId }

        // Mapping info
        var vehicle2FaStatus =
            if (vehicles.isEmpty()) TwoFactorAuthenticationStatusProto.DISABLED
            else TwoFactorAuthenticationStatusProto.ENABLED
        val vehicle2fa = vehicles.map { vehicle ->
            VehicleOauthTotpProto.newBuilder().apply {
                val status: TwoFactorAuthenticationStatusProto
                var oauthTotp = otpsMap[vehicle.clientId]
                if (oauthTotp != null) {
                    status = if (oauthTotp.enabled) {
                        TwoFactorAuthenticationStatusProto.ENABLED
                    } else {
                        if (vehicle2FaStatus == TwoFactorAuthenticationStatusProto.ENABLED) {
                            vehicle2FaStatus = TwoFactorAuthenticationStatusProto.PENDING
                        }
                        TwoFactorAuthenticationStatusProto.PENDING
                    }
                } else {
                    oauthTotp = OauthTotpProto.newBuilder().apply {
                        oauthId = vehicle.clientId
                        oauthGroup = modelIdStr
                    }.build()
                    status = TwoFactorAuthenticationStatusProto.DISABLED
                    vehicle2FaStatus = TwoFactorAuthenticationStatusProto.DISABLED
                }
                this.vehicleId = vehicle.id.toString()
                this.vehicleName = vehicle.name
                this.oauthTotp = oauthTotp
                this.status = status
            }.build()
        }

        builder.addAllVehicle2Fa(vehicle2fa).vehicle2FaStatus = vehicle2FaStatus
    }

    /**
     * Map [model] with [vehicles] and [otps] to [VehicleModelProto].
     */
    fun vehicleModel(
        model: VehicleModel,
        vehicles: List<Vehicle>,
        otps: List<OauthTotpProto>
    ): VehicleModelProto = vehicleModelBuilder(model, vehicles, otps).build()

    /**
     * Map [modelDisplaySettings] to [ModelDisplaySettingsProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "settingsValue", ignore = true),
        Mapping(target = "modelId", ignore = true),
        Mapping(target = "modelIdBytes", ignore = true)
    )
    abstract fun modelDisplaySettingsBuilder(modelDisplaySettings: ModelDisplaySettings):
            ModelDisplaySettingsProto.Builder

    /**
     * Map [modelDisplaySettings] to [ModelDisplaySettingsProto].
     */
    fun modelDisplaySettings(modelDisplaySettings: ModelDisplaySettings): ModelDisplaySettingsProto =
        modelDisplaySettingsBuilder(modelDisplaySettings).build()

    /**
     * Map [ModelDisplaySettingsProto] to [ModelDisplaySettings].
     */
    @Mappings(
        Mapping(target = "model", ignore = true)
    )
    abstract fun modelDisplaySettings(modelDisplaySettingsProto: ModelDisplaySettingsProto): ModelDisplaySettings

    /**
     * Map [bodyType] to [VehicleBodyTypeProto].
     */
    fun modelDisplaySettingsType(modelDisplaySettingsType: ModelDisplaySettingsType): ModelDisplaySettingsTypeProto =
        ModelDisplaySettingsTypeProto.forNumber(modelDisplaySettingsType.value)

    /**
     * Map [VehicleBodyTypeProto] to [VehicleBodyType].
     */
    fun modelDisplaySettingsType(modelDisplaySettingsType: ModelDisplaySettingsTypeProto): ModelDisplaySettingsType =
        ModelDisplaySettingsType.values().first { it.value == modelDisplaySettingsType.number }

    /**
     * Map [ModelDisplaySettingsListProto] to list [ModelDisplaySettings].
     */
    fun modelDisplaySettingsList(listProto: ModelDisplaySettingsListProto): List<ModelDisplaySettings> {
        val list: MutableList<ModelDisplaySettings> = mutableListOf()
        listProto.listList.forEach {
            list.add(modelDisplaySettings(it))
        }
        return list
    }

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [VehicleModelProto] builder.
         */
        fun vehicleModelBuilder(): VehicleModelProto.Builder = VehicleModelProto.newBuilder()

        /**
         * Create a [VehicleMakerProto] builder.
         */
        fun vehicleMakerBuilder(): VehicleMakerProto.Builder = VehicleMakerProto.newBuilder()

        /**
         * Create a [ModelDisplaySettingsProto] builder.
         */
        fun modelDisplaySettingsBuilder(): ModelDisplaySettingsProto.Builder = ModelDisplaySettingsProto.newBuilder()
    }
}
