plugins {
    `kotlin-dsl`
    `java-gradle-plugin`
}

repositories {
    if (System.getenv("CI") != null)
        maven { setUrl("http://192.168.1.202:8081/artifactory/jcenter") }
    else
        jcenter()
}

dependencies {
    implementation("com.bmuschko:gradle-docker-plugin:4.1.0")
    implementation("org.ajoberstar.grgit:grgit-core:3.0.0")
}

kotlinDslPluginOptions {
    experimentalWarning.set(false)
}

gradlePlugin {
    plugins {
        register("docker-plugin") {
            id = "com.trilliumsecure.gradle.docker"
            implementationClass = "plugins.DockerPlugin"
        }
    }
}
