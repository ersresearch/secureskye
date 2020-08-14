/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.saa.configuration

import jp.co.trillium.secureskye.oauth.repository.CredentialsRepository
import jp.co.trillium.secureskye.oauth.service.JdbcUserDetailsService
import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest
import org.springframework.boot.autoconfigure.security.servlet.PathRequest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

/**
 * Server security configuration.
 */
@Configuration
class ServerSecurityConfig(private val credentialsRepository: CredentialsRepository) : WebSecurityConfigurerAdapter() {

    /**
     * [WebSecurityConfigurerAdapter.userDetailsService].
     */
    @Bean
    @Primary
    override fun userDetailsService(): UserDetailsService = JdbcUserDetailsService(credentialsRepository)

    /**
     * [WebSecurityConfigurerAdapter.authenticationManagerBean].
     */
    @Bean
    @Primary
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    /**
     * Password encoder used for the user credentials.
     */
    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userDetailsService())
            .passwordEncoder(passwordEncoder())
    }

    override fun configure(http: HttpSecurity) {
        http
            .authorizeRequests()
            .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
            .requestMatchers(EndpointRequest.to("health", "info", "metrics", "prometheus")).permitAll()
//            .antMatchers("/login", "/logout.do").permitAll()
            .anyRequest().authenticated()
//            .and()
//            .formLogin()
//            .loginProcessingUrl("/login.do")
//            .usernameParameter("name")
//            .loginPage("/login")
//            .and()
//            .logout()
//            //To match GET requests we have to use a request matcher.
//            .logoutRequestMatcher(AntPathRequestMatcher("/logout.do"))
    }
}
