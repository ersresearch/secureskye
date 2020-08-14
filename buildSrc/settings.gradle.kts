pluginManagement {
    repositories {
        if (System.getenv("CI") != null)
            maven { setUrl("http://192.168.1.202:8081/artifactory/gradle") }
        else
            gradlePluginPortal()
    }
}
