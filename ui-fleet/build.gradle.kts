import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage
import com.bmuschko.gradle.docker.tasks.image.DockerPushImage
import com.bmuschko.gradle.docker.tasks.image.DockerTagImage
import com.bmuschko.gradle.docker.tasks.image.Dockerfile
import com.moowork.gradle.node.yarn.YarnTask
import org.apache.tools.ant.taskdefs.condition.Os

plugins {
    base
    idea
    id("com.moowork.node") version "1.2.0"
    id("com.bmuschko.docker-remote-api")
    id("com.trilliumsecure.gradle.docker")
}

idea {
    module {
        excludeDirs.add(file("node_modules"))
    }
}

val installDependencies by tasks.registering(YarnTask::class) {
    group = BasePlugin.BUILD_GROUP
    description = "Install dependencies"

    args = listOf("install")
}

val buildClient by tasks.registering(YarnTask::class) {
    dependsOn(installDependencies)
    group = BasePlugin.BUILD_GROUP
    description = "Compile client side folder for development"

    args = listOf("run", "build")
}

dock {
    dependsOn = buildClient
    copyFiles {
        from("server-deployment") { into("server") }
        from("$buildDir/dist") { into("dist") }
    }

    dockerfile {
        from("nginx:1.15-alpine")
        label(mapOf("maintainer" to "Dominik Nakamura <dominik.nakamura@trilliumsecure.com>"))

        // install curl supervisor wget unzip
        runCommand("apk add --no-cache curl dumb-init")

        // Set environment variables
        environmentVariable("SERVER_PORT", "3000")
        environmentVariable("CONSUL_HTTP_ADDR", "discovery:8500")

        // Replace old content with new one
        runCommand("rm -rf /usr/share/nginx/html/*")
        copyFile("dist", "/usr/share/nginx/html/")

        // Copy nginx config
        copyFile("server/nginx/default.conf", "/etc/nginx/conf.d/default.conf")
        // Copy init script
        copyFile("server/nginx-consul-register.json", "/etc/nginx-consul-register.json")
        copyFile("server/init.sh", "/etc/bin/init.sh")
        runCommand("chmod +x /etc/bin/init.sh")

        // Default command
        entryPoint("/usr/bin/dumb-init", "--")
        defaultCommand("/etc/bin/init.sh")
    }
}
