import com.diffplug.gradle.spotless.SpotlessExtension
import com.diffplug.gradle.spotless.SpotlessPlugin
import com.github.jk1.license.LicenseReportExtension
import com.github.jk1.license.LicenseReportPlugin
import com.github.jk1.license.filter.LicenseBundleNormalizer
import com.github.jk1.license.render.InventoryHtmlReportRenderer
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

buildscript {
    repositories {
        jcenter()
    }

    dependencies {
        classpath("org.postgresql:postgresql:42.2.5")
        classpath("org.yaml:snakeyaml:1.23")
    }
}

plugins {
    `build-scan`
    kotlin("jvm") version "1.3.10" apply false
    kotlin("plugin.allopen") version "1.3.10" apply false
    kotlin("plugin.noarg") version "1.3.10" apply false
    id("com.diffplug.gradle.spotless") version "3.16.0" apply false
    id("com.google.protobuf") version "0.8.7" apply false
    id("com.gorylenko.gradle-git-properties") version "2.0.0-beta1" apply false
    id("io.gitlab.arturbosch.detekt") version "1.0.0-RC11" apply false
    id("org.springframework.boot") version "2.0.6.RELEASE" apply false
    id("com.github.jk1.dependency-license-report") version "1.3" apply false
}

buildScan {
    setTermsOfServiceUrl("https://gradle.com/terms-of-service")
    setTermsOfServiceAgree("yes")
}

subprojects {
    group = "jp.co.trillium"
    version = "0.6.3"

    repositories {
        jcenter()
    }

    tasks.withType(KotlinCompile::class).configureEach {
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict")
        }
    }

    buildscript {
        repositories {
            jcenter()
        }
    }
}

allprojects {
    tasks.register("resolve") {
        doLast {
            buildscript.configurations.configureEach {
                if (isCanBeResolved) resolve()
            }
            configurations.configureEach {
                if (isCanBeResolved) resolve()
            }
        }
    }
}

configure(
    listOf(
        project(":common"),
        project(":common-api"),
        project(":common-mongodb"),
        project(":database:mongodb-init"),
        project(":ie-main"),
        project(":ie-main-api"),
        project(":ixs-main"),
        project(":ixs-main-api"),
        project(":licensing-main"),
        project(":licensing-main-api"),
        project(":notification-main"),
        project(":notification-main-api"),
        project(":oauth-api"),
        project(":oauth-common"),
        project(":oauth-saa"),
        project(":oauth-uaa"),
        project(":obd2device-admin"),
        project(":obd2device-admin-api"),
        project(":obd2device-event"),
        project(":obd2device-event-api"),
        project(":ota-vehicle"),
        project(":ota-vehicle-api"),
        project(":user-admin"),
        project(":user-admin-api"),
        project(":user-settings"),
        project(":user-settings-api"),
        project(":vehicle-admin"),
        project(":vehicle-admin-api"),
        project(":vehicle-message"),
        project(":vehicle-message-api"),
        project(":vehicle-registry"),
        project(":vehicle-registry-api"),
        project(":websocket-client"),
        project(":websocket-client-api")
    )
) {

    repositories {
        jcenter()
    }

    val detekt by configurations.creating

    dependencies {
        detekt("io.gitlab.arturbosch.detekt:detekt-cli:1.0.0-RC11")
    }

    val detektCheck by tasks.registering(JavaExec::class) {
        group = JavaBasePlugin.VERIFICATION_GROUP

        main = "io.gitlab.arturbosch.detekt.cli.Main"
        classpath = detekt

        args(
            "--input", file("src/main/kotlin"),
            "--config", "$rootDir/detekt.yml",
            "--filters", ".*/resources/.*,.*/build/.*"
        )
    }

    afterEvaluate {
        tasks.named<Task>("check").configure { dependsOn(detektCheck) }
    }

    apply<SpotlessPlugin>()

    configure<SpotlessExtension> {
        kotlin {
            ktlint("0.29.0")
            licenseHeaderFile(rootProject.file("LICENSE.java"))
        }

        format("yaml") {
            target("**/*.yaml", "**/*.yml")
            licenseHeaderFile(rootProject.file("LICENSE.yml"), """(?:[\w\.\*-]+:|---)""")

            trimTrailingWhitespace()
            indentWithSpaces()
            endWithNewline()
        }
    }

    apply<LicenseReportPlugin>()

    configure<LicenseReportExtension> {
        configurations = arrayOf("runtimeClasspath")
        renderers = arrayOf(InventoryHtmlReportRenderer())
        filters = arrayOf(LicenseBundleNormalizer())
    }
}
