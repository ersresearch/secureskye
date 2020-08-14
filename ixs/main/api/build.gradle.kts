import com.google.protobuf.gradle.ExecutableLocator
import com.google.protobuf.gradle.ProtobufConfigurator
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    idea
    `java-library`
    kotlin("jvm")
    id("com.google.protobuf")
}

java {
    sourceCompatibility = JavaVersion.VERSION_1_8
}

tasks.withType(KotlinCompile::class).configureEach {
    dependsOn("generateProto")
    kotlinOptions.jvmTarget = "1.8"
}

dependencies {
    // Kotlin
    api(kotlin("stdlib-jdk8", Versions.kotlin))

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
