resource "kubernetes_service" "gateway" {
  metadata {
    name = "${kubernetes_replication_controller.gateway.metadata.0.name}"
  }

  spec {
    selector {
      app  = "${kubernetes_replication_controller.gateway.metadata.0.labels.app}"
      tier = "${kubernetes_replication_controller.gateway.metadata.0.labels.tier}"
    }

    port {
      port        = 80
      target_port = 80
      name        = "http"
    }

    port {
      port        = 443
      target_port = 443
      name        = "https"
    }

    port {
      port        = 8080
      target_port = 8080
      name        = "dashboard"
    }

    type             = "LoadBalancer"
    load_balancer_ip = "${var.global_ip}"
  }
}

resource "kubernetes_replication_controller" "gateway" {
  metadata {
    name = "gateway"

    labels {
      app  = "traefik"
      tier = "frontend"
    }
  }

  spec {
    replicas = 1

    selector {
      app  = "traefik"
      tier = "frontend"
    }

    template {
      container {
        image             = "${var.image["container_registry"]}/${var.image["project_id"]}/gateway:${lookup(var.image, "version", "latest")}"
        name              = "traefik"
        image_pull_policy = "Always"

        resources {
          requests {
            cpu    = "0.2"
            memory = "200Mi"
          }
        }

        port {
          container_port = 80
        }

        port {
          container_port = 443
        }

        port {
          container_port = 8080
        }

        env {
          name  = "GODADDY_API_KEY"
          value = "${var.dns_api_key}"
        }

        env {
          name  = "GODADDY_API_SECRET"
          value = "${var.dns_api_secret}"
        }
      }
    }
  }
}
