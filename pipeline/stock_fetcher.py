"""Dark Ledger — Stock Footage & Image Fetcher from Pexels"""

import json
import re
import time
import urllib.request
import urllib.parse
from pathlib import Path
from config import PEXELS_API_KEY, ASSETS_DIR


# Fallback: scrape Pexels without API key using their public search
PEXELS_SEARCH_URL = "https://api.pexels.com/videos/search"
PEXELS_PHOTOS_URL = "https://api.pexels.com/v1/search"


def _download_file(url: str, dest: Path) -> Path:
    """Download a file from URL."""
    print(f"    Downloading: {dest.name}...")
    req = urllib.request.Request(url)
    req.add_header("User-Agent", "DarkLedgerPipeline/1.0")
    with urllib.request.urlopen(req, timeout=60) as response:
        with open(dest, "wb") as f:
            f.write(response.read())
    return dest


def fetch_pexels_videos(
    query: str,
    count: int = 5,
    output_dir: Path | None = None,
    min_duration: int = 5,
    orientation: str = "landscape",
) -> list[Path]:
    """Fetch stock videos from Pexels API.

    Requires PEXELS_API_KEY in config or environment.
    Get a free key at: https://www.pexels.com/api/new/
    """
    if not PEXELS_API_KEY:
        print("  WARNING: No Pexels API key set. Using fallback stock footage.")
        return _generate_fallback_visuals(query, count, output_dir)

    output_dir = output_dir or ASSETS_DIR / "videos"
    output_dir.mkdir(parents=True, exist_ok=True)

    params = urllib.parse.urlencode({
        "query": query,
        "per_page": count * 2,  # Fetch extra for filtering
        "orientation": orientation,
        "size": "medium",
    })

    url = f"{PEXELS_SEARCH_URL}?{params}"
    req = urllib.request.Request(url)
    req.add_header("Authorization", PEXELS_API_KEY)

    downloaded = []
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            data = json.loads(response.read())

        for i, video in enumerate(data.get("videos", [])[:count]):
            # Find the best HD file
            best_file = None
            for vf in video.get("video_files", []):
                if vf.get("width", 0) >= 1280 and vf.get("quality") == "hd":
                    best_file = vf
                    break
            if not best_file and video.get("video_files"):
                best_file = video["video_files"][0]

            if best_file:
                ext = best_file.get("file_type", "video/mp4").split("/")[-1]
                dest = output_dir / f"{_slugify(query)}_{i:03d}.{ext}"
                _download_file(best_file["link"], dest)
                downloaded.append(dest)
                time.sleep(0.5)  # Rate limiting

    except Exception as e:
        print(f"  Pexels API error: {e}")
        return _generate_fallback_visuals(query, count, output_dir)

    print(f"  Downloaded {len(downloaded)} videos for '{query}'")
    return downloaded


def fetch_pexels_photos(
    query: str,
    count: int = 5,
    output_dir: Path | None = None,
) -> list[Path]:
    """Fetch stock photos from Pexels API."""
    if not PEXELS_API_KEY:
        print("  WARNING: No Pexels API key. Generating color placeholder images.")
        return _generate_placeholder_images(query, count, output_dir)

    output_dir = output_dir or ASSETS_DIR / "images"
    output_dir.mkdir(parents=True, exist_ok=True)

    params = urllib.parse.urlencode({
        "query": query,
        "per_page": count,
        "orientation": "landscape",
        "size": "large",
    })

    url = f"{PEXELS_PHOTOS_URL}?{params}"
    req = urllib.request.Request(url)
    req.add_header("Authorization", PEXELS_API_KEY)

    downloaded = []
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            data = json.loads(response.read())

        for i, photo in enumerate(data.get("photos", [])[:count]):
            src = photo.get("src", {}).get("large2x") or photo.get("src", {}).get("original")
            if src:
                dest = output_dir / f"{_slugify(query)}_{i:03d}.jpg"
                _download_file(src, dest)
                downloaded.append(dest)
                time.sleep(0.3)

    except Exception as e:
        print(f"  Pexels photo error: {e}")
        return _generate_placeholder_images(query, count, output_dir)

    print(f"  Downloaded {len(downloaded)} photos for '{query}'")
    return downloaded


def _generate_placeholder_images(
    query: str, count: int, output_dir: Path | None
) -> list[Path]:
    """Generate dark atmospheric placeholder images when no API key."""
    from PIL import Image, ImageDraw, ImageFilter
    import random

    output_dir = output_dir or ASSETS_DIR / "images"
    output_dir.mkdir(parents=True, exist_ok=True)

    images = []
    for i in range(count):
        img = Image.new("RGB", (1920, 1080), (13, 13, 13))
        draw = ImageDraw.Draw(img)

        # Add dark atmospheric gradient
        for y in range(1080):
            r = int(13 + (random.randint(0, 15) * (y / 1080)))
            g = int(13 + (random.randint(0, 25) * (y / 1080)))
            b = int(13 + (random.randint(0, 10) * (y / 1080)))
            draw.line([(0, y), (1920, y)], fill=(r, g, b))

        # Add subtle vignette
        vignette = Image.new("L", (1920, 1080), 255)
        vdraw = ImageDraw.Draw(vignette)
        for radius in range(0, 960, 2):
            opacity = int(255 * (radius / 960) ** 2)
            vdraw.ellipse(
                [960 - radius * 2, 540 - radius, 960 + radius * 2, 540 + radius],
                fill=255 - opacity
            )
        vignette = vignette.filter(ImageFilter.GaussianBlur(50))
        img.putalpha(255)

        dest = output_dir / f"{_slugify(query)}_{i:03d}.png"
        img.save(dest)
        images.append(dest)

    print(f"  Generated {len(images)} placeholder images for '{query}'")
    return images


def _generate_fallback_visuals(
    query: str, count: int, output_dir: Path | None
) -> list[Path]:
    """When no API key, generate dark atmospheric backgrounds."""
    return _generate_placeholder_images(query, count, output_dir)


def _slugify(text: str) -> str:
    """Convert text to filename-safe slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '_', text)
    return text[:50]


# Story-specific visual search queries for narration segments
VISUAL_QUERIES = {
    "script_03": {
        "setup": [
            "mother daughter old photographs",
            "small house suburban quiet",
            "school art classroom",
            "family dinner table tense",
        ],
        "rising_action": [
            "hospital corridor dark",
            "woman hospital bed",
            "old lawyer office dark wood",
            "sealed envelope wax seal",
        ],
        "climax": [
            "lawyer reading document dramatic",
            "woman shocked face shadow",
            "handwritten letter close up",
            "tears emotional face",
        ],
        "resolution": [
            "house for sale sign",
            "woman painting watercolor",
            "art brushes shelf",
            "sunrise window hope",
        ],
    },
    "script_01": {
        "setup": [
            "couple walking suburban neighborhood",
            "home office working laptop",
            "wedding rings close up",
            "coffee shop interior moody",
        ],
        "rising_action": [
            "phone screen glowing dark room",
            "apartment building night",
            "woman car parking lot alone",
            "credit card statements documents",
        ],
        "climax": [
            "two people coffee shop serious",
            "phone showing photo dramatic",
            "man shocked devastated face",
        ],
        "resolution": [
            "divorce papers documents",
            "man packing boxes moving",
            "new apartment morning light",
            "man walking forward sunlight",
        ],
    },
    "script_02": {
        "setup": [
            "small business warehouse trucks",
            "two businessmen handshake office",
            "startup office growing business",
        ],
        "rising_action": [
            "laptop screen dark office",
            "spreadsheet financial numbers",
            "bank account screen shock",
            "man hands on head stressed",
        ],
        "climax": [
            "forensic accountant documents",
            "lawyer office meeting tense",
            "legal documents court filing",
        ],
        "resolution": [
            "empty warehouse lights off",
            "new small office fresh start",
            "man phone call business",
        ],
    },
}


if __name__ == "__main__":
    print("Testing placeholder image generation...")
    imgs = _generate_placeholder_images("dark moody", 3, ASSETS_DIR / "test")
    print(f"Created: {imgs}")
