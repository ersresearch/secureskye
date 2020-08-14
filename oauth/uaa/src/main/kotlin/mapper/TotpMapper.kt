/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.mapper

import com.warrenstrange.googleauth.GoogleAuthenticatorConfig
import com.warrenstrange.googleauth.GoogleAuthenticatorKey
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator
import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.oauth.model.OauthTotp
import jp.co.trillium.secureskye.oauth.model.OauthTotpListProto
import jp.co.trillium.secureskye.oauth.model.OauthTotpListProtoOrBuilder
import jp.co.trillium.secureskye.oauth.model.OauthTotpProto
import jp.co.trillium.secureskye.oauth.model.OauthTotpProtoOrBuilder
import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
import jp.co.trillium.secureskye.oauth.tfa.otp.totp.TotpConfigurationProperties
import org.mapstruct.AfterMapping
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingTarget
import org.mapstruct.Mappings
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

/**
 * Mapper between Protobuf models and models of oauth messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [TotpMapper.BuilderFactory::class],
    imports = [TwoFactorAuthenticationStatusProto::class, GoogleAuthenticatorQRGenerator::class]
)
abstract class TotpMapper {

    @Autowired
    lateinit var totpConfigurationProperties: TotpConfigurationProperties

    @Autowired
    lateinit var googleAuthenticatorConfig: GoogleAuthenticatorConfig

    /**
     * Mapping optional [OauthTotp] to [TwoFactorAuthenticationStatusProto].
     */
    fun twoFactorAuthenticationProto(oauthTotp: OauthTotp?) = when {
        oauthTotp == null -> TwoFactorAuthenticationStatusProto.DISABLED
        oauthTotp.enabled -> TwoFactorAuthenticationStatusProto.ENABLED
        else -> TwoFactorAuthenticationStatusProto.PENDING
    }

    /**
     * Map [OauthTotp] to [GoogleAuthenticatorKey].
     */
    fun googleAuthenticatorKey(oauthTotp: OauthTotp): GoogleAuthenticatorKey =
        GoogleAuthenticatorKey
            .Builder(oauthTotp.secret)
            .setConfig(googleAuthenticatorConfig)
            .setScratchCodes(
                listOf(
                    oauthTotp.recoveryCode1,
                    oauthTotp.recoveryCode2,
                    oauthTotp.recoveryCode3,
                    oauthTotp.recoveryCode4,
                    oauthTotp.recoveryCode5
                )
            )
            .build()

    /**
     * Map [oauthTotp] to [OauthTotpProto.Builder].
     */
    @Mappings(
        Mapping(target = "oauthIdBytes", ignore = true),
        Mapping(target = "oauthGroupBytes", ignore = true),
        Mapping(target = "secretBytes", ignore = true),
        Mapping(target = "otpAuthUriBytes", ignore = true),
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "otpAuthUri", ignore = true)
    )
    abstract fun oauthTotpProtoBuilder(oauthTotp: OauthTotp): OauthTotpProto.Builder

    @AfterMapping
    protected fun oauthTotpProtoBuilder(source: OauthTotp, @MappingTarget target: OauthTotpProto.Builder) {
        target.otpAuthUri = GoogleAuthenticatorQRGenerator.getOtpAuthTotpURL(
            totpConfigurationProperties.issuer,
            source.oauthId,
            googleAuthenticatorKey(source)
        )
    }

    /**
     * Map [oauthTotp] to [OauthTotpProto].
     */
    fun oauthTotpProto(oauthTotp: OauthTotp) = oauthTotpProtoBuilder(oauthTotp).build()

    /**
     * Map [oauthTotpProto] to [OauthTotp].
     */
    abstract fun oauthTotpProto(oauthTotpProto: OauthTotpProtoOrBuilder): OauthTotp

    /**
     * Map [oauthTotpList] to [OauthTotpListProto].
     */
    fun oauthTotpListProto(oauthTotpList: List<OauthTotp>): OauthTotpListProto =
        OauthTotpListProto.newBuilder().addAllData(oauthTotpList.map(::oauthTotpProto)).build()

    /**
     * Map [oauthTotpListProto] to [List] of [OauthTotp].
     */
    fun oauthTotpListProto(oauthTotpListProto: OauthTotpListProtoOrBuilder): List<OauthTotp> =
        oauthTotpListProto.dataList.map(::oauthTotpProto)

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [OauthTotpProto] builder.
         */
        fun oauthTotpProtoBuilder() = OauthTotpProto.newBuilder()
    }
}
