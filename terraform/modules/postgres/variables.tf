variable "image" {
  type        = "map"
  description = "Module image information."
}

variable "claim_resources_requests" {
  type        = "map"
  description = "Resources requests (storage)."

  default = {}
}

variable "storage_class_name" {
  description = "Storage class name."
  default     = "standard"
}

variable "depends_on" {
  type        = "list"
  description = "Dummy for module dependencies."

  default = []
}
