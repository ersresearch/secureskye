variable "image" {
  type        = "map"
  description = "Module image information."
}

variable "depends_on" {
  type        = "list"
  description = "Dummy for module dependencies."

  default = []
}
