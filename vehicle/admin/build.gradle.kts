import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    jacoco
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
    implementation(project(":common"))
    implementation(project(":common-mongodb"))
    implementation(project(":oauth-api"))
    implementation(project(":oauth-common"))
    implementation(project(":vehicle-admin-api"))
    implementation(project(":websocket-client"))

    // Kotlin
    implementation(kotlin("reflect", Versions.kotlin))
    implementation(kotlin("stdlib-jdk7", Versions.kotlin))
    implementation(kotlin("stdlib-jdk8", Versions.kotlin))
    implementation(kotlin("stdlib", Versions.kotlin))

    // Spring Boot
    implementation(springBootStarter("actuator"))
    implementation(springBootStarter("cache"))
    implementation(springBootStarter("data-jpa"))
    implementation(springBootStarter("data-mongodb"))
    implementation(springBootStarter("security"))
    implementation(springBootStarter("undertow"))
    implementation(springBootStarter("web"))

    // Spring Cloud
    implementation(springCloudStarter("consul-discovery"))
    implementation(springCloudStarter("openfeign"))

    // Spring Security
    implementation(springSecurityOauth("oauth2", Versions.springOauth))
    implementation(springSecurity("jwt", Versions.springJwt))

    // Normal dependencies (Spring auto-versioned)
    runtimeOnly("com.fasterxml.jackson.module:jackson-module-kotlin")
    runtimeOnly("com.github.ben-manes.caffeine:caffeine")
    runtimeOnly("io.micrometer:micrometer-registry-prometheus")
    runtimeOnly("org.postgresql:postgresql")

    // Normal dependencies
    implementation("com.google.protobuf:protobuf-java-util:${Versions.protobuf}")
    implementation("org.mapstruct:mapstruct-jdk8:${Versions.mapstruct}")
    runtimeOnly("io.netty:netty-transport-native-epoll:${Versions.netty}:linux-x86_64")

    // Test dependencies
    testImplementation("com.nhaarman.mockitokotlin2:mockito-kotlin:${Versions.mockitoKotlin}")
    testImplementation("org.junit.jupiter:junit-jupiter-api:${Versions.junit}")
    testImplementation(springBootStarter("test"))
    testImplementation(springSecurity("test"))
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:${Versions.junit}")

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

    test.configure {
        useJUnitPlatform()
    }

    jacocoTestReport.configure {
        additionalSourceDirs(files("$buildDir/generated/source/kapt/main"))
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
