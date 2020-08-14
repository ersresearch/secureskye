plugins {
    base
    id("com.bmuschko.docker-remote-api")
    id("com.trilliumsecure.gradle.docker")
}

dock {
    copyFiles {
        from("shard.keyfile")
    }

    dockerfile {
        from("mongo:4.0")
        label(mapOf("maintainer" to "Dominik Nakamura <dominik.nakamura@trilliumsecure.com>"))

        copyFile("shard.keyfile", "/etc/mongo/")
        runCommand("chmod 400 /etc/mongo/shard.keyfile")
        runCommand("chown mongodb:mongodb /etc/mongo/shard.keyfile")
    }
}
