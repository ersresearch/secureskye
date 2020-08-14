import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    `java-library`
    kotlin("jvm")
    kotlin("kapt")
    kotlin("plugin.spring")
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
        mavenBom(Boms.springBoot)
    }
}

dependencies {
    api(project(":common"))

    // Kotlin
    api(kotlin("reflect", Versions.kotlin))
    api(kotlin("stdlib-jdk7", Versions.kotlin))
    api(kotlin("stdlib-jdk8", Versions.kotlin))
    api(kotlin("stdlib", Versions.kotlin))

    // Spring Boot
    api(springBoot())

    // Spring Data
    api(springData("mongodb"))

    // Normal dependencies
    api("org.mapstruct:mapstruct-jdk8:${Versions.mapstruct}")
    implementation("io.github.microutils:kotlin-logging:${Versions.kotlinLogging}")

    // Annotation Processor dependencies
    kapt("org.mapstruct:mapstruct-processor:${Versions.mapstruct}")
}

kapt {
    correctErrorTypes = true
}
