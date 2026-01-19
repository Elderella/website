#!/bin/bash

# Directory setup
CURRENT="/tmp/linear-attachments/current"
DESIGN="/tmp/linear-attachments"
OUTPUT="/tmp/linear-attachments/overlay"

mkdir -p "$OUTPUT"

# Function to create comparison
compare_section() {
    local name=$1
    local design_file=$2

    if [[ -f "$CURRENT/$name.png" ]] && [[ -f "$DESIGN/$design_file" ]]; then
        # Get dimensions of both images
        current_size=$(magick identify -format "%wx%h" "$CURRENT/$name.png")
        design_size=$(magick identify -format "%wx%h" "$DESIGN/$design_file")

        echo "Comparing $name: current=$current_size, design=$design_size"

        # Create a side-by-side with labels
        magick \( "$CURRENT/$name.png" -resize 600x -gravity north -background white -extent 600x400 \) \
               \( "$DESIGN/$design_file" -resize 600x -gravity north -background white -extent 600x400 \) \
               +append \
               -font Helvetica -pointsize 20 \
               -gravity northwest -annotate +10+10 "CURRENT" \
               -gravity north -annotate +310+10 "DESIGN" \
               "$OUTPUT/${name}-sidebyside.png"

        # Create difference image (red highlights differences)
        magick "$CURRENT/$name.png" -resize 600x -gravity north -background white -extent 600x400 \
               "$DESIGN/$design_file" -resize 600x -gravity north -background white -extent 600x400 \
               -compose difference -composite \
               -threshold 3% \
               -fill red -opaque white \
               "$OUTPUT/${name}-diff.png"

        echo "Created: ${name}-sidebyside.png and ${name}-diff.png"
    else
        echo "Skipping $name - files not found"
    fi
}

# Compare all sections
compare_section "header" "eld-831-screenshot-1.png"
compare_section "promo-banner" "eld-832-screenshot-1.png"
compare_section "hero" "eld-833-screenshot-1.png"
compare_section "solo-shift" "eld-834-screenshot-2.png"
compare_section "stats" "eld-835-screenshot-1.png"
compare_section "partner" "eld-836-screenshot-1.png"
compare_section "see-more" "eld-841-screenshot-1.png"
compare_section "keep-on-top" "eld-843-screenshot-1.png"
compare_section "footer" "eld-844-screenshot-1.png"

echo "All comparisons complete!"
