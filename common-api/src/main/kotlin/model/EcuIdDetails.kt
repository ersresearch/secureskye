/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.model

import jp.co.trillium.secureskye.common.exception.EcuIdExtractionException
import org.apache.commons.codec.DecoderException
import org.apache.commons.codec.binary.Hex
import java.nio.ByteBuffer

/**
 * The decomposed ECU ID.
 *
 * @property hardwareVersion Version of the hardware.
 * @property softwareVersion Version of the software.
 * @property callibrationVersion Version of the callibration.
 * @property specialVersion Any extra special version.
 */
data class EcuIdDetails(
    var hardwareVersion: String = "",
    var softwareVersion: String = "",
    var callibrationVersion: String = "",
    var specialVersion: String = ""
) {
    companion object {

        /**
         * Length of the ECU ID.
         */
        private const val ECU_ID_LENGTH = 32

        /**
         * Byte length of each compound that makes up the full ID.
         */
        private const val COMPOUND_LENGTH = 8

        /**
         * Decode an [hex] encoded ECU id into its components.
         */
        fun fromHexString(hex: String): EcuIdDetails {
            try {
                val data = ByteBuffer.wrap(Hex.decodeHex(hex))
                if (data.limit() != ECU_ID_LENGTH)
                    throw EcuIdExtractionException(
                        data.limit(),
                        hex,
                        "ECU ID '$hex' has to be exactly $ECU_ID_LENGTH bytes long, " +
                                "but is instead ${data.limit()} bytes long"
                    )

                return EcuIdDetails(
                    Hex.encodeHexString(data.getBytes(COMPOUND_LENGTH)),
                    Hex.encodeHexString(data.getBytes(COMPOUND_LENGTH)),
                    Hex.encodeHexString(data.getBytes(COMPOUND_LENGTH)),
                    Hex.encodeHexString(data.getBytes(COMPOUND_LENGTH))
                )
            } catch (e: DecoderException) {
                throw EcuIdExtractionException(0, hex, "ECU ID '$hex' couldn't be decoded", e)
            }
        }

        /**
         * Read [count] bytes from the buffer.
         */
        private fun ByteBuffer.getBytes(count: Int): ByteArray {
            val dest = ByteArray(count)
            get(dest)
            return dest
        }
    }
}
