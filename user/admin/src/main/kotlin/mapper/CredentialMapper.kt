/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.admin.mapper

import jp.co.trillium.secureskye.common.mapper.GlobalMapperConfig
import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.oauth.model.AdditionalInfo
import jp.co.trillium.secureskye.oauth.model.Attachment
import jp.co.trillium.secureskye.oauth.model.Authority
import jp.co.trillium.secureskye.oauth.model.Credentials
import jp.co.trillium.secureskye.oauth.model.Role
import jp.co.trillium.secureskye.oauth.model.TwoFactorAuthenticationStatusProto
import jp.co.trillium.secureskye.user.admin.api.proto.AdditionalInfoProto
import jp.co.trillium.secureskye.user.admin.api.proto.AttachmentProto
import jp.co.trillium.secureskye.user.admin.api.proto.AuthorityListProto
import jp.co.trillium.secureskye.user.admin.api.proto.AuthorityProto
import jp.co.trillium.secureskye.user.admin.api.proto.AuthorityProtoOrBuilder
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialListProto
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialProto
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialProtoOrBuilder
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialSummaryProto
import jp.co.trillium.secureskye.user.admin.api.proto.CredentialSummaryProtoOrBuilder
import jp.co.trillium.secureskye.user.admin.api.proto.RoleDetailProto
import jp.co.trillium.secureskye.user.admin.api.proto.RoleDetailProtoOrBuilder
import jp.co.trillium.secureskye.user.admin.api.proto.RoleProto
import jp.co.trillium.secureskye.user.admin.api.proto.RoleProtoOrBuilder
import jp.co.trillium.secureskye.user.admin.api.proto.RoleSetProto
import jp.co.trillium.secureskye.user.admin.model.UpdateCredential
import org.mapstruct.AfterMapping
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingTarget
import org.mapstruct.Mappings
import org.mapstruct.Named
import org.mapstruct.Qualifier
import org.springframework.stereotype.Component
import java.util.UUID
import java.sql.Timestamp
import java.time.LocalDate

/**
 * Mapper between Protobuf models and database models of credential messages.
 */
@Mapper(
    config = GlobalMapperConfig::class,
    uses = [UuidMapper::class, CredentialMapper.BuilderFactory::class]
)
abstract class CredentialMapper {

    private companion object {
        const val ROLE_PREFIX = "ROLE_"
        const val MILLISECOND_TO_NANOSECOND = 1_000_000
    }

    /**
     * Strip prefix [ROLE_PREFIX] of [role].
     */
    @StripRolePrefix
    protected fun stripRolePrefix(role: String) = role.replace(ROLE_PREFIX, "").toLowerCase()

    /**
     * Add prefix [ROLE_PREFIX] to role [name].
     */
    @AddRolePrefix
    protected fun addRolePrefix(name: String) = ROLE_PREFIX + name.toUpperCase()

    /**
     * Map [credential] to [CredentialProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "passwordBytes", ignore = true),
        Mapping(target = "avatarBytes", ignore = true),
        Mapping(target = "avatarFormatBytes", ignore = true),
        Mapping(target = "firstNameBytes", ignore = true),
        Mapping(target = "lastNameBytes", ignore = true),
        Mapping(target = "emailBytes", ignore = true),
        Mapping(target = "password", ignore = true),
        Mapping(target = "rolesList", ignore = true),
        Mapping(target = "rolesOrBuilderList", ignore = true),
        Mapping(target = "rolesBuilderList", source = "roles", qualifiedByName = ["role"]),
        Mapping(target = "avatarThirdParty", ignore = true),
        Mapping(target = "phoneAreaCodeBytes", ignore = true),
        Mapping(target = "phoneNumberBytes", ignore = true),
        Mapping(target = "nationalityBytes", ignore = true),
        Mapping(target = "addressBytes", ignore = true),
        Mapping(target = "tfa", ignore = true),
        Mapping(target = "tfaValue", ignore = true),
        Mapping(target = "additionalInfoList", ignore = true),
        Mapping(target = "additionalInfoOrBuilderList", ignore = true),
        Mapping(target = "additionalInfoBuilderList", source = "additionalInfo"),
        Mapping(target = "attachmentsList", ignore = true),
        Mapping(target = "attachmentsOrBuilderList", ignore = true),
        Mapping(target = "attachmentsBuilderList", source = "attachments")
    )
    protected abstract fun credentialBuilder(credential: Credentials): CredentialProto.Builder

    /**
     * Map [credential] to [CredentialProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "passwordBytes", ignore = true),
        Mapping(target = "avatarBytes", ignore = true),
        Mapping(target = "avatarFormatBytes", ignore = true),
        Mapping(target = "firstNameBytes", ignore = true),
        Mapping(target = "lastNameBytes", ignore = true),
        Mapping(target = "emailBytes", ignore = true),
        Mapping(target = "password", ignore = true),
        Mapping(target = "avatar", ignore = true),
        Mapping(target = "avatarFormat", ignore = true),
        Mapping(target = "avatarThirdParty", ignore = true),
        Mapping(target = "phoneAreaCodeBytes", ignore = true),
        Mapping(target = "phoneNumberBytes", ignore = true),
        Mapping(target = "nationalityBytes", ignore = true),
        Mapping(target = "addressBytes", ignore = true),
        Mapping(target = "tfa", ignore = true),
        Mapping(target = "tfaValue", ignore = true),
        Mapping(target = "version", ignore = true),
        Mapping(target = "gender", ignore = true),
        Mapping(target = "birthday", ignore = true),
        Mapping(target = "nationality", ignore = true),
        Mapping(target = "address", ignore = true),
        Mapping(target = "rolesList", ignore = true),
        Mapping(target = "rolesOrBuilderList", ignore = true),
        Mapping(target = "rolesBuilderList", source = "roles", qualifiedByName = ["roleGetListApi"]),
        Mapping(target = "additionalInfoList", ignore = true),
        Mapping(target = "additionalInfoOrBuilderList", ignore = true),
        Mapping(target = "additionalInfoBuilderList", ignore = true),
        Mapping(target = "attachmentsList", ignore = true),
        Mapping(target = "attachmentsOrBuilderList", ignore = true),
        Mapping(target = "attachmentsBuilderList", source = "attachments", qualifiedByName = ["attachmentGetListApi"])
    )
    protected abstract fun credentialGetListApiBuilder(credential: Credentials): CredentialProto.Builder

    /**
     * Map [LocalDate] to [Long].
     */
    fun toTimestamp(localDate: LocalDate): Long =
        Timestamp.valueOf(localDate.atStartOfDay()).time * MILLISECOND_TO_NANOSECOND

    /**
     * Map [Long] to [LocalDate].
     */
    fun toLocalDate(value: Long): LocalDate =
        Timestamp(value / MILLISECOND_TO_NANOSECOND).toLocalDateTime().toLocalDate()

    /**
     * Map [credential] to [CredentialProto].
     */
    fun credential(credential: Credentials): CredentialProto = credentialBuilder(credential).build()

    /**
     * Map [credential] to [CredentialProto].
     */
    private fun credentialGetListApi(credential: Credentials): CredentialProto =
        credentialGetListApiBuilder(credential).build()

    /**
     * Map [CredentialProtoOrBuilder] to [Credentials].
     */
    @Mappings(
        Mapping(target = "roles", ignore = true),
        Mapping(target = "additionalInfo", ignore = true),
        Mapping(target = "attachments", ignore = true)
    )
    abstract fun credential(credential: CredentialProtoOrBuilder): Credentials

    /**
     * Map [source] to [target].
     */
    @AfterMapping
    protected fun credential(source: CredentialProtoOrBuilder, @MappingTarget target: Credentials) {
        target.roles = source.rolesList.map(::role).toSet()
    }

    /**
     * Map [list] to [CredentialListProto].
     */
    fun credentialGetListApi(list: List<Credentials>): CredentialListProto = CredentialListProto.newBuilder()
        .addAllData(list.map(::credentialGetListApi))
        .build()

    /**
     * Map [UpdateCredential] to [Credentials].
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "version", ignore = true),
        Mapping(target = "additionalInfo", ignore = true),
        Mapping(target = "attachments", ignore = true)
    )
    abstract fun update(source: UpdateCredential, @MappingTarget target: Credentials)

    /**
     * Map [UpdateCredential] to [Credentials] ignoring avatar.
     */
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "version", ignore = true),
        Mapping(target = "avatar", ignore = true),
        Mapping(target = "avatarFormat", ignore = true),
        Mapping(target = "additionalInfo", ignore = true),
        Mapping(target = "attachments", ignore = true)
    )
    abstract fun updateIgnoreAvatar(source: UpdateCredential, @MappingTarget target: Credentials)

    /**
     * Map [authority] to [AuthorityProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "authorityBytes", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true)
    )
    protected abstract fun authorityBuilder(authority: Authority): AuthorityProto.Builder

    /**
     * Map [Authority] to [AuthorityProto].
     */
    private fun authority(authority: Authority): AuthorityProto = authorityBuilder(authority).build()

    /**
     * Map [AuthorityProtoOrBuilder] to [authority].
     */
    abstract fun authority(authority: AuthorityProtoOrBuilder): Authority

    /**
     * Map [list] to [AuthorityListProto].
     */
    fun authorityList(list: List<Authority>): AuthorityListProto = AuthorityListProto.newBuilder()
        .addAllData(list.map(::authority))
        .build()

    /**
     * Map [list] to [List]<[Authority]>.
     */
    fun authorityList(list: AuthorityListProto): List<Authority> = list.dataList.map(::authority)

    /**
     * Map [Credentials] to [CredentialSummaryProto].
     */
    private fun users(user: Credentials): CredentialSummaryProto = credentialSummaryBuilder(user).build()

    /**
     * Map [CredentialSummaryProtoOrBuilder] to [Credentials].
     */
    @Mappings(
        Mapping(target = "password", ignore = true),
        Mapping(target = "avatar", ignore = true),
        Mapping(target = "avatarFormat", ignore = true),
        Mapping(target = "firstName", ignore = true),
        Mapping(target = "lastName", ignore = true),
        Mapping(target = "version", ignore = true),
        Mapping(target = "enabled", ignore = true),
        Mapping(target = "phoneAreaCode", ignore = true),
        Mapping(target = "phoneNumber", ignore = true),
        Mapping(target = "gender", ignore = true),
        Mapping(target = "birthday", ignore = true),
        Mapping(target = "nationality", ignore = true),
        Mapping(target = "address", ignore = true),
        Mapping(target = "roles", ignore = true),
        Mapping(target = "additionalInfo", ignore = true),
        Mapping(target = "attachments", ignore = true)
    )
    abstract fun users(users: CredentialSummaryProtoOrBuilder): Credentials

    /**
     * Map [credential] to [CredentialSummaryProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "emailBytes", ignore = true)
    )
    protected abstract fun credentialSummaryBuilder(credential: Credentials): CredentialSummaryProto.Builder

    /**
     * Map [Role] to [RoleProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true),
        Mapping(target = "name", source = "displayName")
    )
    @Named("role")
    protected abstract fun roleBuilder(role: Role): RoleProto.Builder

    /**
     * Map [Role] to [RoleDetailProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true),
        Mapping(target = "usersList", ignore = true),
        Mapping(target = "usersOrBuilderList", ignore = true),
        Mapping(target = "usersBuilderList", ignore = true),
        Mapping(target = "authoritiesList", ignore = true),
        Mapping(target = "authoritiesOrBuilderList", ignore = true),
        Mapping(target = "authoritiesBuilderList", ignore = true),
        Mapping(target = "name", source = "displayName")
    )
    protected abstract fun roleDetailBuilder(role: Role): RoleDetailProto.Builder

    /**
     * Map [Role] to [RoleDetailProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true),
        Mapping(target = "name", source = "displayName")
    )
    @Named("roleGetListApi")
    protected abstract fun roleGetListApiBuilder(role: Role): RoleProto.Builder

    /**
     * Map [Attachment] to [AttachmentProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "fileIdBytes", ignore = true),
        Mapping(target = "fileNameBytes", ignore = true),
        Mapping(target = "urlImageBytes", ignore = true)
    )
    @Named("attachmentGetListApi")
    protected abstract fun attachmentGetListApiBuilder(attachment: Attachment): AttachmentProto.Builder

    /**
     * Map [Role] to [RoleDetailProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "descriptionBytes", ignore = true),
        Mapping(target = "usersList", ignore = true),
        Mapping(target = "usersOrBuilderList", ignore = true),
        Mapping(target = "usersBuilderList", ignore = true),
        Mapping(target = "authoritiesList", ignore = true),
        Mapping(target = "authoritiesOrBuilderList", ignore = true),
        Mapping(target = "authoritiesBuilderList", ignore = true),
        Mapping(target = "name", source = "displayName")
    )
    protected abstract fun roleDetailApiBuilder(role: Role): RoleDetailProto.Builder

    /**
     * Map [credential] to [CredentialProto].
     */
    fun roleDetailApi(role: Role): RoleDetailProto =
        roleDetailApiBuilder(role).clearUsers().build()

    /**
     * Map [source] to [target].
     */
    @AfterMapping
    protected fun roleDetailBuilder(source: Role, @MappingTarget target: RoleDetailProto.Builder) {
        target.addAllUsers(source.users.map(::users))
        target.addAllAuthorities(source.authorities.map(::authority))
    }

    /**
     * Map [Role] to [RoleProto].
     */
    private fun role(role: Role): RoleProto = roleBuilder(role).build()

    /**
     * Map [Role] to [RoleDetailProto].
     */
    fun roleDetail(role: Role): RoleDetailProto = roleDetailBuilder(role).build()

    /**
     * Map [RoleProtoOrBuilder] to [Role].
     */
    @Mappings(
        Mapping(target = "admin", ignore = true),
        Mapping(target = "users", ignore = true),
        Mapping(target = "authorities", ignore = true),
        Mapping(target = "displayName", source = "name"),
        Mapping(target = "name", qualifiedBy = [AddRolePrefix::class])
    )
    abstract fun role(role: RoleProtoOrBuilder): Role

    /**
     * Map [RoleDetailProtoOrBuilder] to [Role].
     */
    @Mappings(
        Mapping(target = "admin", ignore = true),
        Mapping(target = "users", ignore = true),
        Mapping(target = "authorities", ignore = true),
        Mapping(target = "displayName", source = "name"),
        Mapping(target = "name", qualifiedBy = [AddRolePrefix::class])
    )
    abstract fun roleDetail(role: RoleDetailProtoOrBuilder): Role

    /**
     * Map [source] to [target].
     */
    @AfterMapping
    protected fun roleDetail(source: RoleDetailProtoOrBuilder, @MappingTarget target: Role) {
        target.users = source.usersList.map(::users)
        target.authorities = source.authoritiesList.map(::authority)
    }

    /**
     * Map [set] to [RoleSetProto].
     */
    fun roleSet(set: Set<Role>): RoleSetProto = RoleSetProto.newBuilder()
        .addAllData(set.map(::role))
        .build()

    /**
     * Map [credential] to [CredentialProto.Builder].
     */
    @Mappings(
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "nameBytes", ignore = true),
        Mapping(target = "passwordBytes", ignore = true),
        Mapping(target = "avatarBytes", ignore = true),
        Mapping(target = "avatarFormatBytes", ignore = true),
        Mapping(target = "firstNameBytes", ignore = true),
        Mapping(target = "lastNameBytes", ignore = true),
        Mapping(target = "emailBytes", ignore = true),
        Mapping(target = "password", ignore = true),
        Mapping(target = "rolesList", ignore = true),
        Mapping(target = "rolesOrBuilderList", ignore = true),
        Mapping(target = "rolesBuilderList", source = "credential.roles", qualifiedByName = ["role"]),
        Mapping(target = "avatarThirdParty", ignore = true),
        Mapping(target = "phoneAreaCodeBytes", ignore = true),
        Mapping(target = "phoneNumberBytes", ignore = true),
        Mapping(target = "nationalityBytes", ignore = true),
        Mapping(target = "addressBytes", ignore = true),
        Mapping(target = "tfaValue", ignore = true),
        Mapping(target = "additionalInfoList", ignore = true),
        Mapping(target = "additionalInfoOrBuilderList", ignore = true),
        Mapping(target = "additionalInfoBuilderList", source = "credential.additionalInfo"),
        Mapping(target = "attachmentsList", ignore = true),
        Mapping(target = "attachmentsOrBuilderList", ignore = true),
        Mapping(target = "attachmentsBuilderList", source = "credential.attachments")
    )
    protected abstract fun credentialBuilder(
        credential: Credentials,
        tfa: TwoFactorAuthenticationStatusProto?
    ): CredentialProto.Builder

    /**
     * Map [credential] to [CredentialProto].
     */
    fun credential(
        credential: Credentials,
        tfa: TwoFactorAuthenticationStatusProto?
    ): CredentialProto = credentialBuilder(credential, tfa).build()

    /**
     * Map [credential] to [CredentialProto].
     */
    @Mappings(
        Mapping(target = "attachments", ignore = true)
    )
    protected abstract fun credentialUpdate(credential: UpdateCredential): Credentials

    /**
     * Map [Attachment] to [Attachment.Builder].
     */
    @Mappings(
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true),
        Mapping(target = "fileId", ignore = true),
        Mapping(target = "fileIdBytes", ignore = true),
        Mapping(target = "fileNameBytes", ignore = true),
        Mapping(target = "urlImageBytes", ignore = true)
    )
    protected abstract fun attachmentBuilder(attachment: Attachment): AttachmentProto.Builder

    /**
     * Map [AttachmentProto] to [Attachment].
     */
    @Mappings(
        Mapping(target = "credentials.id", source = "id")
    )
    abstract fun attachment(id: UUID, attachmentProto: AttachmentProto): Attachment

    /**
     * Map [AdditionalInfo] to [AdditionalInfoProto.Builder].
     */
    @Mappings(
        Mapping(target = "idBytes", ignore = true),
        Mapping(target = "keyBytes", ignore = true),
        Mapping(target = "valueBytes", ignore = true),
        Mapping(target = "unknownFields", ignore = true),
        Mapping(target = "allFields", ignore = true)
    )
    protected abstract fun additionalInfoBuilder(additionalInfo: AdditionalInfo): AdditionalInfoProto.Builder

    /**
     * Map [AdditionalInfoProto] to [AdditionalInfo].
     */
    @Mappings(
        Mapping(target = "credentials.id", source = "id")
    )
    abstract fun additionalInfo(id: UUID, additionalInfo: AdditionalInfoProto): AdditionalInfo

    /**
     * Creates instances of Protobuf builders.
     */
    @Component
    class BuilderFactory {

        /**
         * Create a [CredentialProto] builder.
         */
        fun credentialBuilder(): CredentialProto.Builder = CredentialProto.newBuilder()

        /**
         * Create a [CredentialSummaryProto] builder.
         */
        fun credentialSummaryBuilder(): CredentialSummaryProto.Builder = CredentialSummaryProto.newBuilder()

        /**
         * Create a [AuthorityProto] builder.
         */
        fun authorityBuilder(): AuthorityProto.Builder = AuthorityProto.newBuilder()

        /**
         * Create a [RoleProto] builder.
         */
        fun roleBuilder(): RoleProto.Builder = RoleProto.newBuilder()

        /**
         * Create a [RoleDetailProto] builder.
         */
        fun roleDetailBuilder(): RoleDetailProto.Builder = RoleDetailProto.newBuilder()

        /**
         * Create a [AdditionalInfoProto] builder.
         */
        fun additionalInfoBuilder(): AdditionalInfoProto.Builder = AdditionalInfoProto.newBuilder()

        /**
         * Create a [AttachmentProto] builder.
         */
        fun attachmentBuilder(): AttachmentProto.Builder = AttachmentProto.newBuilder()
    }

    /**
     * Qualifier for stripping role prefix mapping.
     */
    @Qualifier
    @Target(AnnotationTarget.FUNCTION)
    @Retention
    annotation class StripRolePrefix

    /**
     * Qualifier for adding role prefix mapping.
     */
    @Qualifier
    @Target(AnnotationTarget.FUNCTION)
    @Retention
    annotation class AddRolePrefix
}
