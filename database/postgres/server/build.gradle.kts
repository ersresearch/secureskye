plugins {
    base
    id("com.bmuschko.docker-remote-api")
    id("com.trilliumsecure.gradle.docker")
}

dock {
    copyFiles {
        from("postgresql.conf")
    }

    dockerfile {
        from("postgres:10-alpine")
        label(mapOf("maintainer" to "Dominik Nakamura <dominik.nakamura@trilliumsecure.com>"))

        copyFile("postgresql.conf", "/etc/")
        defaultCommand("postgres", "-c", "config_file=/etc/postgresql.conf")
    }
}
