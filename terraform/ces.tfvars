google_cloud {
  project_id         = "secureskye-ces"
  region             = "us-central1"
  container_registry = "us.gcr.io"

  kubernetes.zone    = "us-central1-a"
}

modules {
  default_gcr       = "us.gcr.io"

  gateway.global_ip = "35.202.170.96"
}
