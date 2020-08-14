resource "kubernetes_service" "discovery" {
  metadata {
    name = "${kubernetes_replication_controller.discovery.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.discovery.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.discovery.metadata.0.labels.tier}"
    }

    port {
      port        = 8300
      target_port = 8300
      name        = "http"
    }

    port {
      port        = 8500
      target_port = 8500
      name        = "dashboard"
    }
  }
}

resource "kubernetes_replication_controller" "discovery" {
  metadata {
    name = "discovery"

    labels {
      app  = "consul"
      tier = "backend"
    }
  }

  spec {
    replicas = 1

    selector {
      app  = "consul"
      tier = "backend"
    }

    template {
      container {
        image = "consul:1.2.1"
        name  = "consul"

        resources {
          requests {
            cpu    = "0.5"
            memory = "500Mi"
          }
        }

        port {
          container_port = 8300
        }

        port {
          container_port = 8500
        }

        volume_mount {
          mount_path = "/consul/data"
          name       = "discovery-storage"
        }
      }

      volume {
        name = "discovery-storage"

        persistent_volume_claim {
          claim_name = "${kubernetes_persistent_volume_claim.discovery-pvc.metadata.0.name}"
        }
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim" "discovery-pvc" {
  metadata {
    name = "discovery-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = "${var.claim_resources_requests}"
    }

    storage_class_name = "${var.storage_class_name}"
  }
}
