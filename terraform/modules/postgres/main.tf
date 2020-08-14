resource "kubernetes_service" "postgres" {
  metadata {
    name = "${kubernetes_replication_controller.postgres.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.postgres.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.postgres.metadata.0.labels.tier}"
    }

    port {
      port        = 5432
      target_port = 5432
      name        = "http"
    }
  }
}

resource "kubernetes_replication_controller" "postgres" {
  metadata {
    name = "postgres"

    labels {
      app  = "postgres"
      tier = "backend"
    }
  }

  spec {
    selector {
      app  = "postgres"
      tier = "backend"
    }

    template {
      container {
        image             = "${var.image["container_registry"]}/${var.image["project_id"]}/postgres:${lookup(var.image, "version", "latest")}"
        name              = "postgres"
        image_pull_policy = "Always"

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        env {
          name  = "POSTGRES_DB"
          value = "secureskye"
        }

        env {
          name  = "POSTGRES_PASSWORD"
          value = "postgres"
        }

        port {
          container_port = 5432
        }

        volume_mount {
          mount_path = "/var/lib/postgresql"
          name       = "postgres-storage"
        }
      }

      volume {
        name = "postgres-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.postgres-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim" "postgres-pvc" {
  metadata {
    name = "postgres-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}
