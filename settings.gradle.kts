rootProject.name = "secureskye"

include(
    ":common",
    ":common-api",
    ":common-mongodb",
    ":database:mongodb",
    ":database:mongodb-init",
    ":database:postgres",
    ":database:postgres-init",
    ":gateway",
    ":ie-main",
    ":ie-main-api",
    ":infrastructure:grafana",
    ":infrastructure:prometheus",
    ":ixs-main",
    ":ixs-main-api",
    ":licensing-main",
    ":licensing-main-api",
    ":notification-main",
    ":notification-main-api",
    ":oauth-api",
    ":oauth-common",
    ":oauth-saa",
    ":oauth-uaa",
    ":obd2device-admin",
    ":obd2device-admin-api",
    ":obd2device-event",
    ":obd2device-event-api",
    ":ota-vehicle",
    ":ota-vehicle-api",
    ":ui-fleet",
    ":user-admin",
    ":user-admin-api",
    ":user-settings",
    ":user-settings-api",
    ":vehicle-admin",
    ":vehicle-admin-api",
    ":vehicle-message",
    ":vehicle-message-api",
    ":vehicle-registry",
    ":vehicle-registry-api",
    ":websocket-client",
    ":websocket-client-api",
    ":websocket-server"
)

project(":database:mongodb").projectDir = file("database/mongodb/server")
project(":database:mongodb-init").projectDir = file("database/mongodb/init")

project(":database:postgres").projectDir = file("database/postgres/server")
project(":database:postgres-init").projectDir = file("database/postgres/init")

project(":ie-main").projectDir = file("ie/main")
project(":ie-main-api").projectDir = file("ie/main/api")

project(":ixs-main").projectDir = file("ixs/main")
project(":ixs-main-api").projectDir = file("ixs/main/api")

project(":licensing-main").projectDir = file("licensing/main")
project(":licensing-main-api").projectDir = file("licensing/main/api")

project(":notification-main").projectDir = file("notification/main")
project(":notification-main-api").projectDir = file("notification/main/api")

project(":oauth-api").projectDir = file("oauth/api")
project(":oauth-common").projectDir = file("oauth/common")
project(":oauth-uaa").projectDir = file("oauth/uaa")
project(":oauth-saa").projectDir = file("oauth/saa")

project(":obd2device-admin").projectDir = file("obd2device/admin")
project(":obd2device-admin-api").projectDir = file("obd2device/admin/api")
project(":obd2device-event").projectDir = file("obd2device/event")
project(":obd2device-event-api").projectDir = file("obd2device/event/api")

project(":ota-vehicle").projectDir = file("ota/vehicle")
project(":ota-vehicle-api").projectDir = file("ota/vehicle/api")

project(":user-admin").projectDir = file("user/admin")
project(":user-admin-api").projectDir = file("user/admin/api")
project(":user-settings").projectDir = file("user/settings")
project(":user-settings-api").projectDir = file("user/settings/api")

project(":vehicle-admin").projectDir = file("vehicle/admin")
project(":vehicle-admin-api").projectDir = file("vehicle/admin/api")
project(":vehicle-message").projectDir = file("vehicle/message")
project(":vehicle-message-api").projectDir = file("vehicle/message/api")
project(":vehicle-registry").projectDir = file("vehicle/registry")
project(":vehicle-registry-api").projectDir = file("vehicle/registry/api")

project(":websocket-server").projectDir = file("websocket/server")
project(":websocket-client").projectDir = file("websocket/client")
project(":websocket-client-api").projectDir = file("websocket/client/api")
