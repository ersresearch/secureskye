resource "kubernetes_service" "prometheus" {
  metadata {
    name = "${kubernetes_replication_controller.grafana.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.grafana.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.grafana.metadata.0.labels.tier}"
    }

    port {
      port        = 3000
      target_port = 3000
      name        = "http"
    }
  }
}

resource "kubernetes_replication_controller" "grafana" {
  metadata {
    name = "grafana"

    labels {
      app  = "grafana"
      tier = "metrics"
    }
  }

  spec {
    selector {
      app  = "grafana"
      tier = "metrics"
    }

    template {
      container {
        image             = "${var.image["container_registry"]}/${var.image["project_id"]}/grafana:${lookup(var.image, "version", "latest")}"
        name              = "grafana"
        image_pull_policy = "Always"

        resources {
          requests {
            cpu    = "0.2"
            memory = "500Mi"
          }
        }

        port {
          container_port = 3000
        }
      }
    }
  }
}
