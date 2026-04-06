@echo off
REM ============================================================
REM  Dark Ledger - Edge TTS Audio Production Setup
REM  Windows 11 - One-click install and test
REM ============================================================

echo.
echo  ========================================
echo   Dark Ledger - Edge TTS Setup
echo  ========================================
echo.

REM -- Step 1: Check Python --
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH.
    echo         Install from https://python.org and check "Add to PATH".
    pause
    exit /b 1
)
echo [OK] Python found.

REM -- Step 2: Install edge-tts if missing --
pip show edge-tts >nul 2>&1
if %errorlevel% neq 0 (
    echo [INSTALLING] edge-tts...
    pip install edge-tts
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install edge-tts.
        pause
        exit /b 1
    )
) else (
    echo [OK] edge-tts already installed.
)

REM -- Step 3: Create output directory --
if not exist "audio_output" mkdir audio_output
echo [OK] Output directory ready: audio_output\

REM -- Step 4: Verify edge-tts works --
edge-tts --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] edge-tts command not found in PATH.
    echo          Try: python -m edge_tts --version
    echo          Or restart your terminal after pip install.
    pause
    exit /b 1
)
echo [OK] edge-tts is ready.
echo.
echo  Setup complete. Run edge-tts-generate.bat to produce audio.
echo.
pause
