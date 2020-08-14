import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm")
    kotlin("kapt")
    kotlin("plugin.spring")
    id("org.springframework.boot")
    id("io.spring.dependency-management")
    id("com.gorylenko.gradle-git-properties")
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
    // Kotlin
    implementation(kotlin("reflect", Versions.kotlin))
    implementation(kotlin("stdlib-jdk7", Versions.kotlin))
    implementation(kotlin("stdlib-jdk8", Versions.kotlin))
    implementation(kotlin("stdlib", Versions.kotlin))

    // Spring Boot
    implementation(springBootStarter("actuator"))
    implementation(springBootStarter("aop"))
    implementation(springBootStarter("data-jpa"))
    implementation(springBootStarter("undertow"))
    implementation(springBootStarter("web"))

    // Spring Cloud
    implementation(springCloudStarter("consul-discovery"))

    // Normal dependencies (Spring auto-versioned)
    runtimeOnly("com.fasterxml.jackson.module:jackson-module-kotlin")
    runtimeOnly("io.micrometer:micrometer-registry-prometheus")
    runtimeOnly("org.flywaydb:flyway-core")
    runtimeOnly("org.postgresql:postgresql")

    // Normal dependencies
    implementation("io.github.microutils:kotlin-logging:${Versions.kotlinLogging}")

    // Test dependencies
    testImplementation(springBootStarter("test"))

    // Annotation Processor dependencies
    kapt(spring("context-indexer"))
}

springBoot {
    buildInfo()
}

tasks {
    withType(KotlinCompile::class).configureEach {
        kotlinOptions.jvmTarget = "1.8"
    }

    bootJar.configure {
        manifest {
            attributes(
                mapOf(
                    "Implementation-Title" to "SecureSKYE [${project.name}] :: ${Globals.codeName}",
                    "Implementation-Version" to version
                )
            )
        }
    }

    bootRun.configure {
        jvmArgs("-Dspring.profiles.active=debug,local")
    }
}

apply(from = rootProject.file("docker.gradle.kts"))
