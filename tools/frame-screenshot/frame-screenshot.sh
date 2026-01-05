#!/bin/bash

# frame-screenshot.sh - Add device chrome to simulator screenshots
# Supports: iPhone 17 Pro
# Pixel 10 support not yet available (frame artwork needed)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMES_DIR="$SCRIPT_DIR/frames"

# Device frame files
IPHONE_FRAME="iphone-17-pro.png"

# Screen dimensions for auto-detection (width x height)
# iPhone 17 Pro: various resolutions depending on scale factor
IPHONE_WIDTHS="1320 1290 1206 440 430 453 402"

usage() {
    echo "Usage: $(basename "$0") [OPTIONS] <screenshot.png> [screenshot2.png ...]"
    echo ""
    echo "Add device frame chrome to simulator screenshots."
    echo ""
    echo "Options:"
    echo "  --device <iphone>        Specify device type (defaults to iphone)"
    echo "  --output <path>          Output directory (default: same as input)"
    echo "  --help                   Show this help message"
    echo ""
    echo "Examples:"
    echo "  $(basename "$0") screenshot.png"
    echo "  $(basename "$0") --device iphone screenshot.png"
    echo "  $(basename "$0") *.png"
    echo ""
    echo "Note: Pixel 10 support coming soon."
    echo ""
    echo "Output files are named with '-framed' suffix:"
    echo "  screenshot.png → screenshot-framed.png"
    exit 0
}

check_dependencies() {
    if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
        echo "Error: ImageMagick is not installed."
        echo "Install it with: brew install imagemagick"
        exit 1
    fi
}

get_imagemagick_cmd() {
    if command -v magick &> /dev/null; then
        echo "magick"
    else
        echo "convert"
    fi
}

get_frame_file() {
    local device="$1"
    case "$device" in
        iphone) echo "$IPHONE_FRAME" ;;
        *) echo "" ;;
    esac
}

detect_device() {
    local file="$1"
    local width

    # Get image width
    if command -v magick &> /dev/null; then
        width=$(magick identify -format "%w" "$file")
    else
        width=$(identify -format "%w" "$file")
    fi

    # Check iPhone dimensions
    for w in $IPHONE_WIDTHS; do
        if [ "$width" = "$w" ]; then
            echo "iphone"
            return 0
        fi
    done

    echo ""
    return 1
}

frame_screenshot() {
    local input_file="$1"
    local device="$2"
    local output_dir="$3"

    local frame_name
    frame_name=$(get_frame_file "$device")
    local frame_file="${FRAMES_DIR}/${frame_name}"
    local base
    base=$(basename "$input_file" .png)
    local dir
    dir=$(dirname "$input_file")

    local output_file
    if [ -n "$output_dir" ]; then
        output_file="${output_dir}/${base}-framed.png"
    else
        output_file="${dir}/${base}-framed.png"
    fi

    # Check if frame exists
    if [ ! -f "$frame_file" ]; then
        echo "Error: Frame file not found: $frame_file"
        echo "Please download the device frame. See README.md for instructions."
        return 1
    fi

    # Check if config file exists (contains positioning info)
    local config_file="${FRAMES_DIR}/${device}.conf"
    if [ ! -f "$config_file" ]; then
        echo "Error: Config file not found: $config_file"
        echo "Please create the config file with screen positioning info."
        return 1
    fi

    # Read positioning from config
    . "$config_file"

    # Default corner radius if not set in config
    : "${CORNER_RADIUS:=40}"

    local cmd
    cmd=$(get_imagemagick_cmd)

    # Composite screenshot behind bezel:
    # 1. Resize screenshot and apply rounded corners
    # 2. Place screenshot at screen position on transparent canvas
    # 3. Overlay bezel on top
    # 4. Trim transparent edges

    # Create temp files with cleanup trap
    local mask_file masked_file
    mask_file=$(mktemp).png
    masked_file=$(mktemp).png
    trap "rm -f '$mask_file' '$masked_file' '${mask_file%.png}' '${masked_file%.png}'" RETURN

    # Create rounded corner mask
    $cmd -size "${SCREEN_WIDTH}x${SCREEN_HEIGHT}" xc:black \
        -fill white -draw "roundrectangle 0,0 $((SCREEN_WIDTH-1)),$((SCREEN_HEIGHT-1)) ${CORNER_RADIUS},${CORNER_RADIUS}" \
        "$mask_file"

    # Apply mask to screenshot
    $cmd "$input_file" -resize "${SCREEN_WIDTH}x${SCREEN_HEIGHT}!" \
        "$mask_file" -alpha off -compose CopyOpacity -composite \
        "$masked_file"

    # Get frame dimensions
    local frame_size
    if command -v magick &> /dev/null; then
        frame_size=$(magick identify -format '%wx%h' "$frame_file")
    else
        frame_size=$(identify -format '%wx%h' "$frame_file")
    fi

    # Composite onto bezel
    $cmd -size "$frame_size" xc:none \
        "$masked_file" -geometry "+${SCREEN_X}+${SCREEN_Y}" -composite \
        "$frame_file" -composite \
        -trim +repage \
        "$output_file"

    echo "Created: $output_file"
}

# Parse arguments
DEVICE=""
OUTPUT_DIR=""
# Use a temp file to handle filenames with spaces
FILES_TMP=$(mktemp)
trap "rm -f $FILES_TMP" EXIT

while [ $# -gt 0 ]; do
    case $1 in
        --device)
            DEVICE="$2"
            shift 2
            ;;
        --output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        --help|-h)
            usage
            ;;
        -*)
            echo "Unknown option: $1"
            usage
            ;;
        *)
            echo "$1" >> "$FILES_TMP"
            shift
            ;;
    esac
done

# Validate
if [ ! -s "$FILES_TMP" ]; then
    echo "Error: No input files specified."
    usage
fi

check_dependencies

if [ -n "$OUTPUT_DIR" ] && [ ! -d "$OUTPUT_DIR" ]; then
    mkdir -p "$OUTPUT_DIR"
fi

# Process each file
while IFS= read -r file; do
    if [ ! -f "$file" ]; then
        echo "Warning: File not found: $file (skipping)"
        continue
    fi

    # Determine device
    if [ -n "$DEVICE" ]; then
        detected_device="$DEVICE"
    else
        detected_device=$(detect_device "$file" || true)
        if [ -z "$detected_device" ]; then
            # Default to iPhone
            detected_device="iphone"
            echo "Using default device: iphone"
        else
            echo "Detected device: $detected_device"
        fi
    fi

    # Check for Pixel (not yet implemented)
    if [ "$detected_device" = "pixel" ]; then
        echo "Error: Pixel 10 framing is not yet implemented."
        echo "Pixel frame artwork not available. Using iPhone for now."
        detected_device="iphone"
    fi

    # Validate device
    frame_name=$(get_frame_file "$detected_device")
    if [ -z "$frame_name" ]; then
        echo "Error: Unknown device: $detected_device"
        echo "Supported devices: iphone"
        continue
    fi

    frame_screenshot "$file" "$detected_device" "$OUTPUT_DIR"
done < "$FILES_TMP"
