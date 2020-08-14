/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.service

// import com.nhaarman.mockitokotlin2.any
// import com.nhaarman.mockitokotlin2.eq
// import com.nhaarman.mockitokotlin2.never
// import com.nhaarman.mockitokotlin2.times
// import com.nhaarman.mockitokotlin2.verify
// import com.nhaarman.mockitokotlin2.whenever
// import jp.co.trillium.secureskye.common.mapper.UuidMapper
// import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleProto
// import jp.co.trillium.secureskye.vehicle.registry.feign.VehicleAdminClient
// import jp.co.trillium.secureskye.vehicle.registry.mapper.RegistryMapper
// import jp.co.trillium.secureskye.vehicle.registry.model.GatewayInterfaceInfo
// import org.assertj.core.api.Assertions
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
// class GatewayInfoServiceTest {
//
//    @TestConfiguration
//    @ComponentScan(basePackageClasses = [RegistryMapper::class, UuidMapper::class])
//    class TestContextConfiguration {
//        @Bean
//        fun gatewayInfoService(
//            registryMapper: RegistryMapper,
//            uuidMapper: UuidMapper,
//            gatewayInfoRepository: GatewayInfoRepository,
//            vehicleAdminClient: VehicleAdminClient
//        ) =
//            GatewayInfoService(
//                registryMapper,
//                uuidMapper,
//                gatewayInfoRepository,
//                vehicleAdminClient
//            )
//    }
//
//    @Autowired
//    private lateinit var gatewayInfoService: GatewayInfoService
//
//    @MockBean
//    private lateinit var gatewayInfoRepository: GatewayInfoRepository
//
//    @MockBean
//    private lateinit var vehicleAdminClient: VehicleAdminClient
//
//    @Test
//    fun `Saving gateway information persists the data`() {
//        whenever(vehicleAdminClient.getVehicle(any(), any())).thenReturn(
//            VehicleProto.newBuilder()
//                .setId(UUID.randomUUID().toString())
//                .build()
//        )
//        whenever(gatewayInfoRepository.save(any<GatewayInfo>())).then {
//            it.getArgument<GatewayInfo>(0).copy(UUID.randomUUID())
//        }
//
//        val gateway = gatewayInfoService.save(
//            "test",
//            GatewayInfoProto.newBuilder()
//                .setInterfaceInfo(
//                    GatewayInfoProto.InterfaceInfo.newBuilder()
//                        .setCommProtocol(GatewayInfoProto.CommProtocol.HTTPS)
//                        .setEcuId("test")
//                        .setVin("test-vin")
//                )
//                .build()
//        )
//
//        Assertions.assertThat(gateway.id).isNotBlank().isNotEqualTo(UUID(0, 0).toString())
//
//        with(gateway.interfaceInfo) {
//            Assertions.assertThat(commProtocol).isEqualTo(GatewayInfoProto.CommProtocol.HTTPS)
//            Assertions.assertThat(ecuId).isEqualTo("test")
//            Assertions.assertThat(vin).isEqualTo("test-vin")
//        }
//    }
//
//    @Test
//    fun `Saving gateway information loads the vehicle ID from the vehicle-admin service`() {
//        whenever(vehicleAdminClient.getVehicle(any(), any())).thenReturn(
//            VehicleProto.newBuilder()
//                .setId(UUID.randomUUID().toString())
//                .build()
//        )
//        whenever(gatewayInfoRepository.save(any<GatewayInfo>())).then { it.getArgument(0) }
//
//        gatewayInfoService.save("test", GatewayInfoProto.getDefaultInstance())
//
//        verify(vehicleAdminClient, times(1)).getVehicle(eq("test"), eq(true))
//    }
//
//    @Test
//    fun `Updating gateway information persists the new data`() {
//        whenever(gatewayInfoRepository.findById(any())).then {
//            Optional.of(GatewayInfo(it.getArgument(0)))
//        }
//        whenever(gatewayInfoRepository.save(any<GatewayInfo>())).then { it.getArgument(0) }
//
//        val gateway = gatewayInfoService.update(
//            UUID.randomUUID(), GatewayInfoProto.newBuilder()
//                .setInterfaceInfo(
//                    GatewayInfoProto.InterfaceInfo.newBuilder()
//                        .setIp("0.0.0.0")
//                        .setVin("test")
//                )
//                .build()
//        )
//
//        with(gateway.interfaceInfo) {
//            Assertions.assertThat(ip).isEqualTo("0.0.0.0")
//            Assertions.assertThat(vin).isEqualTo("test")
//            Assertions.assertThat(ecuId).isNullOrEmpty()
//        }
//    }
//
//    @Test
//    fun `Updating gateway information fails with EntityNotFoundException if the ID doesn't exist`() {
//        whenever(gatewayInfoRepository.findById(any())).thenReturn(Optional.empty())
//
//        assertThrows<EntityNotFoundException> {
//            gatewayInfoService.update(UUID.randomUUID(), GatewayInfoProto.getDefaultInstance())
//        }
//
//        verify(gatewayInfoRepository, never()).save(any<GatewayInfo>())
//    }
//
//    @Test
//    fun `Loading gateway information returns valid data`() {
//        whenever(gatewayInfoRepository.findById(any())).then {
//            Optional.of(GatewayInfo(it.getArgument(0), UUID.randomUUID(), GatewayInterfaceInfo("test")))
//        }
//
//        val id = UUID.randomUUID()
//        val gateway = gatewayInfoService.load(id)
//
//        Assertions.assertThat(gateway.id).isEqualTo(id.toString())
//        with(gateway.interfaceInfo) {
//            Assertions.assertThat(ecuId).isEqualTo("test")
//        }
//    }
//
//    @Test
//    fun `Loading gateway information fails with EntityNotFoundException if the ID doesn't exist`() {
//        whenever(gatewayInfoRepository.findById(any())).thenReturn(Optional.empty())
//
//        val id = UUID.randomUUID()
//        assertThrows<EntityNotFoundException>("Gateway information with id '$id' doesn't exist") {
//            gatewayInfoService.load(id)
//        }
//    }
//
//    @Test
//    fun `Loading gateway information by vehicle returns valid data`() {
//        whenever(gatewayInfoRepository.findByVehicleIdAndId(any(), any())).then {
//            Optional.of(GatewayInfo(it.getArgument(1), UUID.randomUUID(), GatewayInterfaceInfo("test")))
//        }
//
//        val id = UUID.randomUUID()
//        val gateway = gatewayInfoService.loadByVehicle(UUID.randomUUID(), id)
//
//        assertThat(gateway.id).isEqualTo(id.toString())
//        with(gateway.interfaceInfo) {
//            Assertions.assertThat(ecuId).isEqualTo("test")
//        }
//    }
//
//    @Test
//    fun `Loading gateway information by vehicle fails with EntityNotFoundException if the ID doesn't exist`() {
//        whenever(gatewayInfoRepository.findByVehicleIdAndId(any(), any())).thenReturn(Optional.empty())
//
//        assertThrows<EntityNotFoundException> {
//            gatewayInfoService.loadByVehicle(UUID.randomUUID(), UUID.randomUUID())
//        }
//    }
//
//    @Test
//    fun `Listing all gateway information returns valid data`() {
//        whenever(gatewayInfoRepository.findAll()).then {
//            listOf(
//                GatewayInfo(UUID.randomUUID(), UUID.randomUUID(), GatewayInterfaceInfo("test-1")),
//                GatewayInfo(UUID.randomUUID(), UUID.randomUUID(), GatewayInterfaceInfo("test-2"))
//            )
//        }
//
//        val gateways = gatewayInfoService.list()
//
//        assertThat(gateways.gatewayInfoList).hasSize(2).allSatisfy {
//            assertThat(it.id).isNotBlank()
//            assertThat(it.interfaceInfo.ecuId).isNotBlank()
//        }
//        assertThat(gateways.gatewayInfoList[0].interfaceInfo.ecuId).isEqualTo("test-1")
//        assertThat(gateways.gatewayInfoList[1].interfaceInfo.ecuId).isEqualTo("test-2")
//    }
//
//    @Test
//    fun `Listing all gateway information by vehicle returns valid data`() {
//        whenever(gatewayInfoRepository.findAllByVehicleId(any())).then {
//            listOf(
//                GatewayInfo(UUID.randomUUID(), UUID.randomUUID(), GatewayInterfaceInfo("test-1")),
//                GatewayInfo(UUID.randomUUID(), UUID.randomUUID(), GatewayInterfaceInfo("test-2"))
//            )
//        }
//
//        val gateways = gatewayInfoService.listByVehicle(UUID.randomUUID())
//
//        assertThat(gateways.gatewayInfoList).hasSize(2).allSatisfy {
//            assertThat(it.id).isNotBlank()
//            assertThat(it.interfaceInfo.ecuId).isNotBlank()
//        }
//        assertThat(gateways.gatewayInfoList[0].interfaceInfo.ecuId).isEqualTo("test-1")
//        assertThat(gateways.gatewayInfoList[1].interfaceInfo.ecuId).isEqualTo("test-2")
//    }
//
//    @Test
//    fun `Deleting gateway information doesn't throw errors if the ID doesn't exist`() {
//        gatewayInfoService.delete(UUID(0, 0))
//    }
// }