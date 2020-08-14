#!/bin/bash

set -e

for project in $(docker images --format "{{.Repository}}:{{.Tag}}" | grep -P "^asia\.gcr\.io\/secure-skye\/[a-z0-9\-]+:\d+\.\d+\.\d+(?:-(?:m|rc)\d+)?$" | sort)
do
	echo "Image: $project"
	docker push ${project}
done

