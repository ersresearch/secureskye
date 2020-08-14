/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.service

import com.nhaarman.mockitokotlin2.any
import com.nhaarman.mockitokotlin2.eq
import com.nhaarman.mockitokotlin2.times
import com.nhaarman.mockitokotlin2.verify
import com.nhaarman.mockitokotlin2.whenever
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.CanBusMessageProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.MessageBatchProto
import jp.co.trillium.secureskye.vehicle.message.feign.VehicleAdminClient
import jp.co.trillium.secureskye.vehicle.message.mapper.MessageMapper
import jp.co.trillium.secureskye.vehicle.message.model.CanBusMessage
import jp.co.trillium.secureskye.vehicle.message.repository.CanBusMessageRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.time.LocalDateTime
import java.util.UUID

@ExtendWith(SpringExtension::class)
class MessageServiceTest {

    @TestConfiguration
    @ComponentScan(basePackageClasses = [MessageMapper::class, UuidMapper::class])
    class TestContextConfiguration {
        @Bean
        fun messageService(
            messageMapper: MessageMapper,
            uuidMapper: UuidMapper,
            canBusMessageRepository: CanBusMessageRepository,
            vehicleAdminClient: VehicleAdminClient
        ) =
            MessageService(
                messageMapper,
                uuidMapper,
                canBusMessageRepository,
                vehicleAdminClient
            )
    }

    @Autowired
    private lateinit var messageService: MessageService

    @MockBean
    private lateinit var canBusMessageRepository: CanBusMessageRepository

    @MockBean
    private lateinit var vehicleAdminClient: VehicleAdminClient

    @Test
    fun `Saving messages calls the repository`() {
        whenever(vehicleAdminClient.getVehicle(any(), any())).thenReturn(
            VehicleProto.newBuilder()
                .setId(UUID.randomUUID().toString())
                .build()
        )

        messageService.saveMessages(
            "test", MessageBatchProto.newBuilder()
                .addCanBus(
                    CanBusMessageProto.newBuilder()
                        .setTimestamp(10)
                )
                .build()
        )

        verify(vehicleAdminClient, times(1)).getVehicle(any(), eq(true))
        verify(canBusMessageRepository, times(1)).saveAll(any<List<CanBusMessage>>())
    }

    @Test
    fun `Listing messages of a vehicle calls the repository`() {
        val ts = LocalDateTime.now()
        whenever(canBusMessageRepository.findLatestLimit(any(), any())).thenReturn(
            listOf(CanBusMessage(timestamp = ts), CanBusMessage(timestamp = ts))
        )

        val messages = messageService.listMessages(UUID.randomUUID(), null, 5)

        assertThat(messages.canBusList).hasSize(2).allSatisfy {
            assertThat(it.timestamp).isEqualTo(Timestamps.toTimestamp(ts))
        }

        verify(canBusMessageRepository, times(1)).findLatestLimit(any(), eq(5))
    }
}