/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.mapper

import com.google.protobuf.ByteString
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.message.api.proto.CanBusMessageProto
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.UUID

@ExtendWith(SpringExtension::class)
class MessageMapperTest {

    @TestConfiguration
    @ComponentScan(basePackageClasses = [MessageMapper::class, UuidMapper::class])
    class TestContextConfiguration

    @Autowired
    private lateinit var mapper: MessageMapper

    @Test
    fun `CAN Bus message should be same after mapping`() {
        val message = CanBusMessageProto.newBuilder()
            .setTimestamp(10)
            .setMessageId(20)
            .setData(ByteString.copyFromUtf8("test"))
            .setDlc(4)
            .build()

        val temp = mapper.canBusMessage(UUID(0, 0), message)
        val mapped = mapper.canBusMessage(temp)

        assertThat(mapped).isEqualTo(message)
    }
}