# Bootstrap LetsMake Product Workflow in a consumer workspace (Windows).
# PowerShell port of install-letsmake.sh - keep behavior in sync with the bash version.
# Usage: powershell -ExecutionPolicy Bypass -File install-letsmake.ps1 [-Workspace DIR] [-PackDir DIR] [-Check]
[CmdletBinding()]
param(
    [string]$Workspace = (Get-Location).Path,
    [string]$PackDir = "",
    [switch]$Check
)

$ErrorActionPreference = "Stop"

function Get-CursorSlug {
    param([string]$Path)
    # Cursor (Windows) slugs a workspace path by dropping ':' and replacing separators with '-'
    # e.g. C:\Users\alice\acme-product -> C-Users-alice-acme-product
    $p = [System.IO.Path]::GetFullPath($Path).TrimEnd('\', '/')
    return ($p -replace ':', '' -replace '[\\/]', '-')
}

function Read-ConfigValue {
    param([object]$Config, [string]$Key)
    $prop = $Config.PSObject.Properties[$Key]
    if ($null -eq $prop) { return "" }
    return [string]$prop.Value
}

$Workspace = [System.IO.Path]::GetFullPath($Workspace)
$canvasDir = Join-Path $HOME (".cursor\projects\" + (Get-CursorSlug $Workspace) + "\canvases")
$configPath = Join-Path $Workspace ".cursor\letsmake.config.json"

# ---------------------------------------------------------------------------
# Doctor mode: validate config plus environment, write nothing.
# ---------------------------------------------------------------------------
if ($Check) {
    $fail = 0; $warn = 0
    Write-Output "LetsMake doctor - workspace: $Workspace"
    Write-Output ""

    if (-not (Test-Path $configPath)) {
        Write-Output "FAIL  config not found: .cursor\letsmake.config.json"
        Write-Output "      fix:  powershell -File install-letsmake.ps1 -Workspace `"$Workspace`""
        Write-Output ""
        Write-Output "RESULT: FAIL (not bootstrapped)"
        exit 1
    }
    Write-Output "ok    config: .cursor\letsmake.config.json"

    try {
        $cfg = Get-Content $configPath -Raw | ConvertFrom-Json
    } catch {
        Write-Output "FAIL  config is not valid JSON"
        Write-Output ""
        Write-Output "RESULT: FAIL (invalid config)"
        exit 1
    }

    function Resolve-WorkspacePath {
        param([string]$p)
        if ([System.IO.Path]::IsPathRooted($p)) { return $p }
        return (Join-Path $Workspace $p)
    }

    foreach ($entry in @(
        @{ Key = "docsProductRoot";    Kind = "dir";  Label = "docsProductRoot" },
        @{ Key = "researchIndexPath";  Kind = "file"; Label = "researchIndexPath" },
        @{ Key = "lessonsLearnedPath"; Kind = "file"; Label = "lessonsLearnedPath" }
    )) {
        $val = Read-ConfigValue $cfg $entry.Key
        if (-not $val) { Write-Output ("WARN  " + $entry.Label + " unset"); $warn++; continue }
        $p = Resolve-WorkspacePath $val
        $exists = if ($entry.Kind -eq "dir") { Test-Path $p -PathType Container } else { Test-Path $p -PathType Leaf }
        if ($exists) { Write-Output ("ok    " + $entry.Label + ": " + $p) }
        else { Write-Output ("WARN  " + $entry.Label + " missing: " + $p); $warn++ }
    }

    $featRoot = Read-ConfigValue $cfg "featureDocsRoot"
    if ($featRoot) {
        $fr = Resolve-WorkspacePath $featRoot
        if (Test-Path $fr -PathType Container) { Write-Output "ok    featureDocsRoot: $fr" }
        else { Write-Output "info  featureDocsRoot not yet created: $fr" }
    }

    $canvas = Read-ConfigValue $cfg "canvasDir"
    if (-not $canvas) {
        Write-Output "FAIL  canvasDir unset in config"; $fail++
    } else {
        if (-not (Test-Path $canvas -PathType Container)) {
            Write-Output "WARN  canvasDir missing (created on first canvas): $canvas"; $warn++
        } else {
            $probe = Join-Path $canvas ".letsmake-write-test"
            try {
                New-Item -ItemType File -Path $probe -Force | Out-Null
                Remove-Item $probe -Force
                Write-Output "ok    canvasDir writable: $canvas"
            } catch {
                Write-Output "FAIL  canvasDir not writable: $canvas"; $fail++
            }
        }
        if ($canvas -ne $canvasDir) {
            Write-Output "WARN  canvasDir does not match this workspace path"
            Write-Output "      expected: $canvasDir"
            $warn++
        }
    }

    if (Get-Command yt-dlp -ErrorAction SilentlyContinue) {
        Write-Output "ok    yt-dlp on PATH"
    } else {
        Write-Output "WARN  yt-dlp not found (video research only): winget install yt-dlp"; $warn++
    }

    $ytCandidates = @(
        (Join-Path $Workspace "scripts\youtube-transcript.ps1"),
        (Join-Path $Workspace "scripts\youtube-transcript.sh")
    )
    if ($ytCandidates | Where-Object { Test-Path $_ }) {
        Write-Output "ok    youtube-transcript script present in scripts/"
    } else {
        Write-Output "WARN  youtube-transcript.{ps1,sh} not found in workspace scripts/"; $warn++
    }

    if (Test-Path (Join-Path $Workspace "AGENTS.md")) {
        Write-Output "ok    AGENTS.md present"
    } else {
        Write-Output "WARN  AGENTS.md missing (new sessions start cold) - re-run install to seed it"; $warn++
    }

    Write-Output ""
    if ($fail -gt 0) { Write-Output "RESULT: FAIL ($fail error(s), $warn warning(s))"; exit 1 }
    if ($warn -gt 0) { Write-Output "RESULT: OK with $warn warning(s)"; exit 0 }
    Write-Output "RESULT: OK - config healthy"
    exit 0
}

# ---------------------------------------------------------------------------
# Install mode
# ---------------------------------------------------------------------------
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $PackDir) { $PackDir = Split-Path -Parent $scriptDir }
$PackDir = [System.IO.Path]::GetFullPath($PackDir)

# Canonical home for shared templates/playbooks (single source of truth).
$docsSrc = Join-Path $PackDir "skills\letsmake-product-workflow\references"
if (-not (Test-Path $docsSrc -PathType Container)) {
    Write-Error "pack not found at $PackDir (expected $docsSrc)"
    exit 1
}

foreach ($dir in @("docs\product", "docs\research", "scripts", ".cursor")) {
    New-Item -ItemType Directory -Force -Path (Join-Path $Workspace $dir) | Out-Null
}
New-Item -ItemType Directory -Force -Path $canvasDir | Out-Null

# Copy product docs from the canonical references hub (do not overwrite existing)
Get-ChildItem (Join-Path $docsSrc "*.md") | ForEach-Object {
    $dest = Join-Path $Workspace ("docs\product\" + $_.Name)
    if (-not (Test-Path $dest)) {
        Copy-Item $_.FullName $dest
        Write-Output ("installed docs/product/" + $_.Name)
    } else {
        Write-Output ("skip docs/product/" + $_.Name + " (exists)")
    }
}

# Canvas index stub
$index = Join-Path $Workspace "docs\research\canvas-index.md"
if (-not (Test-Path $index)) {
    $stub = Get-Content (Join-Path $PackDir "assets\research\canvas-index.stub.md") -Raw
    $stub = $stub -replace '\{CANVAS_DIR\}', ($canvasDir -replace '\\', '/')
    Set-Content -Path $index -Value $stub -Encoding utf8 -NoNewline
    Write-Output "installed docs/research/canvas-index.md"
} else {
    Write-Output "skip docs/research/canvas-index.md (exists)"
}

# Lessons learned template
$lessons = Join-Path $Workspace "docs\lessons-learned.md"
if (-not (Test-Path $lessons)) {
    Copy-Item (Join-Path $PackDir "assets\lessons-learned.template.md") $lessons
    Write-Output "installed docs/lessons-learned.md"
} else {
    Write-Output "skip docs/lessons-learned.md (exists)"
}

# AGENTS.md stub (session read-first hook) - extract the template body
$agentsPath = Join-Path $Workspace "AGENTS.md"
if (-not (Test-Path $agentsPath)) {
    $tpl = Get-Content (Join-Path $docsSrc "agents-md-template.md") -Encoding UTF8
    $body = New-Object System.Collections.Generic.List[string]
    $inBody = $false
    foreach ($line in $tpl) {
        if ($line -match '^## TEMPLATE START') { $inBody = $true; continue }
        if ($line -match '^## TEMPLATE END') { $inBody = $false; continue }
        if ($inBody) { $body.Add($line) }
    }
    Set-Content -Path $agentsPath -Value ($body -join "`r`n") -Encoding utf8
    Write-Output "installed AGENTS.md (edit the {project} placeholders)"
} else {
    Write-Output "skip AGENTS.md (exists)"
}

# YouTube scripts (both shells, so research works in PowerShell and Git Bash)
foreach ($name in @("youtube-transcript.ps1", "youtube-transcript.sh")) {
    $src = Join-Path $PackDir ("scripts\" + $name)
    $dst = Join-Path $Workspace ("scripts\" + $name)
    if ((Test-Path $src) -and (-not (Test-Path $dst))) {
        Copy-Item $src $dst
        Write-Output ("installed scripts/" + $name)
    } elseif (Test-Path $dst) {
        Write-Output ("skip scripts/" + $name + " (exists)")
    }
}

# Config - never overwrite an existing config (it may carry team customizations).
if (Test-Path $configPath) {
    Write-Output "skip .cursor/letsmake.config.json (exists - delete it first to regenerate)"
} else {
    $config = [ordered]@{
        version            = 1
        docsProductRoot    = "docs/product"
        featureDocsRoot    = "docs/epics"
        researchIndexPath  = "docs/research/canvas-index.md"
        lessonsLearnedPath = "docs/lessons-learned.md"
        canvasDir          = $canvasDir
    }
    Set-Content -Path $configPath -Value ($config | ConvertTo-Json) -Encoding utf8
    Write-Output "wrote .cursor/letsmake.config.json"
}

Write-Output ""
Write-Output "Canvas directory: $canvasDir"
Write-Output ""
Write-Output "Next steps:"
Write-Output "  1. npx skills add dmedina345/product-discovery --all -a cursor -y"
Write-Output "  2. Create a feature folder under docs/epics/{epic}/features/{feature}/"
Write-Output "  3. Run intake-synthesize or discovery-grill in Cursor Agent"
