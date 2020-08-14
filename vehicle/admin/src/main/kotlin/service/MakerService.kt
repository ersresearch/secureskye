/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.service

import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleMakerListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleMakerProto
import jp.co.trillium.secureskye.vehicle.admin.mapper.ModelMapper
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleMakerRepository
import jp.co.trillium.secureskye.vehicle.admin.repository.VehicleModelRepository
import org.springframework.stereotype.Service
import java.lang.IllegalArgumentException
import java.util.UUID
import javax.persistence.EntityNotFoundException

/**
 * Business logic for managing vehicle markers.
 */
@Service
class MakerService(
    private val vehicleModelRepository: VehicleModelRepository,
    private val vehicleMakerRepository: VehicleMakerRepository,
    private val modelMapper: ModelMapper
) {

    /**
     * Create a new vehicle maker with the given [maker] and return it as a [VehicleMakerProto].
     */
    fun createMaker(maker: VehicleMakerProto): VehicleMakerProto {
        if (!maker.name.isNullOrEmpty()) {
            val entities = vehicleMakerRepository.save(maker.let(modelMapper::toMaker))
            return entities.let(modelMapper::vehicleMaker)
        }
        throw IllegalArgumentException("Name must not be null or empty !!")
    }

    /**
     * List all existing vehicle maker as a [VehicleMakerListProto].
     */
    fun listAllMaker(): VehicleMakerListProto = vehicleMakerRepository.findAll()
        .let(modelMapper::vehicleMakerList)

    /**
     * Find a vehicle maker by its [id], returning it as a [VehicleMakerProto].
     *
     * @throws EntityNotFoundException When the vehicle model doesn't exist.
     */
    fun findMaker(id: UUID): VehicleMakerProto = vehicleMakerRepository.findById(id)
        .orElseThrow { EntityNotFoundException() }
        .let(modelMapper::vehicleMaker)

    /**
     * Rename an existing vehicle maker (identified by [id]) to the given [maker] info.
     */
    fun update(id: UUID, maker: VehicleMakerProto): VehicleMakerProto =
        vehicleMakerRepository.findById(id)
            .orElseThrow { EntityNotFoundException("Cannot find vehicle maker.") }
            .apply {
                name = maker.name
            }
            .let(vehicleMakerRepository::save)
            .let(modelMapper::vehicleMaker)

    /**
     * Delete an existing vehicle maker (identified by [id]), only if it doesn't have any model assigned.
     */
    fun deleteMaker(id: UUID) {
        if (vehicleModelRepository.countByMakerId(id) > 0)
            throw IllegalArgumentException("Can't delete maker while related model exist")

        vehicleMakerRepository.getOne(id).let(vehicleMakerRepository::delete)
    }
}
