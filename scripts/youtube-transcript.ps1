# Fetch YouTube captions (no video download) and write a markdown source file (Windows).
# PowerShell port of youtube-transcript.sh — keep behavior in sync with the bash version.
# Requires: yt-dlp on PATH (winget install yt-dlp)
# Usage: powershell -ExecutionPolicy Bypass -File youtube-transcript.ps1 -Url URL -OutDir PATH [-Lang en]
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string]$Url,
    [Parameter(Mandatory = $true)][string]$OutDir,
    [string]$Lang = "en"
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command yt-dlp -ErrorAction SilentlyContinue)) {
    Write-Error "yt-dlp not found. Install with: winget install yt-dlp"
    exit 1
}

# Single video URLs only (watch, youtu.be, shorts, live). Playlist-only links fail clearly.
if ($Url -notmatch 'youtube\.com/watch|youtu\.be/|youtube\.com/shorts/|youtube\.com/live/') {
    if ($Url -match 'youtube\.com/playlist\?') {
        Write-Error "playlist URLs are not supported in v1. Pass a single video URL."
    } else {
        Write-Error "not a supported YouTube video URL: $Url"
    }
    exit 1
}

function ConvertTo-Slug {
    param([string]$Text)
    $s = $Text.ToLowerInvariant() -replace '[^a-z0-9]+', '-'
    $s = $s.Trim('-')
    if ($s.Length -gt 80) { $s = $s.Substring(0, 80).Trim('-') }
    return $s
}

# Caption file -> plain prose, wrapped into paragraphs of roughly 120 words.
function Convert-SubsToText {
    param([string]$File)
    $prev = ""
    $words = New-Object System.Collections.Generic.List[string]
    foreach ($line in (Get-Content $File)) {
        if ($line -match '^WEBVTT|^Kind:|^Language:|^NOTE') { continue }
        if ($line -match '^\d+$') { continue }
        if ($line -match '^\d{2}:\d{2}:') { continue }
        $clean = ($line -replace '<[^>]+>', '').Trim()
        if ($clean -eq "" -or $clean -eq $prev) { continue }
        $prev = $clean
        foreach ($w in ($clean -split '\s+')) { if ($w) { $words.Add($w) } }
    }
    $paragraphs = New-Object System.Collections.Generic.List[string]
    $buf = New-Object System.Collections.Generic.List[string]
    foreach ($w in $words) {
        $buf.Add($w)
        $endsSentence = $w -match '[.!?]"?$'
        if (($buf.Count -ge 80 -and $endsSentence) -or $buf.Count -ge 160) {
            $paragraphs.Add(($buf -join ' '))
            $buf.Clear()
        }
    }
    if ($buf.Count -gt 0) { $paragraphs.Add(($buf -join ' ')) }
    return ($paragraphs -join "`n`n")
}

# Metadata via --print (no JSON parser dependency)
$meta = & yt-dlp --no-download-archive --skip-download `
    --print "%(id)s" --print "%(title)s" --print "%(channel)s" `
    --print "%(upload_date)s" --print "%(duration)s" --print "%(webpage_url)s" $Url
if ($LASTEXITCODE -ne 0 -or -not $meta) {
    Write-Error "yt-dlp could not read video metadata for: $Url"
    exit 1
}
$meta = @($meta)
$videoId = $meta[0]; $title = $meta[1]; $channel = $meta[2]
$uploadRaw = $meta[3]; $webpage = $meta[5]
$duration = 0
if ($meta[4] -match '^\d+(\.\d+)?$') { $duration = [int][double]$meta[4] }

if ($uploadRaw -match '^\d{8}$') {
    $uploadDate = $uploadRaw.Substring(0, 4) + "-" + $uploadRaw.Substring(4, 2) + "-" + $uploadRaw.Substring(6, 2)
} else {
    $uploadDate = (Get-Date -Format "yyyy-MM-dd")
}

if ($duration -gt 3600) {
    Write-Warning "video duration is ${duration}s (>1h). Proceeding anyway."
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$tmp = Join-Path ([System.IO.Path]::GetTempPath()) ("yt-" + [System.Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

try {
    $captionType = "unknown"
    $subFile = $null

    foreach ($attempt in @(
        @{ Mode = "manual"; Flag = "--write-sub" },
        @{ Mode = "auto";   Flag = "--write-auto-sub" }
    )) {
        if ($subFile) { break }
        & yt-dlp --no-download-archive --skip-download $attempt.Flag `
            --sub-lang $Lang --sub-format "vtt/srt/best" `
            -o (Join-Path $tmp "%(id)s") $Url *> $null
        $subFile = Get-ChildItem $tmp -File |
            Where-Object { $_.Extension -in ".vtt", ".srt" } |
            Select-Object -First 1
        if ($subFile) { $captionType = $attempt.Mode }
    }

    if (-not $subFile) {
        Write-Error "no $Lang captions found for this video.`nhint: v1 uses captions only (no Whisper). Try another video or paste a transcript manually."
        exit 1
    }

    $transcript = Convert-SubsToText $subFile.FullName
    if (-not $transcript) {
        Write-Error "caption file was empty after conversion."
        exit 1
    }

    $slug = ConvertTo-Slug $title
    $outFile = Join-Path $OutDir ("$uploadDate-$slug.md")
    $titleEsc = $title -replace '"', '\"'
    $channelEsc = $channel -replace '"', '\"'
    $fetched = Get-Date -Format "yyyy-MM-dd"

    $content = @"
---
source: youtube
url: $webpage
video_id: $videoId
title: "$titleEsc"
channel: "$channelEsc"
upload_date: $uploadDate
duration_seconds: $duration
caption_type: $captionType
language: $Lang
fetched: $fetched
---

# $title

**Source:** [YouTube]($webpage) · **Channel:** $channel · **Uploaded:** $uploadDate

## Transcript

$transcript
"@
    Set-Content -Path $outFile -Value $content -Encoding utf8
    Write-Output $outFile
} finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
}
