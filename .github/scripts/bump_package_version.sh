#!/bin/bash

# Check if the script is provided with an argument
if [ $# -eq 0 ]; then
    echo "Error: Please provide either MAJOR, MINOR, or PATCH as an argument."
    exit 1
fi

# Read the current version from package.json
current_version=$(jq -r .version package.json)

# Function to increment version component
increment_version() {
    local version="$1"
    local component="$2"
    echo "$version" | awk -F. -v OFS=. -v idx="$component" '{++$idx; for (i=idx+1; i<=NF; ++i) $i=0} 1'
}

# Increment the version based on the provided argument
case $1 in
    "MAJOR" | "major")
        new_version=$(increment_version "$current_version" 1)
        ;;
    "MINOR" | "minor")
        new_version=$(increment_version "$current_version" 2)
        ;;
    "PATCH" | "patch")
        new_version=$(increment_version "$current_version" 3)
        ;;
    *)
        echo "Error: Invalid argument. Please provide either MAJOR, MINOR, or PATCH."
        exit 1
        ;;
esac

# Update the version in package.json files
sed -i.bak "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" package.json

# Clean up backup files
rm -f package.json.bak

echo "Version updated from $current_version to $new_version"
