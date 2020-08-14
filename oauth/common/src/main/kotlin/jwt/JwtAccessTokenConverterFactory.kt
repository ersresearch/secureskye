/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.jwt

import org.springframework.core.io.ClassPathResource
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory

/**
 * JwtAccessTokenConverter for asymmetric key pair.
 */
class JwtAccessTokenConverterFactory {
    companion object {

        /**
         * JwtAccessTokenConverter for oauth client (required `jwt.pub`).
         */
        fun forClient(): JwtAccessTokenConverter {
            val converter = JwtAccessTokenConverter()
            val resource = ClassPathResource("jwt.pub")
            val publicKey = resource.inputStream.bufferedReader().use { it.readText() }
            converter.setVerifierKey(publicKey)
            return converter
        }

        /**
         * JwtAccessTokenConverter for oauth server (required `jwt.jks`).
         */
        fun forServer(): JwtAccessTokenConverter {
            val converter = JwtAccessTokenConverter()
            val keyStoreKeyFactory = KeyStoreKeyFactory(ClassPathResource("jwt.jks"), "secureskye".toCharArray())
            converter.setKeyPair(keyStoreKeyFactory.getKeyPair("secureskye"))
            return converter
        }
    }
}
