###############################################################
# Variables
###############################################################

variable "google_cloud" {
  type = "map"

  default {
    credentials_file   = "credentials.json"
    project_id         = "secure-skye"
    region             = "asia-northeast1"
    container_registry = "asia.gcr.io"
    cluster_name       = "secureskye-cluster"

    kubernetes.zone               = "asia-northeast1-a"
    kubernetes.additional_zones   = ""
    kubernetes.machine_type       = "n1-standard-4"
    kubernetes.initial_node_count = 4
    kubernetes.version            = "1.11.5-gke.5"
    kubernetes.disk_size_gb       = "100"
    kubernetes.disable_dashboard  = false
  }
}

variable "modules" {
  type = "map"

  default {
    defaul_gcr = "asia.gcr.io"

    discovery.storage = "10Gi"
    mongodb.storage   = "100Gi"
    postgres.storage  = "100Gi"

    gateway.version           = "latest"
    grafana.version           = "latest"
    ie_main.version           = "latest"
    ixs_main.version          = "latest"
    licensing_main.version    = "latest"
    mongodb_init.version      = "latest"
    notification_main.version = "latest"
    oauth_saa.version         = "latest"
    oauth_uaa.version         = "latest"
    obd2device_admin.version  = "latest"
    obd2device_event.version  = "latest"
    ota_vehicle.version       = "latest"
    postgres.version          = "latest"
    postgres_init.version     = "latest"
    prometheus.version        = "latest"
    socketio.version          = "latest"
    ui.version                = "latest"
    ui_fleet.version          = "latest"
    user_admin.version        = "latest"
    vehicle_admin.version     = "latest"
    vehicle_message.version   = "latest"
    vehicle_registry.version  = "latest"

    gateway.dns_api_key    = ""
    gateway.dns_api_secret = ""
    gateway.global_ip      = ""
  }
}

###############################################################
# Kubernetes cluster initialization
###############################################################

# Google Cloud provider
provider "google" {
  version     = "~> 1.9"
  credentials = "${file(var.google_cloud["credentials_file"])}"
  project     = "${var.google_cloud["project_id"]}"
  region      = "${var.google_cloud["region"]}"
}

# Google Kubernetes Engine (GKE) cluster resource
resource "google_container_cluster" "secure_skye" {
  name               = "${var.google_cloud["cluster_name"]}"
  zone               = "${var.google_cloud["kubernetes.zone"]}"
  additional_zones   = "${compact(split(",",var.google_cloud["kubernetes.additional_zones"]))}"
  initial_node_count = "${var.google_cloud["kubernetes.initial_node_count"]}"
  min_master_version = "${var.google_cloud["kubernetes.version"]}"
  node_version       = "${var.google_cloud["kubernetes.version"]}"
  subnetwork         = "default"

  node_config {
    disk_size_gb = "${var.google_cloud["kubernetes.disk_size_gb"]}"
    machine_type = "${var.google_cloud["kubernetes.machine_type"]}"

    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }

  addons_config {
    kubernetes_dashboard {
      disabled = "${var.google_cloud["kubernetes.disable_dashboard"]}"
    }
  }
}

# Kubernetes provider
provider "kubernetes" {
  version  = "~> 1.1"
  host     = "${google_container_cluster.secure_skye.endpoint}"
  username = "${google_container_cluster.secure_skye.master_auth.0.username}"
  password = "${google_container_cluster.secure_skye.master_auth.0.password}"

  client_certificate     = "${base64decode(google_container_cluster.secure_skye.master_auth.0.client_certificate)}"
  client_key             = "${base64decode(google_container_cluster.secure_skye.master_auth.0.client_key)}"
  cluster_ca_certificate = "${base64decode(google_container_cluster.secure_skye.master_auth.0.cluster_ca_certificate)}"

  load_config_file = false
}

###############################################################
# GCE storage class for database persistent volume claims
###############################################################

/*resource "kubernetes_storage_class" "secure_skye_db_storage_class" {
  depends_on = ["google_container_cluster.secure_skye"]

  metadata {
    name = "secure-skye-db-storage-class"
  }

  storage_provisioner = "kubernetes.io/gce-pd"

  parameters {
    type = "pd-ssd"
    zone = "${var.google_cloud["kubernetes.zone"]}"
  }
}*/

###############################################################
# SecureSkye modules
###############################################################

module "postgres" {
  source = "./modules/postgres"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["postgres.version"]}"
  }

  claim_resources_requests {
    storage = "${var.modules["postgres.storage"]}"
  }
}

module "postgres-init" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "postgres-init"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["postgres_init.version"]}"
  }
}

module "mongodb" {
  source = "./modules/mongodb"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["mongodb.version"]}"
  }

  claim_resources_requests {
    storage = "${var.modules["mongodb.storage"]}"
  }
}

// Disable sharding for now
/*module "mongodb-init" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "mongodb-init"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["mongodb_init.version"]}"
  }
}*/

module "discovery" {
  source     = "./modules/discovery"
  depends_on = ["google_container_cluster.secure_skye"]

  claim_resources_requests {
    storage = "${var.modules["discovery.storage"]}"
  }
}

module "prometheus" {
  source     = "./modules/prometheus"
  depends_on = ["google_container_cluster.secure_skye"]

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["prometheus.version"]}"
  }
}

module "grafana" {
  source     = "./modules/grafana"
  depends_on = ["google_container_cluster.secure_skye"]

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["grafana.version"]}"
  }
}

module "gateway" {
  source     = "./modules/gateway"
  depends_on = ["google_container_cluster.secure_skye"]

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["gateway.version"]}"
  }

  global_ip      = "${var.modules["gateway.global_ip"]}"
  dns_api_key    = "${var.modules["gateway.dns_api_key"]}"
  dns_api_secret = "${var.modules["gateway.dns_api_secret"]}"
}

module "oauth_saa" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "oauth-saa"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["oauth_saa.version"]}"
  }
}

module "oauth_uaa" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "oauth-uaa"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["oauth_uaa.version"]}"
  }
}

module "ui_fleet" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]

  name = "ui-fleet"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["ui_fleet.version"]}"
  }

  env = [
    {
      name  = "SERVER_PORT"
      value = "3001"
    },
    {
      name  = "CONSUL_HTTP_ADDR"
      value = "discovery:8500"
    },
  ]

  resources_requests = [{
    cpu    = "0.1"
    memory = "100Mi"
  }]
}

module "socketio" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]

  name = "websocket-server"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["socketio.version"]}"
  }

  env = [
    {
      name  = "SERVER_PORT"
      value = "3000"
    },
    {
      name  = "CONSUL_HTTP_ADDR"
      value = "discovery:8500"
    },
    {
      name  = "MONGO_USERNAME"
      value = "mongodb"
    },
    {
      name  = "MONGO_PASS"
      value = "mongodb"
    },
  ]

  resources_requests = [{
    cpu    = "0.1"
    memory = "100Mi"
  }]
}

module "obd2device_admin" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "obd2device-admin"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["obd2device_admin.version"]}"
  }
}

module "obd2device_event" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "obd2device-event"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["obd2device_event.version"]}"
  }
}

module "vehicle_admin" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "vehicle-admin"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["vehicle_admin.version"]}"
  }
}

module "vehicle_message" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "vehicle-message"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["vehicle_message.version"]}"
  }
}

module "vehicle_registry" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "vehicle-registry"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["vehicle_registry.version"]}"
  }
}

module "ixs_main" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "ixs-main"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["ixs_main.version"]}"
  }

  resources_requests = [{
    cpu    = "0.1"
    memory = "1Gi"
  }]
}

module "ie_main" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "ie-main"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["ie_main.version"]}"
  }

  resources_requests = [{
    cpu    = "0.1"
    memory = "1Gi"
  }]
}

module "licensing_main" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "licensing-main"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["licensing_main.version"]}"
  }

  resources_requests = [{
    cpu    = "0.1"
    memory = "1Gi"
  }]
}

module "ota_vehicle" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "ota-vehicle"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["ota_vehicle.version"]}"
  }

  resources_requests = [{
    cpu    = "0.1"
    memory = "1Gi"
  }]
}

module "notification_main" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "notification-main"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["notification_main.version"]}"
  }

  resources_requests = [{
    cpu    = "0.1"
    memory = "1Gi"
  }]
}

module "user_admin" {
  source     = "./modules/generic-deployment"
  depends_on = ["google_container_cluster.secure_skye"]
  name       = "user-admin"

  image {
    project_id         = "${var.google_cloud["project_id"]}"
    container_registry = "${var.google_cloud["container_registry"]}"
    version            = "${var.modules["user_admin.version"]}"
  }

  resources_requests = [{
    cpu    = "0.1"
    memory = "1Gi"
  }]
}

output "cluster_username" {
  value = "${google_container_cluster.secure_skye.master_auth.0.username}"
}

output "cluster_password" {
  value = "${google_container_cluster.secure_skye.master_auth.0.password}"
}
