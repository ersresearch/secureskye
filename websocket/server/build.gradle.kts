import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage
import com.bmuschko.gradle.docker.tasks.image.DockerPushImage
import com.bmuschko.gradle.docker.tasks.image.DockerTagImage
import com.bmuschko.gradle.docker.tasks.image.Dockerfile
import com.moowork.gradle.node.yarn.YarnTask

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

val buildClientDocker by tasks.registering(YarnTask::class) {
    group = BasePlugin.BUILD_GROUP
    description = "Compile client side folder for docker"

    args = listOf("run", "buildDocker")
}

dock {
    copyFiles {
        from(
            "index.js",
            "package.json",
            "yarn.lock",
            "socketio-consul-register.json",
            "init.sh"
        )
    }

    dockerfile {
        from("node:8.11.4-alpine")
        label(mapOf("maintainer" to "Dominik Nakamura <dominik.nakamura@trilliumsecure.com>"))

        // install curl dumb-init
        runCommand("apk add --no-cache curl dumb-init")

        workingDir("/home/node/app")
        // Replace old content with new one
        copyFile("index.js", "./")
        copyFile("package.json", "./")
        copyFile("yarn.lock", "./")

        // Set environment variables
        environmentVariable("NODE_ENV", "production")
        environmentVariable("CONSUL_HTTP_ADDR", "discovery:8500")
        environmentVariable("SERVER_PORT", "3000")
        environmentVariable("MONGO_HOST", "mongodb")
        environmentVariable("MONGO_PORT", "27017")
        exposePort(3000)

        // Default command
        runCommand("yarn install --production")

        // Copy init script
        copyFile("socketio-consul-register.json", "/etc/socketio-consul-register.json")
        copyFile("init.sh", "/etc/bin/init.sh")
        runCommand("chmod +x /etc/bin/init.sh")

        // Default command
        entryPoint("/usr/bin/dumb-init", "--")
        defaultCommand("/etc/bin/init.sh")
    }
}
