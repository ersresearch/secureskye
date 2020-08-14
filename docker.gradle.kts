import com.bmuschko.gradle.docker.DockerRemoteApiPlugin
import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage
import com.bmuschko.gradle.docker.tasks.image.DockerPushImage
import com.bmuschko.gradle.docker.tasks.image.DockerTagImage
import com.bmuschko.gradle.docker.tasks.image.Dockerfile
import plugins.DockerExt
import plugins.DockerPlugin

buildscript {
    repositories {
        if (System.getenv("CI") != null)
            maven { setUrl("http://192.168.1.202:8081/artifactory/gradle") }
        else
            gradlePluginPortal()
    }

    dependencies {
        classpath("com.bmuschko:gradle-docker-plugin:${PluginVersions.docker}")
    }
}

apply<DockerRemoteApiPlugin>()
apply<DockerPlugin>()

val aspectjVersion = "1.8.13"
val aspectjName = "aspectjweaver-$aspectjVersion.jar"
val bootJar = tasks.named<Jar>("bootJar")

fun findMainClass(): String = "$group.secureskye.${name.replace('-', '.').toLowerCase()}.ApplicationKt"

configure<DockerExt> {
    dependsOn = bootJar
    copyFiles {
        from(zipTree(bootJar.get().outputs.files.singleFile))
        from(rootProject.file("docker/trillium.crt"))
    }

    dockerfile {
        from("adoptopenjdk/openjdk8:alpine-slim")
        label(mapOf("maintainer" to "Dominik Nakamura <dominik.nakamura@trilliumsecure.com>"))

        runCommand("apk add --no-cache ca-certificates wget")

        copyFile("trillium.crt", "/usr/local/share/ca-certificates/")
        runCommand("update-ca-certificates")

        copyFile("BOOT-INF/lib", "/app/lib")
        copyFile("META-INF", "/app/META-INF")
        copyFile("BOOT-INF/classes", "/app")
        environmentVariable("SPRING_PROFILES_ACTIVE", "'docker'")
        exposePort(8080)
        entryPoint(
            "java",
            "-noverify",
            "-javaagent:app/lib/$aspectjName",
            "-cp", "app:app/lib/*",
            findMainClass()
        )
    }
}
