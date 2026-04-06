"""Dark Ledger — Pipeline Configuration"""

import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent
PROJECT_DIR = BASE_DIR.parent
OUTPUT_DIR = BASE_DIR / "output"
ASSETS_DIR = BASE_DIR / "assets"
SCRIPTS_DIR = PROJECT_DIR / "scripts"

# Ensure dirs exist
OUTPUT_DIR.mkdir(exist_ok=True)
ASSETS_DIR.mkdir(exist_ok=True)

# FFmpeg — try PATH first, then winget default install location
FFMPEG_BIN = "ffmpeg"
FFPROBE_BIN = "ffprobe"

# Check winget install location if not on PATH
_winget_ffmpeg = Path(os.environ.get("LOCALAPPDATA", "")) / "Microsoft" / "WinGet" / "Links" / "ffmpeg.exe"
if _winget_ffmpeg.exists():
    FFMPEG_BIN = str(_winget_ffmpeg)
    FFPROBE_BIN = str(_winget_ffmpeg.parent / "ffprobe.exe")

# Edge TTS
PYTHON_BIN = "python"
EDGE_TTS_MODULE = "edge_tts"

# Default voices
VOICES = {
    "male": "en-US-GuyNeural",
    "female": "en-US-JennyNeural",
    "female_alt": "en-US-AriaNeural",
    "male_british": "en-GB-RyanNeural",
}

# Video settings
VIDEO_WIDTH = 1920
VIDEO_HEIGHT = 1080
VIDEO_FPS = 30
VIDEO_BITRATE = "5M"
AUDIO_BITRATE = "192k"

# Thumbnail settings
THUMB_WIDTH = 1280
THUMB_HEIGHT = 720

# Brand colors
BRAND_BLACK = "#0D0D0D"
BRAND_GREEN = "#2D6A4F"
BRAND_WHITE = "#FAEBD7"

# Pexels API (free, no key needed for basic search via web)
PEXELS_API_URL = "https://api.pexels.com/videos/search"
PEXELS_API_KEY = os.environ.get("PEXELS_API_KEY", "")  # Set via env or paste here

# YouTube API
YOUTUBE_CLIENT_SECRETS = BASE_DIR / "client_secrets.json"
YOUTUBE_TOKEN = BASE_DIR / "youtube_token.json"
YOUTUBE_SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]

# Channel info
CHANNEL_NAME = "Dark Ledger"
CHANNEL_TAGLINE = "Every debt gets settled eventually."
DEFAULT_CATEGORY = "24"  # Entertainment
DEFAULT_LANGUAGE = "en"
