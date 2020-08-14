#!/bin/bash

terraform apply -var-file=terraform.tfvars -var-file=secret.tfvars
