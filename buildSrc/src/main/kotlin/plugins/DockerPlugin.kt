/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package plugins

import com.bmuschko.gradle.docker.DockerExtension
import com.bmuschko.gradle.docker.DockerRegistryCredentials
import com.bmuschko.gradle.docker.DockerRemoteApiPlugin
import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage
import com.bmuschko.gradle.docker.tasks.image.DockerPushImage
import com.bmuschko.gradle.docker.tasks.image.DockerTagImage
import com.bmuschko.gradle.docker.tasks.image.Dockerfile
import org.ajoberstar.grgit.Grgit
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.file.CopySpec
import org.gradle.api.plugins.ExtensionAware
import org.gradle.api.tasks.Copy
import org.gradle.api.tasks.TaskProvider
import org.gradle.kotlin.dsl.configure
import org.gradle.kotlin.dsl.create
import org.gradle.kotlin.dsl.hasPlugin
import org.gradle.kotlin.dsl.register
import java.util.Properties

open class DockerExt {
    var dependsOn: Any? = null
    var copyFiles: CopySpec.() -> Unit = {}
    var dockerfile: Dockerfile.() -> Unit = {}

    fun copyFiles(func: CopySpec.() -> Unit) {
        copyFiles = func
    }

    fun dockerfile(func: Dockerfile.() -> Unit) {
        dockerfile = func
    }
}

class DockerPlugin : Plugin<Project> {
    private val props = Properties()

    override fun apply(project: Project) {
        if (!project.plugins.hasPlugin(DockerRemoteApiPlugin::class))
            throw PluginMissingException(DockerRemoteApiPlugin::class, "com.bmuschko.docker-remote-api")

        val ext = project.extensions.create<DockerExt>("dock")

        if (props.isEmpty) {
            val file = project.rootProject.file("local.properties")
            if (file.exists())
                props.load(file.inputStream())
        }

        val gitHost = detectHost(project)

        project.configure<DockerExtension> {
            this as ExtensionAware
            configure<DockerRegistryCredentials> {
                url.set(gitHost)
                username.set(props.getProperty("docker.username") ?: "")
                password.set(props.getProperty("docker.password") ?: "")
                email.set(props.getProperty("docker.email") ?: "")
            }
        }

        val copyDockerFiles = project.tasks.register("copyDockerFiles", Copy::class) {
            if (ext.dependsOn != null)
                dependsOn(ext.dependsOn)
            group = TASK_GROUP

            ext.copyFiles(this)
            into("${project.buildDir}/$OUTPUT_DIR")
        }

        val createDockerfile = project.tasks.register("createDockerfile", Dockerfile::class) {
            dependsOn(copyDockerFiles)
            group = TASK_GROUP

            ext.dockerfile(this)
            destFile.set(project.file("${project.buildDir}/$OUTPUT_DIR/Dockerfile"))
        }

        val buildDockerImage = project.tasks.register("buildDockerImage", DockerBuildImage::class) {
            dependsOn(createDockerfile)
            group = TASK_GROUP

            inputDir.set(project.file("${project.buildDir}/$OUTPUT_DIR"))
        }

        val gitlabMainRepository = createGitlabMainDockerTag(project, gitHost)
        val gitlabRepository = createGitlabDockerTag(project)

        val tagGitlabMainServer = project.registerTaggingTask(
            "tagGitlabMainServer", buildDockerImage, gitlabMainRepository
        )
        val tagGitlabServer =
            if (gitlabMainRepository != gitlabRepository)
                project.registerTaggingTask(
                    "tagGitlabServer", buildDockerImage, gitlabRepository
                )
            else null

        val tagGoogleServer = project.registerTaggingTask(
            "tagGoogleServer", buildDockerImage, "asia.gcr.io/secure-skye/${project.name}"
        )
        val tagGoogleCesServer = project.registerTaggingTask(
            "tagGoogleCesServer", buildDockerImage, "us.gcr.io/secureskye-ces/${project.name}"
        )

        val buildDocker = project.tasks.register("buildDocker") {
            dependsOn(tagGitlabMainServer, tagGoogleServer, tagGoogleCesServer)
            if (tagGitlabServer != null)
                dependsOn(tagGitlabServer)

            group = TASK_GROUP
        }

        project.tasks.register("pushDocker", DockerPushImage::class) {
            dependsOn(buildDocker)
            group = TASK_GROUP

            imageName.set(gitlabRepository)
            tag.set(project.version.toString())
        }
    }

    companion object {
        const val TASK_GROUP = "docker"
        const val OUTPUT_DIR = "docker"
        val GIT_HTTP_REGEX = """^https?://([^:/]+)(?::\d+)?/(.+?)(?:\.git)?$""".toRegex()
        val GIT_SSH_REGEX = """^ssh://git@([^:/]+)(?::\d+)?/(.+?)(?:\.git)?$""".toRegex()

        private fun detectGitRemoteUrl(project: Project): String {
            val remotes = Grgit.open {
                currentDir = project.rootProject.rootDir
            }.use { it.remote.list() }

            return when (remotes.size) {
                0 -> throw Exception("No git remote found")
                1 -> remotes.first()
                else -> remotes.find { it.name == "origin" } ?: remotes.first()
            }.url
        }

        private fun transformUrl(url: String, regex: Regex, transform: (List<String>) -> String): String {
            val values = regex.matchEntire(url)?.groupValues
            if (values == null || values.size != 3)
                throw Exception("Couldn't determine docker tag from $url")

            return transform(values)
        }

        private fun detectHost(project: Project) = detectGitRemoteUrl(project).let { remote ->
            transformUrl(remote, getExtractRegex(remote)) { it[1] }
        }

        private fun getExtractRegex(remote: String) = when {
            remote.startsWith("http") -> GIT_HTTP_REGEX
            remote.startsWith("ssh") -> GIT_SSH_REGEX
            else -> throw Exception("Unknown url format $remote")
        }

        private fun createGitlabDockerTag(project: Project) = detectGitRemoteUrl(project).let { remote ->
            transformUrl(remote, getExtractRegex(remote)) { "${it[1]}/${it[2]}/${project.name}" }
        }

        private fun createGitlabMainDockerTag(project: Project, host: String) =
            "$host/secureskye/secureskye/${project.name}"

        private fun Project.registerTaggingTask(
            name: String,
            buildDockerImageTask: TaskProvider<DockerBuildImage>,
            repositoryName: String
        ) = tasks.register(name, DockerTagImage::class) {
            dependsOn(buildDockerImageTask)
            group = TASK_GROUP

            targetImageId(buildDockerImageTask.get().imageId)
            repository.set(repositoryName)
            tag.set(project.version.toString())
        }
    }
}
