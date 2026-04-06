@echo off
REM ============================================================
REM  Dark Ledger - Generate Voiceover from Hook Text
REM  Voice: en-US-JennyNeural | Rate: -8% (dramatic pacing)
REM ============================================================

echo.
echo  ========================================
echo   Dark Ledger - Audio Generation
echo  ========================================
echo.

if not exist "audio_output" mkdir audio_output

REM -- Generate primary voiceover (JennyNeural) --
echo [1/1] Generating hook voiceover with JennyNeural...

edge-tts ^
  --voice "en-US-JennyNeural" ^
  --rate="-8%%" ^
  --pitch="-2Hz" ^
  --volume="+0%%" ^
  --text "When the lawyer opened the second envelope — the one none of us knew existed — my step-sister's smile disappeared. And for the first time in twenty years, my mother had the last word. She wasn't even in the room. She'd been dead for three weeks. And she still won." ^
  --write-media "audio_output\hook_jenny.mp3" ^
  --write-subtitles "audio_output\hook_jenny.vtt"

if %errorlevel% equ 0 (
    echo [OK] Audio saved: audio_output\hook_jenny.mp3
    echo [OK] Subtitles saved: audio_output\hook_jenny.vtt
) else (
    echo [ERROR] Generation failed. Check your internet connection.
    pause
    exit /b 1
)

echo.
echo  Done. File is ready for Audacity import.
echo.
pause
