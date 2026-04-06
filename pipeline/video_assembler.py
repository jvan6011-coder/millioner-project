"""Dark Ledger — Video Assembly via FFmpeg

Combines voiceover audio + stock images/videos + subtitles + background music
into a complete YouTube video.
"""

import subprocess
import math
from pathlib import Path
from config import (
    FFMPEG_BIN, FFPROBE_BIN, OUTPUT_DIR, ASSETS_DIR,
    VIDEO_WIDTH, VIDEO_HEIGHT, VIDEO_FPS, VIDEO_BITRATE, AUDIO_BITRATE
)


def get_audio_duration(audio_path: Path) -> float:
    """Get duration of audio file in seconds."""
    cmd = [
        FFPROBE_BIN, "-v", "quiet",
        "-show_entries", "format=duration",
        "-of", "csv=p=0",
        str(audio_path)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return float(result.stdout.strip())


def assemble_video(
    audio_path: Path,
    subtitle_path: Path | None = None,
    image_paths: list[Path] | None = None,
    video_paths: list[Path] | None = None,
    music_path: Path | None = None,
    output_path: Path | None = None,
    music_volume: float = 0.08,
) -> Path:
    """Assemble final video from components.

    Strategy:
    - Uses images with Ken Burns effect (slow zoom/pan) as primary visuals
    - Each image displayed for 6-10 seconds
    - Voiceover is the main audio track
    - Background music mixed at low volume
    - Subtitles burned in (hardcoded)
    """
    if output_path is None:
        output_path = OUTPUT_DIR / "final_video.mp4"

    duration = get_audio_duration(audio_path)
    print(f"\n--- Assembling video ---")
    print(f"  Audio duration: {duration:.1f}s ({duration/60:.1f} min)")

    # Collect all visual assets
    visuals = []
    if video_paths:
        visuals.extend([(p, "video") for p in video_paths if p.exists()])
    if image_paths:
        visuals.extend([(p, "image") for p in image_paths if p.exists()])

    if not visuals:
        print("  No visuals found — generating dark background video")
        return _assemble_audio_only(audio_path, subtitle_path, music_path, output_path, duration, music_volume)

    # Calculate time per visual
    secs_per_visual = max(5, min(10, duration / len(visuals)))
    repeats_needed = math.ceil(duration / (secs_per_visual * len(visuals)))

    # Build the visual sequence by repeating if needed
    visual_sequence = (visuals * repeats_needed)[:math.ceil(duration / secs_per_visual)]

    print(f"  Visuals: {len(visual_sequence)} clips @ ~{secs_per_visual:.1f}s each")

    # Create concat file for images with Ken Burns
    concat_list = OUTPUT_DIR / "_concat_list.txt"
    processed_clips = []

    for i, (vpath, vtype) in enumerate(visual_sequence):
        clip_path = OUTPUT_DIR / f"_clip_{i:04d}.mp4"

        if vtype == "image":
            # Ken Burns: slow zoom from 100% to 115% over the clip duration
            # Random starting position for variety
            import random
            zoom_start = 1.0
            zoom_end = 1.0 + random.uniform(0.08, 0.18)
            x_drift = random.uniform(-0.03, 0.03)
            y_drift = random.uniform(-0.03, 0.03)

            filter_str = (
                f"scale=8000:-1,"
                f"zoompan=z='min({zoom_start}+(on/{VIDEO_FPS}/{secs_per_visual})*{zoom_end - zoom_start},{zoom_end})':"
                f"x='iw/2-(iw/zoom/2)+{x_drift}*iw*(on/{VIDEO_FPS}/{secs_per_visual})':"
                f"y='ih/2-(ih/zoom/2)+{y_drift}*ih*(on/{VIDEO_FPS}/{secs_per_visual})':"
                f"d={int(secs_per_visual * VIDEO_FPS)}:"
                f"s={VIDEO_WIDTH}x{VIDEO_HEIGHT}:fps={VIDEO_FPS},"
                f"format=yuv420p"
            )
            cmd = [
                FFMPEG_BIN, "-y",
                "-loop", "1", "-i", str(vpath),
                "-vf", filter_str,
                "-t", str(secs_per_visual),
                "-c:v", "libx264", "-preset", "fast",
                "-pix_fmt", "yuv420p",
                str(clip_path)
            ]
        else:
            # Video clip — scale and trim
            filter_str = (
                f"scale={VIDEO_WIDTH}:{VIDEO_HEIGHT}:force_original_aspect_ratio=decrease,"
                f"pad={VIDEO_WIDTH}:{VIDEO_HEIGHT}:(ow-iw)/2:(oh-ih)/2:black,"
                f"setsar=1,format=yuv420p"
            )
            cmd = [
                FFMPEG_BIN, "-y",
                "-i", str(vpath),
                "-vf", filter_str,
                "-t", str(secs_per_visual),
                "-c:v", "libx264", "-preset", "fast",
                "-an",  # Remove original audio
                "-pix_fmt", "yuv420p",
                "-r", str(VIDEO_FPS),
                str(clip_path)
            ]

        subprocess.run(cmd, capture_output=True, text=True)
        if clip_path.exists():
            processed_clips.append(clip_path)

    # Write concat list
    with open(concat_list, "w") as f:
        for clip in processed_clips:
            f.write(f"file '{clip}'\n")

    # Step 1: Concatenate all clips
    concat_video = OUTPUT_DIR / "_concat_video.mp4"
    cmd_concat = [
        FFMPEG_BIN, "-y",
        "-f", "concat", "-safe", "0",
        "-i", str(concat_list),
        "-c:v", "libx264", "-preset", "fast",
        "-pix_fmt", "yuv420p",
        str(concat_video)
    ]
    subprocess.run(cmd_concat, capture_output=True, text=True)

    # Step 2: Mix audio tracks and add subtitles
    cmd_final = [FFMPEG_BIN, "-y"]

    # Input: concatenated video (trimmed to audio duration)
    cmd_final.extend(["-i", str(concat_video)])
    # Input: processed voiceover
    cmd_final.extend(["-i", str(audio_path)])

    # Build filter complex
    filter_parts = []
    audio_mix = "[1:a]"

    if music_path and music_path.exists():
        cmd_final.extend(["-i", str(music_path)])
        # Mix music at low volume with voiceover
        filter_parts.append(f"[2:a]volume={music_volume}[bgmusic]")
        filter_parts.append(f"[1:a][bgmusic]amix=inputs=2:duration=first:dropout_transition=3[mixed]")
        audio_mix = "[mixed]"

    # Add subtitles if available
    video_map = "0:v"
    if subtitle_path and subtitle_path.exists():
        # Burn subtitles into video
        sub_style = (
            "FontName=Arial,FontSize=22,PrimaryColour=&H00E8E4E1,"
            "OutlineColour=&H00000000,Outline=2,Shadow=1,"
            "Bold=1,MarginV=40"
        )
        sub_path_escaped = str(subtitle_path).replace("\\", "/").replace(":", "\\\\:")
        if filter_parts:
            filter_parts.append(
                f"[0:v]subtitles='{sub_path_escaped}':force_style='{sub_style}'[subbed]"
            )
            video_map = "[subbed]"
        else:
            filter_parts.append(
                f"[0:v]subtitles='{sub_path_escaped}':force_style='{sub_style}'[subbed]"
            )
            video_map = "[subbed]"

    if filter_parts:
        cmd_final.extend(["-filter_complex", ";".join(filter_parts)])

    cmd_final.extend([
        "-map", video_map,
        "-map", audio_mix,
        "-t", str(duration),
        "-c:v", "libx264",
        "-preset", "medium",
        "-b:v", VIDEO_BITRATE,
        "-c:a", "aac",
        "-b:a", AUDIO_BITRATE,
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        str(output_path)
    ])

    print(f"  Encoding final video...")
    result = subprocess.run(cmd_final, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  Final encode error, trying simpler approach...")
        return _assemble_simple(concat_video, audio_path, output_path, duration)

    # Cleanup temp files
    _cleanup_temp_files(processed_clips, concat_list, concat_video)

    size_mb = output_path.stat().st_size / (1024 * 1024)
    print(f"  Done! Output: {output_path} ({size_mb:.1f} MB)")
    return output_path


def _assemble_audio_only(
    audio_path: Path,
    subtitle_path: Path | None,
    music_path: Path | None,
    output_path: Path,
    duration: float,
    music_volume: float,
) -> Path:
    """Assemble video with just dark background + audio."""
    cmd = [
        FFMPEG_BIN, "-y",
        "-f", "lavfi", "-i",
        f"color=c=0x0D0D0D:s={VIDEO_WIDTH}x{VIDEO_HEIGHT}:d={duration}:r={VIDEO_FPS}",
        "-i", str(audio_path),
        "-map", "0:v", "-map", "1:a",
        "-t", str(duration),
        "-c:v", "libx264", "-preset", "fast",
        "-b:v", "1M",
        "-c:a", "aac", "-b:a", AUDIO_BITRATE,
        "-pix_fmt", "yuv420p",
        "-shortest",
        str(output_path)
    ]
    subprocess.run(cmd, capture_output=True, text=True)
    return output_path


def _assemble_simple(
    video_path: Path,
    audio_path: Path,
    output_path: Path,
    duration: float,
) -> Path:
    """Simple fallback: just combine video + audio without filters."""
    cmd = [
        FFMPEG_BIN, "-y",
        "-i", str(video_path),
        "-i", str(audio_path),
        "-map", "0:v", "-map", "1:a",
        "-t", str(duration),
        "-c:v", "libx264", "-preset", "medium",
        "-b:v", VIDEO_BITRATE,
        "-c:a", "aac", "-b:a", AUDIO_BITRATE,
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-shortest",
        str(output_path)
    ]
    subprocess.run(cmd, capture_output=True, text=True)
    return output_path


def _cleanup_temp_files(clips: list[Path], concat_list: Path, concat_video: Path):
    """Remove temporary files."""
    for f in clips:
        f.unlink(missing_ok=True)
    concat_list.unlink(missing_ok=True)
    concat_video.unlink(missing_ok=True)


if __name__ == "__main__":
    print("Video assembler ready. Use via produce_video.py")
