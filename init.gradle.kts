val JCENTER_REPO_NAME = "custom-jcenter"
val GRADLE_REPO_NAME = "custom-gradle"
val ARTIFACTORY_HOST = "http://192.168.1.202:8081"

val repoHandler: RepositoryHandler.() -> Unit = {
    all {
        if (name != JCENTER_REPO_NAME && name != GRADLE_REPO_NAME)
            remove(this)
    }
}

val customJcenter: RepositoryHandler.() -> Unit = {
    maven {
        name = JCENTER_REPO_NAME
        setUrl("$ARTIFACTORY_HOST/artifactory/jcenter")
    }
}

val customGradle: RepositoryHandler.() -> Unit = {
    maven {
        name = GRADLE_REPO_NAME
        setUrl("$ARTIFACTORY_HOST/artifactory/gradle")
    }
}

gradle.settingsEvaluated {
    pluginManagement {
        repositories.apply(repoHandler)
        repositories.apply(customGradle)
    }
}

allprojects {
    repositories.apply(repoHandler)
    repositories.apply(customJcenter)
    repositories.apply(customGradle)
    buildscript.repositories.apply(repoHandler)
    buildscript.repositories.apply(customJcenter)
    buildscript.repositories.apply(customGradle)
}
