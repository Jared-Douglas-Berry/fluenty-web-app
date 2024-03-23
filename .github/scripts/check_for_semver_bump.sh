#!/bin/bash

# Function to check if the input string contains a version component
check_version_component() {
    local input_string="$1"

    # Check for [MAJOR], [MINOR], and [PATCH] components
    if echo "$input_string" | grep -q "\[PATCH\]"; then
        echo "PATCH"
    elif echo "$input_string" | grep -q "\[MINOR\]"; then
        echo "MINOR"
    elif echo "$input_string" | grep -q "\[MAJOR\]"; then
        echo "MAJOR"
    else
        echo "Error: The string does not contain [MAJOR], [MINOR], or [PATCH]."
        exit 1
    fi
}

# Main script

# Check if the script is provided with an argument
if [ $# -eq 0 ]; then
    echo "Error: Please provide a string as an argument."
    exit 1
fi

input_string="$1"

# Check for [MAJOR], [MINOR], or [PATCH] components in the string
check_version_component "$input_string"