/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.obd2device.event.service

import com.google.protobuf.util.JsonFormat
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.obd2device.admin.api.proto.Obd2DeviceProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.ComponentTypeProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.CriticalLevelProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.DisplaySettingsProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.GearShiftProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.LongLatProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.MilAlertProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.Obd2EventListProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.Obd2EventProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.RpmEventProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.SpeedEventProto
import jp.co.trillium.secureskye.obd2device.event.api.proto.TimeSeriesDataProto
import jp.co.trillium.secureskye.obd2device.event.exception.Obd2EventInvalidFormatException
import jp.co.trillium.secureskye.obd2device.event.feign.Obd2DeviceAdminClient
import jp.co.trillium.secureskye.obd2device.event.feign.VehicleAdminClient
import jp.co.trillium.secureskye.obd2device.event.feign.VehicleMessageClient
import jp.co.trillium.secureskye.obd2device.event.model.Obd2Event
import jp.co.trillium.secureskye.obd2device.event.repository.Obd2EventRepository
import jp.co.trillium.secureskye.vehicle.admin.api.proto.ModelDisplaySettingsListProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.ModelDisplaySettingsTypeProto
import jp.co.trillium.secureskye.vehicle.admin.api.proto.VehicleTrackingStatusProto
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlertDto
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentAlertType
import jp.co.trillium.secureskye.vehicle.message.model.VehicleComponentType
import jp.co.trillium.secureskye.websocket.client.WebSocketService
import jp.co.trillium.secureskye.websocket.client.model.WebSocketMessage
import org.bson.Document
import org.springframework.cache.annotation.Cacheable
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.util.CollectionUtils
import java.util.OptionalDouble
import java.util.UUID

/**
 * OBD-II event service.
 */
@Service
class Obd2EventService(
    private val obd2DeviceAdminClient: Obd2DeviceAdminClient,
    private val vehicleAdminClient: VehicleAdminClient,
    private val vehicleMessageClient: VehicleMessageClient,
    private val uuidMapper: UuidMapper,
    private val webSocketService: WebSocketService,
    private val obd2EventRepository: Obd2EventRepository
) {
    companion object {
        /**
         * Message for socket.io.
         */
        private const val LATEST_DATA_MESSAGE = "LatestDeviceData"

        /**
         * Time series separator.
         */
        private const val TIMESERIES_SEPARATOR = 7

        /**
         * One nano second.
         */
        private const val NANOSECOND = 1000000000
    }

    /**
     * Get latest OBD-II event data (1 record) of [vehicleId]. If [minTimestamp] is present, retrieve all records
     * greater than or equal [minTimestamp].
     */
    fun getObd2EventByVehicle(vehicleId: UUID, minTimestamp: Long? = null): Obd2EventListProto =
        rawDataToProto(
            vehicleId,
            if (minTimestamp == null) obd2EventRepository.findLatestLimitByVehicle(vehicleId, 1)
            else obd2EventRepository.findLatestSinceByVehicle(vehicleId, minTimestamp)
        )

    /**
     * Save a single [events] from OBD-II device [deviceId] which is attached to vehicle [vehicleId].
     */
    fun saveObd2Event(deviceId: UUID, vehicleId: UUID?, events: List<Obd2Event>): List<Obd2Event> =
        obd2EventRepository.saveAll(events)

    /**
     * Parse [rawData] String to List of [Obd2Event].
     */
    @Suppress("UNCHECKED_CAST")
    fun parseRawData(deviceId: UUID, vehicleId: UUID?, rawData: String): List<Obd2Event> =
        (Document.parse(rawData)["data"] as List<Document>).map {
            val timestamp = it["timestamp", Number::class.java]?.toLong()
                ?.apply { it.remove("timestamp") }
                ?: throw Obd2EventInvalidFormatException("Missing `timestamp`")
            Obd2Event(deviceId = deviceId, vehicleId = vehicleId, timestamp = timestamp, data = it)
        }

    /**
     * Parse protobuf to entity.
     */
    fun parseProto(deviceId: UUID, vehicleId: UUID?, events: Obd2EventListProto): List<Obd2Event> {
        val jsonConvert = JsonFormat.printer()
        return events.dataList.map {
            val timestamp = it.timestamp
            val data = Obd2EventProto.newBuilder(it).clearTimestamp()
            Obd2Event(
                deviceId = deviceId,
                vehicleId = vehicleId,
                timestamp = timestamp,
                data = Document.parse(jsonConvert.print(data))
            )
        }
    }

    /**
     * Get model's display settings.
     */
    fun getModelSettings(vehicleId: UUID?): ModelDisplaySettingsListProto {
        return if (vehicleId != null) {
            vehicleAdminClient.getDisplaySettings(
                vehicleAdminClient.getVehicle(
                    vehicleId.let(uuidMapper::uuidString),
                    false
                ).modelId.let(uuidMapper::uuidString)
            )
        } else {
            ModelDisplaySettingsListProto.getDefaultInstance()
        }
    }

    /**
     * Map [Obd2Event] to [Obd2EventProto].
     */
    fun rawDataToProto(vehicleId: UUID?, rawDeviceData: List<Obd2Event>): Obd2EventListProto {
        // Get model's display settings and map it to a new [DisplaySettingsProto].
        val settings = DisplaySettingsProto.newBuilder().apply {
            for (i in getModelSettings(vehicleId).listList) {
                when (i.settings) {
                    ModelDisplaySettingsTypeProto.SPEED -> this.speed = i.value
                    ModelDisplaySettingsTypeProto.FUEL -> this.fuel = i.value
                    ModelDisplaySettingsTypeProto.TEMPERATURE -> this.temperature = i.value
                    ModelDisplaySettingsTypeProto.RPM -> this.rpm = i.value
                    ModelDisplaySettingsTypeProto.TRIP_ODOMETER -> this.tripOdometer = i.value
                    ModelDisplaySettingsTypeProto.ODOMETER -> this.odometer = i.value
                    ModelDisplaySettingsTypeProto.GEAR -> this.gear = i.value
                    ModelDisplaySettingsTypeProto.ROUTE -> this.route = i.value
                    ModelDisplaySettingsTypeProto.ALERT_NODE -> this.ecuAlertNode = i.value
                    ModelDisplaySettingsTypeProto.SPEED_GRAPH -> this.speedGraph = i.value
                    ModelDisplaySettingsTypeProto.RPM_GRAPH -> this.rpmGraph = i.value
                    ModelDisplaySettingsTypeProto.BRAKING_GRAPH -> this.brakingGraph = i.value
                    ModelDisplaySettingsTypeProto.MPG_GRAPH -> this.mpgGraph = i.value
                    ModelDisplaySettingsTypeProto.MIL_ENGINE -> this.milEngine = i.value
                    ModelDisplaySettingsTypeProto.MIL_TIRE_PRESSURE -> this.milTirePressure = i.value
                    ModelDisplaySettingsTypeProto.MIL_ENGINE_OIL -> this.milEngineOil = i.value
                    ModelDisplaySettingsTypeProto.MIL_BRAKES -> this.milBrakes = i.value
                    ModelDisplaySettingsTypeProto.MIL_ENGINE_COOLANT -> this.milEngineCoolant = i.value
                    ModelDisplaySettingsTypeProto.MIL_BATTERY -> this.milBattery = i.value
                    ModelDisplaySettingsTypeProto.OTHER -> this.other = i.value
                    else -> {
                    }
                }
            }
        }.build()
        val listBuilder = Obd2EventListProto.newBuilder()

        rawDeviceData.forEach { doc ->
            val builder = Obd2EventProto.newBuilder()
            builder.timestamp = doc.timestamp
            // Check display settings and set value for each parameter
            // If the setting is set to 'false', value of the parameter will be unset
            if (settings.speed) {
                doc["speed", Number::class.java]?.toDouble()?.let(builder::setSpeed)
            }
            if (settings.fuel) {
                doc["fuel", Number::class.java]?.toDouble()?.let(builder::setFuel)
                doc["availableDrivingDistance", Number::class.java]?.toDouble()
                    ?.let(builder::setAvailableDrivingDistance)
            }
            if (settings.temperature) {
                doc["engineCoolant", Number::class.java]?.toDouble()?.let(builder::setEngineCoolant)
            }
            if (settings.rpm) {
                doc["rpm", Number::class.java]?.toInt()?.let(builder::setRpm)
            }
            if (settings.odometer) {
                doc["odometer", Number::class.java]?.toDouble()?.let(builder::setOdometer)
            }
            if (settings.tripOdometer) {
                doc["tripOdometer", Number::class.java]?.toDouble()?.let(builder::setTripOdometer)
            }
            val gearShift = doc["gearShift", String::class.java]
            if (gearShift == null && settings.gear) {
                builder.gearShift = GearShiftProto.NEUTRAL
            } else if (gearShift != null && settings.gear) {
                when (gearShift) {
                    "ONE" -> builder.gearShift = GearShiftProto.ONE
                    "TWO" -> builder.gearShift = GearShiftProto.TWO
                    "NEUTRAL" -> builder.gearShift = GearShiftProto.NEUTRAL
                    "DRIVE" -> builder.gearShift = GearShiftProto.DRIVE
                    "REVERSE" -> builder.gearShift = GearShiftProto.REVERSE
                    "PARK" -> builder.gearShift = GearShiftProto.PARK
                    else -> builder.gearShift = GearShiftProto.NEUTRAL
                }
            }
            if (settings.route) {
                val gpsBuilder = LongLatProto.newBuilder()
                val gps = doc["gps", Document::class.java]
                if (gps !== null) {
                    gps["longitude", Number::class.java]?.toDouble()?.let(gpsBuilder::setLongitude)
                    gps["latitude", Number::class.java]?.toDouble()?.let(gpsBuilder::setLatitude)
                    builder.setGps(gpsBuilder)
                }
            }
            val milList = doc["mil", List::class.java]
            milList?.forEach {
                val milData = it as? Document

                if (milData != null) {
                    val milBuilder = MilAlertProto.newBuilder()
                    val type = milData["type", String::class.java]

                    if (settings.milEngine && type == "ENGINE" ||
                        settings.milTirePressure && type == "TIRE_PRESSURE" ||
                        settings.milEngineOil && type == "ENGINE_OIL" ||
                        settings.milBrakes && type == "BRAKES" ||
                        settings.milEngineCoolant && type == "ENGINE_COOLANT" ||
                        settings.milBattery && type == "BATTERY"
                    ) {
                        ComponentTypeProto.valueOf(type).let(milBuilder::setType)
                        milData["criticalLevel", String::class.java]?.let { cl -> CriticalLevelProto.valueOf(cl) }
                            .let(milBuilder::setCriticalLevel)
                        milData["content", String::class.java]?.let(milBuilder::setContent)

                        builder.addMil(milBuilder)
                    }
                }
            }

            listBuilder.addData(builder)
        }
        return listBuilder.build()
    }

    /**
     * Stream [events] to socket.io.
     */
    @Async
    fun streamVehicleParameters(vehicleId: UUID, events: Obd2EventListProto) {
        try {
            val latestEvent =
                events.dataList.maxBy { it.timestamp } ?: Obd2EventProto.newBuilder().setTimestamp(-1).build()
            val message = WebSocketMessage(
                latestEvent.timestamp,
                LATEST_DATA_MESSAGE,
                JsonFormat.printer().print(events)
            )
            webSocketService.sendMessage(
                "DeviceData",
                uuidMapper.uuidString(vehicleId),
                message
            )
        } catch (e: Exception) {
            System.out.println(e.stackTrace)
        }
    }

    /**
     * Stream [events] to socket.io.
     */
    @Async
    fun streamTimeSeriesData(vehicleId: UUID, events: Obd2EventListProto) {
        try {
            events.dataList.forEach { event ->
                val timestamp = event.timestamp
                val speed = event.speed
                val rpm = event.rpm
                if (speed != 0.0) {
                    executeSpeedData(vehicleId, timestamp, speed)
                }
                if (rpm != 0) {
                    executeRpmData(vehicleId, timestamp, rpm)
                }
            }
        } catch (e: Exception) {
            System.out.println(e.stackTrace)
        }
    }

    /**
     * Stream [speed] Data to socket.io.
     */
    private fun executeSpeedData(vehicleId: UUID, timestamp: Long, speed: Double) {
        val mapDataSpeed: HashMap<String, Double> = hashMapOf("speed" to speed)
        val message = WebSocketMessage(timestamp, "Time/Data Graph", mapDataSpeed)
        webSocketService.sendMessage("time-data-graph-speed", vehicleId.toString(), message)
    }

    /**
     * Stream [rpm] Data to socket.io.
     */
    private fun executeRpmData(vehicleId: UUID, timestamp: Long, rpm: Int) {
        val mapDataRpm: HashMap<String, Int> = hashMapOf("rpm" to rpm)
        val message = WebSocketMessage(timestamp, "Time/Data Graph", mapDataRpm)
        webSocketService.sendMessage("time-data-graph-rpm", vehicleId.toString(), message)
    }

    /**
     * Stream [events] to socket.io.
     */
    @Async
    fun streamAlertProcessing(vehicleId: UUID, events: Obd2EventListProto) {
        try {
            var parentTimestamp: Long
            events.dataList.forEach { event ->
                parentTimestamp = event.timestamp
                event.milList.filter { it.criticalLevel > CriticalLevelProto.INFO }.map {
                    VehicleComponentAlertDto(
                        vehicleId = vehicleId,
                        componentType = when (it.type) {
                            ComponentTypeProto.ENGINE -> VehicleComponentType.ENGINE
                            ComponentTypeProto.TIRE_PRESSURE -> VehicleComponentType.TIRE_PRESSURE
                            ComponentTypeProto.ENGINE_OIL -> VehicleComponentType.ENGINE_OIL
                            ComponentTypeProto.BRAKES -> VehicleComponentType.BRAKES
                            ComponentTypeProto.ENGINE_COOLANT -> VehicleComponentType.ENGINE_COOLANT
                            ComponentTypeProto.BATTERY -> VehicleComponentType.BATTERY
                            ComponentTypeProto.UNRECOGNIZED -> VehicleComponentType.UNKNOWN
                            else -> throw IllegalArgumentException()
                        },
                        alertType = when (it.criticalLevel) {
                            CriticalLevelProto.WARNING -> VehicleComponentAlertType.WARNING
                            CriticalLevelProto.DANGER -> VehicleComponentAlertType.CRITICAL
                            else -> throw IllegalArgumentException()
                        },
                        timestamp = parentTimestamp,
                        detailInfo = it.content
                    )
                }.also {
                    vehicleMessageClient.createAlert(it)
                }
            }
        } catch (e: Exception) {
            System.out.println(e.stackTrace)
        }
    }

    /**
     * Update vehicle [vehicleId] status based on [events].
     * Base on speed, update vehicle's connection status.
     */
    @Async
    fun updateVehicleTrackingStatus(vehicleId: UUID, events: Obd2EventListProto) {
        try {
            val latestEvent =
                events.dataList.maxBy { it.timestamp } ?: Obd2EventProto.newBuilder().setSpeed(-1.0).build()
            vehicleAdminClient.updateTracking(
                vehicleId,
                when {
                    latestEvent.speed > 0.0 -> VehicleTrackingStatusProto.MOVING
                    latestEvent.speed == 0.0 -> VehicleTrackingStatusProto.STOPPED
                    else -> VehicleTrackingStatusProto.UNKNOWN
                }
            )
        } catch (e: Exception) {
            System.out.println(e.stackTrace)
        }
    }

    /**
     * Find device info of device client id.
     */
    @Cacheable("client-id-to-device-id")
    fun findDevice(clientId: String): Obd2DeviceProto = clientId
        .let { obd2DeviceAdminClient.getObd2Device(it, true) }

    /**
     * Get list of time series data for vehicle speed.
     * Base on model display settings return TimeSeriesData - return an empty proto if settings is off.
     */
    fun speedDataByVehicle(
        vehicleId: UUID,
        minTimestamp: Long? = null,
        timeSeriesOption: Long? = null
    ): TimeSeriesDataProto {
        var speedGraphSettings = true
        getModelSettings(vehicleId).let {
            for (i in it.listList) {
                if (i.settings == ModelDisplaySettingsTypeProto.SPEED_GRAPH) {
                    speedGraphSettings = i.value
                }
            }
        }
        if (speedGraphSettings) {
            when {
                minTimestamp == null -> return obd2EventRepository.findLatestLimitByVehicle(vehicleId, 1)
                    .let(::rawDataToSpeedProto)
                timeSeriesOption == null -> return obd2EventRepository.findLatestSinceByVehicle(
                    vehicleId,
                    minTimestamp
                ).let(::rawDataToSpeedProto)
                else -> {
                    val tmpData: List<Obd2Event> = obd2EventRepository.findLatestSinceByVehicle(
                        vehicleId,
                        minTimestamp
                    )
                    if (CollectionUtils.isEmpty(tmpData)) {
                        return TimeSeriesDataProto.getDefaultInstance()
                    }
                    val period = timeSeriesOption / TIMESERIES_SEPARATOR
                    val data: MutableList<Obd2Event> = mutableListOf()
                    var tmpTimestamp = minTimestamp + NANOSECOND
                    if (tmpData.last().timestamp > tmpTimestamp)
                        data.add(Obd2Event(timestamp = tmpTimestamp))
                    else data.add(tmpData.last())
                    for (i in 1 until TIMESERIES_SEPARATOR - 1) {
                        var avg = 0.0
                        val lastTimestamp = tmpTimestamp
                        tmpTimestamp += period
                        val subList = tmpData.filter { e -> e.timestamp in lastTimestamp..tmpTimestamp }
                        if (!CollectionUtils.isEmpty(subList)) {
                            val average: OptionalDouble = subList.stream().mapToDouble {
                                val speed: Double? = it["speed", Number::class.java]?.toDouble()
                                if (speed != null) {
                                    return@mapToDouble speed
                                }
                                return@mapToDouble 0.0
                            }.average()
                            if (average.isPresent) {
                                avg = average.asDouble
                            }
                        }
                        // default instance
                        data.add(
                            Obd2Event(
                                timestamp = tmpTimestamp,
                                data = mapOf("speed" to avg)
                            )
                        )
                    }
                    if (tmpData.first().timestamp < tmpTimestamp)
                        data.add(Obd2Event(timestamp = tmpTimestamp + period))
                    else data.add(tmpData.first())
                    return data.let(::rawDataToSpeedProto)
                }
            }
        }
        return TimeSeriesDataProto.getDefaultInstance()
    }

    /**
     * Map [Obd2Event] to [SpeedEventProto].
     */
    fun rawDataToSpeedProto(rawDeviceData: List<Obd2Event>): TimeSeriesDataProto {
        val listBuilder = TimeSeriesDataProto.newBuilder()
        rawDeviceData.forEach { doc ->
            val builder = SpeedEventProto.newBuilder()
            doc.timestamp.let(builder::setTimestamp)
            doc["speed", Number::class.java]?.toDouble()?.let(builder::setValue)
            listBuilder.addSpeed(builder)
        }
        return listBuilder.build()
    }

    /**
     * Get list of time series data for vehicle speed.
     * Base on model display settings return TimeSeriesData - return an empty proto if settings is off.
     */
    fun rpmDataByVehicle(
        vehicleId: UUID,
        minTimestamp: Long?,
        timeSeriesOption: Long? = null
    ): TimeSeriesDataProto {
        var rpmGraphSettings = true
        getModelSettings(vehicleId).let {
            for (i in it.listList) {
                if (i.settings == ModelDisplaySettingsTypeProto.RPM_GRAPH) {
                    rpmGraphSettings = i.value
                }
            }
        }
        if (rpmGraphSettings) {
            when {
                minTimestamp == null -> return obd2EventRepository.findLatestLimitByVehicle(vehicleId, 1)
                    .let(::rawDataToRpmProto)
                timeSeriesOption == null -> return obd2EventRepository.findLatestSinceByVehicle(
                    vehicleId,
                    minTimestamp
                ).let(::rawDataToRpmProto)
                else -> {
                    val tmpData: List<Obd2Event> = obd2EventRepository.findLatestSinceByVehicle(
                        vehicleId,
                        minTimestamp
                    )
                    if (CollectionUtils.isEmpty(tmpData)) {
                        return TimeSeriesDataProto.getDefaultInstance()
                    }
                    val period = timeSeriesOption / TIMESERIES_SEPARATOR
                    val data: MutableList<Obd2Event> = mutableListOf()
                    var tmpTimestamp = minTimestamp + NANOSECOND
                    if (tmpData.last().timestamp > tmpTimestamp)
                        data.add(Obd2Event(timestamp = tmpTimestamp))
                    else data.add(tmpData.last())
                    for (i in 1 until TIMESERIES_SEPARATOR - 1) {
                        var avg = 0
                        val lastTimestamp = tmpTimestamp
                        tmpTimestamp += period
                        val subList = tmpData.filter { e -> e.timestamp in lastTimestamp..tmpTimestamp }
                        if (!CollectionUtils.isEmpty(subList)) {
                            val average: OptionalDouble = subList.stream().mapToInt {
                                val rpm: Int? = it["rpm", Number::class.java]?.toInt()
                                if (rpm != null) {
                                    return@mapToInt rpm
                                }
                                return@mapToInt 0
                            }.average()
                            if (average.isPresent) {
                                avg = average.asDouble.toInt()
                            }
                        }
                        // default instance
                        data.add(
                            Obd2Event(
                                timestamp = tmpTimestamp,
                                data = mapOf("rpm" to avg)
                            )
                        )
                    }
                    if (tmpData.first().timestamp < tmpTimestamp)
                        data.add(Obd2Event(timestamp = tmpTimestamp + period))
                    else data.add(tmpData.first())
                    return data.let(::rawDataToRpmProto)
                }
            }
        }
        return TimeSeriesDataProto.getDefaultInstance()
    }

    /**
     * Map [Obd2Event] to [RpmEventProto].
     */
    fun rawDataToRpmProto(rawDeviceData: List<Obd2Event>): TimeSeriesDataProto {
        val listBuilder = TimeSeriesDataProto.newBuilder()
        rawDeviceData.forEach { doc ->
            val builder = RpmEventProto.newBuilder()
            doc.timestamp.let(builder::setTimestamp)
            doc["rpm", Number::class.java]?.toInt()?.let(builder::setValue)
            listBuilder.addRpm(builder)
        }
        return listBuilder.build()
    }
}
