variable "image" {
  type        = "map"
  description = "Module image information."
}

variable "depends_on" {
  type        = "list"
  description = "Dummy for module dependencies."

  default = []
}

variable "global_ip" {
  description = "Global IP used by this cluster."
}

variable "dns_api_key" {
  description = "DNS API key for ACME DNS challenge."
}

variable "dns_api_secret" {
  description = "DNS API secret for ACME DNS challenge."
}
