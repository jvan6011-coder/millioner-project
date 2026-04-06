"""Dark Ledger — Audio Post-Processing via FFmpeg"""

import subprocess
from pathlib import Path
from config import FFMPEG_BIN, OUTPUT_DIR


def process_audio(
    input_path: Path,
    output_path: Path | None = None,
) -> Path:
    """Apply audio processing chain:
    1. Noise gate (reduce background)
    2. Compressor (even out levels)
    3. Bass boost (warmth for narration)
    4. High-shelf cut (reduce sibilance)
    5. Loudness normalization (-16 LUFS for YouTube)
    """
    if output_path is None:
        output_path = input_path.with_stem(input_path.stem + "_processed")

    # Build ffmpeg filter chain
    filters = [
        # Noise gate
        "agate=threshold=0.01:ratio=2:attack=5:release=50",
        # Compressor: make narration more consistent
        "acompressor=threshold=-18dB:ratio=3:attack=20:release=200",
        # Bass boost for warmth (80-200Hz)
        "equalizer=f=140:t=q:w=1:g=3",
        # High-shelf cut for sibilance (-2dB above 6kHz)
        "highshelf=f=6000:g=-2",
        # Loudness normalization to YouTube standard
        "loudnorm=I=-16:TP=-1.5:LRA=11",
    ]

    filter_chain = ",".join(filters)

    cmd = [
        FFMPEG_BIN, "-y",
        "-i", str(input_path),
        "-af", filter_chain,
        "-ar", "44100",
        "-ab", "192k",
        str(output_path),
    ]

    print(f"\n--- Processing audio ---")
    print(f"  Input: {input_path}")
    print(f"  Output: {output_path}")

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ERROR: {result.stderr[-500:]}")
        raise RuntimeError(f"FFmpeg audio processing failed")

    print(f"  Done! Size: {output_path.stat().st_size / 1024:.0f} KB")
    return output_path


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        inp = Path(sys.argv[1])
        process_audio(inp)
    else:
        print("Usage: python audio_processor.py <input.mp3>")
