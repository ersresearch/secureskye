variable "name" {
  description = "Module name, also will be used as image name."
}

variable "image" {
  type        = "map"
  description = "Module image information."
}

variable "port" {
  description = "Exposed port."
  default     = 8080
}

variable "resources_requests" {
  type        = "list"
  description = "Resources requests (cpu, memory)."

  default = [{
    cpu    = "0.5"
    memory = "1Gi"
  }]
}

variable "resources_limits" {
  type        = "list"
  description = "Resources limits (cpu, memory)."

  default = [{
    cpu    = "1.0"
    memory = "1.5Gi"
  }]
}

variable "env" {
  type        = "list"
  description = "Container environment variables."

  default = []
}

variable "depends_on" {
  type        = "list"
  description = "Dummy for module dependencies."

  default = []
}
