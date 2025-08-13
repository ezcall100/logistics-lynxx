# 🔧 Auto-Sync Setup Script (PowerShell)
# Sets up automatic synchronization to GitHub repository for Windows

param(
    [string]$Interval = "",
    [switch]$Remove
)

# Configuration
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir
$SyncScript = Join-Path $ScriptDir "sync-to-github.ps1"
$TaskName = "LogisticsLynxAutoSync"
$RepoName = "logistics-lynxx"

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"

# Logging function
function Write-Log {
    param([string]$Message, [string]$Color = "White")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$Timestamp] $Message" -ForegroundColor $Color
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

# Function to setup Windows Task Scheduler
function Setup-WindowsTask {
    param([string]$Interval)
    
    # Create logs directory
    $LogsDir = Join-Path $ProjectDir "logs"
    if (-not (Test-Path $LogsDir)) {
        New-Item -ItemType Directory -Path $LogsDir -Force | Out-Null
    }
    
    # Create batch file for task scheduler
    $RunScriptPath = Join-Path $ScriptDir "run-sync.bat"
    $RunScriptContent = @"
@echo off
REM Windows Task Scheduler wrapper for auto-sync
cd /d "%~dp0.."
powershell.exe -ExecutionPolicy Bypass -File "logistics-lynx\scripts\sync-to-github.ps1" >> "logistics-lynx\logs\auto-sync.log" 2>&1
"@
    
    Set-Content -Path $RunScriptPath -Value $RunScriptContent
    
    # Remove existing task if it exists
    try {
        schtasks /delete /tn $TaskName /f 2>$null
        Write-Log "Removed existing task" $Blue
    } catch {
        # Task doesn't exist, which is fine
    }
    
    # Create new task based on interval
    $BatchCommand = "`"$RunScriptPath`""
    $Arguments = @("/create", "/tn", $TaskName, "/tr", $BatchCommand, "/f")
    
    switch ($Interval) {
        "hourly" { $Arguments += @("/sc", "hourly") }
        "daily" { $Arguments += @("/sc", "daily") }
        "weekly" { $Arguments += @("/sc", "weekly") }
        "every-15-min" { $Arguments += @("/sc", "minute", "/mo", "15") }
        "every-30-min" { $Arguments += @("/sc", "minute", "/mo", "30") }
        default { throw "Invalid interval: $Interval" }
    }
    
    Write-Log "Creating Windows Task Scheduler task..." $Blue
    
    # Use a simpler approach with cmd
    $CmdCommand = "schtasks /create /tn `"$TaskName`" /tr `"$BatchCommand`" /sc hourly /f"
    Write-Log "Command: $CmdCommand" $Blue
    
    $Result = cmd /c $CmdCommand 2>&1
    $ExitCode = $LASTEXITCODE
    
    if ($ExitCode -eq 0) {
        Write-Log "Task created successfully" $Blue
        Write-Log "Output: $Result" $Blue
        Write-Success "Windows Task Scheduler task created successfully!"
        Write-Log "Auto-sync will run $Interval" $Blue
        Write-Log "Logs will be saved to: $LogsDir\auto-sync.log" $Blue
    } else {
        Write-Error "Failed to create task. Exit code: $ExitCode"
        Write-Error "Error: $Result"
        exit 1
    }
}

# Function to remove Windows Task Scheduler task
function Remove-WindowsTask {
    try {
        schtasks /delete /tn $TaskName /f 2>$null
        Write-Success "Windows Task Scheduler task removed successfully!"
    } catch {
        Write-Warning "Task '$TaskName' not found or already removed"
    }
}

# Main setup function
function Main {
    Write-Log "Setting up automatic synchronization for logistics-lynx repository..." $Blue
    
    # Check if sync script exists
    if (-not (Test-Path $SyncScript)) {
        Write-Error "Sync script not found: $SyncScript"
        exit 1
    }
    
    # Check if we're in the right directory
    if (-not (Test-Path (Join-Path $ProjectDir "package.json")) -or -not (Test-Path (Join-Path $ProjectDir "src"))) {
        Write-Error "This script must be run from the logistics-lynx project root directory"
        exit 1
    }
    
    # Handle remove operation
    if ($Remove) {
        Remove-WindowsTask
        exit 0
    }
    
    # Get sync interval from user if not provided
    if ([string]::IsNullOrEmpty($Interval)) {
        Write-Host "Select sync interval:" -ForegroundColor $Blue
        Write-Host "1) Every 15 minutes"
        Write-Host "2) Every 30 minutes"
        Write-Host "3) Hourly"
        Write-Host "4) Daily"
        Write-Host "5) Weekly"
        Write-Host "6) Manual only (no auto-sync)"
        
        $Choice = Read-Host "Enter your choice (1-6)"
        
        $Interval = switch ($Choice) {
            "1" { "every-15-min" }
            "2" { "every-30-min" }
            "3" { "hourly" }
            "4" { "daily" }
            "5" { "weekly" }
            "6" { 
                Write-Success "Manual sync only. Use '$SyncScript' to sync manually."
                exit 0
            }
            default { 
                Write-Error "Invalid choice"
                exit 1
            }
        }
    }
    
    # Setup Windows Task Scheduler
    Setup-WindowsTask $Interval
    
    # Test the sync script
    Write-Log "Testing sync script..." $Blue
    $TestResult = & $SyncScript 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Sync script test successful!"
    } else {
        Write-Warning "Sync script test failed. Please check your git configuration."
        Write-Host $TestResult -ForegroundColor $Yellow
    }
    
    Write-Host ""
    Write-Success "Auto-sync setup completed!"
    Write-Host ""
    Write-Host "📋 Setup Summary:" -ForegroundColor $Blue
    Write-Host "   • Repository: ezcall100/logistics-lynx"
    Write-Host "   • Sync interval: $Interval"
    Write-Host "   • Log file: $ProjectDir\logs\auto-sync.log"
    Write-Host "   • Manual sync: $SyncScript"
    Write-Host ""
    Write-Host "🔧 Management Commands:" -ForegroundColor $Blue
    Write-Host "   • View tasks: schtasks /query /tn `"$TaskName`""
    Write-Host "   • Remove task: schtasks /delete /tn `"$TaskName`" /f"
    Write-Host "   • View logs: Get-Content `"$ProjectDir\logs\auto-sync.log`" -Tail 50"
    Write-Host "   • Manual sync: $SyncScript"
    Write-Host "   • Remove auto-sync: $($MyInvocation.MyCommand.Name) -Remove"
}

# Run main function
Main
