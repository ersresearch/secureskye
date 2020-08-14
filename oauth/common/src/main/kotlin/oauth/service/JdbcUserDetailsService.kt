/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.service

import jp.co.trillium.secureskye.oauth.model.Role
import jp.co.trillium.secureskye.oauth.repository.CredentialsRepository
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException

/**
 * Implementation of [UserDetailsService].
 */
class JdbcUserDetailsService(private val credentialsRepository: CredentialsRepository) : UserDetailsService {

    /**
     * [UserDetailsService.loadUserByUsername].
     *
     * @throws UsernameNotFoundException
     */
    override fun loadUserByUsername(username: String): UserDetails = credentialsRepository.findByName(username)
        .orElseThrow { UsernameNotFoundException("User $username not found in database.") }
        .let {
            User(
                it.name, it.password,
                it.enabled, true, true, true,
                it.roles.let(::getAuthorities)
            )
        }

    private fun getAuthorities(roles: Set<Role>) =
        roles.map { SimpleGrantedAuthority(it.name) } +
                roles.flatMap {
                    it.authorities.map { auth -> SimpleGrantedAuthority(auth.authority) }
                }

    /**
     * Load user full credentials by user name.
     * @param username username
     */
    fun loadUserCredentials(username: String) = credentialsRepository.findByName(username)
}
