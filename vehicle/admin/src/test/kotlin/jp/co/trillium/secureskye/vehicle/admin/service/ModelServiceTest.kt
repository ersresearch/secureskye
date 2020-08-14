/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.service

// import com.nhaarman.mockitokotlin2.any
// import com.nhaarman.mockitokotlin2.never
// import com.nhaarman.mockitokotlin2.times
// import com.nhaarman.mockitokotlin2.verify
// import com.nhaarman.mockitokotlin2.whenever
// import jp.co.trillium.secureskye.common.mapper.UuidMapper
// import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleModelProto
// import jp.co.trillium.secureskye.vehicle.admin.exception.ModelDeleteFailedException
// import jp.co.trillium.secureskye.vehicle.admin.feign.UaaClient
// import jp.co.trillium.secureskye.vehicle.admin.mapper.ModelMapper
// import jp.co.trillium.secureskye.vehicle.admin.model.VehicleModel
// import jp.co.trillium.secureskye.vehicle.admin.repository.ModelDisplaySettingsRepository
// import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleMakerRepository
// import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleModelRepository
// import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleRepository
// import org.assertj.core.api.Assertions.assertThat
// import org.junit.jupiter.api.Test
// import org.junit.jupiter.api.assertThrows
// import org.junit.jupiter.api.extension.ExtendWith
// import org.springframework.beans.factory.annotation.Autowired
// import org.springframework.boot.test.context.TestConfiguration
// import org.springframework.boot.test.mock.mockito.MockBean
// import org.springframework.context.annotation.Bean
// import org.springframework.context.annotation.ComponentScan
// import org.springframework.test.context.junit.jupiter.SpringExtension
// import java.util.Optional
// import java.util.UUID
// import javax.persistence.EntityNotFoundException
//
// @ExtendWith(SpringExtension::class)
// class ModelServiceTest {
//
//    @TestConfiguration
//    @ComponentScan(basePackageClasses = [ModelMapper::class, UuidMapper::class])
//    class TestContextConfiguration {
//        @Bean
//        fun modelService(
//            modelMapper: ModelMapper,
//            vehicleModelRepository: VehicleModelRepository,
//            vehicleRepository: VehicleRepository,
//            settingsRepository: ModelDisplaySettingsRepository,
//            uaaClient: UaaClient,
//            vehicleMakerRepository: VehicleMakerRepository
//        ) =
//            ModelService(
//                modelMapper,
//                vehicleModelRepository,
//                vehicleRepository,
//                settingsRepository,
//                uaaClient,
//                vehicleMakerRepository
//            )
//    }
//
//    @Autowired
//    private lateinit var modelService: ModelService
//
//    @MockBean
//    private lateinit var vehicleRepository: VehicleRepository
//
//    @MockBean
//    private lateinit var vehicleModelRepository: VehicleModelRepository
//
//    @MockBean
//    private lateinit var uaaClient: UaaClient
//
//    @MockBean
//    private lateinit var settingsRepository: ModelDisplaySettingsRepository
//
//    @MockBean
//    private lateinit var vehicleMakerRepository: VehicleMakerRepository
//
//    @Test
//    fun `Updating a vehicle fails with EnitityNotFoundException if the ID doesn't exist`() {
//        whenever(vehicleModelRepository.findById(any())).thenReturn(Optional.empty())
//
//        assertThrows<EntityNotFoundException> {
//            modelService.update(UUID.randomUUID(), VehicleModelProto.newBuilder().build())
//        }
//    }
//
// //    @Test
// //    fun `Updating a vehicle saves the new name`() {
// //        whenever(vehicleModelRepository.findById(any())).thenReturn(
// //            Optional.of(VehicleModel(name = "old"))
// //        )
// //        whenever(vehicleModelRepository.save(any<VehicleModel>())).then { it.arguments.first() }
// //        whenever(vehicleRepository.findByModelId(any())).thenReturn(listOf())
// //
// //        val model = modelService.update(
// //            UUID.randomUUID(), VehicleModelProto.newBuilder()
// //                .setName("new")
// //                .build()
// //        )
// //
// //        assertThat(model.name).isEqualTo("new")
// //    }
// //
// //    @Test
// //    fun `Updating a vehicle with 2FA enabled returns 2FA secrets`() {
// //        whenever(vehicleModelRepository.findById(any())).thenReturn(
// //            Optional.of(VehicleModel())
// //        )
// //        whenever(vehicleModelRepository.save(any<VehicleModel>())).then { it.arguments.first() }
// //        whenever(vehicleRepository.findByModelId(any())).thenReturn(
// //            listOf(Vehicle(clientId = "client-id"))
// //        )
// //        whenever(uaaClient.updateTotpSecretList(any(), any())).then { it.arguments.last() }
// //
// //        val model = modelService.update(
// //            UUID.randomUUID(), VehicleModelProto.newBuilder()
// //                .setVehicle2FaStatus(TwoFactorAuthenticationStatusProto.ENABLED)
// //                .build()
// //        )
// //
// //        assertThat(model.vehicle2FaStatus).isEqualTo(TwoFactorAuthenticationStatusProto.ENABLED)
// //        assertThat(model.vehicle2FaList).hasSize(1)
// //    }
//
//    @Test
//    fun `Deleting a model throws ModelDeleteFailedException when assigned vehicles exist`() {
//        whenever(vehicleRepository.countByModelId(any())).thenReturn(1)
//
//        assertThrows<ModelDeleteFailedException> {
//            modelService.deleteModel(UUID.randomUUID())
//        }
//
//        verify(vehicleModelRepository, never()).deleteById(any())
//    }
//
// //    @Test
// //    fun `Deleting a model passes when no assigned vehicles exist`() {
// //        whenever(vehicleRepository.countByModelId(any())).thenReturn(0)
// //
// //        modelService.deleteModel(UUID.randomUUID())
// //
// //        verify(vehicleModelRepository, times(1)).deleteById(any())
// //    }
//
//    @Test
//    fun `Finding a model throws an EntityNotFoundException if no model for the ID exists`() {
//        whenever(vehicleModelRepository.findById(any())).thenReturn(Optional.empty())
//
//        assertThrows<EntityNotFoundException> {
//            modelService.findModel(UUID.randomUUID())
//        }
//    }
//
//    @Test
//    fun `Finding a model also searches for its assigned vehicles and 2FA information`() {
//        whenever(vehicleModelRepository.findById(any())).thenReturn(
//            Optional.of(VehicleModel())
//        )
//        whenever(vehicleRepository.findByModelId(any())).thenReturn(listOf())
//
//        modelService.findModel(UUID.randomUUID())
//
//        verify(vehicleRepository, times(1)).findByModelId(any())
//        verify(uaaClient, times(1)).getTotpSecretList(any())
//    }
//
//    @Test
//    fun `Listing all models calls the repository and maps to Protobuf`() {
//        val id = UUID.randomUUID()
//        whenever(vehicleModelRepository.findAll()).thenReturn(listOf(VehicleModel(id)))
//
//        val model = modelService.listAllModels()
//
//        verify(vehicleModelRepository, times(1)).findAll()
//
//        assertThat(model.modelList).hasSize(1).allSatisfy {
//            assertThat(it.id).isEqualTo(id.toString())
//        }
//    }
// //
// //    @Test
// //    fun `Creating a model saves its name`() {
// //        whenever(vehicleModelRepository.save(any<VehicleModel>())).then {
// //            val model = it.arguments.first() as VehicleModel
// //            model.copy(UUID.randomUUID())
// //        }
// //
// //        val model = modelService.createModel("test")
// //
// //        assertThat(model.id).isNotBlank().isNotEqualTo(UUID(0, 0).toString())
// //        assertThat(model.name).isEqualTo("test")
// //    }
// }