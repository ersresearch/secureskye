/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ota.vehicle.service

import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.mongodb.ErrorCategory
import com.mongodb.MongoGridFSException
import com.mongodb.MongoWriteException
import com.mongodb.client.gridfs.GridFSBucket
import com.vdurmont.semver4j.Semver
import com.vdurmont.semver4j.SemverException
import jp.co.trillium.secureskye.common.extension.asArchive
import jp.co.trillium.secureskye.common.extension.decompress
import jp.co.trillium.secureskye.common.extension.extractExtensions
import jp.co.trillium.secureskye.common.mapper.ObjectIdMapper
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.ota.vehicle.api.proto.ImageArchiveStatisticsProto
import jp.co.trillium.secureskye.ota.vehicle.api.proto.MetadataProto
import jp.co.trillium.secureskye.ota.vehicle.exception.ImageIntegrityException
import jp.co.trillium.secureskye.ota.vehicle.exception.ImageNotFoundException
import jp.co.trillium.secureskye.ota.vehicle.exception.InvalidMetadataException
import jp.co.trillium.secureskye.ota.vehicle.exception.MetadataImageNotFoundException
import jp.co.trillium.secureskye.ota.vehicle.exception.MetadataNotFoundException
import jp.co.trillium.secureskye.ota.vehicle.exception.NotApplicableVehicleException
import jp.co.trillium.secureskye.ota.vehicle.exception.UnknownImageException
import jp.co.trillium.secureskye.ota.vehicle.feign.VehicleAdminClient
import jp.co.trillium.secureskye.ota.vehicle.feign.VehicleRegistryClient
import jp.co.trillium.secureskye.ota.vehicle.mapper.MetadataMapper
import jp.co.trillium.secureskye.ota.vehicle.model.Image
import jp.co.trillium.secureskye.ota.vehicle.model.Metadata
import jp.co.trillium.secureskye.ota.vehicle.model.PackageStatus
import jp.co.trillium.secureskye.ota.vehicle.repository.MetadataRepository
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareVersionListProto
import jp.co.trillium.secureskye.vehicle.registry.api.proto.SoftwareVersionProto
import mu.KLogging
import org.apache.commons.compress.archivers.ArchiveInputStream
import org.apache.commons.io.FilenameUtils
import org.apache.commons.io.input.TeeInputStream
import org.bouncycastle.crypto.digests.SHA256Digest
import org.bouncycastle.crypto.io.DigestOutputStream
import org.bouncycastle.util.encoders.Hex
import org.bson.types.ObjectId
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.data.mongodb.core.convert.MongoConverter
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.inValues
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.data.mongodb.gridfs.GridFsOperations
import org.springframework.messaging.simp.SimpMessageSendingOperations
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.OutputStream
import java.security.Principal
import java.util.UUID
import javax.persistence.EntityNotFoundException

/**
 * Image archive service.
 */
@Service
class ImageArchiveService(
    private val gridFsOperations: GridFsOperations,
    private val otaGridFSBucket: GridFSBucket,
    @Qualifier("yamlMapper")
    private val yamlMapper: ObjectMapper,
    private val metadataRepository: MetadataRepository,
    private val metadataMapper: MetadataMapper,
    private val simpMessageSendingOperations: SimpMessageSendingOperations,
    private val vehicleAdminClient: VehicleAdminClient,
    private val mongoConverter: MongoConverter,
    private val vehicleRegistryClient: VehicleRegistryClient,
    private val objectIdMapper: ObjectIdMapper,
    private val uuidMapper: UuidMapper,
    private val objectMapper: ObjectMapper
) {

    private companion object : KLogging() {
        /**
         * Default name for archive's metadata file.
         */
        private const val METADATA_FILENAME = "metadata.yaml"
    }

    /**
     * Upload an archive [multipartFile], that follows a specific format, to the database, extracting and converting
     * it on the way. Returns the [Metadata], which contains all further needed information.
     */
    fun upload(multipartFile: MultipartFile, packageName: String): Metadata {

        if (isNameDuplicated(packageName)) {
            throw InvalidMetadataException("Package name $packageName is duplicated")
        }

        val (firstExt, secondExt) = multipartFile.extractExtensions()
        return multipartFile.inputStream.decompress(firstExt).asArchive(secondExt).use { input ->
            val metadata = readMetadata(input)
            validateMetadata(metadata)
            saveImageFiles(metadata, input)
            metadata.name = packageName
            saveMetadata(metadata)
        }
    }

    /**
     * Check input [name] for package is duplicated or not.
     */
    private fun isNameDuplicated(name: String): Boolean = metadataRepository.existsByName(name)

    /**
     * Publish a previously uploaded image identified by its [imageId], sending out notifications to all
     * applicable connected devices.
     */
    fun publish(imageId: ObjectId) {
        metadataRepository.findById(imageId)
            .orElseThrow { EntityNotFoundException("Metadata with ID '$imageId' doesn't exist") }
            .let {
                logger.debug {
                    "Send message to /updateFeeds/${it.family}: \n${objectMapper.writeValueAsString(listOf(it))}"
                }
                simpMessageSendingOperations.convertAndSend(
                    "/updateFeeds/${it.family}",
                    listOf(it)
                )
            }
    }

    /**
     * Publish a previously uploaded image identified by its [imageId], sending out notifications to all
     * applicable connected devices.
     */
    fun publishByVin(imageId: ObjectId, vin: String?) {
        metadataRepository.findById(imageId)
            .orElseThrow { EntityNotFoundException("Metadata with ID '$imageId' doesn't exist") }
            .let {
                logger.debug {
                    "Send message to /updateFeeds/vehicles/$vin: \n${objectMapper.writeValueAsString(listOf(it))}"
                }
                simpMessageSendingOperations.convertAndSend(
                    "/updateFeeds/vehicles/$vin",
                    listOf(it)
                )
            }
    }

    /**
     * Delete a previously uploaded OTA Package identified by its [metadataId].
     */
    fun delete(metadataId: ObjectId) {
        metadataRepository.findById(metadataId).filter { !it.deleted }
            .orElseThrow { EntityNotFoundException("Metadata with ID '$metadataId' doesn't exist") }
            .apply {
                deleted = true
            }
            .let(metadataRepository::save)
    }

    /**
     * Rename the OTA Package identified by its [metadataId] by [newName].
     */
    fun rename(metadataId: ObjectId, newName: String): Metadata {

        return metadataRepository.findById(metadataId).filter { !it.deleted }
            .orElseThrow { EntityNotFoundException("Metadata with ID '$metadataId' doesn't exist") }
            .apply {
                if (name != newName) {
                    if (isNameDuplicated(newName)) {
                        throw InvalidMetadataException("Package name $newName is duplicated")
                    }
                    name = newName
                }
            }
            .let(metadataRepository::save)
    }

    /**
     * Publish the OTA Package identified by its [metadataId] to be available to update on ECU.
     */
    fun publishPackage(metadataId: ObjectId): Metadata {

        return metadataRepository.findById(metadataId).filter { !it.deleted }.filter {
            it.status == PackageStatus.New || it.status == PackageStatus.Passed
        }
            .orElseThrow { EntityNotFoundException("Metadata with ID '$metadataId' doesn't exist") }
            .apply {
                status = PackageStatus.Released

                // Create software version in [vehicle-registry] service for each image in package
                val builder = SoftwareVersionListProto.newBuilder()
                for (ecu in this.ecus) {
                    for (image in ecu.items) {
                        builder.addData(
                            SoftwareVersionProto.newBuilder()
                                .setVersionCode(image.versionCode)
                                .setVersionName(image.versionName)
                                .setChangelog(image.changelog)
                                .setImageId(objectIdMapper.objectId(image.id))
                                .setEcuDeviceId(ecu.id)
                                .setSoftwareId(uuidMapper.uuidString(image.softwareId))
                        )
                    }
                }
                vehicleRegistryClient.saveNewVersion(builder.build())
            }
            .let(metadataRepository::save)
    }

    /**
     * List metadata of new updates of vehicle [family].
     */
    fun listMetadata(family: String, released: Boolean = false) =
        if (family.isBlank()) {
            metadataRepository.findAll()
        } else {
            metadataRepository.findByFamily(family)
        }.asSequence().filterNot { it.deleted }.filter {
            if (released) {
                it.status == PackageStatus.Released
            } else {
                true
            }
        }
            .sortedByDescending { it.date }.toList()

    /**
     * Read the [input] archive and try to extract the [Metadata] file with name [METADATA_FILENAME].
     *
     * @throws MetadataNotFoundException If [METADATA_FILENAME] file cannot be found.
     * @throws InvalidMetadataException If the metadata was malformed.
     */
    private fun readMetadata(input: ArchiveInputStream): Metadata {
        if (input.bytesRead > 0)
            throw MetadataNotFoundException(
                message = "The '$METADATA_FILENAME' has to be the first entry in the " +
                        "archive"
            )

        val metadata = input.nextEntry
        if (metadata?.name != METADATA_FILENAME)
            throw MetadataNotFoundException(
                metadata?.name ?: "",
                "The '$METADATA_FILENAME' has to be the first entry in the archive. " +
                        "Instead found '${metadata?.name}'"
            )

        try {
            return yamlMapper.readValue(input.readBytes())
        } catch (e: Exception) {
            when (e) {
                is JsonMappingException,
                is JsonParseException -> throw InvalidMetadataException(e.message, e)
                else -> throw e
            }
        }
    }

    /**
     * Validate the image archive's [metadata].
     *
     * @throws InvalidMetadataException In case there are any errors validating the [metadata].
     */
    @Suppress("ComplexMethod")
    private fun validateMetadata(metadata: Metadata) {
        metadata.ecus.flatMap { it.items }.filterNot { it.versionName.isBlank() }.forEach {
            try {
                Semver(it.versionName)
            } catch (e: SemverException) {
                throw InvalidMetadataException(e.message, e)
            }
        }

        if (metadata.ecus.isEmpty())
            throw InvalidMetadataException("The update must contain at least one ECU")
        if (metadata.ecus.distinctBy { it.id }.size != metadata.ecus.size)
            throw InvalidMetadataException("The ID of every ECU has to be unique")

        for (items in metadata.ecus.map { it.items }) {
            if (items.isEmpty())
                throw InvalidMetadataException("Every ECU needs to contain at least one image")
            if (items.any { it.softwareId == UUID(0, 0) })
                throw InvalidMetadataException("Every image needs to contain software-id")
            if (items.any { it.versionName.isBlank() })
                throw InvalidMetadataException("Every image needs to contain software-version")
            if (items.distinctBy { it.id }.size != items.size)
                throw InvalidMetadataException("The image names for a single ECU have to be unique")
        }
    }

    /**
     * Save all images listed in the [metadata] from [input] to the database.
     */
    @Suppress("TooGenericExceptionThrown") // Below RuntimeException case should never happen
    private fun saveImageFiles(metadata: Metadata, input: ArchiveInputStream) {
        val nameToData = metadata.ecus.flatMap { ecu ->
            ecu.items.map { item -> item.fullPath(ecu) to (item to ecu) }
        }.toMap().toMutableMap()

        var archive = input.nextEntry
        while (archive != null) {
            if (archive.isDirectory) {
                archive = input.nextEntry
                continue
            }

            val archiveName: String = FilenameUtils.separatorsToUnix(archive.name)
            if (!nameToData.keys.contains(archiveName)) {
                deleteImages(metadata)
                throw UnknownImageException(archiveName, "Unknown image found in archive '$archiveName'")
            }

            val (image, ecu) = nameToData[archiveName] ?: throw RuntimeException()
            val digest = DigestOutputStream(SHA256Digest())
            val tee = TeeInputStream(input, digest)

            image.id = gridFsOperations.store(tee, archiveName, metadataMapper.imageMetadata(image, ecu, metadata))

            val hash = Hex.toHexString(digest.digest)
            if (hash != image.checksum) {
                deleteImages(metadata)
                throw ImageIntegrityException(image, hash)
            }

            nameToData.remove(archiveName)
            archive = input.nextEntry
        }

        if (nameToData.isNotEmpty()) {
            deleteImages(metadata)
            throw MetadataImageNotFoundException(
                nameToData.keys,
                "Metadata image(s) missing: ${nameToData.keys.joinToString()}"
            )
        }
    }

    /**
     * Save the extracted [metadata] to the database, returning its new [ObjectId].
     */
    private fun saveMetadata(metadata: Metadata) = try {
        metadataRepository.save(metadata)
    } catch (e: Exception) {
        deleteImages(metadata)
        val cause = e.cause
        throw if (cause is MongoWriteException && cause.error.category == ErrorCategory.DUPLICATE_KEY)
            InvalidMetadataException("One or more items of the package already exist")
        else e
    }

    /**
     * Delete all images that may have already been created for [metadata].
     */
    private fun deleteImages(metadata: Metadata) {
        val ids = metadata.ecus.flatMap { ecu -> ecu.items.map { it.id } }
        gridFsOperations.delete(Query.query(Criteria.where("_id").inValues(ids)))
        metadataRepository.delete(metadata)
    }

    /**
     * Load the update metadata for [metadataId].
     */
    fun loadMetadata(metadataId: ObjectId, principal: Principal): MetadataProto =
        metadataRepository.findById(metadataId).filter { !it.deleted }
            .orElseThrow { IllegalArgumentException("OTA Package ID $metadataId not found") }
            .also { metadata ->
                if (!principal.isVehicleClient()) return@also
                val vehicleInfo = vehicleAdminClient.getVehicle(principal.name, true)
                if (metadata.family != vehicleInfo.modelName)
                    throw NotApplicableVehicleException(
                        metadataId,
                        vehicleInfo.id,
                        vehicleInfo.modelName,
                        metadata.family,
                        "The metadata '$metadataId' is not applicable for vehicle '${vehicleInfo.id}'. " +
                                "Requires vehicle of family '${metadata.family}' but is '${vehicleInfo.modelName}'"
                    )
            }
            .let(metadataMapper::metadata)

    /**
     * Load the image for [imageId] and write it directly to [output].
     */
    fun loadImage(imageId: ObjectId, output: OutputStream) {
        try {
            otaGridFSBucket.openDownloadStream(imageId).use { input ->
                output.use { output ->
                    input.copyTo(output)
                }
            }
        } catch (e: MongoGridFSException) {
            throw ImageNotFoundException(imageId, e.message, e)
        }
    }

    /**
     * Check if requested image [imageId] is applicable for vehicle [principal].
     *
     * @throws ImageNotFoundException Cannot find image of [imageId].
     * @throws NotApplicableVehicleException When image is not applicable for this vehicle.
     */
    fun checkApplicable(imageId: ObjectId, principal: Principal) {
        if (!principal.isVehicleClient()) return

        // Get vehicle info from 'vehicle-admin' service
        val vehicleInfo = vehicleAdminClient.getVehicle(principal.name, true)

        // Find the image in GridFS
        val file = gridFsOperations.findOne(Query.query(Criteria.where("_id").isEqualTo(imageId)))
            ?: throw ImageNotFoundException(imageId, "Image ID '$imageId' not found.")

        // Check for image's metadata
        val metadata = mongoConverter.read(Image.Metadata::class.java, file.metadata)

        if (metadata.parent.family != vehicleInfo.modelName)
            throw NotApplicableVehicleException(
                imageId,
                vehicleInfo.id,
                vehicleInfo.modelName,
                metadata.parent.family,
                "The image '$imageId' is not applicable for vehicle '${vehicleInfo.id}'. " +
                        "Requires vehicle of family '${metadata.parent.family}' but is '${vehicleInfo.modelName}'"
            )
    }

    /**
     * Check if a [Principal] is a client credential only login from a vehicle.
     */
    private fun Principal.isVehicleClient(): Boolean =
        this is OAuth2Authentication &&
                isClientOnly &&
                oAuth2Request.grantType == "client_credentials" &&
                oAuth2Request.clientId.startsWith("vehicle-") &&
                oAuth2Request.clientId.substring("vehicle-".length).isUuid()

    /**
     * Check if a [String] is a valid [UUID].
     */
    private fun String.isUuid(): Boolean = try {
        UUID.fromString(this)
        true
    } catch (e: IllegalArgumentException) {
        logger.error(e) { "$this is not an UUID" }
        false
    }

    /**
     * Statistics about image archives.
     */
    fun statistics(): ImageArchiveStatisticsProto = ImageArchiveStatisticsProto.newBuilder()
        .setImageArchiveCount(metadataRepository.count())
        .build()

    /**
     * Delete multiple image by listId.
     */
    fun deleteMultipleImage(listId: List<ObjectId>) {
        listId.forEach { id ->
            val checkPresent = metadataRepository.findById(id)
            if (!checkPresent.isPresent)
                throw IllegalArgumentException("Cannot find image with Id: $id")
        }
        listId.forEach { id ->
            metadataRepository.deleteById(id)
        }
    }
}
