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
        from("prometheus.yml")

    }

    dockerfile {
        from("prom/prometheus:v2.3.2")
        label(mapOf("maintainer" to "Dominik Nakamura <dominik.nakamura@trilliumsecure.com>"))

        copyFile("prometheus.yml", "/etc/prometheus/")
    }
}
