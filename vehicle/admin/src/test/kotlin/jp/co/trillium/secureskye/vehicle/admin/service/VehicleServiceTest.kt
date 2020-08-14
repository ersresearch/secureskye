/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.service

// import com.mongodb.client.gridfs.GridFSBucket
// import com.nhaarman.mockitokotlin2.any
// import com.nhaarman.mockitokotlin2.inOrder
// import com.nhaarman.mockitokotlin2.never
// import com.nhaarman.mockitokotlin2.only
// import com.nhaarman.mockitokotlin2.times
// import com.nhaarman.mockitokotlin2.verify
// import com.nhaarman.mockitokotlin2.whenever
// import jp.co.trillium.secureskye.common.mapper.ObjectIdMapper
// import jp.co.trillium.secureskye.common.mapper.UuidMapper
// import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
// import jp.co.trillium.secureskye.vehicle.admin.feign.UaaClient
// import jp.co.trillium.secureskye.vehicle.admin.feign.VehicleRegistryClient
// import jp.co.trillium.secureskye.vehicle.admin.mapper.VehicleMapper
// import jp.co.trillium.secureskye.vehicle.admin.model.Vehicle
// import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleAlertCountRepository
// import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleConnectionRepository
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
// import org.springframework.data.mongodb.gridfs.GridFsOperations
// import org.springframework.security.oauth2.provider.ClientRegistrationService
// import org.springframework.test.context.junit.jupiter.SpringExtension
// import java.util.Optional
// import java.util.UUID
// import javax.persistence.EntityNotFoundException
//
// @ExtendWith(SpringExtension::class)
// class VehicleServiceTest {
//
//    @TestConfiguration
//    @ComponentScan(basePackageClasses = [VehicleMapper::class, UuidMapper::class])
//    class TestContextConfiguration {
//        @Bean
//        fun vehicleService(
//            vehicleMapper: VehicleMapper,
//            vehicleRepository: VehicleRepository,
//            vehicleModelRepository: VehicleModelRepository,
//            clientRegistrationService: ClientRegistrationService,
//            uaaClient: UaaClient,
//            gridFsOperations: GridFsOperations,
//            objectIdMapper: ObjectIdMapper,
//            gridFsBucket: GridFSBucket,
//            vehicleConnectionRepository: VehicleConnectionRepository,
//            vehicleAlertCountRepository: VehicleAlertCountRepository,
//            vehicleRegistryClient: VehicleRegistryClient,
//            modelService: ModelService,
//            uuidMapper: UuidMapper,
//            vehicleSecurityService: VehicleSecurityService
//        ) =
//            VehicleService(
//                vehicleMapper,
//                vehicleRepository,
//                vehicleModelRepository,
//                clientRegistrationService,
//                uaaClient,
//                gridFsOperations,
//                objectIdMapper,
//                gridFsBucket,
//                vehicleConnectionRepository,
//                vehicleAlertCountRepository,
//                vehicleRegistryClient,
//                modelService,
//                uuidMapper,
//                vehicleSecurityService
//            )
//    }
//
//    @Autowired
//    private lateinit var vehicleService: VehicleService
//
//    @MockBean
//    private lateinit var vehicleRepository: VehicleRepository
//
//    @MockBean
//    private lateinit var vehicleModelRepository: VehicleModelRepository
//
//    @MockBean
//    private lateinit var clientRegistrationService: ClientRegistrationService
//
//    @MockBean
//    private lateinit var uaaClient: UaaClient
//
//    @MockBean
//    private lateinit var gridFsOperations: GridFsOperations
//
//    @MockBean
//    private lateinit var gridFSBucket: GridFSBucket
//
//    @MockBean
//    private lateinit var objectIdMapper: ObjectIdMapper
//
//    @MockBean
//    private lateinit var vehicleConnectionRepository: VehicleConnectionRepository
//
//    @MockBean
//    private lateinit var vehicleAlertCountRepository: VehicleAlertCountRepository
//
//    @MockBean
//    private lateinit var vehicleRegistryClient: VehicleRegistryClient
//
//    @MockBean
//    private lateinit var modelService: ModelService
//
//    @MockBean
//    private lateinit var uuidMapper: UuidMapper
//
//    @MockBean
//    private lateinit var vehicleSecurityService: VehicleSecurityService
//
//    @Test
//    fun `Statistics should be returned with repository counts`() {
//        whenever(vehicleRepository.count()).thenReturn(3)
//        whenever(vehicleModelRepository.count()).thenReturn(1)
//
//        val statistics = vehicleService.statistics()
//
//        assertThat(statistics.vehicleCount).isEqualTo(3)
//        assertThat(statistics.modelCount).isEqualTo(1)
//    }
//
//    @Test
//    fun `Find vehicle returns entity together with 2FA status`() {
//        val id = UUID.randomUUID()
//        whenever(vehicleRepository.getOne(any())).thenReturn(
//            Vehicle(
//                id = id,
//                name = "test",
//                clientId = "client-id"
//            )
//        )
//        whenever(uaaClient.getTwoFactorAuthenticationStatus(any())).thenReturn(
//            TwoFactorAuthenticationStatusProto.ENABLED
//        )
//
//        val vehicle = vehicleService.findVehicle(id)
//
//        verify(vehicleRepository).getOne(id)
//        verify(uaaClient, times(1)).getTwoFactorAuthenticationStatus("client-id")
//
//        assertThat(vehicle.id).isEqualTo(id.toString())
//        assertThat(vehicle.name).isEqualTo("test")
//        assertThat(vehicle.tfa).isEqualTo(TwoFactorAuthenticationStatusProto.ENABLED)
//    }
//
//    @Test
//    fun `Rename vehicle calls repository only one time and nothing else`() {
//        vehicleService.renameVehicle(UUID.randomUUID(), "new-name")
//
//        verify(vehicleRepository, times(1)).updateName(any(), any())
//        verify(vehicleRepository, only()).updateName(any(), any())
//    }
//
// //    @Test
// //    fun `List vehicles doesn't return the 2FA status`() {
// //        whenever(vehicleRepository.findAll()).thenReturn(listOf(Vehicle()))
// //
// //        val vehicles = vehicleService.searchByString(any(), any())
// //
// //        verify(uaaClient, never()).getTwoFactorAuthenticationStatus(any())
// //
// //        assertThat(vehicles.dataList).allSatisfy {
// //            assertThat(it.tfa).isEqualTo(TwoFactorAuthenticationStatusProto.DISABLED)
// //        }
// //    }
//
//    @Test
//    fun `List vehicles by model ID doesn't return the 2FA status`() {
//        whenever(vehicleRepository.findByModelId(any())).thenReturn(listOf(Vehicle()))
//
//        vehicleService.listVehiclesByModelId(UUID.randomUUID())
//
//        verify(uaaClient, never()).getTwoFactorAuthenticationStatus(any())
//    }
//
//    @Test
//    fun `Get vehicle client ID only calls the repository`() {
//        whenever(vehicleRepository.getOne(any())).thenReturn(Vehicle())
//
//        vehicleService.getVehicleClientId(UUID.randomUUID())
//
//        verify(vehicleRepository, only()).getOne(any())
//    }
//
//    @Test
//    fun `Get vehicle client ID finds the right ID`() {
//        val id = UUID.randomUUID()
//        whenever(vehicleRepository.getOne(id))
//            .thenReturn(Vehicle(id = id, clientId = "client-id"))
//
//        val clientId = vehicleService.getVehicleClientId(id)
//
//        assertThat(clientId).isEqualTo("client-id")
//    }
//
//    @Test
//    fun `Deleting a vehicle removes any client details`() {
//        val clientId = "test"
//        whenever(vehicleRepository.getOne(any())).thenReturn(Vehicle(clientId = clientId))
//
//        vehicleService.deleteVehicle(UUID.randomUUID())
//
//        inOrder(vehicleRepository, clientRegistrationService) {
//            verify(clientRegistrationService).removeClientDetails(clientId)
//            verify(vehicleRepository).delete(any())
//            verifyNoMoreInteractions()
//        }
//    }
//
//    @Test
//    fun `Find vehicle by client ID throws an EntityNotFoundException if no entity found`() {
//        whenever(vehicleRepository.findByClientId(any())).thenReturn(Optional.empty())
//
//        assertThrows<EntityNotFoundException> {
//            vehicleService.findVehicleByCliendId("id")
//        }
//    }
//
//    @Test
//    fun `Find vehicle by client ID returns entity together with 2FA`() {
//        val id = UUID.randomUUID()
//        val clientId = "client-id"
//        whenever(vehicleRepository.findByClientId(clientId)).thenReturn(
//            Optional.of(
//                Vehicle(
//                    id = id,
//                    name = "vehicle",
//                    clientId = clientId
//                )
//            )
//        )
//        whenever(uaaClient.getTwoFactorAuthenticationStatus(any()))
//            .thenReturn(TwoFactorAuthenticationStatusProto.ENABLED)
//
//        val vehicle = vehicleService.findVehicleByCliendId(clientId)
//
//        verify(vehicleRepository).findByClientId(clientId)
//        verify(uaaClient, times(1)).getTwoFactorAuthenticationStatus("client-id")
//
//        assertThat(vehicle.id).isEqualTo(id.toString())
//        assertThat(vehicle.name).isEqualTo("vehicle")
//        assertThat(vehicle.tfa).isEqualTo(TwoFactorAuthenticationStatusProto.ENABLED)
//    }
//
// //    @Test
// //    fun `Registering a vehicle saves new OAuth client details`() {
// //        whenever(vehicleModelRepository.getOne(any())).thenReturn(VehicleModel())
// //        whenever(vehicleRepository.save(any<Vehicle>())).thenReturn(Vehicle())
// //
// //        vehicleService.registerVehicle(any<UUID>(), any(), any(), any())
// //
// //        inOrder(clientRegistrationService, vehicleRepository) {
// //            verify(clientRegistrationService).addClientDetails(any())
// //            verify(vehicleRepository).save(any<Vehicle>())
// //            verifyNoMoreInteractions()
// //        }
// //    }
// }