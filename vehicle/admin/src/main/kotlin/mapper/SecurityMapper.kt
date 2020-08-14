/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.admin.api.proto.SecuritySettingConfigProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.SecuritySettingProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.SecuritySoftwareProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleSecurityConfigProto
import jp.co.trillium.secureskye.vehicle.admin.model.security.SecuritySetting
import jp.co.trillium.secureskye.vehicle.admin.model.security.SecuritySettingConfig
import jp.co.trillium.secureskye.vehicle.admin.model.security.SecuritySoftware
import jp.co.trillium.secureskye.vehicle.admin.model.security.VehicleSecurityConfig
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.springframework.stereotype.Component

/**
 * Mapper between Protobuf models and database models of vehicle security.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [UuidMapper::class, SecurityMapper.BuilderFactory::class]
)
abstract class SecurityMapper {

    /**
     * Map [securitySettingConfig] to [SecuritySettingConfigProto] builder.
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "isActive", source = "active")
    )
    protected abstract fun securitySettingConfigProtoBuilder(securitySettingConfig: SecuritySettingConfig):
            SecuritySettingConfigProto.Builder

    /**
     * Map [securitySettingConfig] to [SecuritySettingConfigProto].
     */
    fun securitySettingConfig(securitySettingConfig: SecuritySettingConfig): SecuritySettingConfigProto =
        securitySettingConfigProtoBuilder(securitySettingConfig).build()

    /**
     * Map [securitySettingConfig] to [SecuritySettingConfig].
     */
    @Mappings(
        Mapping(target = "vehicleSecurityConfig", ignore = true),
        Mapping(target = "securitySetting", ignore = true),
        Mapping(target = "active", source = "isActive")
    )
    abstract fun securitySettingConfig(securitySettingConfig: SecuritySettingConfigProto): SecuritySettingConfig

    /**
     * Map [vehicleSecurityConfig] to [VehicleSecurityConfigProto] builder.
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "vehicleIdBytes", ignore = true),
        Mapping(target = "securitySettingConfigList", source = "securitySettingConfigs"),
        Mapping(target = "securitySettingConfigOrBuilderList", ignore = true),
        Mapping(target = "securitySettingConfigBuilderList", ignore = true),
        Mapping(target = "isActive", source = "active")
    )
    protected abstract fun vehicleSecurityConfigProtoBuilder(vehicleSecurityConfig: VehicleSecurityConfig):
            VehicleSecurityConfigProto.Builder

    /**
     * Map [vehicleSecurityConfig] to [VehicleSecurityConfigProto].
     */
    fun vehicleSecurity(vehicleSecurityConfig: VehicleSecurityConfig): VehicleSecurityConfigProto =
        vehicleSecurityConfigProtoBuilder(vehicleSecurityConfig).build()

    /**
     * Map [vehicleSecurityConfig] to [VehicleSecurityConfigProto].
     */
    @Mappings(
        Mapping(target = "securitySettingConfigs", source = "securitySettingConfigList"),
        Mapping(target = "active", source = "isActive")
    )
    abstract fun vehicleSecurity(vehicleSecurityConfig: VehicleSecurityConfigProto): VehicleSecurityConfig

    /**
     * Map [securitySetting] to [SecuritySettingProto] builder.
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true),
        Mapping(target = "securitySoftwareIdBytes", ignore = true),
        Mapping(target = "securitySoftwareId", source = "securitySoftware.id")
    )
    protected abstract fun securitySettingProtoBuilder(securitySetting: SecuritySetting): SecuritySettingProto.Builder

    /**
     * Map [securitySetting] to [SecuritySettingProto].
     */
    fun securitySetting(securitySetting: SecuritySetting): SecuritySettingProto =
        securitySettingProtoBuilder(securitySetting).build()

    /**
     * Map [securitySetting] to [SecuritySetting].
     */
    @Mappings(
        Mapping(target = "securitySettingConfig", ignore = true),
        Mapping(target = "securitySoftware.id", source = "securitySoftwareId")
    )
    abstract fun securitySetting(securitySetting: SecuritySettingProto): SecuritySetting

    /**
     * Map [securitySetting] to [SecuritySettingProto] builder.
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true)
    )
    protected abstract fun securitySoftwareProtoBuilder(securitySoftware: SecuritySoftware):
            SecuritySoftwareProto.Builder

    /**
     * Map [securitySetting] to [SecuritySettingProto].
     */
    fun securitySoftware(securitySoftware: SecuritySoftware): SecuritySoftwareProto =
        securitySoftwareProtoBuilder(securitySoftware).build()

    /**
     * Map [securitySetting] to [SecuritySetting].
     */
    @Mappings(
        Mapping(target = "securitySetting", ignore = true)
    )
    abstract fun securitySoftware(securitySoftware: SecuritySoftwareProto): SecuritySoftware

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [SecuritySettingConfigProto] builder.
         */
        fun securitySettingConfigBuilder(): SecuritySettingConfigProto.Builder =
            SecuritySettingConfigProto.newBuilder()

        /**
         * Create a [VehicleSecurityConfigProto] builder.
         */
        fun vehicleSecurityConfigBuilder(): VehicleSecurityConfigProto.Builder =
            VehicleSecurityConfigProto.newBuilder()

        /**
         * Create a [SecuritySettingProto] builder.
         */
        fun securitySettingBuilder(): SecuritySettingProto.Builder =
            SecuritySettingProto.newBuilder()

        /**
         * Create a [SecuritySoftwareProto] builder.
         */
        fun securitySoftwareBuilder(): SecuritySoftwareProto.Builder =
            SecuritySoftwareProto.newBuilder()
    }
}
