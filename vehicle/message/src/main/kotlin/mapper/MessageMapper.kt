/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.mapper

import com.google.protobuf.ByteString
import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.TimestampMapper
import jp.co.trillium.secureskye.vehicle.message.api.proto.CanBusMessageProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.CanBusMessageProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.model.CanBusMessage
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.springframework.stereotype.Component
import java.util.UUID

/**
 * Mapper between Protobuf models and database models of vehicle messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [TimestampMapper::class, MessageMapper.BuilderFactory::class]
)
abstract class MessageMapper {

    /**
     * Map [id] and [message] to [CanBusMessage].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "systemTimestamp", ignore = true),
        Mapping(target = "vehicleId", source = "id"),
        Mapping(target = "timestamp", source = "message.timestamp")
    )
    abstract fun canBusMessage(id: UUID, message: CanBusMessageProtoOrBuilder): CanBusMessage

    /**
     * Map [message] to [CanBusMessageProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun canBusMessageBuilder(message: CanBusMessage): CanBusMessageProto.Builder

    /**
     * Map [message] to [CanBusMessageProto].
     */
    fun canBusMessage(message: CanBusMessage): CanBusMessageProto = canBusMessageBuilder(message).build()

    /**
     * Map [bytes] to [ByteArray].
     */
    protected fun byteString(bytes: ByteString): ByteArray = bytes.toByteArray()

    /**
     * Map [bytes] to [ByteString].
     */
    protected fun byteString(bytes: ByteArray): ByteString = ByteString.copyFrom(bytes)

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [CanBusMessageProto] builder.
         */
        fun canBusMessageBuilder(): CanBusMessageProto.Builder = CanBusMessageProto.newBuilder()
    }
}
