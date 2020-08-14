/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.mongodb.MongoGridFSException
import com.mongodb.client.gridfs.GridFSBucket
import com.mongodb.client.gridfs.GridFSUploadStream
import jp.co.trillium.secureskye.common.extension.asArchive
import jp.co.trillium.secureskye.common.extension.decompress
import jp.co.trillium.secureskye.common.extension.extractExtensions
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.common.util.Uris
import jp.co.trillium.secureskye.ie.main.exception.ExportFileNotFoundException
import jp.co.trillium.secureskye.ie.main.exception.UnsupportedArchiveException
import jp.co.trillium.secureskye.ie.main.feign.NotificationClient
import jp.co.trillium.secureskye.ie.main.model.export.Filter
import jp.co.trillium.secureskye.ie.main.model.export.Metric
import jp.co.trillium.secureskye.ie.main.model.oauth.Authority
import jp.co.trillium.secureskye.ie.main.model.oauth.Credentials
import jp.co.trillium.secureskye.ie.main.model.oauth.CredentialsRoles
import jp.co.trillium.secureskye.ie.main.model.oauth.OauthClientDetails
import jp.co.trillium.secureskye.ie.main.model.oauth.RolesAuthorities
import jp.co.trillium.secureskye.ie.main.model.vehicle.Vehicle
import jp.co.trillium.secureskye.ie.main.model.vehicle.VehicleModel
import jp.co.trillium.secureskye.ie.main.repository.oauth.AuthorityIeRepository
import jp.co.trillium.secureskye.ie.main.repository.oauth.CredentialsIeRepository
import jp.co.trillium.secureskye.ie.main.repository.oauth.CredentialsRolesRepository
import jp.co.trillium.secureskye.ie.main.repository.oauth.OauthClientDetailsRepository
import jp.co.trillium.secureskye.ie.main.repository.oauth.RoleRepository
import jp.co.trillium.secureskye.ie.main.repository.oauth.RolesAuthoritiesRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.BatteryRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.CanBusMessageRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.FuelRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.GearRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.GpsRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.GpsRouteRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.OdometerRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.VehicleModelRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.VehicleRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.WheelSpeedRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.AmbientTemperatureRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.CodeClearDistanceRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.ControlModuleVoltageRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.EngineCoolantRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.EngineLoadRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.EngineRuntimeRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.FuelLevelRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.IntakeAirRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.MassAirFlowRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.MilStatusRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.RpmRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.SpeedRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.ThrottleRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.TroubleCodeRepository
import jp.co.trillium.secureskye.ie.main.repository.vehicle.obd.VinRepository
import jp.co.trillium.secureskye.notification.main.api.proto.ChannelTypeProto
import jp.co.trillium.secureskye.notification.main.api.proto.NotificationProto
import jp.co.trillium.secureskye.oauth.model.Role
import jp.co.trillium.secureskye.vehicle.message.model.BatteryEnergyEvent
import jp.co.trillium.secureskye.vehicle.message.model.CanBusMessage
import jp.co.trillium.secureskye.vehicle.message.model.EventEntity
import jp.co.trillium.secureskye.vehicle.message.model.FuelConsumptionEvent
import jp.co.trillium.secureskye.vehicle.message.model.GearShiftEvent
import jp.co.trillium.secureskye.vehicle.message.model.GpsEvent
import jp.co.trillium.secureskye.vehicle.message.model.GpsRoute
import jp.co.trillium.secureskye.vehicle.message.model.OdometerEvent
import jp.co.trillium.secureskye.vehicle.message.model.WheelSpeedEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.AmbientTemperatureEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.CodeClearDistanceEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.ControlModuleVoltageEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.EngineCoolantEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.EngineLoadEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.EngineRuntimeEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.FuelLevelEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.IntakeAirEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.MassAirFlowEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.MilStatusEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.RpmEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.SpeedEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.ThrottleEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.TroubleCodeEvent
import jp.co.trillium.secureskye.vehicle.message.model.obd.VinEvent
import org.apache.commons.codec.binary.Hex
import org.apache.commons.compress.archivers.ArchiveEntry
import org.apache.commons.compress.archivers.ArchiveInputStream
import org.apache.commons.compress.archivers.ArchiveOutputStream
import org.apache.commons.compress.archivers.ArchiveStreamFactory
import org.apache.commons.compress.archivers.ar.ArArchiveEntry
import org.apache.commons.compress.archivers.ar.ArArchiveOutputStream
import org.apache.commons.compress.archivers.cpio.CpioArchiveEntry
import org.apache.commons.compress.archivers.tar.TarArchiveEntry
import org.apache.commons.compress.archivers.tar.TarArchiveOutputStream
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry
import org.apache.commons.compress.compressors.CompressorStreamFactory
import org.apache.commons.io.FilenameUtils
import org.apache.commons.io.output.TeeOutputStream
import org.bouncycastle.crypto.digests.SHA3Digest
import org.bouncycastle.crypto.io.DigestOutputStream
import org.bson.types.ObjectId
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import reactor.core.publisher.Flux
import reactor.core.publisher.toFlux
import reactor.core.scheduler.Scheduler
import reactor.core.scheduler.Schedulers
import java.io.InputStream
import java.io.OutputStream
import java.nio.file.Paths
import javax.persistence.EntityManager
import javax.servlet.http.HttpServletRequest

/**
 * Service for business logic of Import/Export.
 */
@Service
class IeService(
    private val batteryRepository: BatteryRepository,
    private val canBusMessageRepository: CanBusMessageRepository,
    private val fuelRepository: FuelRepository,
    private val gearRepository: GearRepository,
    private val gpsRepository: GpsRepository,
    private val gpsRouteRepository: GpsRouteRepository,
    private val odometerRepository: OdometerRepository,
    private val wheelSpeedRepository: WheelSpeedRepository,
    private val ambientTemperatureRepository: AmbientTemperatureRepository,
    private val codeClearDistanceRepository: CodeClearDistanceRepository,
    private val controlModuleVoltageRepository: ControlModuleVoltageRepository,
    private val engineCoolantRepository: EngineCoolantRepository,
    private val engineLoadRepository: EngineLoadRepository,
    private val engineRuntimeRepository: EngineRuntimeRepository,
    private val fuelLevelRepository: FuelLevelRepository,
    private val intakeAirRepository: IntakeAirRepository,
    private val massAirFlowRepository: MassAirFlowRepository,
    private val milStatusRepository: MilStatusRepository,
    private val rpmRepository: RpmRepository,
    private val speedRepository: SpeedRepository,
    private val throttleRepository: ThrottleRepository,
    private val troubleCodeRepository: TroubleCodeRepository,
    private val vinRepository: VinRepository,
    private val authorityIeRepository: AuthorityIeRepository,
    private val credentialsIeRepository: CredentialsIeRepository,
    private val roleRepository: RoleRepository,
    private val vehicleRepository: VehicleRepository,
    private val vehicleModelRepository: VehicleModelRepository,
    private val oauthCredentialsRolesRepository: CredentialsRolesRepository,
    private val oauthRolesAuthoritiesRepository: RolesAuthoritiesRepository,
    private val oauthClientDetailsRepository: OauthClientDetailsRepository,
    private val metricService: MetricService,
    private val objectMapper: ObjectMapper,
    @Qualifier("yamlMapper")
    private val yamlMapper: ObjectMapper,
    @Qualifier("xmlMapper")
    private val xmlMapper: ObjectMapper,
    private val entityManager: EntityManager,
    private val ieGridFSBucket: GridFSBucket,
    private val notificationClient: NotificationClient,
    private val uuidMapper: UuidMapper
) {
    /**
     * A mapping from possible field filters to the actual repositories.
     */
    private val fieldNameToRepoMap = mapOf(
        "battery" to batteryRepository,
        "can_bus" to canBusMessageRepository,
        "fuel" to fuelRepository,
        "gear" to gearRepository,
        "gps" to gpsRepository,
        "gps_route" to gpsRouteRepository,
        "odometer" to odometerRepository,
        "rpm" to rpmRepository,
        "speed" to speedRepository,
        "wheel" to wheelSpeedRepository,
        "ambient" to ambientTemperatureRepository,
        "code" to codeClearDistanceRepository,
        "control" to controlModuleVoltageRepository,
        "enginecool" to engineCoolantRepository,
        "engineload" to engineLoadRepository,
        "engineruntime" to engineRuntimeRepository,
        "fuellevel" to fuelLevelRepository,
        "intake" to intakeAirRepository,
        "massair" to massAirFlowRepository,
        "milstatus" to milStatusRepository,
        "throttle" to throttleRepository,
        "trouble" to troubleCodeRepository,
        "vin" to vinRepository
    )

    /**
     * Import data from uploading file.
     */
    fun import(multipartFile: MultipartFile, format: String): Metric {
        val metric = Metric(
            format = format,
            exportDate = Timestamps.nowTime()
        )
        val (firstExt, secondExt) = multipartFile.extractExtensions()
        multipartFile.inputStream.decompress(firstExt).asArchive(secondExt).use { input ->
            importData(input, format, metric)
        }
        return metric
    }

    /**
     * Iterate each entry to import.
     */
    private fun importData(input: ArchiveInputStream, format: String, metric: Metric) {
        var archive = input.nextEntry
        while (archive != null) {
            if (archive.isDirectory) {
                archive = input.nextEntry
                continue
            }

            var archiveName = FilenameUtils.separatorsToUnix(archive.name)
            if (archiveName.startsWith('/'))
                archiveName = archiveName.substring(1)
            val import: (InputStream, String, ObjectMapper, Metric) -> Unit = when {
                archiveName.startsWith(ArchiveFolders.VehicleMessage.BASE_FOLDER) -> ::importVehicleMessage
                archiveName.startsWith(ArchiveFolders.VehicleAdmin.BASE_FOLDER) -> ::importVehicleAdmin
                archiveName.startsWith(ArchiveFolders.UserAdmin.BASE_FOLDER) -> ::importUserAdmin
                archiveName.startsWith(ArchiveFolders.Oauth.BASE_FOLDER) -> ::importOauth
                else -> { _, _, _, _ -> }
            }
            val mapper = when (format) {
                ARCHIVE_ENTRY_XML_FORMAT -> xmlMapper
                ARCHIVE_ENTRY_YAML_FORMAT -> yamlMapper
                else -> objectMapper
            }
            import(input, archiveName.substringAfter('/'), mapper, metric)
            archive = input.nextEntry
        }
    }

    /**
     * Import vehicle-message.
     */
    private fun importVehicleMessage(input: InputStream, name: String, mapper: ObjectMapper, metric: Metric) {
        when {
            name.startsWith(ArchiveFolders.VehicleMessage.BATTERY_ENERGY_EVENT) ->
                batteryRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.CAN_BUS_MESSAGE) ->
                canBusMessageRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.FUEL_CONSUMPTION_EVENT) ->
                fuelRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.GEAR_SHIFT_EVENT) ->
                gearRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.GPS_EVENT) ->
                gpsRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.GPS_ROUTE) ->
                gpsRouteRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.ODOMETER_EVENT) ->
                odometerRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.WHEEL_SPEED_EVENT) ->
                wheelSpeedRepository.storeData(input, mapper, metric)
            // OBD2
            name.startsWith(ArchiveFolders.VehicleMessage.AMBIENT_TEMPERATURE_EVENT) ->
                ambientTemperatureRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.CODE_CLEAR_DISTANCE_EVENT) ->
                codeClearDistanceRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.ENGINE_COOLANT_EVENT) ->
                engineCoolantRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.ENGINE_LOAD_EVENT) ->
                engineLoadRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.ENGINE_RUNTIME_EVENT) ->
                engineRuntimeRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.FUEL_LEVEL_EVENT) ->
                fuelLevelRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.INTAKE_AIR_EVENT) ->
                intakeAirRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.MASS_AIR_FLOW_EVENT) ->
                massAirFlowRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.MIL_STATUS_EVENT) ->
                milStatusRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.RPM_EVENT) ->
                rpmRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.SPEED_EVENT) ->
                speedRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.THROTTLE_EVENT) ->
                throttleRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.TROUBLE_CODE_EVENT) ->
                troubleCodeRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleMessage.VIN_EVENT) ->
                vinRepository.storeData(input, mapper, metric)
        }
    }

    /**
     * import oauth data.
     */
    private fun importOauth(input: InputStream, name: String, mapper: ObjectMapper, metric: Metric) {
        when {
            name.startsWith(ArchiveFolders.Oauth.OAUTH_CLIENT) ->
                oauthClientDetailsRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.Oauth.USER_ROLES) ->
                oauthCredentialsRolesRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.Oauth.ROLES_AUTHORITIES) ->
                oauthRolesAuthoritiesRepository.storeData(input, mapper, metric)
        }
    }

    /**
     * Import user-admin data.
     */
    private fun importUserAdmin(input: InputStream, name: String, mapper: ObjectMapper, metric: Metric) {
        when {
            name.startsWith(ArchiveFolders.UserAdmin.USER) ->
                credentialsIeRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.UserAdmin.AUTHORITY) ->
                authorityIeRepository.storeData(input, mapper, metric)
        }
    }

    /**
     * import vehicle admin data.
     */
    private fun importVehicleAdmin(input: InputStream, name: String, mapper: ObjectMapper, metric: Metric) {
        when {
            name.startsWith(ArchiveFolders.VehicleAdmin.VEHICLE) ->
                vehicleRepository.storeData(input, mapper, metric)
            name.startsWith(ArchiveFolders.VehicleAdmin.VEHICLE_MODEL) ->
                vehicleModelRepository.storeData(input, mapper, metric)
        }
    }

    /**
     * Store data reactive.
     */
    private inline fun <reified T : Any, U> ReactiveCrudRepository<T, U>.storeData(
        input: InputStream,
        mapper: ObjectMapper,
        metric: Metric
    ) {
        this.save(mapper.readValue<T>(input.readBytes())).subscribe { it -> metric.update(it) }
    }

    /**
     * Store data JPA.
     */
    private inline fun <reified T : Any, U> CrudRepository<T, U>.storeData(
        input: InputStream,
        mapper: ObjectMapper,
        metric: Metric
    ) {
        val res = this.save(mapper.readValue<T>(input.readBytes()))
        metric.update(res)
    }

    /**
     * Create an archive stream and write it directly to the [outputStream].
     */
    @Transactional(readOnly = true)
    fun export(type: ExportType, filter: Filter = Filter(), format: String = ARCHIVE_ENTRY_JSON_FORMAT) {
        val uploadStream = when (type) {
            is ExportType.DirectExport -> type.outputStream
            is ExportType.NotifyExport -> ieGridFSBucket.openUploadStream(EXPORT_FILE_NAME)
        }
        val digest = DigestOutputStream(SHA3Digest(DIGEST_STRENGTH))
        val compression =
            compressionStreamFactory.createCompressorOutputStream(ARCHIVE_COMPRESSION, uploadStream)
        val output = TeeOutputStream(compression, digest)
        val archive = archiveStreamFactory.createArchiveOutputStream(ARCHIVE_TYPE, output)
            .supportLongFileNames()

        val metric = Metric(
            format = format,
            exportDate = Timestamps.nowTime()
        )
        val mapper = when (format) {
            ARCHIVE_ENTRY_XML_FORMAT -> xmlMapper
            ARCHIVE_ENTRY_YAML_FORMAT -> yamlMapper
            else -> objectMapper
        }
        val scheduler = Schedulers.newSingle("export")
        Flux.merge(
            exportVehicleMessageEvents(scheduler, archive, metric, mapper, format, filter),
            exportVehicleAdmin(scheduler, archive, metric, mapper, format),
            exportUserAdmin(scheduler, archive, metric, mapper, format),
            exportOAuth(scheduler, archive, metric, mapper, format)
        )
            .writeMetricsOnCompletion(scheduler, archive, metric, digest, mapper, format)
            .blockLast()

        if (type is ExportType.NotifyExport) {
            val user = credentialsIeRepository.findByName(type.request.userPrincipal.name)
            generateNotification(user.get(), uploadStream as GridFSUploadStream, type.request)
        }
    }

    /**
     * Generate notification to user.
     */
    private fun generateNotification(
        user: Credentials,
        uploadStream: GridFSUploadStream,
        request: HttpServletRequest
    ) {
        notificationClient.notify(
            NotificationProto.newBuilder()
                .setRecipient(uuidMapper.uuidString(user.id))
                .setSubject(NOTIFICATION_SUBJECT)
                .setMessage(Uris.buildFull(request, "export", "download", uploadStream.objectId.toString()))
                .setChannel(ChannelTypeProto.DEFAULT)
                .build(),
            false
        )
    }

    /**
     * Download file from GridFS.
     */
    fun download(objectId: ObjectId, output: OutputStream) {
        try {
            ieGridFSBucket.openDownloadStream(objectId).use { input ->
                output.use { output ->
                    input.copyTo(output)
                }
            }
        } catch (e: MongoGridFSException) {
            throw ExportFileNotFoundException(e.message, e)
        }
    }

    /**
     * Export all user-admin service data into the [archive] and updating the [metric].
     */
    private fun exportUserAdmin(
        scheduler: Scheduler,
        archive: ArchiveOutputStream,
        metric: Metric,
        mapper: ObjectMapper,
        format: String
    ) =
        Flux.merge(
            authorityIeRepository.streamAll().toFlux()
                .exportData(scheduler, archive, metric, mapper, format, entityManager::detach),
            credentialsIeRepository.streamAll().toFlux()
                .exportData(scheduler, archive, metric, mapper, format, entityManager::detach),
            roleRepository.streamAll().toFlux()
                .exportData(scheduler, archive, metric, mapper, format, entityManager::detach)
        )

    /**
     * Export all vehicle-admin service data into the [archive] and updating the [metric].
     */
    private fun exportVehicleAdmin(
        scheduler: Scheduler,
        archive: ArchiveOutputStream,
        metric: Metric,
        mapper: ObjectMapper,
        format: String
    ) =
        Flux.merge(
            vehicleModelRepository.streamAll().toFlux()
                .exportData(scheduler, archive, metric, mapper, format, entityManager::detach),
            vehicleRepository.streamAll().toFlux()
                .exportData(scheduler, archive, metric, mapper, format, entityManager::detach)
        )

    /**
     * Map from field filters in [fieldName] to repositories.
     */
    private fun mapFieldsToRepos(fieldName: String) =
        if (fieldName.isBlank()) fieldNameToRepoMap.values.toList()
        else fieldName.split(',')
            .mapNotNull { fieldNameToRepoMap[it] }

    /**
     * Export all vehicle-message service data into the [archive] and updating the [metric].
     */
    @Suppress("TooGenericExceptionThrown") // The RuntimeException should never happen
    private fun exportVehicleMessageEvents(
        scheduler: Scheduler,
        archive: ArchiveOutputStream,
        metric: Metric,
        mapper: ObjectMapper,
        format: String,
        filter: Filter
    ) =
        Flux.merge(mapFieldsToRepos(filter.fieldName).map { it -> it.findAll() })
            .filter {
                when (it) {
                    is EventEntity -> it.timestamp in filter.begin..filter.end
                    is GpsRoute -> it.timestamp in filter.begin..filter.end
                    else -> throw RuntimeException("Unsupported entity ${it.javaClass}")
                }
            }
            .filter {
                when (it) {
                    is EventEntity -> it.vehicleId in filter.vehicleIds || filter.vehicleIds.isEmpty()
                    is GpsRoute -> it.vehicleId in filter.vehicleIds || filter.vehicleIds.isEmpty()
                    else -> throw RuntimeException("Unsupported entity ${it.javaClass}")
                }
            }
            .exportData(scheduler, archive, metric, mapper, format)

    /**
     * Export all oauth service data into the [archive] and updating the [metric].
     */
    private fun exportOAuth(
        scheduler: Scheduler,
        archive: ArchiveOutputStream,
        metric: Metric,
        mapper: ObjectMapper,
        format: String
    ) =
        Flux.merge(
            oauthCredentialsRolesRepository.streamAll().toFlux()
                .exportData(scheduler, archive, metric, mapper, format, entityManager::detach),
            oauthRolesAuthoritiesRepository.streamAll().toFlux()
                .exportData(scheduler, archive, metric, mapper, format, entityManager::detach),
            oauthClientDetailsRepository.streamAll().toFlux()
                .exportData(scheduler, archive, metric, mapper, format, entityManager::detach)
        )

    /**
     * Export data into the [archive] and update the [metric].
     * On writing of each individual entry, the [postFunc] can post process the entity.
     */
    private fun <T : Any> Flux<T>.exportData(
        scheduler: Scheduler,
        archive: ArchiveOutputStream,
        metric: Metric,
        mapper: ObjectMapper,
        format: String,
        postFunc: (T) -> Unit = {}
    ) = subscribeOn(scheduler).doOnNext {
        val data = mapper.writeValueAsBytes(it)
        archive.putArchiveEntry(
            archiveEntryFactory.createEntry(
                ARCHIVE_TYPE,
                Paths.get(
                    it.getArchiveBaseFolderName(),
                    it.getArchiveFolderName(),
                    "${it.getIdentifier()}.$format"
                ).toString(),
                data.size.toLong()
            )
        )

        archive.write(data)
        archive.closeArchiveEntry()

        postFunc(it)
        metric.update(it)
    }

    /**
     * Write [metric] to the [archive] after all data has been written into it.
     * The archive's [digest] is saved to the database.
     */
    private fun Flux<*>.writeMetricsOnCompletion(
        scheduler: Scheduler,
        archive: ArchiveOutputStream,
        metric: Metric,
        digest: DigestOutputStream,
        mapper: ObjectMapper,
        format: String
    ): Flux<*> = subscribeOn(scheduler).doOnComplete {
        val data = mapper.writeValueAsBytes(metric)
        archive.putArchiveEntry(
            archiveEntryFactory.createEntry(
                ARCHIVE_TYPE,
                "$EXPORT_METRIC_FILE_NAME.$format",
                data.size.toLong()
            )
        )

        archive.write(data)
        archive.closeArchiveEntry()

        archive.flush()
        archive.close()

        metric.hash = Hex.encodeHexString(digest.digest)
        metricService.save(metric)
    }

    /**
     * Update the [entity] count of the metrics.
     */
    private fun Metric.update(entity: Any) {
        val folder = entity.getArchiveFolderName()
        numberEntity[folder] = (numberEntity[folder] ?: 0) + 1
    }

    /**
     * Get a string representation of the entity's ID.
     *
     * @throws RuntimeException If the entity is not supported.
     */
    @Suppress("TooGenericExceptionThrown") // The RuntimeException should never happen
    private fun Any.getIdentifier(): String = when (this) {
// user-admin
        is Credentials -> id.toString()
        is Authority -> id.toString()
        is Role -> id.toString()
// vehicle-admin
        is Vehicle -> id.toString()
        is VehicleModel -> id.toString()
// vehicle-message
        is EventEntity -> id.toString()
// oauth
        is CredentialsRoles -> "$credentialsId-$rolesId"
        is RolesAuthorities -> "$rolesId-$authoritiesId"
        is OauthClientDetails -> clientId.toString()
// else
        else -> throw RuntimeException("Unsupported class '$javaClass'")
    }

    /**
     * Select the proper base folder name for the entity.
     *
     * @throws RuntimeException If the entity is not supported.
     */
    @Suppress("TooGenericExceptionThrown") // The RuntimeException should never happen
    private fun Any.getArchiveBaseFolderName(): String = when (this) {
// user-admin
        is Credentials,
        is Authority,
        is Role -> ArchiveFolders.UserAdmin.BASE_FOLDER
// vehicle-admin
        is Vehicle,
        is VehicleModel -> ArchiveFolders.VehicleAdmin.BASE_FOLDER
// vehicle-message
        is BatteryEnergyEvent,
        is CanBusMessage,
        is FuelConsumptionEvent,
        is GearShiftEvent,
        is GpsEvent,
        is GpsRoute,
        is OdometerEvent,
        is WheelSpeedEvent,
// vehicle-message (OBD2)
        is AmbientTemperatureEvent,
        is CodeClearDistanceEvent,
        is ControlModuleVoltageEvent,
        is EngineCoolantEvent,
        is EngineLoadEvent,
        is EngineRuntimeEvent,
        is FuelLevelEvent,
        is IntakeAirEvent,
        is MassAirFlowEvent,
        is MilStatusEvent,
        is RpmEvent,
        is SpeedEvent,
        is ThrottleEvent,
        is TroubleCodeEvent,
        is VinEvent -> ArchiveFolders.VehicleMessage.BASE_FOLDER
// oauth
        is CredentialsRoles,
        is RolesAuthorities,
        is OauthClientDetails -> ArchiveFolders.Oauth.BASE_FOLDER
// else
        else -> throw RuntimeException("Unsupported entity '$javaClass")
    }

    /**
     * Select the proper folder name for the entity.
     *
     * @throws RuntimeException If the entity is not supported.
     */
    @Suppress("TooGenericExceptionThrown") // The RuntimeException should never happen
    private fun Any.getArchiveFolderName(): String = when (this) {
// user-admin
        is Credentials -> ArchiveFolders.UserAdmin.USER
        is Authority -> ArchiveFolders.UserAdmin.AUTHORITY
// vehicle-admin
        is Vehicle -> ArchiveFolders.VehicleAdmin.VEHICLE
        is VehicleModel -> ArchiveFolders.VehicleAdmin.VEHICLE_MODEL
// vehicle-message
        is BatteryEnergyEvent -> ArchiveFolders.VehicleMessage.BATTERY_ENERGY_EVENT
        is CanBusMessage -> ArchiveFolders.VehicleMessage.CAN_BUS_MESSAGE
        is FuelConsumptionEvent -> ArchiveFolders.VehicleMessage.FUEL_CONSUMPTION_EVENT
        is GearShiftEvent -> ArchiveFolders.VehicleMessage.GEAR_SHIFT_EVENT
        is GpsEvent -> ArchiveFolders.VehicleMessage.GPS_EVENT
        is GpsRoute -> ArchiveFolders.VehicleMessage.GPS_ROUTE
        is OdometerEvent -> ArchiveFolders.VehicleMessage.ODOMETER_EVENT
        is WheelSpeedEvent -> ArchiveFolders.VehicleMessage.WHEEL_SPEED_EVENT
// vehicle-message (OBD2)
        is AmbientTemperatureEvent -> ArchiveFolders.VehicleMessage.AMBIENT_TEMPERATURE_EVENT
        is CodeClearDistanceEvent -> ArchiveFolders.VehicleMessage.CODE_CLEAR_DISTANCE_EVENT
        is ControlModuleVoltageEvent -> ArchiveFolders.VehicleMessage.CONTROL_MODULE_VOLTAGE_EVENT
        is EngineCoolantEvent -> ArchiveFolders.VehicleMessage.ENGINE_COOLANT_EVENT
        is EngineLoadEvent -> ArchiveFolders.VehicleMessage.ENGINE_LOAD_EVENT
        is EngineRuntimeEvent -> ArchiveFolders.VehicleMessage.ENGINE_RUNTIME_EVENT
        is FuelLevelEvent -> ArchiveFolders.VehicleMessage.FUEL_LEVEL_EVENT
        is IntakeAirEvent -> ArchiveFolders.VehicleMessage.INTAKE_AIR_EVENT
        is MassAirFlowEvent -> ArchiveFolders.VehicleMessage.MASS_AIR_FLOW_EVENT
        is MilStatusEvent -> ArchiveFolders.VehicleMessage.MIL_STATUS_EVENT
        is RpmEvent -> ArchiveFolders.VehicleMessage.RPM_EVENT
        is SpeedEvent -> ArchiveFolders.VehicleMessage.SPEED_EVENT
        is ThrottleEvent -> ArchiveFolders.VehicleMessage.THROTTLE_EVENT
        is TroubleCodeEvent -> ArchiveFolders.VehicleMessage.TROUBLE_CODE_EVENT
        is VinEvent -> ArchiveFolders.VehicleMessage.VIN_EVENT
// oauth
        is Role -> ArchiveFolders.Oauth.ROLE
        is CredentialsRoles -> ArchiveFolders.Oauth.USER_ROLES
        is RolesAuthorities -> ArchiveFolders.Oauth.ROLES_AUTHORITIES
        is OauthClientDetails -> ArchiveFolders.Oauth.OAUTH_CLIENT
// else
        else -> throw RuntimeException("Unsupported entity '$javaClass'")
    }

    private fun ArchiveOutputStream.supportLongFileNames() = apply {
        when (this) {
            is ArArchiveOutputStream -> setLongFileMode(ArArchiveOutputStream.LONGFILE_BSD)
            is TarArchiveOutputStream -> setLongFileMode(TarArchiveOutputStream.LONGFILE_POSIX)
        }
    }

    companion object {

        /**
         * Subject of notification.
         */
        private const val NOTIFICATION_SUBJECT = "Exporting data available for downloading"

        /**
         * Format for all entries in the archive.
         */
        private const val ARCHIVE_ENTRY_JSON_FORMAT = "json"

        /**
         * Format for all entries in the archive.
         */
        private const val ARCHIVE_ENTRY_XML_FORMAT = "xml"

        /**
         * Format for all entries in the archive.
         */
        private const val ARCHIVE_ENTRY_YAML_FORMAT = "yaml"

        /**
         * The archive type to use.
         */
        private const val ARCHIVE_TYPE = ArchiveStreamFactory.TAR

        /**
         * The archive compression container to use.
         */
        private const val ARCHIVE_COMPRESSION = CompressorStreamFactory.GZIP

        /**
         * SHA strength to use for hashing the archive.
         */
        private const val DIGEST_STRENGTH = 512

        /**
         * Output file name of the archive.
         */
        const val EXPORT_FILE_NAME = "result.$ARCHIVE_TYPE.$ARCHIVE_COMPRESSION"

        /**
         * Name of the [Metric] file in the archive.
         */
        private const val EXPORT_METRIC_FILE_NAME = "metric"

        private object ArchiveFolders {

            object UserAdmin {

                /**
                 * Archive base folder for user admin data.
                 */
                const val BASE_FOLDER = "user-admin"

                /**
                 * Archive folder for authority information.
                 */
                const val AUTHORITY = "authority"

                /**
                 * Archive folder for user information.
                 */
                const val USER = "user"
            }

            object VehicleAdmin {

                /**
                 * Archive base folder for vehicle admin data.
                 */
                const val BASE_FOLDER = "vehicle-admin"

                /**
                 * Archive folder for vehicle information.
                 */
                const val VEHICLE = "vehicle"

                /**
                 * Archive folder for authority information.
                 */
                const val VEHICLE_MODEL = "model"
            }

            object VehicleMessage {

                /**
                 * Archive base folder for vehicle events.
                 */
                const val BASE_FOLDER = "vehicle-message"

                /**
                 * Archive folder for [BatteryEnergyEvent].
                 */
                const val BATTERY_ENERGY_EVENT = "battery_energy_event"

                /**
                 * Archive folder for [CanBusMessage].
                 */
                const val CAN_BUS_MESSAGE = "can_bus_message"

                /**
                 * Archive folder for [FuelConsumptionEvent].
                 */
                const val FUEL_CONSUMPTION_EVENT = "fuel_consumption_event"

                /**
                 * Archive folder for [GearShiftEvent].
                 */
                const val GEAR_SHIFT_EVENT = "gear_shift_event"

                /**
                 * Archive folder for [GpsEvent].
                 */
                const val GPS_EVENT = "gps_event"

                /**
                 * Archive folder for [GpsRoute].
                 */
                const val GPS_ROUTE = "gps_route"

                /**
                 * Archive folder for [OdometerEvent].
                 */
                const val ODOMETER_EVENT = "odometer_event"

                /**
                 * Archive folder for [WheelSpeedEvent].
                 */
                const val WHEEL_SPEED_EVENT = "wheel_speed_event"

                /**
                 * Archive folder for [AmbientTemperatureEvent].
                 */
                const val AMBIENT_TEMPERATURE_EVENT = "ambient_temperature_event"

                /**
                 * Archive folder for [CodeClearDistanceEvent].
                 */
                const val CODE_CLEAR_DISTANCE_EVENT = "code_clear_distance_event"

                /**
                 * Archive folder for [ControlModuleVoltageEvent].
                 */
                const val CONTROL_MODULE_VOLTAGE_EVENT = "control_module_voltage_event"

                /**
                 * Archive folder for [EngineCoolantEvent].
                 */
                const val ENGINE_COOLANT_EVENT = "engine_coolant_event"

                /**
                 * Archive folder for [EngineLoadEvent].
                 */
                const val ENGINE_LOAD_EVENT = "engine_load_event"

                /**
                 * Archive folder for [EngineRuntimeEvent].
                 */
                const val ENGINE_RUNTIME_EVENT = "engine_runtime_event"

                /**
                 * Archive folder for [FuelLevelEvent].
                 */
                const val FUEL_LEVEL_EVENT = "fuel_level_event"

                /**
                 * Archive folder for [IntakeAirEvent].
                 */
                const val INTAKE_AIR_EVENT = "intake_air_event"

                /**
                 * Archive folder for [MassAirFlowEvent].
                 */
                const val MASS_AIR_FLOW_EVENT = "mass_air_flow_event"

                /**
                 * Archive folder for [MilStatusEvent].
                 */
                const val MIL_STATUS_EVENT = "mil_status_event"

                /**
                 * Archive folder for [RpmEvent].
                 */
                const val RPM_EVENT = "rpm_event"

                /**
                 * Archive folder for [SpeedEvent].
                 */
                const val SPEED_EVENT = "speed_event"

                /**
                 * Archive folder for [ThrottleEvent].
                 */
                const val THROTTLE_EVENT = "throttle_event"

                /**
                 * Archive folder for [TroubleCodeEvent].
                 */
                const val TROUBLE_CODE_EVENT = "trouble_code_event"

                /**
                 * Archive folder for [VinEvent].
                 */
                const val VIN_EVENT = "vin_event"
            }

            object Oauth {

                /**
                 * Archive base folder for oauth data.
                 */
                const val BASE_FOLDER = "oauth"

                /**
                 * Archive folder for oauth client information.
                 */
                const val OAUTH_CLIENT = "client"

                /**
                 * Archive folder for role information.
                 */
                const val ROLE = "role"

                /**
                 * Archive folder for roles authorities information.
                 */
                const val ROLES_AUTHORITIES = "roles_authorities"

                /**
                 * Archive folder for user roles information.
                 */
                const val USER_ROLES = "user_roles"
            }
        }

        private val compressionStreamFactory = CompressorStreamFactory()
        private val archiveStreamFactory = ArchiveStreamFactory()
        private val archiveEntryFactory = ArchiveEntryFactory()
    }

    /**
     * A factory that creates [ArchiveEntry]s for different archive types fitting to [ArchiveStreamFactory].
     */
    private class ArchiveEntryFactory {

        /**
         * Create an [ArchiveEntry] for the archive type selected by [type], with the given [name].
         *
         * @throws UnsupportedArchiveException If the given [type] is unknown or unsupported.
         */
        fun createEntry(type: String, name: String, size: Long): ArchiveEntry {
            return when (type) {
                ArchiveStreamFactory.AR -> ArArchiveEntry(name, size)
                ArchiveStreamFactory.CPIO -> CpioArchiveEntry(name).also { it.size = size }
                ArchiveStreamFactory.TAR -> TarArchiveEntry(name).also { it.size = size }
                ArchiveStreamFactory.ZIP -> ZipArchiveEntry(name).also { it.size = size }
                else -> throw UnsupportedArchiveException(type)
            }
        }
    }
}
