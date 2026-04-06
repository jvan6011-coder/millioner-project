"""Dark Ledger — Text-to-Speech Engine using Edge TTS"""

import asyncio
import re
from pathlib import Path
import edge_tts
from config import VOICES, OUTPUT_DIR


def clean_script_for_tts(script_text: str) -> str:
    """Remove visual notes, music cues, and formatting — keep only narration."""
    lines = script_text.split("\n")
    clean_lines = []
    for line in lines:
        line = line.strip()
        # Skip markdown headers, visual/music notes, metadata
        if not line:
            continue
        if line.startswith("#"):
            continue
        if line.startswith("["):
            continue
        if line.startswith("**["):
            continue
        if line.startswith("**"):
            # Could be section headers like **[HOOK]** — skip
            if "[" in line and "]" in line:
                continue
        if any(tag in line.upper() for tag in [
            "VISUAL:", "MUSIC:", "PACING:", "VISUAL NOTES",
            "MUSIC MOOD", "RUNTIME:", "WORDS:", "VOICE:",
            "THUMBNAIL", "TAGS", "DESCRIPTION", "TIMESTAMPS",
            "NOTE:", "SUBSCRIBE FOR"
        ]):
            continue
        # Remove inline brackets [VISUAL: ...] or [PACING: ...]
        line = re.sub(r'\[.*?\]', '', line)
        # Remove bold/italic markdown
        line = re.sub(r'\*+', '', line)
        line = line.strip()
        if line and len(line) > 5:
            clean_lines.append(line)
    return "\n".join(clean_lines)


async def generate_tts(
    text: str,
    output_path: Path,
    voice: str = "female",
    rate: str = "-8%",
    pitch: str = "-2Hz",
    volume: str = "+0%"
) -> tuple[Path, Path]:
    """Generate TTS audio and subtitles.

    Returns (audio_path, subtitle_path)
    """
    voice_name = VOICES.get(voice, voice)
    audio_path = output_path.with_suffix(".mp3")
    subtitle_path = output_path.with_suffix(".vtt")

    communicate = edge_tts.Communicate(
        text=text,
        voice=voice_name,
        rate=rate,
        pitch=pitch,
        volume=volume,
    )

    submaker = edge_tts.SubMaker()

    with open(audio_path, "wb") as audio_file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)

    with open(subtitle_path, "w", encoding="utf-8") as sub_file:
        sub_file.write(submaker.get_srt())

    print(f"  Audio: {audio_path}")
    print(f"  Subtitles: {subtitle_path}")
    return audio_path, subtitle_path


def generate_voiceover(
    script_text: str,
    output_name: str,
    voice: str = "female",
    rate: str = "-8%"
) -> tuple[Path, Path]:
    """Synchronous wrapper for TTS generation."""
    clean_text = clean_script_for_tts(script_text)
    output_path = OUTPUT_DIR / output_name

    print(f"\n--- Generating voiceover: {output_name} ---")
    print(f"  Voice: {VOICES.get(voice, voice)}")
    print(f"  Rate: {rate}")
    print(f"  Text length: {len(clean_text)} chars (~{len(clean_text.split())} words)")

    return asyncio.run(generate_tts(
        text=clean_text,
        output_path=output_path,
        voice=voice,
        rate=rate,
    ))


if __name__ == "__main__":
    # Test with hook
    test_text = (
        "My mother left me nothing. The house, gone. The savings, gone. "
        "Thirty years of investments, all to my step-sister. I sat in that "
        "lawyer's office completely destroyed. And then he said six words "
        "that changed everything: There is a second document. "
        "My dead mother had one last move."
    )
    audio, subs = generate_voiceover(test_text, "test_hook", voice="female")
    print(f"\nTest complete! Audio: {audio}")
