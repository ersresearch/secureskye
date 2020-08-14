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
        from("dashboard.yaml")
        from("datasource.yaml")
        from("dashboards") { into("dashboards") }
    }

    dockerfile {
        from("grafana/grafana:5.2.2")
        label(mapOf("maintainer" to "Dominik Nakamura <dominik.nakamura@trilliumsecure.com>"))

        copyFile("datasource.yaml", "/etc/grafana/provisioning/datasources/")
        copyFile("dashboard.yaml", "/etc/grafana/provisioning/dashboards/")
        copyFile("dashboards", "/etc/grafana/dashboards/")
    }
}
