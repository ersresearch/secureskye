/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

// import com.fasterxml.jackson.databind.ObjectMapper
// import com.nhaarman.mockitokotlin2.any
// import com.nhaarman.mockitokotlin2.eq
// import com.nhaarman.mockitokotlin2.only
// import com.nhaarman.mockitokotlin2.verify
// import jp.co.trillium.secureskye.common.configuration.ProtobufConfiguration
// import jp.co.trillium.secureskye.vehicle.admin.service.VehicleService
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
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
// import java.util.UUID
//
// @ExtendWith(SpringExtension::class)
// @WebMvcTest(VehicleController::class)
// class VehicleControllerTest {
//
//    @TestConfiguration
//    @Import(ProtobufConfiguration::class)
//    class TestContextConfiguration
//
//    @Autowired
//    private lateinit var mvc: MockMvc
//
//    @MockBean
//    private lateinit var vehicleService: VehicleService
//
//    private val objectMapper = ObjectMapper()
//
// //    @Test
// //    @WithMockUser
// //    fun `Create a new vehicle`() {
// //        whenever(vehicleService.registerVehicle(any<UUID>(), any())).then {
// //            RegisteredVehicleProto.newBuilder()
// //                .setClientId("client-id")
// //                .build()
// //        }
// //
// //        mvc.perform(
// //            post("/api/vehicles")
// //                .with(csrf())
// //                .contentType(MediaType.APPLICATION_JSON_UTF8)
// //                .content(
// //                    objectMapper.writeValueAsString(
// //                        NewVehicle(
// //                            modelId = UUID.randomUUID(),
// //                            name = "test"
// //                        )
// //                    )
// //                )
// //                .accept(MediaType.APPLICATION_JSON)
// //        )
// //            .andExpect(status().isOk)
// //            .andExpect(jsonPath("$.clientId", equalTo("client-id")))
// //
// //        verify(vehicleService, only()).registerVehicle(any<UUID>(), any())
// //    }
//
//    @Test
//    @WithMockUser
//    fun `Get vehicle by ID`() {
//        val id = UUID.randomUUID()
//        mvc.perform(get("/api/vehicles/{id}", id))
//            .andExpect(status().isOk)
//
//        verify(vehicleService, only()).findVehicle(id)
//    }
//
//    @Test
//    @WithMockUser
//    fun `Get vehicle with invalid UUID fails`() {
//        mvc.perform(get("/api/vehicles/{id}", "test"))
//            .andExpect(status().isInternalServerError)
//    }
//
//    @Test
//    @WithMockUser
//    fun `Get vehicle by client ID`() {
//        mvc.perform(
//            get("/api/vehicles/{id}", "test")
//                .param("clientId", true.toString())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//
//        verify(vehicleService, only()).findVehicleByCliendId(eq("test"))
//    }
//
//    @Test
//    @WithMockUser
//    fun `Rename vehicle`() {
//        mvc.perform(
//            put("/api/vehicles/{id}/rename", UUID.randomUUID())
//                .param("newName", "new")
//                .with(csrf())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//
//        verify(vehicleService, only()).renameVehicle(any(), eq("new"))
//    }
//
//    @Test
//    @WithMockUser
//    fun `Delete vehicle a single vehicle`() {
//        mvc.perform(
//            delete("/api/vehicles/{id}", UUID.randomUUID())
//                .with(csrf())
//        )
//            .andExpect(status().isOk)
//
//        verify(vehicleService, only()).deleteVehicle(any())
//    }
//
// //    @Test
// //    @WithMockUser
// //    fun `List all vehicles`() {
// //        whenever(vehicleService.listVehicles()).thenReturn(
// //            VehicleListProto.newBuilder()
// //                .addData(
// //                    VehicleProto.newBuilder()
// //                        .setName("vehicle-1")
// //                )
// //                .addData(
// //                    VehicleProto.newBuilder()
// //                        .setName("vehicle-2")
// //                )
// //                .build()
// //        )
// //
// //        mvc.perform(
// //            get("/api/vehicles")
// //                .accept(MediaType.APPLICATION_JSON)
// //        )
// //            .andExpect(status().isOk)
// //            .andExpect(jsonPath("$.data.[0].name", equalTo("vehicle-1")))
// //            .andExpect(jsonPath("$.data.[1].name", equalTo("vehicle-2")))
// //
// //        verify(vehicleService, only()).listVehicles()
// //    }
// }