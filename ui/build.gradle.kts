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

val ngPatch by tasks.registering(YarnTask::class) {
    dependsOn("yarn")
    group = BasePlugin.BUILD_GROUP
    description = "Patch for angular 6 not include some node modules"

    args = listOf("run", "patch")
}

val pbjs by tasks.registering(Exec::class) {
    dependsOn("yarn")
    group = BasePlugin.BUILD_GROUP
    description = "Generate protobuf typescript"

    workingDir = file("node_modules/.bin/")
    commandLine = runCmdArgs("pbjs") + listOf(
        "-t", "static-module", "-w", "commonjs", "--es6", "--force-long",
        "-o", "$projectDir/src/app/shared/model/protoBundle.js",
        *project(":vehicle-message-api").file("src/main/proto").listFiles(),
        *project(":vehicle-admin-api").file("src/main/proto").listFiles(),
        *project(":vehicle-registry-api").file("src/main/proto").listFiles(),
        *project(":user-admin-api").file("src/main/proto").listFiles(),
        *project(":notification-main-api").file("src/main/proto").listFiles(),
        *project(":ota-vehicle-api").file("src/main/proto").listFiles(),
        *project(":oauth-api").file("src/main/proto").listFiles()
    )
}

val pbts by tasks.registering(Exec::class) {
    dependsOn(pbjs)
    group = BasePlugin.BUILD_GROUP
    description = "Generate protobuf typescript"

    workingDir = file("node_modules/.bin/")
    commandLine = runCmdArgs("pbts") + listOf(
        "-o", "$projectDir/src/app/shared/model/protoBundle.d.ts",
        "$projectDir/src/app/shared/model/protoBundle.js"
    )
}

val bootClient by tasks.registering(YarnTask::class) {
    dependsOn(ngPatch, pbts)
    group = "application"
    description = "Compile client side folder for development"

    args = listOf("run", "start")
}

val buildClientDev by tasks.registering(YarnTask::class) {
    dependsOn(ngPatch, pbts)
    group = BasePlugin.BUILD_GROUP
    description = "Compile client side folder for development"

    args = listOf("run", "buildDev")
}

val buildClientDocker by tasks.registering(YarnTask::class) {
    dependsOn(ngPatch, pbts)
    group = BasePlugin.BUILD_GROUP
    description = "Compile client side folder for docker"

    args = listOf("run", "buildDocker")
}

val faviconGenerate by tasks.registering(Exec::class) {
    dependsOn("yarn")
    group = BasePlugin.BUILD_GROUP
    description = "Generate fav icon data"

    workingDir = file("node_modules/.bin/")
    commandLine = runCmdArgs("real-favicon") + listOf(
        "generate",
        "$projectDir/src/favicon/faviconDescription.json", "$projectDir/src/favicon/faviconData.json",
        "$projectDir/src/assets/favicon"
    )
}

val faviconInject by tasks.registering(Exec::class) {
    dependsOn(faviconGenerate)
    group = BasePlugin.BUILD_GROUP
    description = "Inject fav icon data to index.html"

    workingDir = file("node_modules/.bin/")
    commandLine = runCmdArgs("real-favicon") + listOf(
        "inject",
        "$projectDir/src/favicon/faviconData.json",
        "$projectDir/src",
        "$projectDir/src/index.html"
    )
}

fun runCmdArgs(cmd: String) =
    if (Os.isFamily(Os.FAMILY_WINDOWS)) listOf("cmd", "/c", cmd)
    else listOf("./$cmd")

dock {
    dependsOn = buildClientDocker
    copyFiles {
        from("server") { into("server") }
        from("$buildDir/dist") { into("dist") }
    }

    dockerfile {
        from("nginx:1.15-alpine")
        label(mapOf("maintainer" to "Dominik Nakamura <dominik.nakamura@trilliumsecure.com>"))

        // install curl supervisor wget unzip
        runCommand("apk add --no-cache curl dumb-init")

        // Set environment variables
        environmentVariable("SERVER_PORT", "4200")
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
