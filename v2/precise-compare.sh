#!/bin/bash

# More precise comparison at same width
CURRENT="/tmp/linear-attachments/current"
DESIGN="/tmp/linear-attachments"
OUTPUT="/tmp/linear-attachments/precise"

mkdir -p "$OUTPUT"

# Function for precise comparison - same width, aligned
precise_compare() {
    local name=$1
    local design_file=$2
    local width=1200

    if [[ -f "$CURRENT/$name.png" ]] && [[ -f "$DESIGN/$design_file" ]]; then
        echo "Precise comparison: $name"

        # Resize both to exact same width, keep aspect ratio
        magick "$CURRENT/$name.png" -resize ${width}x "$OUTPUT/${name}-current-resized.png"
        magick "$DESIGN/$design_file" -resize ${width}x "$OUTPUT/${name}-design-resized.png"

        # Create a 50% blend overlay
        magick "$OUTPUT/${name}-current-resized.png" "$OUTPUT/${name}-design-resized.png" \
               -gravity north -compose blend -define compose:args=50,50 -composite \
               "$OUTPUT/${name}-blend.png"

        # Create difference highlighting (white = same, color = different)
        magick "$OUTPUT/${name}-current-resized.png" "$OUTPUT/${name}-design-resized.png" \
               -gravity north -compose difference -composite \
               -normalize \
               "$OUTPUT/${name}-diff-precise.png"

        echo "Created: ${name}-blend.png and ${name}-diff-precise.png"
    fi
}

precise_compare "header" "eld-831-screenshot-1.png"
precise_compare "hero" "eld-833-screenshot-1.png"
precise_compare "stats" "eld-835-screenshot-1.png"
precise_compare "partner" "eld-836-screenshot-1.png"

echo "Precise comparisons complete!"
