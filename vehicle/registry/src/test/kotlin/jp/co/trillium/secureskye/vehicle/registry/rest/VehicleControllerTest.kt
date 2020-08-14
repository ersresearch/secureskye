/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.rest

import jp.co.trillium.secureskye.common.configuration.ProtobufConfiguration
import jp.co.trillium.secureskye.vehicle.registry.service.EcuInfoService
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Import
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get

@ExtendWith(SpringExtension::class)
@WebMvcTest(VehicleController::class)
class VehicleControllerTest {

    @TestConfiguration
    @Import(ProtobufConfiguration::class)
    class TestContextConfiguration

    @Autowired
    private lateinit var mvc: MockMvc

    @MockBean
    private lateinit var ecuInfoService: EcuInfoService

//    @Test
//    @WithMockUser
//    fun `List all ECU information for a vehicle`() {
//        whenever(ecuInfoService.listByVehicle(any())).thenReturn(
//            listOf(
//                EcuInfo(UUID(1, 2)),
//                EcuInfo((UUID(1, 2)))
//            )
//        )
//
//        mvc.perform(
//            get("/api/vehicles/{id}/ecus", UUID.randomUUID())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.ecuInfo.[0].id", equalTo(UUID(1, 1).toString())))
//            .andExpect(jsonPath("$.ecuInfo.[1].id", equalTo(UUID(2, 2).toString())))
//
//        verify(ecuInfoService, only()).listByVehicle(any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `Get single ECU information of a vehicle`() {
//        whenever(ecuInfoService.loadByVehicle(any(), any())).then {
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
//            get("/api/vehicles/{id}/ecus/{ecuId}", UUID.randomUUID(), UUID.randomUUID())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.interfaceInfo.commProtocol", equalTo("LIN")))
//            .andExpect(jsonPath("$.interfaceInfo.messageId", equalTo("test-message")))
//
//        verify(ecuInfoService, only()).loadByVehicle(any(), any())
//    }
}
