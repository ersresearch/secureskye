resource "kubernetes_service" "default" {
  metadata {
    name = "${kubernetes_replication_controller.default.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.default.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.default.metadata.0.labels.tier}"
    }

    port {
      port        = "${var.port}"
      target_port = "${var.port}"
      name        = "http"
    }
  }
}

resource "kubernetes_replication_controller" "default" {
  metadata {
    name = "${var.name}"

    labels {
      app  = "${var.name}"
      tier = "frontend"
    }
  }

  spec {
    replicas = 1

    selector {
      app  = "${var.name}"
      tier = "frontend"
    }

    template {
      container {
        image             = "${var.image["container_registry"]}/${var.image["project_id"]}/${var.name}:${lookup(var.image, "version", "latest")}"
        name              = "${var.name}"
        image_pull_policy = "Always"

        resources {
          requests = "${var.resources_requests}"
          limits   = "${var.resources_limits}"
        }

        port {
          container_port = "${var.port}"
        }

        env = "${var.env}"
      }
    }
  }
}
