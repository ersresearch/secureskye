/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.mapper

// import jp.co.trillium.secureskye.common.mapper.UuidMapper
// import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
// import jp.co.trillium.secureskye.vehicle.admin.model.Vehicle
// import jp.co.trillium.secureskye.vehicle.admin.model.VehicleModel
// import org.assertj.core.api.Assertions.assertThat
// import org.junit.jupiter.api.Test
// import org.junit.jupiter.api.extension.ExtendWith
// import org.springframework.beans.factory.annotation.Autowired
// import org.springframework.boot.test.context.TestConfiguration
// import org.springframework.context.annotation.ComponentScan
// import org.springframework.test.context.junit.jupiter.SpringExtension
// import java.util.UUID
//
// @ExtendWith(SpringExtension::class)
// class VehicleMapperTest {
//
//    @TestConfiguration
//    @ComponentScan(basePackageClasses = [VehicleMapper::class, UuidMapper::class])
//    class TestContextConfiguration
//
//    @Autowired
//    private lateinit var mapper: VehicleMapper
//
//    @Test
//    fun `Vehicle should be same after mapping`() {
//        val vehicle = Vehicle(
//            id = UUID.randomUUID(),
//            model = VehicleModel(
//                id = UUID.randomUUID(),
//                name = "test-model"
//            ),
//            name = "test"
//        )
//
//        val mapped = mapper.vehicle(vehicle)
//
//        assertThat(mapped.id).isEqualTo(vehicle.id.toString())
//        assertThat(mapped.modelId).isEqualTo(vehicle.model.id.toString())
//        assertThat(mapped.modelName).isEqualTo(vehicle.model.name)
//        assertThat(mapped.name).isEqualTo(vehicle.name)
//    }
//
//    @Test
//    fun `Vehicle should contain 2FA status after mapping`() {
//        val vehicle = Vehicle(UUID.randomUUID())
//
//        val mapped = mapper.vehicle(vehicle, TwoFactorAuthenticationStatusProto.ENABLED)
//
//        assertThat(mapped.id).isEqualTo(vehicle.id.toString())
//        assertThat(mapped.tfa).isEqualTo(TwoFactorAuthenticationStatusProto.ENABLED)
//    }
//
//    @Test
//    fun `Vehicle list should be same after mapping`() {
//        val vehicles = listOf(
//            Vehicle(
//                id = UUID.randomUUID(),
//                model = VehicleModel(
//                    id = UUID.randomUUID(),
//                    name = "test-model"
//                ),
//                name = "test"
//            )
//        )
//
//        val mapped = mapper.vehicleList(vehicles)
//
//        assertThat(mapped.dataList).hasSize(1).allSatisfy {
//            assertThat(it).isEqualToComparingOnlyGivenFields(vehicles.first())
//        }
//    }
//
//    @Test
//    fun `Registered vehicle should be same after mapping`() {
//        val vehicle = Vehicle(
//            id = UUID.randomUUID(),
//            clientId = "client-id"
//        )
//
//        val mapped = mapper.registeredVehicle(vehicle)
//
//        assertThat(mapped.vehicle.id).isEqualTo(vehicle.id.toString())
//        assertThat(mapped.clientId).isEqualTo(vehicle.clientId)
//    }
// }