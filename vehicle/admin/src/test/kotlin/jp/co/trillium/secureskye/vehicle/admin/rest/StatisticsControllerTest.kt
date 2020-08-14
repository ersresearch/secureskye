/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.rest

// import com.nhaarman.mockitokotlin2.only
// import com.nhaarman.mockitokotlin2.verify
// import com.nhaarman.mockitokotlin2.whenever
// import jp.co.trillium.secureskye.common.configuration.ProtobufConfiguration
// import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleStatisticsProto
// import jp.co.trillium.secureskye.vehicle.admin.service.VehicleConnectionService
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
// import org.springframework.test.context.junit.jupiter.SpringExtension
// import org.springframework.test.web.servlet.MockMvc
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
//
// @ExtendWith(SpringExtension::class)
// @WebMvcTest(StatisticsController::class)
// class StatisticsControllerTest {
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
//    private lateinit var vehicleConnectionService: VehicleConnectionService
//
//    @Test
//    @WithMockUser
//    fun `Get vehicle statistics`() {
//        whenever(vehicleService.statistics()).thenReturn(VehicleStatisticsProto.getDefaultInstance())
//
//        mvc.perform(
//            get("/api/vehicles/statistics")
//                .accept(MediaType.APPLICATION_JSON)
//        )
//            .andExpect(status().isOk)
//
//        verify(vehicleService, only()).statistics()
//    }
// }