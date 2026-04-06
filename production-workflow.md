# Production Workflow — $0 Budget Free Stack

## COMPLETE TOOL STACK

| Function | Primary Tool | Backup |
|----------|-------------|--------|
| Scripts | ChatGPT Free / Claude Free / Gemini Free | Google Docs |
| Voiceover | Edge TTS (browser or edge-tts CLI) | NaturalReader Free + Audacity |
| Audio edit | Audacity (free, open-source) | Ocenaudio |
| Stock footage | Pexels, Pixabay, Coverr | Mixkit, Videvo |
| AI images | Bing Image Creator | Leonardo.AI free, Playground AI |
| Music | YouTube Audio Library | Pixabay Music, Incompetech |
| Sound FX | Pixabay SFX, Freesound | BBC Sound Effects |
| Editing | CapCut Desktop (free, no watermark) | DaVinci Resolve |
| Thumbnails | Canva Free | Photopea, GIMP |
| SEO | YouTube autocomplete + TubeBuddy Free | vidIQ Free |

---

## WEEKLY BATCH SCHEDULE (~18-23 hrs/week)

### MONDAY — Research & Writing (4-5 hrs)
- Morning: Research 3 story topics (90 min)
- Morning: Write Script 1 (60 min)
- Afternoon: Write Script 2 + 3 (2 hrs)
- **Output: 3 finished scripts**

### TUESDAY — Audio Day (2.5-3 hrs)
- Generate 3 voiceovers via Edge TTS (90 min)
- Post-process all 3 in Audacity (60 min)
- **Output: 3 voiceover tracks**

### TUESDAY PM / WEDNESDAY AM — Assets (2.5-3 hrs)
- Gather stock footage, AI images, music for all 3 (2.5 hrs)
- Organize into Video1/, Video2/, Video3/ folders
- **Output: All visual/audio assets ready**

### WEDNESDAY — Edit Day 1 (3-4 hrs)
- Full edit Video 1 (2-2.5 hrs)
- Begin Video 2 (1-1.5 hrs)

### THURSDAY — Edit Day 2 (3-4 hrs)
- Finish Video 2 (1-1.5 hrs)
- Full edit Video 3 (2-2.5 hrs)

### FRIDAY — Polish & Publish (3-4 hrs)
- Create 3 thumbnails (45-60 min)
- Write descriptions, tags, titles (45-60 min)
- Final review + upload all 3 (60 min)
- Create 4-5 Shorts from best moments (60 min)
- **Output: 3 long-form + 4-5 Shorts uploaded/scheduled**

### SAT-SUN — Buffer / Engage
- Review analytics
- Reply to comments
- Research next week's topics

---

## UPLOAD SCHEDULE

| Day | Content | Time |
|-----|---------|------|
| Tuesday | Long-form #1 | 2:00 PM EST |
| Thursday | Long-form #2 | 2:00 PM EST |
| Saturday | Long-form #3 | 10:00 AM EST |
| Mon/Wed/Fri/Sun | 1 Short each | 9:00 AM EST |

---

## TIME PER VIDEO

### Long-form (10-12 min)
| Phase | Time |
|-------|------|
| Research & story selection | 30-45 min |
| Scriptwriting (AI + edit) | 45-75 min |
| Voiceover + processing | 30-45 min |
| Gathering visuals/music/SFX | 45-60 min |
| Editing in CapCut | 90-150 min |
| Thumbnail | 15-25 min |
| SEO + upload | 20-30 min |
| **TOTAL** | **4.5-7 hrs** |

### Short (30-60 sec, repurposed)
| Task | Time |
|------|------|
| Identify + trim segment | 5-10 min |
| Reframe to vertical | 5-10 min |
| Add captions | 5-10 min |
| Hook optimization | 5-10 min |
| Export + upload | 5-10 min |
| **TOTAL** | **25-50 min** |

---

## VOICEOVER SETUP (Edge TTS)

### Option A: Edge Browser Read Aloud
1. Open Microsoft Edge
2. Paste script into text file
3. Ctrl+Shift+U -> Read Aloud
4. Voice: **en-US-GuyNeural** (male) or **en-US-JennyNeural** (female)
5. Speed: 0.9x-1.0x
6. Record with Audacity (WASAPI loopback)

### Option B: edge-tts CLI (better control)
```bash
pip install edge-tts
edge-tts --voice en-US-GuyNeural --rate=-10% --file script.txt --write-media output.mp3
```

### Post-Processing in Audacity
1. Noise Reduction (select silence -> Get Profile -> Apply)
2. Compressor: -18dB threshold, 3:1 ratio
3. EQ: Boost 100-200Hz +2dB, Cut 3-5kHz -1dB
4. Normalize to -3.0dB
5. Add strategic pauses (Generate -> Silence)

---

## EDITING WORKFLOW (CapCut)

1. **Audio-first**: Drag voiceover to Track 1, music to Track 2 at -18dB
2. **Visuals**: Match clips to narration (3-8 sec each)
3. **Ken Burns**: On AI images — Scale 100%->115% with slight position shift
4. **Auto-captions**: Text -> Auto Captions -> Style bold sans-serif, white + black outline
5. **Zoom cuts**: Split at dramatic moments, scale to 115-130%
6. **Color grade**: Desaturate 15-25%, cool temperature, increase contrast
7. **Export**: 1080p, 30fps, MP4, High quality

---

## THUMBNAIL FORMULA (Canva)

```
[LEFT 60%: Dramatic image]  [RIGHT 40%: 4-5 word text]

Font: Anton / Bebas Neue / Impact (Extra Bold)
Color: White or Yellow + thick black outline
Background: Dark gradient overlay (40-60% opacity)
```

---

## UPGRADE PATH (when revenue starts)

| Priority | Upgrade | Cost | Impact |
|----------|---------|------|--------|
| 1 | ElevenLabs (voice) | $5-22/mo | Biggest quality jump |
| 2 | Epidemic Sound (music) | $13-17/mo | Professional audio |
| 3 | CapCut Pro / DaVinci Studio | $8-10/mo | More effects |
| 4 | Canva Pro (thumbnails) | $13/mo | Better templates |
| 5 | TubeBuddy/vidIQ paid | $5-8/mo | Better analytics |
