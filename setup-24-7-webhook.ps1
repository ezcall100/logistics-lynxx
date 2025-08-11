# 24/7 n8n Webhook Setup Script for Windows
# This script sets up continuous monitoring of the n8n webhook on Windows

param(
    [string]$WebhookSecret = "",
    [string]$SlackWebhookUrl = ""
)

Write-Host "🚀 Setting up 24/7 n8n Webhook Monitor for Autonomous Agents" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green

# Configuration
$WebhookUrl = "https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook"
$ProjectDir = Get-Location
$ServiceName = "n8n-webhook-monitor"
$LogDir = "logs"

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $isAdmin) {
    Write-Host "❌ This script must be run as Administrator for Windows service installation" -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check if required files exist
if (-not (Test-Path "monitor-n8n-webhook.js")) {
    Write-Host "❌ monitor-n8n-webhook.js not found in current directory" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "test-n8n-webhook-24-7.js")) {
    Write-Host "❌ test-n8n-webhook-24-7.js not found in current directory" -ForegroundColor Red
    exit 1
}

# Create logs directory
if (-not (Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir | Out-Null
    Write-Host "✅ Created logs directory" -ForegroundColor Green
}

# Set up environment variables
if ([string]::IsNullOrEmpty($WebhookSecret)) {
    Write-Host "⚠️ N8N_WEBHOOK_SECRET not provided. Please set it before running the monitor." -ForegroundColor Yellow
    Write-Host "   Use: .\setup-24-7-webhook.ps1 -WebhookSecret 'your-secret-key-here'" -ForegroundColor Yellow
} else {
    [Environment]::SetEnvironmentVariable("N8N_WEBHOOK_SECRET", $WebhookSecret, "Machine")
    Write-Host "✅ Set N8N_WEBHOOK_SECRET environment variable" -ForegroundColor Green
}

if (-not [string]::IsNullOrEmpty($SlackWebhookUrl)) {
    [Environment]::SetEnvironmentVariable("SLACK_WEBHOOK_URL", $SlackWebhookUrl, "Machine")
    Write-Host "✅ Set SLACK_WEBHOOK_URL environment variable" -ForegroundColor Green
}

# Test the webhook first
Write-Host "🔍 Testing webhook connectivity..." -ForegroundColor Yellow
try {
    node test-n8n-webhook-24-7.js
    Write-Host "✅ Webhook test successful" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Webhook test failed. Please check your n8n configuration." -ForegroundColor Yellow
    Write-Host "   Make sure the workflow is ACTIVE in n8n." -ForegroundColor Yellow
}

# Create Windows service using NSSM (if available) or PowerShell
Write-Host "📦 Installing Windows service..." -ForegroundColor Yellow

# Check if NSSM is available
$nssmPath = Get-Command nssm -ErrorAction SilentlyContinue
if ($nssmPath) {
    # Use NSSM for service installation
    Write-Host "Using NSSM for service installation..." -ForegroundColor Yellow
    
    # Remove existing service if it exists
    nssm stop $ServiceName 2>$null
    nssm remove $ServiceName confirm 2>$null
    
    # Install new service
    nssm install $ServiceName "node" "monitor-n8n-webhook.js"
    nssm set $ServiceName AppDirectory $ProjectDir.Path
    nssm set $ServiceName AppEnvironmentExtra "NODE_VERSION=18"
    nssm set $ServiceName Description "TMS n8n Webhook 24/7 Monitor for Autonomous Agents"
    nssm set $ServiceName Start SERVICE_AUTO_START
    
    Write-Host "✅ Service installed using NSSM" -ForegroundColor Green
} else {
    # Use PowerShell to create a scheduled task instead
    Write-Host "NSSM not found, creating scheduled task..." -ForegroundColor Yellow
    
    $taskName = "n8n-webhook-monitor"
    $action = New-ScheduledTaskAction -Execute "node" -Argument "monitor-n8n-webhook.js" -WorkingDirectory $ProjectDir.Path
    $trigger = New-ScheduledTaskTrigger -AtStartup
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RunOnlyIfNetworkAvailable
    $principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest
    
    # Remove existing task if it exists
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    
    # Create new task
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description "TMS n8n Webhook 24/7 Monitor for Autonomous Agents"
    
    Write-Host "✅ Scheduled task created" -ForegroundColor Green
}

# Start the service/task
Write-Host "🚀 Starting 24/7 webhook monitor..." -ForegroundColor Yellow

if ($nssmPath) {
    Start-Service $ServiceName
    $status = Get-Service $ServiceName -ErrorAction SilentlyContinue
} else {
    Start-ScheduledTask -TaskName $taskName
    $status = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
}

# Check if started successfully
if ($status -and $status.State -eq "Running") {
    Write-Host "✅ Service is running successfully" -ForegroundColor Green
    Write-Host "📊 Service status:" -ForegroundColor Yellow
    if ($nssmPath) {
        Get-Service $ServiceName | Format-List
    } else {
        Get-ScheduledTask -TaskName $taskName | Format-List
    }
} else {
    Write-Host "❌ Service failed to start" -ForegroundColor Red
    Write-Host "📋 Check Windows Event Logs for errors" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🎉 24/7 n8n Webhook Monitor Setup Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📡 Webhook URL: $WebhookUrl" -ForegroundColor Cyan
Write-Host "🔧 Service Name: $ServiceName" -ForegroundColor Cyan
Write-Host "📁 Project Directory: $($ProjectDir.Path)" -ForegroundColor Cyan
Write-Host ""

if ($nssmPath) {
    Write-Host "📋 Useful Commands:" -ForegroundColor Yellow
    Write-Host "   Check status:    Get-Service $ServiceName" -ForegroundColor White
    Write-Host "   Start service:   Start-Service $ServiceName" -ForegroundColor White
    Write-Host "   Stop service:    Stop-Service $ServiceName" -ForegroundColor White
    Write-Host "   Restart service: Restart-Service $ServiceName" -ForegroundColor White
} else {
    Write-Host "📋 Useful Commands:" -ForegroundColor Yellow
    Write-Host "   Check status:    Get-ScheduledTask -TaskName $taskName" -ForegroundColor White
    Write-Host "   Start task:      Start-ScheduledTask -TaskName $taskName" -ForegroundColor White
    Write-Host "   Stop task:       Stop-ScheduledTask -TaskName $taskName" -ForegroundColor White
}

Write-Host ""
Write-Host "🤖 Autonomous agents can now communicate with n8n 24/7!" -ForegroundColor Green
Write-Host "📊 Monitor will check webhook health every 5 minutes" -ForegroundColor Cyan
Write-Host "🚨 Alerts will be triggered after 3 consecutive failures" -ForegroundColor Cyan
