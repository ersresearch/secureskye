#!/bin/bash

terraform apply -var-file=terraform.tfvars -var-file=secret.tfvars -var-file=ces.tfvars -state=terraform-ces.tfstate
