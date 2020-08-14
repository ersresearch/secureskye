/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.service

import com.mongodb.MongoGridFSException
import com.mongodb.client.gridfs.GridFSBucket
import com.mongodb.client.gridfs.model.GridFSFile
import jp.co.trillium.secureskye.common.mapper.ObjectIdMapper
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.common.util.Uuids
import jp.co.trillium.secureskye.vehicle.admin.api.proto.ModelDisplaySettingsListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.RegisteredVehicleProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleStatisticsProto
import jp.co.trillium.secureskye.vehicle.admin.exception.VehicleImageMaxSize
import jp.co.trillium.secureskye.vehicle.admin.exception.VehicleImageNotFoundException
import jp.co.trillium.secureskye.vehicle.admin.exception.VehicleImageTypeException
import jp.co.trillium.secureskye.vehicle.admin.exception.VehicleNotFoundException
import jp.co.trillium.secureskye.vehicle.admin.feign.UaaClient
import jp.co.trillium.secureskye.vehicle.admin.mapper.VehicleMapper
import jp.co.trillium.secureskye.vehicle.admin.model.Vehicle
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleAlertCount
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleConnection
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleFilterType
import jp.co.trillium.secureskye.vehicle.admin.model.VehicleModel
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleAlertCountRepository
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleConnectionRepository
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleModelRepository
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleRepository
import jp.co.trillium.secureskye.vehicle.admin.specification.VehicleSpecification
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.data.mongodb.gridfs.GridFsOperations
import org.springframework.security.oauth2.provider.ClientRegistrationService
import org.springframework.security.oauth2.provider.client.BaseClientDetails
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.io.InputStream
import java.io.OutputStream
import java.util.UUID
import javax.persistence.EntityNotFoundException

/**
 * Business logic for administering vehicles.
 */
@Service
class VehicleService(
    private val vehicleMapper: VehicleMapper,
    private val vehicleRepository: VehicleRepository,
    private val vehicleModelRepository: VehicleModelRepository,
    private val clientRegistrationService: ClientRegistrationService,
    private val uaaClient: UaaClient,
    private val gridFsOperations: GridFsOperations,
    private val objectIdMapper: ObjectIdMapper,
    private val gridFsBucket: GridFSBucket,
    private val vehicleConnectionRepository: VehicleConnectionRepository,
    private val vehicleAlertCountRepository: VehicleAlertCountRepository,
    private val modelService: ModelService,
    private val uuidMapper: UuidMapper,
    private val vehicleSecurityService: VehicleSecurityService
) {

    private companion object {

        /**
         * Max upload file size.
         */
        private const val MAX_FILE_SIZE = 5242880

        /**
         * Time in seconds until an access token for vehicles expires.
         */
        private const val VEHICLE_ACCESS_TOKEN_VALIDITY = 360

        /**
         * Time in seconds until a refresh token for vehicles expires.
         */
        private const val VEHICLE_REFRESH_TOKEN_VALIDITY = 0

        private const val VEHICLE_SCOPES = "none"

        private val vehicleResources = listOf(
            "uaa",
            "vehicle-message",
            "vehicle-registry",
            "ota-vehicle",
            "obd2device-admin"
        ).joinToString(",")

        private val authorities = listOf(
            "event:create",
            "message:create",
            "ota-images:read",
            "software:read",
            "software-install:create",
            "software-install:read",
            "software-install:update",
            "software-install:delete",
            "vehicle-registry:create",
            "vehicle-registry:read",
            "vehicle-registry:update",
            "vehicle-registry:delete",
            "vehicle-status:update",
            "obd2device-admin:read",
            "obd2device-admin:update",
            "obd2device-admin:delete"
        ).joinToString(",")
    }

    /**
     * Register a new vehicle with the given [model], [name], [vin], [color] with [image], [imageType]
     * automatically creating a new OAuth client as well.
     *
     * The new vehicle is returned as a [RegisteredVehicleProto], containing the vehicle as well as its OAuth token.
     */
    fun registerVehicle(
        model: VehicleModel,
        name: String,
        vin: String,
        color: String,
        image: InputStream? = null,
        imageType: String = "",
        deleted: Boolean = false
    ): RegisteredVehicleProto {
        val client = BaseClientDetails(
            "vehicle-${Uuids.generate()}",
            vehicleResources,
            VEHICLE_SCOPES,
            "client_credentials",
            authorities
        ).apply {
            accessTokenValiditySeconds = VEHICLE_ACCESS_TOKEN_VALIDITY
            refreshTokenValiditySeconds = VEHICLE_REFRESH_TOKEN_VALIDITY
        }

        clientRegistrationService.addClientDetails(client)

        return vehicleRepository.save(
            Vehicle(
                clientId = client.clientId,
                model = model,
                name = name,
                vin = vin,
                color = color,
                deleted = deleted
            )
        ).also {
            it.connection = vehicleConnectionRepository.save(VehicleConnection(vehicle = it))
            it.alertCount = vehicleAlertCountRepository.save(VehicleAlertCount(vehicle = it))
            vehicleSecurityService.vehicleSecurityInitData(it.let(vehicleMapper::vehicle))
        }.also {
            updateVehicleImage(it, image, imageType)
        }.let(vehicleRepository::save).let(vehicleMapper::registeredVehicle)
    }

    /**
     * Update [image], [imageType] of [vehicle].
     */
    fun updateVehicleImage(vehicle: Vehicle, image: InputStream? = null, imageType: String = "") {
        if (vehicleRepository.getOne(vehicle.id).deleted)
            throw VehicleNotFoundException("Vehicle is deleted")

        // Get vehicle id image default
        val file: GridFSFile? =
            gridFsOperations.findOne(Query.query(Criteria.where("filename").isEqualTo("vehicle-image-default")))
        val vehicleImageId = file?.objectId?.let(objectIdMapper::objectId)
        // Remove old image
        if (vehicle.imageId.isNotBlank() && vehicle.imageId != vehicleImageId) {
            gridFsOperations.delete(Query.query(Criteria.where("_id").isEqualTo(vehicle.imageId)))
        }
        if (image == null) {
            vehicle.imageId = vehicleImageId.orEmpty()
        } else {
            // Save new one
            image.let {
                vehicle.imageId = gridFsOperations.store(it, "vehicle-image-${vehicle.id}", imageType)
                    .let(objectIdMapper::objectId)
            }
        }
    }

    /**
     * Load image of vehicle with [id].
     */
    fun getVehicleImage(id: UUID, outputStream: OutputStream) =
        vehicleRepository.getOne(id).imageId.let(objectIdMapper::objectId).let {
            try {
                gridFsBucket.openDownloadStream(it).use { input ->
                    outputStream.use { output ->
                        input.copyTo(output)
                    }
                }
            } catch (e: MongoGridFSException) {
                throw VehicleImageNotFoundException(e.message, e)
            }
        }

    /**
     * Upload and save [file] as an image of vehicle [id].
     */
    fun uploadVehicleImage(id: UUID, file: MultipartFile): String = vehicleRepository.getOne(id).also { vehicle ->
        checkValidationImage(file)
        file.inputStream.use {
            //            val ba = ByteArray(it.available())
//            it.read(ba)
            updateVehicleImage(vehicle, it, file.contentType ?: "")
        }
    }.let(vehicleRepository::save).imageId

    /**
     * Register a new vehicle with the given [modelId], [name], [vin], [color] with [image], [imageType]
     * and register an OAuth client as well.
     *
     * The newly created vehicle is returned as a [RegisteredVehicleProto], containing the vehicle as well as its OAuth
     * token.
     *
     * @throws EntityNotFoundException When the model for the [modelId] doesn't exist.
     */
    fun registerVehicle(
        modelId: UUID,
        name: String,
        vin: String,
        color: String,
        image: InputStream? = null,
        imageType: String = "",
        deleted: Boolean = false
    ): RegisteredVehicleProto {
        val model = vehicleModelRepository.getOne(modelId)
        checkDuplicateVin(vin)
        return registerVehicle(model, name, vin, color, image, imageType, deleted)
    }

    /**
     * Rename an existing vehicle (identified by [id]) to the [newName].
     */
    fun renameVehicle(id: UUID, newName: String) {
        vehicleRepository.updateName(id, newName)
    }

    /**
     * Update a vehicle by its [id], returning it as a [VehicleProto].
     */
    fun updateVehicle(id: UUID, vehicle: VehicleProto) {
        vehicleRepository.findById(id).orElseThrow { EntityNotFoundException() }
            .apply {
                if (deleted) throw VehicleNotFoundException("Vehicle is deleted")
                checkDuplicateVin(vehicle.vin, vin)
                model = vehicleModelRepository.findById(uuidMapper.uuidString(vehicle.modelId))
                    .orElseThrow { EntityNotFoundException() }
                name = vehicle.name
                vin = vehicle.vin
                color = vehicle.color
                updateCount = vehicle.updateCount
            }.let(vehicleRepository::save)
    }

    /**
     *  Check the vin is duplicate or not.
     */
    fun checkDuplicateVin(newVin: String, oldVin: String? = null) {
        if (oldVin != newVin) {
            val checkVin = vehicleRepository.existsByVin(newVin)
            if (checkVin) throw IllegalArgumentException("Vin must not be duplicate")
        }
    }

    /**
     * Update the vin of an existing vehicle identified by [id] to [value].
     */
    fun updateVehicleVin(id: UUID, value: String) {
        if (vehicleRepository.getOne(id).deleted)
            throw VehicleNotFoundException("Vehicle is deleted")
        vehicleRepository.updateVin(id, value)
    }

    /**
     * Update the color of an existing vehicle identified by [id] to [value].
     */
    fun updateVehicleColor(id: UUID, value: String) {
        if (vehicleRepository.getOne(id).deleted)
            throw VehicleNotFoundException("Vehicle is deleted")
        vehicleRepository.updateColor(id, value)
    }

    /**
     * Update the model of an existing vehicle identified by [id] to [modelId].
     */
    fun updateVehicleModel(id: UUID, modelId: UUID) {
        if (vehicleRepository.getOne(id).deleted)
            throw VehicleNotFoundException("Vehicle is deleted")
        vehicleRepository.updateModel(id, modelId)
    }

    /**
     * Delete an existing vehicle (identified by [id]).
     *
     * This also deletes the client details of the vehicle from the OAuth entities.
     */
    @Transactional
    fun deleteVehicle(id: UUID) {
        vehicleRepository.deletedVehicle(id)
    }

    /**
     * Delete an existing vehicle or a list of vehicle by [listVehicleId].
     */
    @Transactional
    fun deleteListVehicle(listVehicleId: List<UUID>) {
        listVehicleId.forEach {
            deleteVehicle(it)
        }
    }

    /**
     * Find a vehicle by its [id], returning it as a [VehicleProto].
     *
     * @throws EntityNotFoundException When the vehicle doesn't exist.
     */
    fun findVehicle(id: UUID): VehicleProto = vehicleRepository.getOne(id)
        .let { vehicleMapper.vehicle(it, uaaClient.getTwoFactorAuthenticationStatus(it.clientId)) }

    /**
     * Find a vehicle by its [clientId], returning it as a [VehicleProto].
     *
     * @throws IllegalArgumentException When the client for the [clientId] doesn't exist.
     */
    fun findVehicleByCliendId(clientId: String): VehicleProto = vehicleRepository.findByClientId(clientId)
        .orElseThrow { EntityNotFoundException("No vehicle found for client ID $clientId") }

        .let { vehicleMapper.vehicle(it, uaaClient.getTwoFactorAuthenticationStatus(it.clientId)) }

    /**
     * Statistics for vehicle.
     */
    fun statistics(): VehicleStatisticsProto = VehicleStatisticsProto.newBuilder()
        .setVehicleCount(vehicleRepository.count())
        .setModelCount(vehicleModelRepository.count())
        .build()

    /**
     * Find all vehicle by [modelId].
     */
    fun listVehiclesByModelId(modelId: UUID): List<Vehicle> = vehicleRepository.findByModelId(modelId)

    /**
     * Find client ID by vehicle ID.
     */
    fun getVehicleClientId(vehicleId: UUID) = vehicleRepository.getOne(vehicleId).clientId

    /**
     * Find all vehicles  or find by custom parameter base on search pattern.
     * [page] pageable support.
     * [searchString] search string.
     * exp: vin=XXX,model=XXX,ip=XXX,... .
     */
    fun searchByString(page: Pageable, searchString: String): VehicleListProto {
        return when (searchString) {
            VehicleFilterType.HAS_ALERT.value -> vehicleRepository.filterByVehicleHasAlert()
            VehicleFilterType.AVAILABLE_UPDATE.value -> vehicleRepository.filterByVehicleAvailableUpdate()
            VehicleFilterType.DEFAULT.value -> vehicleRepository.findAll()
            else -> {
                var vin = ""
                var model = ""
                var ip = ""
                var status = ""
                var connect = ""
                // Parse raw string to parameter
                searchString.split(",").map { it.trim() }.apply {
                    this.forEach { str ->
                        str.split("=").map { it.trim() }.apply {
                            when (this[0]) {
                                "vin" -> vin = this[1]
                                "model" -> model = this[1]
                                "ip" -> ip = this[1]
                                "status" -> status = this[1]
                                "connect" -> connect = this[1]
                            }
                        }
                    }
                }

                vehicleRepository.findAll(VehicleSpecification.toSpec(vin, model, ip, status, connect), page)
                    .content
            }
        }.let(vehicleMapper::vehicleList)
    }

    /**
     * Update vehicle's update count.
     */
    fun updateVehicleUpdateCount(vehicleId: UUID, updateCount: Int) {
        vehicleRepository.getOne(vehicleId).also {
            it.updateCount = it.updateCount + updateCount
            if (it.updateCount < 0) it.updateCount = 0
        }.let(vehicleRepository::save)
    }

    /**
     * Get model's display settings by vehicle's [vehicleId].
     */
    fun getModelSettings(vehicleId: UUID): ModelDisplaySettingsListProto = modelService.getDisplaySettings(
        findVehicle(vehicleId).modelId.let(uuidMapper::uuidString)
    )

    /**
     * Init image default.
     */
    fun registerImgDefault(file: InputStream) = file.use {
        val gridFSFile: GridFSFile? =
            gridFsOperations.findOne(Query.query(Criteria.where("filename").isEqualTo("vehicle-image-default")))
        if (gridFSFile == null) {
            gridFsOperations.store(file, "vehicle-image-default", "image/png")
        }
    }

    /**
     * Check Validation Vehicle Image.
     */
    private fun checkValidationImage(file: MultipartFile) {
        if (!file.contentType.equals("image/png") &&
            !file.contentType.equals("image/jpeg")
        ) {
            throw VehicleImageTypeException("Vehicle Image Type Error.")
        }
        // Megabytes 5 MB) convert 5 Bytes (B) binary
        if (file.size > MAX_FILE_SIZE) {
            throw VehicleImageMaxSize("Vehicle Image Max Size Is 5MB.")
        }
    }
}
