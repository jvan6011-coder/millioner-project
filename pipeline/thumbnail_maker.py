"""Dark Ledger — Thumbnail Generator using Pillow"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from config import (
    THUMB_WIDTH, THUMB_HEIGHT,
    BRAND_BLACK, BRAND_GREEN, BRAND_WHITE,
    OUTPUT_DIR, ASSETS_DIR
)


def _hex_to_rgb(hex_color: str) -> tuple:
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def _get_font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    """Try to load a good font, fallback to default."""
    font_names = [
        "C:/Windows/Fonts/arialbd.ttf",    # Arial Bold
        "C:/Windows/Fonts/impact.ttf",       # Impact
        "C:/Windows/Fonts/arial.ttf",        # Arial
        "C:/Windows/Fonts/calibrib.ttf",     # Calibri Bold
    ]
    for font_path in font_names:
        if Path(font_path).exists():
            return ImageFont.truetype(font_path, size)
    return ImageFont.load_default()


def create_thumbnail(
    text: str,
    output_path: Path | None = None,
    background_image: Path | None = None,
    text_color: str = BRAND_WHITE,
    accent_color: str = BRAND_GREEN,
    bg_color: str = BRAND_BLACK,
    font_size: int = 90,
    add_vignette: bool = True,
    add_green_underline: bool = True,
) -> Path:
    """Create a Dark Ledger branded thumbnail.

    Args:
        text: Main thumbnail text (max 4-5 words)
        output_path: Where to save
        background_image: Optional background image
        text_color: Main text color (hex)
        accent_color: Underline/accent color (hex)
        bg_color: Background color if no image (hex)
        font_size: Text size
    """
    if output_path is None:
        safe_name = text.lower().replace(" ", "_")[:30]
        output_path = OUTPUT_DIR / f"thumb_{safe_name}.png"

    # Create base image
    if background_image and background_image.exists():
        img = Image.open(background_image).convert("RGB")
        img = img.resize((THUMB_WIDTH, THUMB_HEIGHT), Image.LANCZOS)
        # Darken the background
        dark_overlay = Image.new("RGB", (THUMB_WIDTH, THUMB_HEIGHT), (0, 0, 0))
        img = Image.blend(img, dark_overlay, 0.45)
    else:
        img = _create_atmospheric_bg(bg_color)

    draw = ImageDraw.Draw(img)

    # Add vignette
    if add_vignette:
        img = _add_vignette(img)
        draw = ImageDraw.Draw(img)

    # Prepare text
    font = _get_font(font_size, bold=True)
    outline_font = _get_font(font_size, bold=True)

    # Split text into lines if needed
    lines = text.upper().split("\n")
    if len(lines) == 1 and len(text) > 15:
        words = text.upper().split()
        mid = len(words) // 2
        lines = [" ".join(words[:mid]), " ".join(words[mid:])]

    # Calculate text position
    line_heights = []
    line_widths = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        line_widths.append(bbox[2] - bbox[0])
        line_heights.append(bbox[3] - bbox[1])

    total_height = sum(line_heights) + (len(lines) - 1) * 15
    y_start = (THUMB_HEIGHT - total_height) // 2

    text_rgb = _hex_to_rgb(text_color)
    accent_rgb = _hex_to_rgb(accent_color)

    # Draw each line
    max_width = 0
    for i, line in enumerate(lines):
        x = (THUMB_WIDTH - line_widths[i]) // 2
        y = y_start + sum(line_heights[:i]) + i * 15

        # Draw outline/shadow
        for dx in range(-3, 4):
            for dy in range(-3, 4):
                draw.text((x + dx, y + dy), line, font=font, fill=(0, 0, 0))

        # Draw main text
        draw.text((x, y), line, font=font, fill=text_rgb)
        max_width = max(max_width, line_widths[i])

    # Add green underline
    if add_green_underline:
        underline_width = int(max_width * 0.6)
        underline_x = (THUMB_WIDTH - underline_width) // 2
        underline_y = y_start + total_height + 20
        draw.rectangle(
            [underline_x, underline_y, underline_x + underline_width, underline_y + 4],
            fill=accent_rgb
        )

    # Add small "DARK LEDGER" watermark bottom-right
    wm_font = _get_font(24, bold=True)
    wm_text = "DARK LEDGER"
    wm_bbox = draw.textbbox((0, 0), wm_text, font=wm_font)
    wm_x = THUMB_WIDTH - (wm_bbox[2] - wm_bbox[0]) - 20
    wm_y = THUMB_HEIGHT - (wm_bbox[3] - wm_bbox[1]) - 15
    draw.text((wm_x, wm_y), wm_text, font=wm_font, fill=accent_rgb)

    img.save(output_path, "PNG", quality=95)
    print(f"  Thumbnail saved: {output_path}")
    return output_path


def _create_atmospheric_bg(bg_color: str) -> Image.Image:
    """Create a dark atmospheric background with subtle gradient."""
    import random
    bg_rgb = _hex_to_rgb(bg_color)
    img = Image.new("RGB", (THUMB_WIDTH, THUMB_HEIGHT), bg_rgb)
    draw = ImageDraw.Draw(img)

    # Dark gradient with slight green tint
    for y in range(THUMB_HEIGHT):
        factor = y / THUMB_HEIGHT
        r = int(bg_rgb[0] + 15 * factor)
        g = int(bg_rgb[1] + 25 * factor * 0.5)
        b = int(bg_rgb[2] + 10 * factor)
        draw.line([(0, y), (THUMB_WIDTH, y)], fill=(r, g, b))

    return img


def _add_vignette(img: Image.Image) -> Image.Image:
    """Add a dark vignette effect."""
    vignette = Image.new("L", (THUMB_WIDTH, THUMB_HEIGHT), 0)
    draw = ImageDraw.Draw(vignette)

    # Draw white ellipse in center
    margin_x = THUMB_WIDTH // 4
    margin_y = THUMB_HEIGHT // 4
    draw.ellipse(
        [margin_x, margin_y, THUMB_WIDTH - margin_x, THUMB_HEIGHT - margin_y],
        fill=255
    )
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=150))

    # Apply vignette as mask
    dark = Image.new("RGB", (THUMB_WIDTH, THUMB_HEIGHT), (0, 0, 0))
    img = Image.composite(img, dark, vignette)
    return img


# Pre-defined thumbnails for our scripts
THUMBNAILS = {
    "script_03": {
        "text": "THE REAL\nWILL",
        "font_size": 110,
    },
    "script_01": {
        "text": "HER BEST\nFRIEND KNEW",
        "font_size": 100,
    },
    "script_02": {
        "text": "$2 MILLION\nGONE",
        "font_size": 110,
    },
}


if __name__ == "__main__":
    # Generate all three thumbnails
    for key, config in THUMBNAILS.items():
        output = OUTPUT_DIR / f"thumbnail_{key}.png"
        create_thumbnail(
            text=config["text"],
            output_path=output,
            font_size=config["font_size"],
        )
    print("\nAll thumbnails generated!")
