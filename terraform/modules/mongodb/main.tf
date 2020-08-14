// Disable sharding for now
/*resource "kubernetes_service" "mongodb-router-1" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-router-1.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-router-1.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-router-1.metadata.0.labels.tier}"
    }

    port {
      port        = 27017
      target_port = 27017
      name        = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-router-2" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-router-2.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-router-2.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-router-2.metadata.0.labels.tier}"
    }

    port {
      port        = 27017
      target_port = 27017
      name        = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-config-master" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-config-master.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-config-master.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-config-master.metadata.0.labels.tier}"
    }

    port {
      port = 27019
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-config-slave-1" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-config-slave-1.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-config-slave-1.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-config-slave-1.metadata.0.labels.tier}"
    }

    port {
      port = 27019
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-config-slave-2" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-config-slave-2.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-config-slave-2.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-config-slave-2.metadata.0.labels.tier}"
    }

    port {
      port = 27019
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-shard-1-master" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-shard-1-master.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-shard-1-master.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-shard-1-master.metadata.0.labels.tier}"
    }

    port {
      port = 27018
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-shard-1-slave-1" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-shard-1-slave-1.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-shard-1-slave-1.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-shard-1-slave-1.metadata.0.labels.tier}"
    }

    port {
      port = 27018
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-shard-1-slave-2" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-shard-1-slave-2.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-shard-1-slave-2.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-shard-1-slave-2.metadata.0.labels.tier}"
    }

    port {
      port = 27018
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-shard-2-master" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-shard-2-master.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-shard-2-master.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-shard-2-master.metadata.0.labels.tier}"
    }

    port {
      port = 27018
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-shard-2-slave-1" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-shard-2-slave-1.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-shard-2-slave-1.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-shard-2-slave-1.metadata.0.labels.tier}"
    }

    port {
      port = 27018
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-shard-2-slave-2" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-shard-2-slave-2.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-shard-2-slave-2.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-shard-2-slave-2.metadata.0.labels.tier}"
    }

    port {
      port = 27018
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-shard-3-master" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-shard-3-master.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-shard-3-master.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-shard-3-master.metadata.0.labels.tier}"
    }

    port {
      port = 27018
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-shard-3-slave-1" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-shard-3-slave-1.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-shard-3-slave-1.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-shard-3-slave-1.metadata.0.labels.tier}"
    }

    port {
      port = 27018
      name = "http"
    }
  }
}

resource "kubernetes_service" "mongodb-shard-3-slave-2" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb-shard-3-slave-2.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb-shard-3-slave-2.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb-shard-3-slave-2.metadata.0.labels.tier}"
    }

    port {
      port = 27018
      name = "http"
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-router-1" {
  metadata {
    name = "mongodb-router-1"

    labels {
      app  = "mongodb-router-1"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-router-1"
      tier = "backend"
    }

    template {
      container {
        image   = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name    = "mongodb-router-1"
        command = ["mongos"]

        args = [
          "--keyFile",
          "/etc/mongo/shard.keyfile",
          "--port",
          "27017",
          "--configdb",
          "configserver/mongodb-config-master,mongodb-config-slave-1,mongodb-config-slave-2",
          "--bind_ip_all",
        ]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27017
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-router-1-storage"
        }
      }

      volume {
        name = "mongodb-router-1-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-router-1-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-router-2" {
  metadata {
    name = "mongodb-router-2"

    labels {
      app  = "mongodb-router-2"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-router-2"
      tier = "backend"
    }

    template {
      container {
        image   = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name    = "mongodb-router-2"
        command = ["mongos"]

        args = [
          "--keyFile",
          "/etc/mongo/shard.keyfile",
          "--port",
          "27017",
          "--configdb",
          "configserver/mongodb-config-master,mongodb-config-slave-1,mongodb-config-slave-2",
          "--bind_ip_all",
        ]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27017
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-router-2-storage"
        }
      }

      volume {
        name = "mongodb-router-2-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-router-2-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-config-master" {
  metadata {
    name = "mongodb-config-master"

    labels {
      app  = "mongodb-config-master"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-config-master"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-config-master"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--configsvr", "--replSet", "configserver"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27019
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-config-master-storage"
        }
      }

      volume {
        name = "mongodb-config-master-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-config-master-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-config-slave-1" {
  metadata {
    name = "mongodb-config-slave-1"

    labels {
      app  = "mongodb-config-slave-1"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-config-slave-1"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-config-slave-1"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--configsvr", "--replSet", "configserver"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27019
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-config-slave-1-storage"
        }
      }

      volume {
        name = "mongodb-config-slave-1-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-config-slave-1-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-config-slave-2" {
  metadata {
    name = "mongodb-config-slave-2"

    labels {
      app  = "mongodb-config-slave-2"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-config-slave-2"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-config-slave-2"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--configsvr", "--replSet", "configserver"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27019
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-config-slave-2-storage"
        }
      }

      volume {
        name = "mongodb-config-slave-2-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-config-slave-2-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-shard-1-master" {
  metadata {
    name = "mongodb-shard-1-master"

    labels {
      app  = "mongodb-shard-1-master"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-shard-1-master"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-shard-1-master"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--shardsvr", "--replSet", "shard1"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27018
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-shard-1-master-storage"
        }
      }

      volume {
        name = "mongodb-shard-1-master-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-shard-1-master-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-shard-1-slave-1" {
  metadata {
    name = "mongodb-shard-1-slave-1"

    labels {
      app  = "mongodb-shard-1-slave-1"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-shard-1-slave-1"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-shard-1-slave-1"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--shardsvr", "--replSet", "shard1"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27018
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-shard-1-slave-1-storage"
        }
      }

      volume {
        name = "mongodb-shard-1-slave-1-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-shard-1-slave-1-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-shard-1-slave-2" {
  metadata {
    name = "mongodb-shard-1-slave-2"

    labels {
      app  = "mongodb-shard-1-slave-2"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-shard-1-slave-2"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-shard-1-slave-2"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--shardsvr", "--replSet", "shard1"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27018
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-shard-1-slave-2-storage"
        }
      }

      volume {
        name = "mongodb-shard-1-slave-2-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-shard-1-slave-2-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-shard-2-master" {
  metadata {
    name = "mongodb-shard-2-master"

    labels {
      app  = "mongodb-shard-2-master"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-shard-2-master"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-shard-2-master"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--shardsvr", "--replSet", "shard2"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27018
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-shard-2-master-storage"
        }
      }

      volume {
        name = "mongodb-shard-2-master-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-shard-2-master-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-shard-2-slave-1" {
  metadata {
    name = "mongodb-shard-2-slave-1"

    labels {
      app  = "mongodb-shard-2-slave-1"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-shard-2-slave-1"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-shard-2-slave-1"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--shardsvr", "--replSet", "shard2"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27018
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-shard-2-slave-1-storage"
        }
      }

      volume {
        name = "mongodb-shard-2-slave-1-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-shard-2-slave-1-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-shard-2-slave-2" {
  metadata {
    name = "mongodb-shard-2-slave-2"

    labels {
      app  = "mongodb-shard-2-slave-2"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-shard-2-slave-2"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-shard-2-slave-2"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--shardsvr", "--replSet", "shard2"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27018
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-shard-2-slave-2-storage"
        }
      }

      volume {
        name = "mongodb-shard-2-slave-2-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-shard-2-slave-2-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-shard-3-master" {
  metadata {
    name = "mongodb-shard-3-master"

    labels {
      app  = "mongodb-shard-3-master"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-shard-3-master"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-shard-3-master"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--shardsvr", "--replSet", "shard3"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27018
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-shard-3-master-storage"
        }
      }

      volume {
        name = "mongodb-shard-3-master-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-shard-3-master-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-shard-3-slave-1" {
  metadata {
    name = "mongodb-shard-3-slave-1"

    labels {
      app  = "mongodb-shard-3-slave-1"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-shard-3-slave-1"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-shard-3-slave-1"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--shardsvr", "--replSet", "shard3"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27018
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-shard-3-slave-1-storage"
        }
      }

      volume {
        name = "mongodb-shard-3-slave-1-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-shard-3-slave-1-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_replication_controller" "mongodb-shard-3-slave-2" {
  metadata {
    name = "mongodb-shard-3-slave-2"

    labels {
      app  = "mongodb-shard-3-slave-2"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb-shard-3-slave-2"
      tier = "backend"
    }

    template {
      container {
        image = "${var.image["container_registry"]}/${var.image["project_id"]}/mongodb:${lookup(var.image, "version", "latest")}"
        name  = "mongodb-shard-3-slave-2"
        args  = ["--keyFile", "/etc/mongo/shard.keyfile", "--shardsvr", "--replSet", "shard3"]

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27018
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-shard-3-slave-2-storage"
        }
      }

      volume {
        name = "mongodb-shard-3-slave-2-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-shard-3-slave-2-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-router-1-pvc" {
  metadata {
    name = "mongodb-router-1-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-router-2-pvc" {
  metadata {
    name = "mongodb-router-2-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-config-master-pvc" {
  metadata {
    name = "mongodb-config-master-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-config-slave-1-pvc" {
  metadata {
    name = "mongodb-config-slave-1-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-config-slave-2-pvc" {
  metadata {
    name = "mongodb-config-slave-2-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-shard-1-master-pvc" {
  metadata {
    name = "mongodb-shard-1-master-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-shard-1-slave-1-pvc" {
  metadata {
    name = "mongodb-shard-1-slave-1-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-shard-1-slave-2-pvc" {
  metadata {
    name = "mongodb-shard-1-slave-2-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-shard-2-master-pvc" {
  metadata {
    name = "mongodb-shard-2-master-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-shard-2-slave-1-pvc" {
  metadata {
    name = "mongodb-shard-2-slave-1-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-shard-2-slave-2-pvc" {
  metadata {
    name = "mongodb-shard-2-slave-2-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-shard-3-master-pvc" {
  metadata {
    name = "mongodb-shard-3-master-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-shard-3-slave-1-pvc" {
  metadata {
    name = "mongodb-shard-3-slave-1-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-shard-3-slave-2-pvc" {
  metadata {
    name = "mongodb-shard-3-slave-2-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}*/

resource "kubernetes_service" "mongodb" {
  metadata {
    name = "${kubernetes_replication_controller.mongodb.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.mongodb.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.mongodb.metadata.0.labels.tier}"
    }

    port {
      port        = 27017
      target_port = 27017
      name        = "http"
    }
  }
}

resource "kubernetes_replication_controller" "mongodb" {
  metadata {
    name = "mongodb"

    labels {
      app  = "mongodb"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "mongodb"
      tier = "backend"
    }

    template {
      container {
        image = "mongo:4.0"
        name  = "mongodb"

        resources {
          requests {
            cpu    = "2"
            memory = "4Gi"
          }
        }

        env {
          name  = "MONGO_INITDB_ROOT_USERNAME"
          value = "mongodb"
        }

        env {
          name  = "MONGO_INITDB_ROOT_PASSWORD"
          value = "mongodb"
        }

        port {
          container_port = 27017
        }

        volume_mount {
          mount_path = "/data/db"
          name       = "mongodb-storage"
        }
      }

      volume {
        name = "mongodb-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.mongodb-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-pvc" {
  metadata {
    name = "mongodb-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}
