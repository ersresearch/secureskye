/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.admin.model

/**
 * Type of model's display settings.
 * @property value Integer representation of the display setting.
 */
enum class ModelDisplaySettingsType(val value: Int) {

    /**
     * Setting undefined.
     */
    UNDEFINED(0),

    /**
     * Other display setting.
     */
    OTHER(1),

    /**
     * Display setting for speed meter.
     */
    SPEED(2),

    /**
     * Display setting for fuel bar.
     */
    FUEL(3),

    /**
     * Display setting for temperature bar.
     */
    TEMPERATURE(4),

    /**
     * Display setting for rpm meter.
     */
    RPM(5),

    /**
     * Display setting for trip odometer.
     */
    TRIP_ODOMETER(6),

    /**
     * Display setting for odometer.
     */
    ODOMETER(7),

    /**
     * Display setting for gear meter.
     */
    GEAR(8),

    /**
     * Display setting for gps map.
     */
    ROUTE(9),

    /**
     * Display setting for ecu alert node on map.
     */
    ALERT_NODE(10),

    /**
     * Display setting for time/data speed graph.
     */
    SPEED_GRAPH(11),

    /**
     * Display setting for time/data rpm graph.
     */
    RPM_GRAPH(12),

    /**
     * Display setting for time/data braking graph.
     */
    BRAKING_GRAPH(13),

    /**
     * Display setting for time/data mpg graph.
     */
    MPG_GRAPH(14),

    /**
     * Display setting for mil engine status.
     */
    MIL_ENGINE(15),

    /**
     * Display setting for mil tire pressure status.
     */
    MIL_TIRE_PRESSURE(16),

    /**
     * Display setting for mil engine oil status.
     */
    MIL_ENGINE_OIL(17),

    /**
     * Display setting for mil brakes status.
     */
    MIL_BRAKES(18),

    /**
     * Display setting for mil engine coolant status.
     */
    MIL_ENGINE_COOLANT(19),

    /**
     * Display setting for mil battery status.
     */
    MIL_BATTERY(20)
}
