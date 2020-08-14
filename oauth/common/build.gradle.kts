import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    `java-library`
    kotlin("jvm")
    kotlin("plugin.spring")
    id("org.springframework.boot")
    id("io.spring.dependency-management")
}

java {
    sourceCompatibility = JavaVersion.VERSION_1_8
}

tasks.withType(KotlinCompile::class).configureEach {
    kotlinOptions.jvmTarget = "1.8"
}

dependencyManagement {
    imports {
        mavenBom(Boms.springCloud)
    }
}

configurations {
    configureEach { exclude(module = "spring-boot-starter-tomcat") }
}

dependencies {
    implementation(project(":oauth-api"))
    runtimeOnly(project(":common"))

    // Kotlin
    api(kotlin("reflect", Versions.kotlin))
    api(kotlin("stdlib-jdk7", Versions.kotlin))
    api(kotlin("stdlib-jdk8", Versions.kotlin))
    api(kotlin("stdlib", Versions.kotlin))

    // Spring Boot
    api(springBootStarter("data-jpa"))
    api(springBootStarter("security"))
    api(springBootStarter("undertow"))
    api(springBootStarter("web"))

    // Spring Cloud
    api(springCloudStarter("openfeign"))
    api(springCloudStarter("security"))

    // Spring Security
    implementation(springSecurityOauth("oauth2", Versions.springOauth))

    // Normal dependencies
    api("com.warrenstrange:googleauth:${Versions.googleAuth}")
}

tasks {
    "bootJar" { enabled = false }
    "jar" { enabled = true }
}
