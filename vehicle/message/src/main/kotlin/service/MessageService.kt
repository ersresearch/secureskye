/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.message.api.proto.MessageBatchProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.MessageBatchProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.feign.VehicleAdminClient
import jp.co.trillium.secureskye.vehicle.message.mapper.MessageMapper
import jp.co.trillium.secureskye.vehicle.message.model.EventEntity
import jp.co.trillium.secureskye.vehicle.message.repository.CanBusMessageRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * Business logic for vehicle messages.
 */
@Service
class MessageService(
    private val messageMapper: MessageMapper,
    private val uuidMapper: UuidMapper,
    private val canBusMessageRepository: CanBusMessageRepository,
    private val vehicleAdminClient: VehicleAdminClient
) {

    /**
     * Store a [batch] of several vehicle messages belonging to the vehicle with [clientId] in the database.
     */
    @Transactional
    fun saveMessages(clientId: String, batch: MessageBatchProtoOrBuilder) {
        val id = loadVehicleId(clientId)

        canBusMessageRepository.saveAll(batch.canBusOrBuilderList.map {
            messageMapper.canBusMessage(id, it)
        })
    }

    /**
     * Load the most recent [limit] messages of each event type for the given [vehicleId] [sinceTime]. If [sinceTime]
     * is null, the very latest events are listed instead.
     */
    fun listMessages(vehicleId: UUID, sinceTime: Long?, limit: Int): MessageBatchProto {
        val canBusMessages = if (sinceTime != null && sinceTime > 0)
            canBusMessageRepository.findLatestSince(vehicleId, Timestamps.toLocalDateTime(sinceTime))
        else
            canBusMessageRepository.findLatestLimit(vehicleId, limit)

        return MessageBatchProto.newBuilder()
            .setTimeRange(eventTimeRange(canBusMessages))
            .addAllCanBus(canBusMessages.map(messageMapper::canBusMessage))
            .build()
    }

    /**
     * Load the vehicle ID for the given [clientId] to associate events to it.
     */
    @Cacheable("client-id-to-vehicle-id")
    private fun loadVehicleId(clientId: String) =
        uuidMapper.uuidString(vehicleAdminClient.getVehicle(clientId, true).id)

    /**
     * Calculate the time range of all [events].
     */
    private fun eventTimeRange(events: Iterable<EventEntity>): MessageBatchProto.TimeRange {
        val since = events.lastOrNull()?.systemTimestamp
        val until = events.firstOrNull()?.systemTimestamp
        return MessageBatchProto.TimeRange.newBuilder()
            .setSince(since?.let(Timestamps::toTimestamp) ?: 0)
            .setUntil(until?.let(Timestamps::toTimestamp) ?: Timestamps.now())
            .build()
    }
}
