/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.mapper

// import jp.co.trillium.secureskye.common.mapper.UuidMapper
// import jp.co.trillium.secureskye.oauth.model.OauthTotpProto
// import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
// import jp.co.trillium.secureskye.vehicle.admin.api.proto.ModelDisplaySettingsProto
// import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleMakerProto
// import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleModelProto
// import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleOauthTotpProto
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
// class ModelMapperTest {
//
//    @TestConfiguration
//    @ComponentScan(basePackageClasses = [ModelMapper::class, UuidMapper::class])
//    class TestContextConfiguration
//
//    @Autowired
//    private lateinit var mapper: ModelMapper
//
//    @Test
//    fun `Vehicle model should be same after mapping`() {
//        val model = VehicleModelProto.newBuilder()
//            .setId(UUID.randomUUID().toString())
//            .setName("test")
//            .setMaker(VehicleMakerProto.newBuilder().setId(UUID.randomUUID().toString()))
//            .setDisplaySettings(ModelDisplaySettingsProto.newBuilder().setId(UUID.randomUUID().toString()))
//            .build()
//
//        val temp = mapper.vehicleModel(model)
//        val mapped = mapper.vehicleModel(temp)
//
//        assertThat(mapped).isEqualTo(model)
//    }
//
//    @Test
//    fun `Vehicle model list should be same after mapping`() {
//        val models = listOf(
//            VehicleModel(
//                id = UUID.randomUUID(),
//                name = "test"
//            )
//        )
//
//        val mapped = mapper.vehicleModelList(models)
//
//        assertThat(mapped.modelList).hasSize(1).allSatisfy {
//            assertThat(it).isEqualToComparingOnlyGivenFields(models.first())
//        }
//    }
//
//    @Test
//    fun `OAuth details in Protobuf message of Vehicle model should ignored`() {
//        val model = VehicleModelProto.newBuilder()
//            .setId(UUID.randomUUID().toString())
//            .setName("test")
//            .setMaker(VehicleMakerProto.newBuilder().setId(UUID.randomUUID().toString()))
//            .setDisplaySettings(ModelDisplaySettingsProto.newBuilder().setId(UUID.randomUUID().toString()))
//        val modelWithOauth = model.clone()
//            .setVehicle2FaStatus(TwoFactorAuthenticationStatusProto.ENABLED)
//            .addVehicle2Fa(
//                VehicleOauthTotpProto.newBuilder()
//                    .setVehicleId(UUID.randomUUID().toString())
//                    .setVehicleName("test-vehicle")
//                    .setOauthTotp(
//                        OauthTotpProto.newBuilder()
//                            .setOauthId("oauth-id")
//                            .setOauthGroup("oauth-group")
//                            .setSecret("secret")
//                            .setRecoveryCode1(1)
//                            .setRecoveryCode2(2)
//                            .setRecoveryCode3(3)
//                            .setRecoveryCode4(4)
//                            .setRecoveryCode5(5)
//                            .setEnabled(true)
//                            .setOtpAuthUri("http://test")
//                    )
//                    .setStatus(TwoFactorAuthenticationStatusProto.PENDING)
//            )
//            .build()
//
//        val temp = mapper.vehicleModel(modelWithOauth)
//        val mapped = mapper.vehicleModel(temp)
//
//        assertThat(mapped).isEqualTo(model.build())
//    }
//
//    @Test
//    fun `OAuth details should be mapped to the Protobuf message`() {
//        val model = VehicleModel(
//            id = UUID.randomUUID(),
//            name = "test"
//        )
//        val vehicles = listOf(
//            Vehicle(
//                id = UUID.randomUUID(),
//                clientId = "client-id",
//                name = "test-vehicle"
//            )
//        )
//        val otps = listOf(
//            OauthTotpProto.newBuilder()
//                .setOauthId("client-id")
//                .setOauthGroup("oauth-group")
//                .setSecret("secret")
//                .setRecoveryCode1(1)
//                .setRecoveryCode2(2)
//                .setRecoveryCode3(3)
//                .setRecoveryCode4(4)
//                .setRecoveryCode5(5)
//                .setEnabled(true)
//                .setOtpAuthUri("http://test")
//                .build()
//        )
//
//        val mapped = mapper.vehicleModel(model, vehicles, otps)
//        val v2fa = mapped.vehicle2FaList.first()
//
//        assertThat(mapped.id).isEqualTo(model.id.toString())
//        assertThat(mapped.name).isEqualTo(model.name)
//        assertThat(mapped.vehicle2FaStatus)
//            .isEqualTo(TwoFactorAuthenticationStatusProto.ENABLED)
//        assertThat(v2fa.status)
//            .isEqualTo(TwoFactorAuthenticationStatusProto.ENABLED)
//        assertThat(v2fa.oauthTotp)
//            .isEqualToComparingFieldByField(otps.first())
//        assertThat(v2fa.vehicleId).isEqualTo(vehicles.first().id.toString())
//        assertThat(v2fa.vehicleName).isEqualTo(vehicles.first().name)
//    }
//
//    @Test
//    fun `OAuth status is DISABLED if otp details are missing`() {
//        val model = VehicleModel(
//            id = UUID.randomUUID(),
//            name = "test"
//        )
//        val vehicles = listOf(
//            Vehicle(
//                id = UUID.randomUUID(),
//                clientId = "client-id",
//                name = "test-vehicle"
//            )
//        )
//
//        val mapped = mapper.vehicleModel(model, vehicles, listOf())
//
//        assertThat(mapped.vehicle2FaCount).isEqualTo(1)
//        assertThat(mapped.vehicle2FaList.first().status)
//            .isEqualTo(TwoFactorAuthenticationStatusProto.DISABLED)
//    }
//
//    @Test
//    fun `OAuth status is PENDING if otp details are present but not enabled`() {
//        val model = VehicleModel(
//            id = UUID.randomUUID(),
//            name = "test"
//        )
//        val vehicles = listOf(
//            Vehicle(
//                id = UUID.randomUUID(),
//                clientId = "client-id",
//                name = "test-vehicle"
//            )
//        )
//        val otps = listOf(
//            OauthTotpProto.newBuilder()
//                .setOauthId("client-id")
//                .setEnabled(false)
//                .build()
//        )
//
//        val mapped = mapper.vehicleModel(model, vehicles, otps)
//
//        assertThat(mapped.vehicle2FaCount).isEqualTo(1)
//        assertThat(mapped.vehicle2FaList.first().status)
//            .isEqualTo(TwoFactorAuthenticationStatusProto.PENDING)
//    }
// }