resource "kubernetes_service" "prometheus" {
  metadata {
    name = "${kubernetes_replication_controller.prometheus.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.prometheus.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.prometheus.metadata.0.labels.tier}"
    }

    port {
      port        = 9090
      target_port = 9090
      name        = "http"
    }
  }
}

resource "kubernetes_replication_controller" "prometheus" {
  metadata {
    name = "prometheus"

    labels {
      app  = "prometheus"
      tier = "metrics"
    }
  }

  spec {
    selector {
      app  = "prometheus"
      tier = "metrics"
    }

    template {
      container {
        image             = "${var.image["container_registry"]}/${var.image["project_id"]}/prometheus:${lookup(var.image, "version", "latest")}"
        name              = "prometheus"
        image_pull_policy = "Always"

        resources {
          requests {
            cpu    = "0.2"
            memory = "500Mi"
          }
        }

        port {
          container_port = 9090
        }
      }
    }
  }
}
