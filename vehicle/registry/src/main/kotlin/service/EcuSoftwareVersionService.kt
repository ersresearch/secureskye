/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.service

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareVersionListProto
import jp.co.trillium.secureskye.vehicle.registry.model.EcuSoftwareVersion
import jp.co.trillium.secureskye.vehicle.registry.repository.EcuSoftwareVersionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * ECU software version service for Software Version Management Function.
 */
@Service
class EcuSoftwareVersionService(
    private val ecuSoftwareVersionRepository: EcuSoftwareVersionRepository,
    private val ecuSoftwareService: EcuSoftwareService,
    private val uuidMapper: UuidMapper
) {

    /**
     * Save a list of new software version.
     */
    @Transactional
    fun saveNewVersion(softwareVersions: SoftwareVersionListProto): List<EcuSoftwareVersion> =
        softwareVersions.dataList.map {
            val softwareId = uuidMapper.uuidString(it.softwareId)
            validateSoftwareVersionName(softwareId, it.versionName, it.ecuDeviceId)
            // TODO: Disabled for CES demo, re-enable and improve after the CES.
            // validateSoftwareVersionCode(softwareId, it.versionCode, it.ecuDeviceId)
            EcuSoftwareVersion(
                software = ecuSoftwareService.getSoftware(softwareId),
                versionName = it.versionName,
                versionCode = it.versionCode,
                availableSince = if (it.availableSince != 0L)
                    Timestamps.toLocalDateTime(it.availableSince)
                else Timestamps.nowTime(),
                changelog = it.changelog,
                imageId = it.imageId,
                ecuDeviceId = it.ecuDeviceId
            )
        }.let {
            ecuSoftwareVersionRepository.saveAll(it)
        }

    /**
     * Get latest version of [softwareId].
     */
    fun getLatestVersion(softwareId: UUID, ecuDeviceId: String) =
        ecuSoftwareVersionRepository.findLatestSoftwareVersion(softwareId, ecuDeviceId)

    /**
     * Find specific software version by [softwareId] and [version].
     */
    fun getSoftwareVersion(softwareId: UUID, version: String, ecuDeviceId: String) =
        ecuSoftwareVersionRepository.findBySoftwareIdAndVersionNameAndEcuDeviceId(softwareId, version, ecuDeviceId)

    /**
     *  Validate software version name.
     */
    private fun validateSoftwareVersionName(softwareId: UUID, versionName: String, ecuDeviceId: String) {
        if (versionName.isBlank()) throw IllegalArgumentException("Name is invalid")
        if (ecuSoftwareVersionRepository.existsBySoftwareIdAndVersionNameAndEcuDeviceId(
                softwareId,
                versionName,
                ecuDeviceId
            )
        )
            throw IllegalArgumentException("VersionName is duplicated in software $softwareId")
    }

    /**
     *  Validate software version code.
     */
    private fun validateSoftwareVersionCode(softwareId: UUID, versionCode: Long, ecuDeviceId: String) {
        val latestVersion = getLatestVersion(softwareId, ecuDeviceId)?.versionCode ?: 0

        if (versionCode <= latestVersion)
            throw IllegalArgumentException(
                "Input version is '$versionCode', " +
                        "equal/less than latest version of software $softwareId is version '$latestVersion'"
            )
    }
}
