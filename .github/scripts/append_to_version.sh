#!/bin/bash

# Check if the script is provided with an argument
if [ $# -eq 0 ]; then
    echo "Info: No input provided. Exiting."
    exit 0
fi

input_string="$1"

# Read the current version from package.json
current_version=$(jq -r .version package.json)

# Append the input string to the version
new_version="${current_version}-${input_string}"

# Update the version in package.json files
sed -i.bak "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" package.json

# Clean up backup files
rm -f package.json.bak

echo "Version updated from $current_version to $new_version"
