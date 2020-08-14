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
        mavenBom(Boms.reactor)
        mavenBom(Boms.springCloud)
    }
}

configurations {
    configureEach { exclude(module = "spring-boot-starter-tomcat") }
}

dependencies {
    implementation(project(":common"))
    implementation(project(":common-mongodb"))
    implementation(project(":ie-main-api"))
    implementation(project(":notification-main-api"))
    implementation(project(":oauth-common"))
    implementation(project(":vehicle-message-api"))

    // Kotlin
    implementation(kotlin("reflect", Versions.kotlin))
    implementation(kotlin("stdlib-jdk7", Versions.kotlin))
    implementation(kotlin("stdlib-jdk8", Versions.kotlin))
    implementation(kotlin("stdlib", Versions.kotlin))

    // Spring Boot
    implementation(springBootStarter("actuator"))
    implementation(springBootStarter("data-jpa"))
    implementation(springBootStarter("data-mongodb"))
    implementation(springBootStarter("data-mongodb-reactive"))
    implementation(springBootStarter("mail"))
    implementation(springBootStarter("security"))
    implementation(springBootStarter("undertow"))

    // Spring Cloud
    implementation(springCloudStarter("consul-discovery"))
    implementation(springCloudStarter("openfeign"))

    // Spring Security
    implementation(springSecurityOauth("oauth2", Versions.springOauth))
    implementation(springSecurity("jwt", Versions.springJwt))

    // Normal dependencies (Spring auto-versioned)
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("io.projectreactor:reactor-core")
    runtimeOnly("io.micrometer:micrometer-registry-prometheus")
    runtimeOnly("org.postgresql:postgresql")

    // Normal dependencies
    implementation("commons-io:commons-io:${Versions.commonsIo}")
    implementation("org.apache.commons:commons-compress:${Versions.commonsCompress}")
    implementation("org.bouncycastle:bcprov-jdk15on:${Versions.bouncyCastle}")
    implementation("org.mapstruct:mapstruct-jdk8:${Versions.mapstruct}")
    runtimeOnly("io.netty:netty-transport-native-epoll:${Versions.netty}:linux-x86_64")

    // Test dependencies
    testImplementation("org.springframework.boot:spring-boot-starter-test")

    // Annotation Processor dependencies
    kapt("org.mapstruct:mapstruct-processor:${Versions.mapstruct}")
}

kapt {
    correctErrorTypes = true
}

springBoot {
    buildInfo()
}

tasks {
    withType(KotlinCompile::class).configureEach {
        kotlinOptions.jvmTarget = "1.8"
    }

    processResources.configure {
        from(rootProject.file("oauth/jwt")) {
            include("jwt.pub")
        }
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
