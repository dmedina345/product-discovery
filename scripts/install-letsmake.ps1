[CmdletBinding()]
param(
    [string]$Workspace = (Get-Location).Path,
    [string]$PackDir = "",
    [switch]$Check,
    [switch]$CheckUpgrade,
    [switch]$Upgrade,
    [switch]$DryRun,
    [string]$AcceptCurrent = ""
)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $PackDir) { $PackDir = Split-Path -Parent $scriptDir }
$cli = Join-Path $scriptDir "letsmake-tools.mjs"

$node = $env:LETSMAKE_NODE
if (-not $node -and (Test-Path "C:\Program Files\nodejs\node.exe")) { $node = "C:\Program Files\nodejs\node.exe" }
if (-not $node) {
    $cmd = Get-Command node -ErrorAction SilentlyContinue
    if ($cmd) { $node = $cmd.Source }
}
if (-not $node) { throw "Node.js 18+ not found. Set LETSMAKE_NODE or install Node.js." }

$mode = "install"
if ($Check) { $mode = "check" }
if ($CheckUpgrade) { $mode = "check-upgrade" }
if ($Upgrade) { $mode = "upgrade" }

$cliArgs = @($cli, $mode, "--workspace", [System.IO.Path]::GetFullPath($Workspace), "--pack", [System.IO.Path]::GetFullPath($PackDir))
if ($DryRun) { $cliArgs += "--dry-run" }
if ($AcceptCurrent) { $cliArgs += @("--accept-current", $AcceptCurrent) }
& $node @cliArgs
exit $LASTEXITCODE
