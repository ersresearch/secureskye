/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.ObjectIdMapper
import jp.co.trillium.secureskye.common.mapper.TimestampMapper
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.vehicle.message.api.proto.FullGpsRouteProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.FullGpsRouteProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsRouteListProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsRouteListProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsRouteProto
import jp.co.trillium.secureskye.vehicle.message.api.proto.GpsRouteProtoOrBuilder
import jp.co.trillium.secureskye.vehicle.message.model.GpsEvent
import jp.co.trillium.secureskye.vehicle.message.model.GpsRoute
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.util.UUID

/**
 * Mapper between Protobuf models and database models of vehicle messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [UuidMapper::class, ObjectIdMapper::class, TimestampMapper::class, RouteMapper.BuilderFactory::class]
)
abstract class RouteMapper {

    @Autowired
    private lateinit var eventMapper: EventMapper

    /**
     * Map [route] to [GpsRouteProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "vehicleIdBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true)
    )
    protected abstract fun gpsRouteBuilder(route: GpsRoute): GpsRouteProto.Builder

    /**
     * Map [route] to [GpsRouteProto].
     */
    fun gpsRoute(route: GpsRoute): GpsRouteProto = gpsRouteBuilder(route).build()

    /**
     * Map [route] to [GpsRoute].
     */
    abstract fun gpsRoute(route: GpsRouteProtoOrBuilder): GpsRoute

    /**
     * Map [list] to [List]<[GpsRoute]>.
     */
    fun routeList(list: GpsRouteListProtoOrBuilder) = list.dataList.map(::gpsRoute)

    /**
     * Map [list] to [GpsRouteListProto.Builder].
     */
    private fun routeListBuilder(list: List<GpsRoute>): GpsRouteListProto.Builder = GpsRouteListProto.newBuilder()
        .addAllData(list.map(::gpsRoute))

    /**
     * Map [list] to [GpsRouteListProto].
     */
    fun routeList(list: List<GpsRoute>): GpsRouteListProto = routeListBuilder(list).build()

    /**
     * Map [id] and [route] to [Pair]<[GpsRoute], [List]<[GpsEvent]>>.
     */
    fun fullGpsRoute(id: UUID, route: FullGpsRouteProtoOrBuilder) =
        route.route.let(::gpsRoute) to route.eventsList.map { eventMapper.gpsEvent(id, it) }

    /**
     * Map [route] and [events] to [FullGpsRouteProto.Builder].
     */
    private fun fullGpsRouteBuilder(route: GpsRoute, events: List<GpsEvent>): FullGpsRouteProto.Builder =
        FullGpsRouteProto.newBuilder()
            .setRoute(gpsRoute(route))
            .addAllEvents(events.map(eventMapper::gpsEvent))

    /**
     * Map [route] and [events] to [FullGpsRouteProto].
     */
    fun fullGpsRoute(route: GpsRoute, events: List<GpsEvent>): FullGpsRouteProto =
        fullGpsRouteBuilder(route, events).build()

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [GpsRouteProto] builder.
         */
        fun gpsRouteBuilder(): GpsRouteProto.Builder = GpsRouteProto.newBuilder()
    }
}
