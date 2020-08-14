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
    implementation(project(":common"))
    implementation(project(":licensing-main-api"))
    implementation(project(":oauth-common"))

    // Kotlin
    implementation(kotlin("reflect", Versions.kotlin))
    implementation(kotlin("stdlib-jdk7", Versions.kotlin))
    implementation(kotlin("stdlib-jdk8", Versions.kotlin))
    implementation(kotlin("stdlib", Versions.kotlin))

    // Spring Boot
    implementation(springBootStarter("actuator"))
    implementation(springBootStarter("data-jpa"))
    implementation(springBootStarter("security"))
    implementation(springBootStarter("undertow"))
    implementation(springBootStarter("web"))

    // Spring Cloud
    implementation(springCloudStarter("consul-discovery"))

    // Spring Security
    implementation(springSecurityOauth("oauth2", Versions.springOauth))
    implementation(springSecurity("jwt", Versions.springJwt))

    // Normal dependencies (Spring auto-versioned)
    runtimeOnly("io.micrometer:micrometer-registry-prometheus")
    runtimeOnly("org.postgresql:postgresql")

    // Normal dependencies
    implementation("org.mapstruct:mapstruct-jdk8:${Versions.mapstruct}")

    // Test dependencies
    testImplementation(springBootStarter("test"))

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
