import com.google.protobuf.gradle.ExecutableLocator
import com.google.protobuf.gradle.ProtobufConfigurator
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    idea
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

tasks.withType(KotlinCompile::class).configureEach {
    dependsOn("generateProto")
    kotlinOptions.jvmTarget = "1.8"
}

configurations {
    configureEach { exclude(module = "spring-boot-starter-tomcat") }
}

dependencies {
    api(project(":common-api"))

    // Kotlin
    api(kotlin("reflect", Versions.kotlin))
    api(kotlin("stdlib-jdk7", Versions.kotlin))
    api(kotlin("stdlib-jdk8", Versions.kotlin))
    api(kotlin("stdlib", Versions.kotlin))

    // Spring
    api(spring("context"))
    api(spring("web"))

    // Spring Boot
    api(springBoot("autoconfigure"))
    api(springBootStarter("data-jpa"))

    // Normal dependencies (Spring auto-versioned)
    api("com.fasterxml.jackson.dataformat:jackson-dataformat-xml")
    api("com.fasterxml.jackson.dataformat:jackson-dataformat-yaml")
    api("javax.servlet:javax.servlet-api")
    api("org.mongodb:bson")

    // Normal dependencies
    api("com.fasterxml.jackson.core:jackson-databind:${Versions.jackson}")
    api("com.google.protobuf:protobuf-java:${Versions.protobuf}")
    api("com.google.protobuf:protobuf-java-util:${Versions.protobuf}")
    api("org.mapstruct:mapstruct-jdk8:${Versions.mapstruct}")
    implementation("com.fasterxml.uuid:java-uuid-generator:${Versions.javaUuidGenerator}")
    implementation("commons-codec:commons-codec:${Versions.commonsCodec}")
    implementation("org.apache.commons:commons-compress:${Versions.commonsCompress}")

    // Annotation Processor dependencies
    kapt("org.mapstruct:mapstruct-processor:${Versions.mapstruct}")
}

tasks {
    bootJar { enabled = false }
    jar { enabled = true }
}

protobuf {
    protobuf(closureOf<ProtobufConfigurator> {
        protoc(closureOf<ExecutableLocator> {
            artifact = "com.google.protobuf:protoc:${Versions.protobuf}"
        })
    })
}

idea {
    module {
        sourceDirs.add(file("${protobuf.protobuf.generatedFilesBaseDir}/main/java"))
    }
}

kapt {
    correctErrorTypes = true
}
