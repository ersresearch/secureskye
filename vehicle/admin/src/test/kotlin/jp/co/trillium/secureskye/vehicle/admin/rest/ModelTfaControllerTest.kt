/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

// import com.nhaarman.mockitokotlin2.any
// import com.nhaarman.mockitokotlin2.only
// import com.nhaarman.mockitokotlin2.verify
// import com.nhaarman.mockitokotlin2.whenever
// import jp.co.trillium.secureskye.common.configuration.ProtobufConfiguration
// import jp.co.trillium.secureskye.oauth.model.OauthTotpListProto
// import jp.co.trillium.secureskye.oauth.model.OauthTotpProto
// import jp.co.trillium.secureskye.vehicle.admin.feign.UaaClient
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
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
// import java.util.UUID
//
// @ExtendWith(SpringExtension::class)
// @WebMvcTest(ModelTfaController::class)
// class ModelTfaControllerTest {
//
//    @TestConfiguration
//    @Import(ProtobufConfiguration::class)
//    class TestContextConfiguration
//
//    @Autowired
//    private lateinit var mvc: MockMvc
//
//    @MockBean
//    private lateinit var uaaClient: UaaClient
//
//    @Test
//    @WithMockUser
//    fun `Get 2FA secrets of all vehicles of a model`() {
//        whenever(uaaClient.getTotpSecretList(any())).thenReturn(
//            OauthTotpListProto.newBuilder()
//                .addData(
//                    OauthTotpProto.newBuilder()
//                        .setOauthId("oauth-1")
//                )
//                .addData(
//                    OauthTotpProto.newBuilder()
//                        .setOauthId("oauth-2")
//                )
//                .build()
//        )
//
//        mvc.perform(
//            get("/api/vehicles/models/{id}/2fa", UUID.randomUUID())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.data.[0].oauthId", equalTo("oauth-1")))
//            .andExpect(jsonPath("$.data.[1].oauthId", equalTo("oauth-2")))
//
//        verify(uaaClient, only()).getTotpSecretList(any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `Update all 2FA for vehicles belonging to the model`() {
//        whenever(uaaClient.updateTotpSecretList(any(), any())).then {
//            it.getArgument(1)
//        }
//
//        mvc.perform(
//            put("/api/vehicles/models/{id}/2fa", UUID.randomUUID())
//                .with(csrf())
//                .contentType("application/x-protobuf")
//                .content(
//                    OauthTotpListProto.newBuilder()
//                        .addData(
//                            OauthTotpProto.newBuilder()
//                                .setOauthId("oauth-id")
//                        )
//                        .build()
//                        .toByteArray()
//                )
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.data.[0].oauthId", equalTo("oauth-id")))
//
//        verify(uaaClient, only()).updateTotpSecretList(any(), any())
//    }
//
//    @Test
//    @WithMockUser
//    fun `Disable 2FA for model and all assigned vehicles`() {
//        mvc.perform(
//            delete("/api/vehicles/models/{id}/2fa", UUID.randomUUID())
//                .with(csrf())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//
//        verify(uaaClient, only()).disable2FactorAuthenticationForGroup(any())
//    }
// }