import com.google.protobuf.gradle.ExecutableLocator
import com.google.protobuf.gradle.ProtobufConfigurator
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    idea
    `java-library`
    kotlin("jvm")
    kotlin("plugin.spring")
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

dependencyManagement {
    imports {
        mavenBom(Boms.springBoot)
    }
}

dependencies {
    api(project(":common-api"))
    api(project(":vehicle-registry-api"))

    // Kotlin
    api(kotlin("stdlib-jdk7", Versions.kotlin))
    api(kotlin("stdlib-jdk8", Versions.kotlin))
    api(kotlin("stdlib", Versions.kotlin))

    // Spring Boot
    api(springBootStarter("data-jpa"))

    // Spring Data
    api(springData("mongodb"))

    // Normal dependencies (Spring auto-versioned)
    api("com.fasterxml.jackson.core:jackson-annotations")

    // Normal dependencies
    api("com.google.protobuf:protobuf-java:${Versions.protobuf}")
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
