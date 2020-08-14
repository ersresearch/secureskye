/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.mapper

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.registry.api.proto.CodeInfoProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.ErrorCodeInfoProto
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.UUID

@ExtendWith(SpringExtension::class)
class RegistryMapperTest {

    @TestConfiguration
    @ComponentScan(basePackageClasses = [RegistryMapper::class, UuidMapper::class])
    class TestContextConfiguration

    @Autowired
    private lateinit var mapper: RegistryMapper

    @Test
    fun `Code info should be same after mapping`() {
        val model = CodeInfoProto.newBuilder()
            .setId(UUID.randomUUID().toString())
            .setCode(10)
            .setDetail("test")
            .build()

        val temp = mapper.codeInfo(model)
        val mapped = mapper.codeInfo(temp)

        assertThat(mapped).isEqualTo(model)
    }

    @Test
    fun `Error code info should be same after mapping`() {
        val model = ErrorCodeInfoProto.newBuilder()
            .setId(UUID.randomUUID().toString())
            .setIpsVersion("ips-test")
            .setRuleDbStatus(5)
            .setErrorCount(30)
            .addErrorCodes(
                CodeInfoProto.newBuilder()
                    .setId(UUID.randomUUID().toString())
                    .setCode(10)
                    .setDetail("detail-test")
            )
            .build()

        val temp = mapper.errorCodeInfo(model)
        val mapped = mapper.errorCodeInfo(temp)

        assertThat(mapped).isEqualTo(model)
    }

//    @Test
//    fun `ECU info should be same after mapping`() {
//        val model = EcuInfoProto.newBuilder()
//            .setId(UUID.randomUUID().toString())
//            .setSecurityStatus("NORMAL")
//            .setInterfaceInfo(
//                EcuInfoProto.InterfaceInfo.newBuilder()
//                    .setCommProtocol(EcuInfoProto.CommProtocol.LIN)
//                    .setMessageId("message-id-test")
//                    .setEcuId("ecu-id-test")
//                    .setVehicleId(UUID.randomUUID().toString())
//            )
//            .setErrorCode(
//                ErrorCodeInfoProto.newBuilder()
//                    .setId(UUID.randomUUID().toString())
//                    .setIpsVersion("ips-test")
//                    .setRuleDbStatus(2)
//                    .setErrorCount(4)
//                    .addErrorCodes(
//                        CodeInfoProto.newBuilder()
//                            .setId(UUID.randomUUID().toString())
//                            .setCode(8)
//                            .setDetail("detail-test")
//                    )
//            )
//            .build()
//
//        val temp = mapper.ecuInfo(model)
//        val mapped = mapper.ecuInfo(temp, emptyMap())
//
//        assertThat(mapped).isEqualTo(model)
//    }
//
//    @Test
//    fun `Gateway info should be same after mapping`() {
//        val model = GatewayInfoProto.newBuilder()
//            .setId(UUID.randomUUID().toString())
//            .setInterfaceInfo(
//                GatewayInfoProto.InterfaceInfo.newBuilder()
//                    .setCommProtocol(GatewayInfoProto.CommProtocol.SSL)
//                    .setIp("ip-test")
//                    .setEcuId("ecu-id-test")
//                    .setVin("vin-test")
//            )
//            .setErrorCode(
//                ErrorCodeInfoProto.newBuilder()
//                    .setId(UUID.randomUUID().toString())
//                    .setIpsVersion("ips-test")
//                    .setRuleDbStatus(2)
//                    .setErrorCount(4)
//                    .addErrorCodes(
//                        CodeInfoProto.newBuilder()
//                            .setId(UUID.randomUUID().toString())
//                            .setCode(8)
//                            .setDetail("detail-test")
//                    )
//            )
//            .build()
//
//        val temp = mapper.gatewayInfo(UUID.randomUUID(), model)
//        val mapped = mapper.gatewayInfo(temp)
//
//        assertThat(mapped).isEqualTo(model)
//    }

//    @Test
//    fun `Updating an ECU should not change its ID`() {
//        val source = EcuInfoProto.newBuilder()
//            .setId(UUID.randomUUID().toString())
//            .setSecurityStatus("NORMAL")
//            .build()
//        val target = EcuInfo(UUID.randomUUID())
//        val targetCopy = target.copy()
//
//        mapper.update(source, target)
//
//        assertThat(target.id).isEqualTo(targetCopy.id)
//    }

//    @Test
//    fun `Updating a gateway should not change its ID`() {
//        val source = GatewayInfoProto.newBuilder()
//            .setId(UUID.randomUUID().toString())
//            .build()
//        val target = GatewayInfo(UUID.randomUUID())
//        val targetCopy = target.copy()
//
//        mapper.update(source, target)
//
//        assertThat(target.id).isEqualTo(targetCopy.id)
//    }
}