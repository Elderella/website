# Screenshot Framing Tool

Add device chrome (frames) to simulator screenshots for iPhone 17 Pro.

> **Note:** Google Pixel 10 support is planned but not yet available (frame artwork needed).

## Prerequisites

Install ImageMagick:
```bash
brew install imagemagick
```

## Setup

The iPhone 17 Pro frame is already included and configured. No additional setup needed!

## Usage

```bash
# Single screenshot
./frame-screenshot.sh screenshot.png

# Process multiple files
./frame-screenshot.sh *.png

# Specify output directory
./frame-screenshot.sh --output ./framed/ screenshot.png
```

## Output

Output files are saved with `-framed` suffix in the same directory as the input:
- `screenshot.png` → `screenshot-framed.png`

## Troubleshooting

**"ImageMagick is not installed"**
```bash
brew install imagemagick
```
