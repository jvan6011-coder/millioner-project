# ============================================================
#  Dark Ledger - Full Script TTS Generator (PowerShell)
#  For longer scripts: reads from a .txt file, generates MP3
#  Usage: .\edge-tts-full-script.ps1 -InputFile "script.txt"
# ============================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$InputFile = "",

    [Parameter(Mandatory=$false)]
    [string]$Voice = "en-US-JennyNeural",

    [Parameter(Mandatory=$false)]
    [string]$Rate = "-8%",

    [Parameter(Mandatory=$false)]
    [string]$Pitch = "-2Hz",

    [Parameter(Mandatory=$false)]
    [string]$OutputDir = "audio_output"
)

Write-Host ""
Write-Host "  ========================================"
Write-Host "   Dark Ledger - Full Script Generator"
Write-Host "  ========================================"
Write-Host ""

# --- Ensure edge-tts is installed ---
$edgeTtsCheck = pip show edge-tts 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[INSTALLING] edge-tts via pip..."
    pip install edge-tts
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install edge-tts." -ForegroundColor Red
        exit 1
    }
}
Write-Host "[OK] edge-tts is available." -ForegroundColor Green

# --- Create output directory ---
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

# --- Determine input source ---
if ($InputFile -eq "") {
    # Default: use the hook text for testing
    $scriptText = @"
When the lawyer opened the second envelope — the one none of us knew existed — my step-sister's smile disappeared. And for the first time in twenty years, my mother had the last word. She wasn't even in the room. She'd been dead for three weeks. And she still won.
"@
    $baseName = "hook_test"
    Write-Host "[INFO] No input file specified. Using built-in hook text."
} else {
    if (-not (Test-Path $InputFile)) {
        Write-Host "[ERROR] File not found: $InputFile" -ForegroundColor Red
        exit 1
    }
    $scriptText = Get-Content -Path $InputFile -Raw -Encoding UTF8
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($InputFile)
    Write-Host "[OK] Loaded script from: $InputFile"
}

$charCount = $scriptText.Length
$estMinutes = [math]::Round($charCount / 900, 1)  # ~900 chars/min at -8% rate
Write-Host "[INFO] Character count: $charCount (~$estMinutes min estimated)"
Write-Host "[INFO] Voice: $Voice | Rate: $Rate | Pitch: $Pitch"
Write-Host ""

# --- Generate audio ---
$outputMp3 = Join-Path $OutputDir "$baseName`_$($Voice.Split('-')[-1]).mp3"
$outputVtt = Join-Path $OutputDir "$baseName`_$($Voice.Split('-')[-1]).vtt"

# Write script text to a temp file to avoid command-line length limits
$tempFile = Join-Path $env:TEMP "darkledger_tts_input.txt"
$scriptText | Out-File -FilePath $tempFile -Encoding UTF8 -NoNewline

Write-Host "[GENERATING] $outputMp3 ..."

edge-tts `
    --voice $Voice `
    --rate="$Rate" `
    --pitch="$Pitch" `
    --file $tempFile `
    --write-media $outputMp3 `
    --write-subtitles $outputVtt

if ($LASTEXITCODE -eq 0) {
    $fileSize = [math]::Round((Get-Item $outputMp3).Length / 1MB, 2)
    Write-Host ""
    Write-Host "[OK] Audio: $outputMp3 ($fileSize MB)" -ForegroundColor Green
    Write-Host "[OK] Subtitles: $outputVtt" -ForegroundColor Green
} else {
    Write-Host "[ERROR] edge-tts failed. Check internet connection." -ForegroundColor Red
    exit 1
}

# --- Cleanup temp file ---
Remove-Item $tempFile -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "  Next steps:"
Write-Host "    1. Open $outputMp3 in Audacity"
Write-Host "    2. Apply Noise Reduction, Compression, EQ"
Write-Host "    3. Export as final MP3 for video edit"
Write-Host ""
