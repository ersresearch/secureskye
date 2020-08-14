google_cloud {
  project_id = "secure-skye"
}

modules {
  discovery.storage = "10Gi"
  postgres.storage  = "100Gi"
  mongodb.storage   = "500Gi"

  gateway.version           = "0.6.3"
  grafana.version           = "0.6.3"
  ie_main.version           = "0.6.3"
  ixs_main.version          = "0.6.3"
  licensing_main.version    = "0.6.3"
  mongodb.version           = "0.6.3"
  mongodb_init.version      = "0.6.3"
  notification_main.version = "0.6.3"
  oauth_saa.version         = "0.6.3"
  oauth_uaa.version         = "0.6.3"
  obd2device_admin.version  = "0.6.3"
  obd2device_event.version  = "0.6.3"
  ota_vehicle.version       = "0.6.3"
  postgres.version          = "0.6.3"
  postgres_init.version     = "0.6.3"
  prometheus.version        = "0.6.3"
  socketio.version          = "0.6.3"
  ui.version                = "0.6.3"
  ui_fleet.version          = "0.6.3"
  user_admin.version        = "0.6.3"
  vehicle_admin.version     = "0.6.3"
  vehicle_message.version   = "0.6.3"
  vehicle_registry.version  = "0.6.3"

  gateway.global_ip = "35.189.130.31"
}
