import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage
import com.bmuschko.gradle.docker.tasks.image.DockerPushImage
import com.bmuschko.gradle.docker.tasks.image.DockerTagImage
import com.bmuschko.gradle.docker.tasks.image.Dockerfile

plugins {
    base
    id("com.bmuschko.docker-remote-api")
    id("com.trilliumsecure.gradle.docker")
}

dock {
    copyFiles {
        from(
            "traefik.toml",
            "secureskye.crt",
            "secureskye.key"
        )
    }

    dockerfile {
        from("traefik:1.6.6-alpine")
        label(mapOf("maintainer" to "Dominik Nakamura <dominik.nakamura@trilliumsecure.com>"))

        copyFile("traefik.toml", "/etc/traefik/")
        copyFile("secureskye.crt", "/etc/traefik/cert/")
        copyFile("secureskye.key", "/etc/traefik/cert/")
    }
}
