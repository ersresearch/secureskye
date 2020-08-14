/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.ObjectIdMapper
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.ota.vehicle.api.proto.EcuProto
import jp.co.trillium.secureskye.ota.vehicle.api.proto.ImageProto
import jp.co.trillium.secureskye.ota.vehicle.api.proto.MetadataListProto
import jp.co.trillium.secureskye.ota.vehicle.api.proto.MetadataProto
import jp.co.trillium.secureskye.ota.vehicle.model.Ecu
import jp.co.trillium.secureskye.ota.vehicle.model.Image
import jp.co.trillium.secureskye.ota.vehicle.model.Metadata
import org.mapstruct.AfterMapping
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingTarget
import org.mapstruct.Mappings
import org.springframework.stereotype.Component
import java.sql.Timestamp
import java.time.LocalDate

/**
 * Mapper between Protobuf models and database models of vehicle messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [ObjectIdMapper::class, MetadataMapper.BuilderFactory::class, UuidMapper::class]
)
abstract class MetadataMapper {

    companion object {
        const val MILLISECOND_TO_NANOSECOND = 1_000_000
    }

    /**
     * Map [image], [ecu] and [parent] to [Image.Metadata].
     */
    abstract fun imageMetadata(image: Image, ecu: Ecu, parent: Metadata): Image.Metadata

    /**
     * Map image parent [metadata] to [Image.Metadata.Parent].
     */
    abstract fun imageMetadata(metadata: Metadata): Image.Metadata.Parent

    /**
     * Map image ecu [ecu] to [Image.Metadata.Ecu].
     */
    abstract fun imageMetadata(ecu: Ecu): Image.Metadata.Ecu

    /**
     * Map [image] to [ImageProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "checksumBytes", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "urlBytes", ignore = true),
        Mapping(target = "softwareIdBytes", ignore = true),
        Mapping(target = "versionNameBytes", ignore = true),
        Mapping(target = "changelogBytes", ignore = true)
    )
    abstract fun imageBuilder(image: Image): ImageProto.Builder

    /**
     * Map [image] to [ImageProto].
     */
    fun image(image: Image): ImageProto = imageBuilder(image).build()

    /**
     * Map [ecu] to [EcuProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true),
        Mapping(target = "itemsList", ignore = true),
        Mapping(target = "itemsOrBuilderList", ignore = true),
        Mapping(target = "itemsBuilderList", ignore = true)
    )
    abstract fun ecuBuilder(ecu: Ecu): EcuProto.Builder

    /**
     * Map [source] to [target].
     */
    @AfterMapping
    protected fun ecuBuilder(source: Ecu, @MappingTarget target: EcuProto.Builder) {
        target.addAllItems(source.items.map(::image))
    }

    /**
     * Map [ecu] to [EcuProto].
     */
    fun ecu(ecu: Ecu): EcuProto = ecuBuilder(ecu).build()

    /**
     * Map [metadata] to [MetadataProto.Builder].
     */
    @Mappings(
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "statusBytes", ignore = true),
        Mapping(target = "familyBytes", ignore = true),
        Mapping(target = "categoryBytes", ignore = true),
        Mapping(target = "ecusList", ignore = true),
        Mapping(target = "ecusOrBuilderList", ignore = true),
        Mapping(target = "ecusBuilderList", ignore = true)
    )
    abstract fun metadataBuilder(metadata: Metadata): MetadataProto.Builder

    /**
     * Map [metadata] to [MetadataProto].
     */
    fun metadata(metadata: Metadata): MetadataProto = metadataBuilder(metadata)
        .addAllEcus(metadata.ecus.map(::ecu)).build()

    /**
     * Map [metadata] to [MetadataProto].
     */
    private fun metadataSummary(metadata: Metadata): MetadataProto = metadataBuilder(metadata).build()

    /**
     * Map list [metadataList] to [MetadataListProto].
     */
    fun metadataList(metadataList: List<Metadata>): MetadataListProto =
        MetadataListProto.newBuilder().addAllData(metadataList.map(::metadataSummary)).build()

    /**
     * Map [LocalDate] to [Long].
     */
    fun toTimestamp(localDate: LocalDate): Long =
        Timestamp.valueOf(localDate.atStartOfDay()).time * MILLISECOND_TO_NANOSECOND

    /**
     * Map [Long] to [LocalDate].
     */
    fun toLocalDate(value: Long): LocalDate =
        Timestamp(value / MILLISECOND_TO_NANOSECOND).toLocalDateTime().toLocalDate()

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [MetadataProto] builder.
         */
        fun metadataBuilder(): MetadataProto.Builder = MetadataProto.newBuilder()

        /**
         * Create a [EcuProto] builder.
         */
        fun ecuBuilder(): EcuProto.Builder = EcuProto.newBuilder()

        /**
         * Create a [ImageProto] builder.
         */
        fun imageBuilder(): ImageProto.Builder = ImageProto.newBuilder()
    }
}
