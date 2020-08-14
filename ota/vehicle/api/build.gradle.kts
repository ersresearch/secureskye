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

    // Kotlin
    api(kotlin("stdlib-jdk7", Versions.kotlin))
    api(kotlin("stdlib-jdk8", Versions.kotlin))
    api(kotlin("stdlib", Versions.kotlin))

    // Spring Data
    api(springData("mongodb"))

    // Normal dependencies
    api("com.google.protobuf:protobuf-java:${Versions.protobuf}")
    implementation("commons-io:commons-io:${Versions.commonsIo}")
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
