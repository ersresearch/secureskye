import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    `java-library`
    kotlin("jvm")
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
    compile(project(":oauth-api"))

    // Kotlin
    api(kotlin("reflect", Versions.kotlin))
    api(kotlin("stdlib-jdk7", Versions.kotlin))
    api(kotlin("stdlib-jdk8", Versions.kotlin))
    api(kotlin("stdlib", Versions.kotlin))
}
