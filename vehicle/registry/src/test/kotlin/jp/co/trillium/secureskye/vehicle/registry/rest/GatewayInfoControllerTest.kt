/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.rest

// import com.nhaarman.mockitokotlin2.any
// import com.nhaarman.mockitokotlin2.only
// import com.nhaarman.mockitokotlin2.verify
// import com.nhaarman.mockitokotlin2.whenever
// import jp.co.trillium.secureskye.common.configuration.ProtobufConfiguration
// import org.hamcrest.CoreMatchers.equalTo
// import org.junit.jupiter.api.Test
// import org.junit.jupiter.api.extension.ExtendWith
// import org.springframework.beans.factory.annotation.Autowired
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
// import org.springframework.boot.test.context.TestConfiguration
// import org.springframework.boot.test.mock.mockito.MockBean
// import org.springframework.context.annotation.Import
// import org.springframework.http.MediaType
// import org.springframework.security.test.context.support.WithMockUser
// import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
// import org.springframework.test.context.junit.jupiter.SpringExtension
// import org.springframework.test.web.servlet.MockMvc
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
// import java.util.UUID
//
// @ExtendWith(SpringExtension::class)
// @WebMvcTest(GatewayInfoController::class)
// class GatewayInfoControllerTest {
//
//    @TestConfiguration
//    @Import(ProtobufConfiguration::class)
//    class TestContextConfiguration
//
//    @Autowired
//    private lateinit var mvc: MockMvc
//
//    @MockBean
//    private lateinit var gatewayInfoService: GatewayInfoService
//
//    @Test
//    @WithMockUser
//    fun `Create new gateway information`() {
//        whenever(gatewayInfoService.save(any(), any())).then {
//            it.getArgument<GatewayInfoProto>(1).toBuilder()
//                .setId(UUID.randomUUID().toString())
//                .build()
//        }
//
//        mvc.perform(
//            post("/api/vehicles/gateways")
//                .with(csrf())
//                .content(
//                    GatewayInfoProto.newBuilder()
//                        .setId(UUID.randomUUID().toString())
//                        .setInterfaceInfo(
//                            GatewayInfoProto.InterfaceInfo.newBuilder()
//                                .setCommProtocol(GatewayInfoProto.CommProtocol.HTTPS)
//                                .setVin("test")
//                        )
//                        .build()
//                        .toByteArray()
//                )
//                .contentType("application/x-protobuf")
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.interfaceInfo.commProtocol", equalTo("HTTPS")))
//            .andExpect(jsonPath("$.interfaceInfo.vin", equalTo("test")))
//
//        verify(gatewayInfoService, only()).save(any(), any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `Update existing gateway information`() {
//        whenever(gatewayInfoService.update(any(), any())).then {
//            it.getArgument(1)
//        }
//
//        mvc.perform(
//            put("/api/vehicles/gateways/{id}", UUID.randomUUID())
//                .with(csrf())
//                .content(
//                    GatewayInfoProto.newBuilder()
//                        .setInterfaceInfo(
//                            GatewayInfoProto.InterfaceInfo.newBuilder()
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
//        verify(gatewayInfoService, only()).update(any(), any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `Delete existing gateway information`() {
//        mvc.perform(
//            delete("/api/vehicles/gateways/{id}", UUID.randomUUID())
//                .with(csrf())
//        )
//            .andExpect(status().isOk)
//
//        verify(gatewayInfoService, only()).delete(any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `Get existing gateway information`() {
//        whenever(gatewayInfoService.load(any())).then {
//            GatewayInfoProto.newBuilder()
//                .setId(it.getArgument<UUID>(0).toString())
//                .setInterfaceInfo(
//                    GatewayInfoProto.InterfaceInfo.newBuilder()
//                        .setCommProtocol(GatewayInfoProto.CommProtocol.HTTPS)
//                        .setVin("test")
//                )
//                .build()
//        }
//
//        mvc.perform(
//            get("/api/vehicles/gateways/{id}", UUID.randomUUID())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.interfaceInfo.commProtocol", equalTo("HTTPS")))
//            .andExpect(jsonPath("$.interfaceInfo.vin", equalTo("test")))
//
//        verify(gatewayInfoService, only()).load(any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `List all gateway information`() {
//        whenever(gatewayInfoService.list()).thenReturn(
//            GatewayInfoListProto.newBuilder()
//                .addGatewayInfo(
//                    GatewayInfoProto.newBuilder()
//                        .setId(UUID(1, 1).toString())
//                )
//                .addGatewayInfo(
//                    GatewayInfoProto.newBuilder()
//                        .setId(UUID(2, 2).toString())
//                )
//                .build()
//        )
//
//        mvc.perform(
//            get("/api/vehicles/gateways")
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.gatewayInfo.[0].id", equalTo(UUID(1, 1).toString())))
//            .andExpect(jsonPath("$.gatewayInfo.[1].id", equalTo(UUID(2, 2).toString())))
//
//        verify(gatewayInfoService, only()).list()
//    }
// }
