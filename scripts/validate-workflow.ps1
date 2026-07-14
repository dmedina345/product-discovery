[CmdletBinding()]
param(
    [string]$Workspace = (Get-Location).Path,
    [string]$Feature = "",
    [switch]$Json,
    [switch]$ExplainState
)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = $env:LETSMAKE_NODE
if (-not $node -and (Test-Path "C:\Program Files\nodejs\node.exe")) { $node = "C:\Program Files\nodejs\node.exe" }
if (-not $node) {
    $cmd = Get-Command node -ErrorAction SilentlyContinue
    if ($cmd) { $node = $cmd.Source }
}
if (-not $node) { throw "Node.js 18+ not found. Set LETSMAKE_NODE or install Node.js." }

$cliArgs = @((Join-Path $scriptDir "letsmake-tools.mjs"), "validate", "--workspace", [System.IO.Path]::GetFullPath($Workspace))
if ($Feature) { $cliArgs += @("--feature", $Feature) }
if ($Json) { $cliArgs += "--json" }
if ($ExplainState) { $cliArgs += "--explain-state" }
& $node @cliArgs
exit $LASTEXITCODE
