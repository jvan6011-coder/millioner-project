@echo off
REM ============================================================
REM  Dark Ledger - Voice Comparison Test
REM  Generates the same line with 4 different voices
REM  Listen to all 4 and pick your favorite
REM ============================================================

echo.
echo  ========================================
echo   Dark Ledger - Voice Comparison
echo  ========================================
echo.

if not exist "audio_output\voice_tests" mkdir "audio_output\voice_tests"

set TEST_TEXT="She'd been dead for three weeks. And she still won."

REM -- Voice 1: JennyNeural (warm, clear, natural storyteller) --
echo [1/4] JennyNeural - Warm and clear narrator...
edge-tts --voice "en-US-JennyNeural" --rate="-8%%" --pitch="-2Hz" --text %TEST_TEXT% --write-media "audio_output\voice_tests\test_jenny.mp3"

REM -- Voice 2: AriaNeural (confident, slightly deeper, authoritative) --
echo [2/4] AriaNeural - Confident and authoritative...
edge-tts --voice "en-US-AriaNeural" --rate="-8%%" --pitch="-2Hz" --text %TEST_TEXT% --write-media "audio_output\voice_tests\test_aria.mp3"

REM -- Voice 3: SaraNeural (soft, intimate, whispery quality) --
echo [3/4] SaraNeural - Soft and intimate...
edge-tts --voice "en-US-SaraNeural" --rate="-8%%" --pitch="-2Hz" --text %TEST_TEXT% --write-media "audio_output\voice_tests\test_sara.mp3"

REM -- Voice 4: MichelleNeural (mature, composed, steady delivery) --
echo [4/4] MichelleNeural - Mature and composed...
edge-tts --voice "en-US-MichelleNeural" --rate="-8%%" --pitch="-2Hz" --text %TEST_TEXT% --write-media "audio_output\voice_tests\test_michelle.mp3"

echo.
echo  All 4 test files saved to: audio_output\voice_tests\
echo.
echo  Listen to each and pick the best fit for Dark Ledger:
echo    test_jenny.mp3     - Warm, clear, versatile (RECOMMENDED)
echo    test_aria.mp3      - Confident, slightly deeper
echo    test_sara.mp3      - Soft, intimate whisper quality
echo    test_michelle.mp3  - Mature, composed, steady
echo.
pause
