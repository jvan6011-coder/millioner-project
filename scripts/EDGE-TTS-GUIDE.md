# Dark Ledger - Edge TTS Audio Production Guide

## Quick Start (3 Commands)

Open **Command Prompt** or **PowerShell** in the `scripts/` folder and run:

```
# 1. Install edge-tts
pip install edge-tts

# 2. Generate the hook audio (test)
edge-tts --voice "en-US-JennyNeural" --rate="-8%" --pitch="-2Hz" --text "When the lawyer opened the second envelope — the one none of us knew existed — my step-sister's smile disappeared. And for the first time in twenty years, my mother had the last word. She wasn't even in the room. She'd been dead for three weeks. And she still won." --write-media hook_jenny.mp3 --write-subtitles hook_jenny.vtt

# 3. Play it
start hook_jenny.mp3
```

That is the entire workflow. Everything below adds detail and automation.

---

## Files Included

| File | Purpose |
|------|---------|
| `edge-tts-setup.bat` | One-click install check (run first, once) |
| `edge-tts-generate.bat` | Generate the hook audio with JennyNeural |
| `edge-tts-voice-test.bat` | Compare 4 voices on the same line |
| `edge-tts-full-script.ps1` | PowerShell script for full 12-min scripts |
| `audacity-macro-dark-ledger.txt` | Audacity macro for post-processing |

---

## Step-by-Step Workflow

### Step 1: Install

Double-click `edge-tts-setup.bat` or run manually:

```
pip install edge-tts
```

Verify it works:

```
edge-tts --list-voices | findstr "en-US.*Female"
```

### Step 2: Test the Hook

Double-click `edge-tts-generate.bat`. This produces:
- `audio_output/hook_jenny.mp3` -- the voiceover
- `audio_output/hook_jenny.vtt` -- subtitle file (useful for video editing)

### Step 3: Compare Voices

Double-click `edge-tts-voice-test.bat`. This generates 4 MP3 files in `audio_output/voice_tests/` with the same test sentence. Listen to all four and pick your favorite.

### Step 4: Generate Full 12-Minute Script

Save your full script as a plain `.txt` file, then run:

```powershell
.\edge-tts-full-script.ps1 -InputFile "..\scripts\script-03-mother-real-will.md"
```

Or with a custom voice:

```powershell
.\edge-tts-full-script.ps1 -InputFile "my_script.txt" -Voice "en-US-AriaNeural"
```

### Step 5: Post-Process in Audacity

See the Audacity section below.

---

## Optimal Parameters for Dark Ledger

```
--voice "en-US-JennyNeural"   # Primary voice
--rate="-8%"                   # Slower than default, dramatic pacing
--pitch="-2Hz"                 # Slightly lower, adds gravity
--volume="+0%"                 # Keep at 0, normalize in Audacity
```

**Why these values:**
- **Rate -8%** slows delivery just enough for dramatic pauses without sounding sluggish. For a 12-minute target, this adds roughly 1 minute of natural breathing room.
- **Pitch -2Hz** drops the tone slightly, giving a more serious, confessional quality. Going lower than -5Hz starts sounding artificial.
- **Volume +0%** leaves headroom for Audacity processing. Never boost volume in edge-tts; do it in post.

---

## Voice Options

### Recommended: en-US-JennyNeural
Warm, clear, and versatile. The most natural-sounding female narrator in the en-US set. Good dynamic range between calm narration and tense moments. Best all-around choice for storytelling.

### Alternative 1: en-US-AriaNeural
Confident and slightly deeper than Jenny. Has an authoritative quality that works well for narration where the speaker is in control of the story. Slightly more "polished broadcast" feel.

### Alternative 2: en-US-SaraNeural
Softer and more intimate. Has a whispery quality at lower volumes that works for confessional or first-person accounts. Can sound too quiet for some sections but excels at emotional moments.

### Alternative 3: en-US-MichelleNeural
Mature and composed. Steady delivery without much vocal variation. Works for matter-of-fact narration. Less dramatic range than Jenny but very consistent across long scripts.

### Test Sentence for All Voices

```
"She'd been dead for three weeks. And she still won."
```

This single line tests dramatic pause handling, tonal gravity, and emotional delivery.

---

## Audacity Post-Processing

### Manual Steps (Recommended for First Time)

1. **Import** the MP3 into Audacity (File > Import > Audio)

2. **Noise Reduction** (Effect > Noise Reduction)
   - Get noise profile from a silent section first
   - Noise Reduction: 12 dB
   - Sensitivity: 6
   - Frequency Smoothing: 3

3. **Compressor** (Effect > Compressor)
   - Threshold: -18 dB
   - Noise Floor: -40 dB
   - Ratio: 3:1
   - Attack: 0.2 sec
   - Release: 1.0 sec
   - Check "Make-up gain"

4. **Bass Boost EQ** (Effect > Filter Curve EQ)
   - Boost 80-200 Hz by +3 dB (adds warmth and weight)
   - Cut above 8000 Hz by -2 dB (reduces sibilance)

5. **Loudness Normalization** (Effect > Loudness Normalization)
   - Target: -16 LUFS (YouTube standard)
   - Check "Treat mono as dual-mono"

6. **Export** as MP3, 192 kbps, for video editing

### Using the Macro

To install the included Audacity macro:

1. Open Audacity
2. Go to **Tools > Macros**
3. Click **Import** and select `audacity-macro-dark-ledger.txt`
4. To run: **Tools > Macros > dark-ledger > Files** and select your MP3

Note: The macro applies Compressor, Bass Boost EQ, and Loudness Normalization. Noise Reduction requires manual profile selection so it cannot be fully automated in a macro.

---

## Full Script Production Command

For the actual 12-minute episode, save the script text to a `.txt` file and run:

```
edge-tts --voice "en-US-JennyNeural" --rate="-8%" --pitch="-2Hz" --file "script_text.txt" --write-media "audio_output\episode_01_raw.mp3" --write-subtitles "audio_output\episode_01.vtt"
```

The `--file` flag reads from a text file instead of inline `--text`, which avoids command-line length limits on long scripts.

**Expected output for 12 minutes of narration:**
- ~10,800 characters of script text
- MP3 file around 8-12 MB
- VTT subtitle file for video editor timeline sync

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `edge-tts` not recognized | Run `pip install edge-tts` again, restart terminal |
| SSL errors | Run `pip install --upgrade certifi` |
| Empty output file | Check internet connection (edge-tts streams from Microsoft servers) |
| Audio too fast/slow | Adjust `--rate` value (-15% for slower, -3% for faster) |
| Robotic sound | Try a different voice; AriaNeural tends to sound most natural |
| Long script fails | Use `--file input.txt` instead of `--text "..."` |
