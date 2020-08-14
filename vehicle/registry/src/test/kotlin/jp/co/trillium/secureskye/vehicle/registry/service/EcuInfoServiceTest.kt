/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.registry.feign.VehicleAdminClient
import jp.co.trillium.secureskye.vehicle.registry.mapper.RegistryMapper
import jp.co.trillium.secureskye.vehicle.registry.repository.EcuInfoRepository
import jp.co.trillium.secureskye.vehicle.registry.repository.EcuSoftwareRepository
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
class EcuInfoServiceTest {

    @TestConfiguration
    @ComponentScan(basePackageClasses = [RegistryMapper::class, UuidMapper::class])
    class TestContextConfiguration {
        @Bean
        fun ecuInfoService(
            registryMapper: RegistryMapper,
            ecuInfoRepository: EcuInfoRepository,
            ecuSoftwareRepository: EcuSoftwareRepository,
            uuidMapper: UuidMapper,
            vehicleAdminClient: VehicleAdminClient,
            ecuSoftwareService: EcuSoftwareService
        ) =
            EcuInfoService(
                registryMapper,
                ecuInfoRepository,
                uuidMapper,
                vehicleAdminClient
            )
    }

    @Autowired
    private lateinit var ecuInfoService: EcuInfoService

    @MockBean
    private lateinit var registryMapper: RegistryMapper

    @MockBean
    private lateinit var ecuInfoRepository: EcuInfoRepository

    @MockBean
    private lateinit var ecuSoftwareRepository: EcuSoftwareRepository

    @MockBean
    private lateinit var uuidMapper: UuidMapper

    @MockBean
    private lateinit var vehicleAdminClient: VehicleAdminClient

    @MockBean
    private lateinit var ecuSoftwareService: EcuSoftwareService

//    @Test
//    fun `Saving ECU information persists the data`() {
//        whenever(ecuInfoRepository.save(any<EcuInfo>())).then {
//            it.getArgument<EcuInfo>(0).copy(UUID.randomUUID())
//        }
//
//        val ecu = ecuInfoService.save(
//            EcuInfoProto.newBuilder()
//                .setInterfaceInfo(
//                    EcuInfoProto.InterfaceInfo.newBuilder()
//                        .setCommProtocol(EcuInfoProto.CommProtocol.CAN)
//                        .setEcuId("test")
//                        .setMessageId("test-message")
//                )
//                .build()
//        )
//
//        assertThat(ecu.id).isNotBlank().isNotEqualTo(UUID(0, 0).toString())
//
//        with(ecu.interfaceInfo) {
//            assertThat(commProtocol).isEqualTo(EcuInfoProto.CommProtocol.CAN)
//            assertThat(ecuId).isEqualTo("test")
//            assertThat(messageId).isEqualTo("test-message")
//        }
//    }

//    @Test
//    fun `Updating ECU information persists the new data`() {
//        whenever(ecuInfoRepository.findById(any())).then {
//            Optional.of(EcuInfo(it.getArgument(0)))
//        }
//        whenever(ecuInfoRepository.save(any<EcuInfo>())).then { it.getArgument(0) }
//
//        val ecu = ecuInfoService.update(
//            UUID.randomUUID(), EcuInfoProto.newBuilder()
//                .setTrilliumInfo(
//                    EcuInfoProto.TrilliumInfo.newBuilder()
//                        .setSecureIxsVersion("1.0")
//                        .setSecureOtaVersion("2.0")
//                )
//                .build()
//        )
//
//        with(ecu.trilliumInfo) {
//            assertThat(secureIxsVersion).isEqualTo("1.0")
//            assertThat(secureOtaVersion).isEqualTo("2.0")
//            assertThat(secureCarVersion).isNullOrEmpty()
//        }
//    }

//    @Test
//    fun `Updating ECU information fails with EnitityNotFoundException if the ID doesn't exist`() {
//        whenever(ecuInfoRepository.findById(any())).thenReturn(Optional.empty())
//
//        assertThrows<EntityNotFoundException> {
//            ecuInfoService.update(UUID.randomUUID(), EcuInfoProto.getDefaultInstance())
//        }
//
//        verify(ecuInfoRepository, never()).save(any<EcuInfo>())
//    }

//    @Test
//    fun `Loading ECU information returns valid data`() {
//        whenever(ecuInfoRepository.findById(any())).then {
//            Optional.of(EcuInfo(it.getArgument(0), EcuInterfaceInfo("test")))
//        }
//
//        val id = UUID.randomUUID()
//        val ecu = ecuInfoService.load(id)
//
//        assertThat(ecu.id).isEqualTo(id.toString())
//        with(ecu.interfaceInfo) {
//            assertThat(ecuId).isEqualTo("test")
//        }
//    }

//    @Test
//    fun `Loading ECU information fails with EntityNotFoundException if the ID doesn't exist`() {
//        whenever(ecuInfoRepository.findById(any())).thenReturn(Optional.empty())
//
//        val id = UUID.randomUUID()
//        assertThrows<EntityNotFoundException>("ECU information with id '$id' doesn't exist") {
//            ecuInfoService.load(id)
//        }
//    }

//    @Test
//    fun `Loading ECU information by vehicle returns valid data`() {
//        whenever(ecuInfoRepository.findByVehicleIdAndId(any(), any())).then {
//            Optional.of(EcuInfo(it.getArgument(1), EcuInterfaceInfo("test")))
//        }
//
//        val id = UUID.randomUUID()
//        val ecu = ecuInfoService.loadByVehicle(UUID.randomUUID(), id)
//
//        assertThat(ecu.id).isEqualTo(id.toString())
//        with(ecu.interfaceInfo) {
//            assertThat(ecuId).isEqualTo("test")
//        }
//    }

//    @Test
//    fun `Loading ECU information by vehicle fails with EntityNotFoundException if the ID doesn't exist`() {
//        whenever(ecuInfoRepository.findByVehicleIdAndId(any(), any())).thenReturn(Optional.empty())
//
//        assertThrows<EntityNotFoundException> {
//            ecuInfoService.loadByVehicle(UUID.randomUUID(), UUID.randomUUID())
//        }
//    }

//    @Test
//    fun `Listing all ECU information returns valid data`() {
//        whenever(ecuInfoRepository.findAll()).then {
//            listOf(
//                EcuInfo(UUID.randomUUID(), EcuInterfaceInfo("test-1")),
//                EcuInfo(UUID.randomUUID(), EcuInterfaceInfo("test-2"))
//            )
//        }
//
//        val ecus = ecuInfoService.list()
//
//        assertThat(ecus).hasSize(2).allSatisfy {
//            assertThat(it.id).isNotNull()
//            assertThat(it.interfaceInfo.ecuId).isNotBlank()
//        }
//        assertThat(ecus[0].interfaceInfo.ecuId).isEqualTo("test-1")
//        assertThat(ecus[1].interfaceInfo.ecuId).isEqualTo("test-2")
//    }
//
//    @Test
//    fun `Listing all ECU information by vehicle returns valid data`() {
//        whenever(ecuInfoRepository.findByInterfaceInfoVehicleId(any())).then {
//            listOf(
//                EcuInfo(UUID.randomUUID(), EcuInterfaceInfo("test-1")),
//                EcuInfo(UUID.randomUUID(), EcuInterfaceInfo("test-2"))
//            )
//        }
//
//        val ecus = ecuInfoService.listByVehicle(UUID.randomUUID(), false, EcuFilterType.DEFAULT)
//
//        assertThat(ecus).hasSize(2).allSatisfy {
//            assertThat(it.id).isNotNull()
//            assertThat(it.interfaceInfo.ecuId).isNotBlank()
//        }
//        assertThat(ecus[0].interfaceInfo.ecuId).isEqualTo("test-1")
//        assertThat(ecus[1].interfaceInfo.ecuId).isEqualTo("test-2")
//    }

//    @Test
//    fun `Deleting ECU information doesn't throw errors if the ID doesn't exist`() {
//        ecuInfoService.delete(UUID(0, 0))
//    }
}