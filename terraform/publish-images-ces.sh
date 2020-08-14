#!/bin/bash

set -e

for project in $(docker images --format "{{.Repository}}:{{.Tag}}" | grep -P "^us\.gcr\.io\/secureskye-ces\/[a-z0-9\-]+:\d+\.\d+\.\d+(?:-(?:m|rc)\d+)?$" | sort)
do
	echo "Image: $project"
	docker push ${project}
done

