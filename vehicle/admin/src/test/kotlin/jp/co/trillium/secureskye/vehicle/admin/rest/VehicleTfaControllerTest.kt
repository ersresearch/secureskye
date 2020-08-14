/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

// import com.nhaarman.mockitokotlin2.any
// import com.nhaarman.mockitokotlin2.eq
// import com.nhaarman.mockitokotlin2.inOrder
// import com.nhaarman.mockitokotlin2.times
// import com.nhaarman.mockitokotlin2.whenever
// import jp.co.trillium.secureskye.common.configuration.ProtobufConfiguration
// import jp.co.trillium.secureskye.oauth.model.OauthTotpProto
// import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
// import jp.co.trillium.secureskye.vehicle.admin.feign.UaaClient
// import jp.co.trillium.secureskye.vehicle.admin.service.VehicleService
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
// @WebMvcTest(VehicleTfaController::class)
// class VehicleTfaControllerTest {
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
//    @MockBean
//    private lateinit var uaaClient: UaaClient
//
//    @Test
//    @WithMockUser
//    fun `Unregister 2FA via scratch code`() {
//        whenever(vehicleService.getVehicleClientId(any())).thenReturn("test")
//
//        mvc.perform(
//            delete("/api/vehicles/{id}/2fa", UUID.randomUUID())
//                .param("scratchCode", 3.toString())
//                .with(csrf())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//
//        inOrder(vehicleService, uaaClient) {
//            verify(vehicleService, times(1)).getVehicleClientId(any())
//            verify(uaaClient, times(1)).unregisterViaScratchCode(
//                any(), eq(3)
//            )
//            verifyNoMoreInteractions()
//        }
//    }
//
//    @Test
//    @WithMockUser
//    fun `Unregister 2FA with OTP`() {
//        whenever(vehicleService.getVehicleClientId(any())).thenReturn("test")
//
//        mvc.perform(
//            delete("/api/vehicles/{id}/2fa", UUID.randomUUID())
//                .param("otp", 123.toString())
//                .with(csrf())
//        )
//            .andExpect(status().isOk)
//
//        inOrder(vehicleService, uaaClient) {
//            verify(vehicleService, times(1)).getVehicleClientId(any())
//            verify(uaaClient, times(1)).unregister(
//                any(), eq(123)
//            )
//            verifyNoMoreInteractions()
//        }
//    }
//
//    @Test
//    @WithMockUser
//    fun `Unregister 2FA after disabling in the vehicle model`() {
//        whenever(vehicleService.getVehicleClientId(any())).thenReturn("test")
//
//        mvc.perform(
//            delete("/api/vehicles/{id}/2fa", UUID.randomUUID())
//                .with(csrf())
//        )
//            .andExpect(status().isOk)
//
//        inOrder(vehicleService, uaaClient) {
//            verify(vehicleService, times(1)).getVehicleClientId(any())
//            verify(uaaClient, times(1)).unregisterDisabled(any())
//            verifyNoMoreInteractions()
//        }
//    }
//
//    @Test
//    @WithMockUser
//    fun `Register 2FA for a vehicle`() {
//        val group = UUID.randomUUID()
//
//        whenever(vehicleService.getVehicleClientId(any())).thenReturn("test")
//        whenever(uaaClient.register(any(), any())).thenReturn(
//            OauthTotpProto.newBuilder()
//                .setOauthId("test")
//                .setOauthGroup(group.toString())
//                .build()
//        )
//
//        mvc.perform(
//            post("/api/vehicles/{id}/2fa", UUID.randomUUID())
//                .param("oauthGroup", group.toString())
//                .with(csrf())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.oauthId", equalTo("test")))
//            .andExpect(jsonPath(("$.oauthGroup"), equalTo(group.toString())))
//
//        inOrder(vehicleService, uaaClient) {
//            verify(vehicleService, times(1)).getVehicleClientId(any())
//            verify(uaaClient, times(1)).register(eq("test"), eq(group))
//            verifyNoMoreInteractions()
//        }
//    }
//
//    @Test
//    @WithMockUser
//    fun `Confirm 2FA for a vehicle`() {
//        whenever(vehicleService.getVehicleClientId(any())).thenReturn("test")
//        whenever(uaaClient.registerConfirm(any(), any())).thenReturn(TwoFactorAuthenticationStatusProto.ENABLED)
//
//        mvc.perform(
//            put("/api/vehicles/{id}/2fa", UUID.randomUUID())
//                .param("otp", 123.toString())
//                .with(csrf())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$", equalTo(TwoFactorAuthenticationStatusProto.ENABLED.toString())))
//
//        inOrder(vehicleService, uaaClient) {
//            verify(vehicleService, times(1)).getVehicleClientId(any())
//            verify(uaaClient, times(1)).registerConfirm(eq("test"), eq(123))
//            verifyNoMoreInteractions()
//        }
//    }
//
//    @Test
//    @WithMockUser
//    fun `Get 2FA information for a vehicle`() {
//        whenever(vehicleService.getVehicleClientId(any())).thenReturn("client-id")
//        whenever(uaaClient.getPendingInfo(any())).thenReturn(
//            OauthTotpProto.newBuilder()
//                .setOauthId("client-id")
//                .build()
//        )
//
//        mvc.perform(
//            get("/api/vehicles/{id}/2fa", UUID.randomUUID())
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//            .andExpect(jsonPath("$.oauthId", equalTo("client-id")))
//
//        inOrder(vehicleService, uaaClient) {
//            verify(vehicleService, times(1)).getVehicleClientId(any())
//            verify(uaaClient, times(1)).getPendingInfo(any())
//            verifyNoMoreInteractions()
//        }
//    }
// }