import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    idea
    `java-library`
    kotlin("jvm")
    kotlin("plugin.spring")
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
    implementation(kotlin("stdlib-jdk8", Versions.kotlin))

    // Normal dependencies
    api("com.google.protobuf:protobuf-java:${Versions.protobuf}")
    implementation("commons-codec:commons-codec:${Versions.commonsCodec}")
}

idea {
    module {
        sourceDirs.add(file("${protobuf.protobuf.generatedFilesBaseDir}/main/java"))
    }
}
