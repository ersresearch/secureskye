/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.registry.model

/**
 * Communication Protocol enums for ECU.
 *
 * @property value Integer representation.
 */
enum class EcuCommProtocol(val value: Int) {
    /**
     * Communication unspecified.
     */
    Unspecified(0),

    /**
     * CAN Bus communication.
     */
    Can(1),

    /**
     * LIN Bus communication.
     */
    Lin(2),

    /**
     * Ethernet communication.
     */
    Ethernet(3),
    /**
     * Plain HTTP communication.
     */
    Http(4),

    /**
     * HTTP + SSL communication.
     */
    Https(5),

    /**
     * SSL over TCP communication.
     */
    Ssl(6)
}
