/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */

import org.gradle.api.artifacts.dsl.DependencyHandler

private fun DependencyHandler.dep(prefix: String, module: String?, version: String?): Any =
    "$prefix${module?.let { "-$module" } ?: ""}${version?.let { ":$version" } ?: ""}"

fun DependencyHandler.spring(module: String, version: String? = null): Any =
    dep("org.springframework:spring", module, version)

fun DependencyHandler.springBoot(module: String? = null, version: String? = null): Any =
    dep("org.springframework.boot:spring-boot", module, version)

fun DependencyHandler.springBootStarter(module: String, version: String? = null): Any =
    dep("org.springframework.boot:spring-boot-starter", module, version)

fun DependencyHandler.springCloudStarter(module: String, version: String? = null): Any =
    dep("org.springframework.cloud:spring-cloud-starter", module, version)

fun DependencyHandler.springData(module: String, version: String? = null): Any =
    dep("org.springframework.data:spring-data", module, version)

fun DependencyHandler.springSecurity(module: String, version: String? = null): Any =
    dep("org.springframework.security:spring-security", module, version)

fun DependencyHandler.springSecurityOauth(module: String, version: String? = null): Any =
    dep("org.springframework.security.oauth:spring-security", module, version)
