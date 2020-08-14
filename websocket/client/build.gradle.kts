import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    `java-library`
    kotlin("jvm")
    kotlin("kapt")
    kotlin("plugin.spring")
    id("org.springframework.boot")
    id("io.spring.dependency-management")
    id("com.google.protobuf")
}

java {
    sourceCompatibility = JavaVersion.VERSION_1_8
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
    api(project(":websocket-client-api"))
    implementation(project(":common"))

    // Kotlin
    api(kotlin("reflect", Versions.kotlin))
    api(kotlin("stdlib-jdk7", Versions.kotlin))
    api(kotlin("stdlib-jdk8", Versions.kotlin))
    api(kotlin("stdlib", Versions.kotlin))

    // Spring Boot
    api(springBootStarter("web"))

    // Spring Cloud
    api(springCloudStarter("consul-discovery"))

    // Normal dependencies
    api("io.github.microutils:kotlin-logging:${Versions.kotlinLogging}")
    api("io.socket:socket.io-client:${Versions.socketIo}")
}

kapt {
    correctErrorTypes = true
}

tasks {
    withType(KotlinCompile::class).configureEach {
        kotlinOptions.jvmTarget = "1.8"
    }

    "bootJar" { enabled = false }
    "jar" { enabled = true }
}
