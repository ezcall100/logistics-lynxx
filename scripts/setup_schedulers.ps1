# Setup Schedulers for Autonomous TMS System (PowerShell)
# This script sets up scheduled tasks for automated operational tasks

param(
    [Parameter(Position=0)]
    [string]$Command = "install"
)

Write-Host "🕐 Setting up operational schedulers..." -ForegroundColor Blue

# Create logs directory if it doesn't exist
if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
}

# Get the current directory
$APP_DIR = Get-Location

# Function to create scheduled task
function New-ScheduledTask {
    param(
        [string]$TaskName,
        [string]$Schedule,
        [string]$ScriptPath,
        [string]$LogFile
    )
    
    $Action = New-ScheduledTaskAction -Execute "node.exe" -Argument $ScriptPath -WorkingDirectory $APP_DIR
    $Trigger = New-ScheduledTaskTrigger -CronExpression $Schedule
    $Settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RunOnlyIfNetworkAvailable
    
    try {
        Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Force
        Write-Host "✅ Created scheduled task: $TaskName" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to create task $TaskName : $_" -ForegroundColor Red
    }
}

# Function to add scheduled tasks
function Add-ScheduledTasks {
    Write-Host "📅 Adding scheduled tasks..." -ForegroundColor Blue
    
    # Green posture check - every 15 minutes
    New-ScheduledTask -TaskName "TMS-GreenPosture" -Schedule "0/15 * * * *" -ScriptPath "scripts/green-posture-script.js" -LogFile "logs/green-posture.log"
    
    # Daily operational cadence - 7:05 AM daily
    New-ScheduledTask -TaskName "TMS-DailyCadence" -Schedule "5 7 * * *" -ScriptPath "scripts/operational-cadence.js daily" -LogFile "logs/cadence.log"
    
    # Weekly resilience drill - Sunday 7:15 AM
    New-ScheduledTask -TaskName "TMS-WeeklyResilience" -Schedule "15 7 * * 0" -ScriptPath "scripts/resilience-drills.js" -LogFile "logs/resilience.log"
    
    Write-Host "✅ Scheduled tasks installed successfully!" -ForegroundColor Green
}

# Function to show current scheduled tasks
function Show-ScheduledTasks {
    Write-Host "📋 Current TMS scheduled tasks:" -ForegroundColor Blue
    
    $tasks = Get-ScheduledTask | Where-Object { $_.TaskName -like "TMS-*" }
    
    if ($tasks) {
        foreach ($task in $tasks) {
            Write-Host "  • $($task.TaskName) - $($task.State)" -ForegroundColor White
        }
    }
    else {
        Write-Host "  No TMS scheduled tasks found" -ForegroundColor Yellow
    }
}

# Function to remove scheduled tasks
function Remove-ScheduledTasks {
    Write-Host "🗑️ Removing TMS scheduled tasks..." -ForegroundColor Blue
    
    $tasks = Get-ScheduledTask | Where-Object { $_.TaskName -like "TMS-*" }
    
    foreach ($task in $tasks) {
        try {
            Unregister-ScheduledTask -TaskName $task.TaskName -Confirm:$false
            Write-Host "✅ Removed task: $($task.TaskName)" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ Failed to remove task $($task.TaskName) : $_" -ForegroundColor Red
        }
    }
    
    Write-Host "✅ TMS scheduled tasks removed!" -ForegroundColor Green
}

# Main script logic
switch ($Command) {
    "install" {
        Add-ScheduledTasks
        Show-ScheduledTasks
    }
    "show" {
        Show-ScheduledTasks
    }
    "remove" {
        Remove-ScheduledTasks
    }
    "help" {
        Write-Host "Usage: .\scripts\setup_schedulers.ps1 [install|show|remove|help]" -ForegroundColor White
        Write-Host ""
        Write-Host "Commands:" -ForegroundColor White
        Write-Host "  install  - Install operational scheduled tasks (default)" -ForegroundColor White
        Write-Host "  show     - Show current TMS scheduled tasks" -ForegroundColor White
        Write-Host "  remove   - Remove TMS scheduled tasks" -ForegroundColor White
        Write-Host "  help     - Show this help message" -ForegroundColor White
        Write-Host ""
        Write-Host "Scheduled tasks to be installed:" -ForegroundColor White
        Write-Host "  • TMS-GreenPosture - Every 15 minutes" -ForegroundColor White
        Write-Host "  • TMS-DailyCadence - Daily at 7:05 AM" -ForegroundColor White
        Write-Host "  • TMS-WeeklyResilience - Weekly on Sunday at 7:15 AM" -ForegroundColor White
    }
    default {
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Write-Host "Use 'help' for usage information" -ForegroundColor Yellow
    }
}
