/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.registry.api.proto.CodeInfoProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.CodeInfoProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.registry.api.proto.EcuInfoListProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.EcuInfoProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.EcuInfoProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.registry.api.proto.ErrorCodeInfoProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.ErrorCodeInfoProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.registry.api.proto.InstallationStatusProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareInstallationProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareInstallationProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareVersionListProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareVersionProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareVersionProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.registry.model.CodeInfo
import jp.co.trillium.secureskye.vehicle.registry.model.EcuCommProtocol
import jp.co.trillium.secureskye.vehicle.registry.model.EcuInfo
import jp.co.trillium.secureskye.vehicle.registry.model.EcuInterfaceInfo
import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftware
import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftwareInstallation
import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftwareInstallationStatus
import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftwareVersion
import jp.co.trillium.secureskye.vehicle.registry.model.EcuStatus
import jp.co.trillium.secureskye.vehicle.registry.model.EcuType
import jp.co.trillium.secureskye.vehicle.registry.model.ErrorCodeInfo
import jp.co.trillium.secureskye.vehicle.registry.model.GatewayInterfaceInfo
import org.mapstruct.AfterMapping
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingTarget
import org.mapstruct.Mappings
import org.springframework.stereotype.Component
import java.time.LocalDateTime

/**
 * Mapper between Protobuf models and database models of vehicle registry information.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [UuidMapper::class, RegistryMapper.BuilderFactory::class]
)
abstract class RegistryMapper {

    /**
     * Map [info] to [CodeInfoProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "detailBytes", ignore = true)
    )
    protected abstract fun codeInfoBuilder(info: CodeInfo): CodeInfoProto.Builder

    /**
     * Map [info] to [CodeInfoProto].
     */
    fun codeInfo(info: CodeInfo): CodeInfoProto = codeInfoBuilder(info).build()

    /**
     * Map [info] to [CodeInfo].
     */
    abstract fun codeInfo(info: CodeInfoProtoOrBuilder): CodeInfo

    /**
     * Map [info] to [ErrorCodeInfoProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "ipsVersionBytes", ignore = true),
        Mapping(target = "errorCodesList", ignore = true),
        Mapping(target = "errorCodesOrBuilderList", ignore = true),
        Mapping(target = "errorCodesBuilderList", ignore = true)
    )
    protected abstract fun errorCodeInfoBuilder(info: ErrorCodeInfo): ErrorCodeInfoProto.Builder

    /**
     * Map [source] to [target].
     */
    @AfterMapping
    protected fun errorCodeInfoBuilder(source: ErrorCodeInfo, @MappingTarget target: ErrorCodeInfoProto.Builder) {
        target.addAllErrorCodes(source.errorCodes.map(::codeInfo))
    }

    /**
     * Map [info] to [ErrorCodeInfoProto].
     */
    fun errorCodeInfo(info: ErrorCodeInfo): ErrorCodeInfoProto = errorCodeInfoBuilder(info).build()

    /**
     * Map [info] to [ErrorCodeInfo].
     */
    @Mapping(target = "errorCodes", ignore = true)
    abstract fun errorCodeInfo(info: ErrorCodeInfoProtoOrBuilder): ErrorCodeInfo

    /**
     * Map [source] to [target].
     */
    @AfterMapping
    protected fun errorCodeInfo(source: ErrorCodeInfoProtoOrBuilder, @MappingTarget target: ErrorCodeInfo) {
        target.errorCodes = source.errorCodesList.map(::codeInfo)
    }

    /**
     * Map [info] to [EcuInfoProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "parentEcuIdBytes", ignore = true),
        Mapping(target = "childrenOrBuilderList", ignore = true),
        Mapping(target = "childrenBuilderList", ignore = true),
        Mapping(target = "softwareInstallationOrBuilderList", ignore = true),
        Mapping(target = "softwareInstallationBuilderList", ignore = true),
        Mapping(target = "childrenList", ignore = true),
        Mapping(target = "softwareInstallationList", ignore = true),
        Mapping(target = "securityStatusValue", ignore = true),
        Mapping(target = "typeValue", ignore = true),
        Mapping(target = "displayNameBytes", ignore = true),
        Mapping(target = "parentEcuId", source = "info.parentId")
    )
    abstract fun ecuInfoBuilder(info: EcuInfo): EcuInfoProto.Builder

    /**
     * Map [EcuInfo] to [EcuInfoProto].
     */
    @AfterMapping
    protected fun ecuInfoBuilderAfter(
        source: EcuInfo,
        @MappingTarget target: EcuInfoProto.Builder
    ) {
        target.addAllChildren(source.children.map { ecuInfoProto(it) })
        target.addAllSoftwareInstallation(source.softwareInstallation.map {
            softwareInstallation(it)
        })
    }

    /**
     * Map [info] to [EcuInfoProto].
     */
    fun ecuInfoProto(info: EcuInfo): EcuInfoProto =
        ecuInfoBuilder(info).build()

    /**
     * Map [info] to [EcuInfo].
     */
    @Mappings(
        Mapping(target = "parentId", ignore = true),
        Mapping(target = "children", ignore = true),
        Mapping(target = "softwareInstallation", ignore = true)
    )
    abstract fun ecuInfo(info: EcuInfoProtoOrBuilder): EcuInfo

    /**
     * Map source [EcuInfo] to target [EcuInfo].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "parentId", ignore = true),
        Mapping(target = "children", ignore = true),
        Mapping(target = "softwareInstallation", ignore = true)
    )
    abstract fun update(source: EcuInfoProtoOrBuilder, @MappingTarget target: EcuInfo)

    /**
     * Map [list] to [EcuInfoListProto].
     */
    fun ecuInfoList(list: List<EcuInfo>): EcuInfoListProto =
        EcuInfoListProto.newBuilder()
            .addAllEcuInfo(list.map { ecuInfoProto(it) })
            .build()

    /**
     * Map [list] to [EcuInfoListProto].
     */
    fun ecuSoftwareVersionList(list: List<EcuSoftwareVersion>): SoftwareVersionListProto =
        SoftwareVersionListProto.newBuilder()
            .addAllData(list.map(::softwareVersion))
            .build()

    /**
     * Map [info] to [EcuInfoProto.InterfaceInfo.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "commProtocolValue", ignore = true),
        Mapping(target = "messageIdBytes", ignore = true),
        Mapping(target = "ecuDeviceIdBytes", ignore = true),
        Mapping(target = "vehicleIdBytes", ignore = true)
    )
    protected abstract fun ecuInterfaceInfoBuilder(info: EcuInterfaceInfo): EcuInfoProto.InterfaceInfo.Builder

    /**
     * Map [info] to [EcuInfoProto.InterfaceInfo].
     */
    fun ecuInterfaceInfo(info: EcuInterfaceInfo): EcuInfoProto.InterfaceInfo = ecuInterfaceInfoBuilder(info).build()

    /**
     * Map [info] to [EcuInterfaceInfo].
     */
    abstract fun ecuInterfaceInfo(info: EcuInfoProto.InterfaceInfoOrBuilder): EcuInterfaceInfo

    /**
     * Map [protocol] to [EcuInfoProto.CommProtocol].
     */
    protected fun ecuCommProtocol(protocol: EcuCommProtocol): EcuInfoProto.CommProtocol =
        EcuInfoProto.CommProtocol.forNumber(protocol.value)

    /**
     * Map [protocol] to [EcuCommProtocol].
     */
    protected fun ecuCommProtocol(protocol: EcuInfoProto.CommProtocol): EcuCommProtocol =
        EcuCommProtocol.values().first { it.value == protocol.number }

    /**
     * Map [type] to [EcuInfoProto.EcuTypeProto].
     */
    protected fun ecuType(type: EcuType): EcuInfoProto.EcuTypeProto =
        EcuInfoProto.EcuTypeProto.forNumber(type.value)

    /**
     * Map [type] to [EcuType].
     */
    protected fun ecuType(type: EcuInfoProto.EcuTypeProto): EcuType =
        EcuType.values().first { it.value == type.number }

    /**
     * Map [securityStatus] to [EcuInfoProto.SecurityStatusProto].
     */
    protected fun securityStatus(securityStatus: EcuStatus): EcuInfoProto.SecurityStatusProto =
        EcuInfoProto.SecurityStatusProto.forNumber(securityStatus.value)

    /**
     * Map [securityStatus] to [EcuStatus].
     */
    protected fun securityStatus(securityStatus: EcuInfoProto.SecurityStatusProto): EcuStatus =
        EcuStatus.values().first { it.value == securityStatus.number }

    /**
     * Map [info] to [EcuInfoProto.GatewayInterfaceInfo] builer.
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "ipBytes", ignore = true),
        Mapping(target = "vinBytes", ignore = true)
    )
    protected abstract fun gatewayInterfaceInfoBuilder(
        info: GatewayInterfaceInfo
    ): EcuInfoProto.GatewayInterfaceInfo.Builder

    /**
     * Map [info] to [EcuInfoProto.GatewayInterfaceInfo].
     */
    fun gatewayInterfaceInfo(info: GatewayInterfaceInfo): EcuInfoProto.GatewayInterfaceInfo =
        gatewayInterfaceInfoBuilder(info).build()

    /**
     * Map [info] to [GatewayInterfaceInfo].
     */
    abstract fun gatewayInterfaceInfo(info: EcuInfoProto.GatewayInterfaceInfoOrBuilder): GatewayInterfaceInfo

    /**
     * Map [installation] to [SoftwareInstallationProto] builder.
     */
    @Mappings(
        Mapping(target = "id", source = "installation.id"),
        Mapping(target = "softwareId", source = "installation.softwareId"),
        Mapping(target = "softwareIdBytes", ignore = true),
        Mapping(target = "ecu", ignore = true),
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "statusValue", ignore = true),
        Mapping(target = "messageBytes", ignore = true),
        Mapping(target = "current", source = "installation.softwareVersion")
    )
    protected abstract fun softwareInstallationBuilder(
        installation: EcuSoftwareInstallation
    ): SoftwareInstallationProto.Builder

    /**
     * Map [installation] to [SoftwareInstallationProto].
     */
    fun softwareInstallation(
        installation: EcuSoftwareInstallation
    ): SoftwareInstallationProto =
        softwareInstallationBuilder(installation).build()

    /**
     * Map [installation] to [EcuSoftwareInstallation].
     */
    @Mappings(
        Mapping(target = "ecu", ignore = true),
        Mapping(target = "softwareVersion", source = "installation.current"),
        Mapping(target = "active", ignore = true),
        Mapping(target = "previousInstallationId", ignore = true)
    )
    abstract fun softwareInstallation(installation: SoftwareInstallationProtoOrBuilder): EcuSoftwareInstallation

    /**
     * Map [software] to [SoftwareProto] builder.
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true),
        Mapping(target = "latest", ignore = true),
        Mapping(target = "versionsList", ignore = true),
        Mapping(target = "versionsOrBuilderList", ignore = true),
        Mapping(target = "versionsBuilderList", ignore = true)
    )
    abstract fun softwareBuilder(software: EcuSoftware): SoftwareProto.Builder

    /**
     * Map [software] to [SoftwareProto].
     */
    fun software(software: EcuSoftware): SoftwareProto = softwareBuilder(software).build()

    /**
     * Map [software] to [EcuSoftware].
     */
    @Mappings(
        Mapping(target = "versions", ignore = true)
    )
    abstract fun software(software: SoftwareProtoOrBuilder): EcuSoftware

    /**
     * Map [version] to [SoftwareVersionProto] builder.
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "versionNameBytes", ignore = true),
        Mapping(target = "changelogBytes", ignore = true),
        Mapping(target = "imageIdBytes", ignore = true),
        Mapping(target = "softwareId", ignore = true),
        Mapping(target = "ecuDeviceIdBytes", ignore = true),
        Mapping(target = "softwareIdBytes", ignore = true)
    )
    protected abstract fun softwareVersionProtoBuilder(version: EcuSoftwareVersion?): SoftwareVersionProto.Builder

    /**
     * Map [version] to [SoftwareVersionProto].
     */
    fun softwareVersion(version: EcuSoftwareVersion): SoftwareVersionProto =
        softwareVersionProtoBuilder(version).build()

    /**
     * Map [version] to [EcuSoftwareVersion].
     */
    @Mappings(
        Mapping(target = "software", ignore = true),
        Mapping(target = "softwareInstallation", ignore = true)
    )
    abstract fun softwareVersion(version: SoftwareVersionProtoOrBuilder): EcuSoftwareVersion

    /**
     * Mapping [timestamp] to [LocalDateTime].
     */
    protected fun longToLocalDateTime(timestamp: Long): LocalDateTime = Timestamps.toLocalDateTime(timestamp)

    /**
     * Mapping [datetime] to [Long] timestamp.
     */
    protected fun localDateTimeToLong(datetime: LocalDateTime): Long = Timestamps.toTimestamp(datetime)

    /**
     * Map [status] to [SoftwareInstallationProto.InstallationStatusProto].
     */
    protected fun ecuSoftwareInstallationStatus(status: EcuSoftwareInstallationStatus): InstallationStatusProto =
        InstallationStatusProto.forNumber(status.value)

    /**
     * Map [status] to [EcuSoftwareInstallationStatus].
     */
    fun ecuSoftwareInstallationStatus(status: InstallationStatusProto): EcuSoftwareInstallationStatus =
        EcuSoftwareInstallationStatus.values().first { it.value == status.number }

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [CodeInfoProto] builder.
         */
        fun codeInfoBuilder(): CodeInfoProto.Builder = CodeInfoProto.newBuilder()

        /**
         * Create a [ErrorCodeInfoProto] builder.
         */
        fun errorCodeInfoBuilder(): ErrorCodeInfoProto.Builder = ErrorCodeInfoProto.newBuilder()

        /**
         * Create a [EcuInfoProto] builder.
         */
        fun ecuInfoBuilder(): EcuInfoProto.Builder = EcuInfoProto.newBuilder()

        /**
         * Create a [EcuInfoProto.InterfaceInfo] builder.
         */
        fun ecuInterfaceInfoBuilder(): EcuInfoProto.InterfaceInfo.Builder = EcuInfoProto.InterfaceInfo.newBuilder()

        /**
         * Create a [EcuInfoProto.GatewayInterfaceInfo] builder.
         */
        fun ecuGatewayInterfaceInfoBuilder(): EcuInfoProto.GatewayInterfaceInfo.Builder =
            EcuInfoProto.GatewayInterfaceInfo.newBuilder()

        /**
         * Create a [SoftwareInstallationProto] builder.
         */
        fun softwareInstallationBuilder(): SoftwareInstallationProto.Builder = SoftwareInstallationProto.newBuilder()

        /**
         * Create a [SoftwareProto] builder.
         */
        fun softwareInstallationSoftwareBuilder(): SoftwareProto.Builder =
            SoftwareProto.newBuilder()

        /**
         * Create a [SoftwareVersionProto] builder.
         */
        fun softwareInstallationVersionBuilder(): SoftwareVersionProto.Builder =
            SoftwareVersionProto.newBuilder()
    }
}
