#!/bin/bash

# Define the directory containing the images to compress

IMAGE_DIR="assets/pet-image"

# Define the compression level (0-100)

COMPRESSION_LEVEL=80

# Get the list of modified image files in the recent commit

IFS=$'\n' MODIFIED_IMAGES=($(git diff --name-only --relative HEAD~1 HEAD | grep -E "^${IMAGE_DIR}/.*\.(jpg|jpeg)$"))

# Compress the modified images

for IMAGE in $MODIFIED_IMAGES; do

  echo "Compressing Image $IMAGE..."

  mogrify -quality $COMPRESSION_LEVEL "$IMAGE"

done

echo "Image Compression Done!"

