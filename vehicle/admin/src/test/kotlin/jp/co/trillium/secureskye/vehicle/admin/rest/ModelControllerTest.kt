/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

// import com.nhaarman.mockitokotlin2.any
// import com.nhaarman.mockitokotlin2.only
// import com.nhaarman.mockitokotlin2.verify
// import com.nhaarman.mockitokotlin2.whenever
// import jp.co.trillium.secureskye.common.configuration.ProtobufConfiguration
// import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleModelListProto
// import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleModelProto
// import jp.co.trillium.secureskye.vehicle.admin.mapper.ModelMapper
// import jp.co.trillium.secureskye.vehicle.admin.service.ModelService
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
// @WebMvcTest(ModelController::class)
// class ModelControllerTest {
//
//    @TestConfiguration
//    @Import(ProtobufConfiguration::class)
//    class TestContextConfiguration
//
//    @Autowired
//    private lateinit var mvc: MockMvc
//
//    @MockBean
//    private lateinit var modelService: ModelService
//
//    @MockBean
//    private lateinit var modelMapper: ModelMapper
//
//    @Test
//    @WithMockUser
//    fun `Create a new model`() {
//        val valueProto = VehicleModelProto.newBuilder()
//            .setId(UUID.randomUUID().toString())
//            .setName("test")
//            .build()
//        whenever(modelService.createModel(any())).then {
//            valueProto
//        }
//
//        mvc.perform(
//            post("/api/vehicles/models")
//                .with(csrf())
//                .contentType("application/x-protobuf")
//                .content(
//                    VehicleModelProto.newBuilder()
//                        .setName("test")
//                        .build()
//                        .toByteArray()
//                )
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.name", equalTo("test")))
//
//        verify(modelService, only()).createModel(any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `Update an existing model`() {
//        whenever(modelService.update(any(), any())).then {
//            it.getArgument(1)
//        }
//
//        mvc.perform(
//            put("/api/vehicles/models/{id}", UUID.randomUUID())
//                .with(csrf())
//                .contentType("application/x-protobuf")
//                .content(
//                    VehicleModelProto.newBuilder()
//                        .setName("test")
//                        .build()
//                        .toByteArray()
//                )
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.name", equalTo("test")))
//
//        verify(modelService, only()).update(any(), any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `Delete an existing model`() {
//        mvc.perform(
//            delete("/api/vehicles/models/{id}", UUID.randomUUID())
//                .with(csrf())
//        )
//            .andExpect(status().isOk)
//
//        verify(modelService, only()).deleteModel(any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `Get an existing model`() {
//        whenever(modelService.findModel(any())).then {
//            val id = it.getArgument<UUID>(0)
//            VehicleModelProto.newBuilder()
//                .setId(id.toString())
//                .setName("test")
//                .build()
//        }
//
//        mvc.perform(
//            get("/api/vehicles/models/{id}", UUID.randomUUID())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.name", equalTo("test")))
//
//        verify(modelService, only()).findModel(any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `List all models`() {
//        whenever(modelService.listAllModels()).thenReturn(
//            VehicleModelListProto.newBuilder()
//                .addModel(
//                    VehicleModelProto.newBuilder()
//                        .setName("test-1")
//                )
//                .addModel(
//                    VehicleModelProto.newBuilder()
//                        .setName("test-2")
//                )
//                .build()
//        )
//
//        mvc.perform(
//            get("/api/vehicles/models")
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.model.[0].name", equalTo("test-1")))
//            .andExpect(jsonPath("$.model.[1].name", equalTo("test-2")))
//    }
// }