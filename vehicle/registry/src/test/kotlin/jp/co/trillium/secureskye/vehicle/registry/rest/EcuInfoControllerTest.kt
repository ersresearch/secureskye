/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.rest

import com.nhaarman.mockitokotlin2.any
import com.nhaarman.mockitokotlin2.only
import com.nhaarman.mockitokotlin2.verify
import jp.co.trillium.secureskye.common.configuration.ProtobufConfiguration
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.registry.mapper.RegistryMapper
import jp.co.trillium.secureskye.vehicle.registry.service.EcuInfoService
import jp.co.trillium.secureskye.vehicle.registry.service.EcuSoftwareService
import org.codehaus.jackson.map.ObjectMapper
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Import
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.util.UUID

@ExtendWith(SpringExtension::class)
@WebMvcTest(EcuInfoController::class)
class EcuInfoControllerTest {

    @TestConfiguration
    @Import(ProtobufConfiguration::class)
    class TestContextConfiguration

    @Autowired
    private lateinit var mvc: MockMvc

    @MockBean
    private lateinit var ecuInfoService: EcuInfoService

    @MockBean
    private lateinit var registryMapper: RegistryMapper

    @MockBean
    private lateinit var ecuSoftwareService: EcuSoftwareService

    @MockBean
    private lateinit var objectMapper: ObjectMapper

    @MockBean
    private lateinit var uuidMapper: UuidMapper

//    @Test
//    @WithMockUser
//    fun `Create new ECU information`() {
//        whenever(ecuInfoService.save(any())).then {
//            it.getArgument(0)
//        }
//
//        mvc.perform(
//            post("/api/vehicles/ecus")
//                .with(csrf())
//                .content(
//                    EcuInfoProto.newBuilder()
//                        .setId(UUID.randomUUID().toString())
//                        .setInterfaceInfo(
//                            EcuInfoProto.InterfaceInfo.newBuilder()
//                                .setCommProtocol(EcuInfoProto.CommProtocol.LIN)
//                                .setMessageId("test")
//                        )
//                        .build()
//                        .toByteArray()
//                )
//                .contentType("application/x-protobuf")
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.interfaceInfo.commProtocol", equalTo("LIN")))
//            .andExpect(jsonPath("$.interfaceInfo.messageId", equalTo("test")))
//
//        verify(ecuInfoService, only()).save(any())
//    }

//    @Test
//    @WithMockUser
//    fun `Update existing ECU information`() {
//        whenever(ecuInfoService.update(any(), any())).then {
//            it.getArgument(1)
//        }
//
//        mvc.perform(
//            put("/api/vehicles/ecus/{id}", UUID.randomUUID())
//                .with(csrf())
//                .content(
//                    EcuInfoProto.newBuilder()
//                        .setInterfaceInfo(
//                            EcuInfoProto.InterfaceInfo.newBuilder()
//                                .setEcuId("test")
//                        )
//                        .build()
//                        .toByteArray()
//                )
//                .contentType("application/x-protobuf")
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.interfaceInfo.ecuId", equalTo("test")))
//
//        verify(ecuInfoService, only()).update(any(), any())
//    }

    @Test
    @WithMockUser
    fun `Delete existing ECU information`() {
        mvc.perform(
            delete("/api/vehicles/ecus/{id}", UUID.randomUUID())
                .with(csrf())
        )
            .andExpect(status().isOk)

        verify(ecuInfoService, only()).delete(any())
    }

//    @Test
//    @WithMockUser
//    fun `Get existing ECU information`() {
//        whenever(ecuInfoService.load(any())).then {
//            EcuInfoProto.newBuilder()
//                .setId(it.getArgument<UUID>(0).toString())
//                .setInterfaceInfo(
//                    EcuInfoProto.InterfaceInfo.newBuilder()
//                        .setCommProtocol(EcuInfoProto.CommProtocol.LIN)
//                        .setMessageId("test-message")
//                )
//                .build()
//        }
//
//        mvc.perform(
//            get("/api/vehicles/ecus/{id}", UUID.randomUUID())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.interfaceInfo.commProtocol", equalTo("LIN")))
//            .andExpect(jsonPath("$.interfaceInfo.messageId", equalTo("test-message")))
//
//        verify(ecuInfoService, only()).load(any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `List all ECU information`() {
//        whenever(ecuInfoService.list()).thenReturn(
//            EcuInfoListProto.newBuilder()
//                .addEcuInfo(
//                    EcuInfoProto.newBuilder()
//                        .setId(UUID(1, 1).toString())
//                )
//                .addEcuInfo(
//                    EcuInfoProto.newBuilder()
//                        .setId(UUID(2, 2).toString())
//                )
//                .build()
//        )
//
//        mvc.perform(
//            get("/api/vehicles/ecus")
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.ecuInfo.[0].id", equalTo(UUID(1, 1).toString())))
//            .andExpect(jsonPath("$.ecuInfo.[1].id", equalTo(UUID(2, 2).toString())))
//
//        verify(ecuInfoService, only()).list()
//    }
}
