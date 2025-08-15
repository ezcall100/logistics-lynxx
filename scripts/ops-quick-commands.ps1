# Ops Quick Commands Script (PowerShell) - DEPRECATED
# This command is deprecated. Use: npm run emergency:stop|resume|degrade|status
# Provides easy access to common operational tasks

param(
    [Parameter(Position=0)]
    [string]$Command = "help"
)

# DEPRECATION NOTICE
Write-Host "⚠️  This PowerShell script is deprecated!" -ForegroundColor Yellow
Write-Host "Use the cross-platform Node.js commands instead:" -ForegroundColor White
Write-Host "  npm run emergency:stop" -ForegroundColor Cyan
Write-Host "  npm run emergency:resume" -ForegroundColor Cyan
Write-Host "  npm run emergency:degrade" -ForegroundColor Cyan
Write-Host "  npm run emergency:status" -ForegroundColor Cyan
Write-Host "  npm run smoke:test" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will be removed in the next release." -ForegroundColor Red
Write-Host ""

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$White = "White"

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

function Write-Header {
    param([string]$Message)
    Write-Host "=== $Message ===" -ForegroundColor $Blue
}

# Check if SUPABASE_DB_URL is set
if (-not $env:SUPABASE_DB_URL) {
    Write-Error "SUPABASE_DB_URL environment variable is not set"
    exit 1
}

# Function to run sanity ping
function Invoke-SanityPing {
    Write-Header "Running Sanity Ping"
    
    Write-Status "Checking critical feature flags..."
    psql $env:SUPABASE_DB_URL -c "
    select key, scope, value
    from public.feature_flags_v2
    where key in ('autonomy.emergencyStop','autonomy.mode','agents.autonomousEnabled','obs.otelEnabled')
    order by key;"
    
    Write-Status "Checking agent metrics (15m window)..."
    psql $env:SUPABASE_DB_URL -c "select * from public.v_agent_metrics_15m limit 25;"
    
    Write-Status "Checking portal status..."
    try {
        npm run check:portals
    }
    catch {
        Write-Warning "Portal check failed or not available"
    }
}

# Function for emergency stop
function Invoke-EmergencyStop {
    Write-Header "EMERGENCY STOP"
    Write-Warning "This will immediately halt all autonomous operations!"
    $confirm = Read-Host "Are you sure you want to continue? (yes/no)"
    
    if ($confirm -eq "yes") {
        Write-Status "Activating emergency stop..."
        psql $env:SUPABASE_DB_URL -c "
        update public.feature_flags_v2
        set value=true
        where key='autonomy.emergencyStop' and scope='global';"
        Write-Status "Emergency stop activated"
    }
    else {
        Write-Status "Emergency stop cancelled"
    }
}

# Function for soft degrade
function Invoke-SoftDegrade {
    Write-Header "Soft Degrade - Stabilizing System"
    Write-Status "Reducing concurrency and replay rates..."
    
    psql $env:SUPABASE_DB_URL -c "
    update public.feature_flags_v2 set value=25 where key='budget.agents.maxConcurrency' and scope='global';
    update public.feature_flags_v2 set value=1  where key='rate.replay.per5m' and scope='global';"
    
    Write-Status "Soft degrade applied - system should stabilize"
}

# Function to resume operations
function Invoke-ResumeOperations {
    Write-Header "Resuming Operations"
    Write-Status "Restoring normal operation..."
    
    psql $env:SUPABASE_DB_URL -c "
    update public.feature_flags_v2 set value=false where key='autonomy.emergencyStop' and scope='global';
    update public.feature_flags_v2 set value=true  where key='agents.autonomousEnabled' and scope='global';
    update public.feature_flags_v2 set value='FULL' where key='autonomy.mode' and scope='global';"
    
    Write-Status "Operations resumed"
}

# Function for quick triage
function Invoke-QuickTriage {
    Write-Header "Quick Triage"
    
    Write-Status "Running green posture check..."
    try {
        node scripts/green-posture-script.js
    }
    catch {
        Write-Warning "Green posture check failed"
    }
    
    Write-Status "Checking recent logs..."
    try {
        supabase functions logs agent-runner --since 15m
    }
    catch {
        Write-Warning "Log check failed"
    }
    
    Write-Status "Checking DLQ depth..."
    try {
        psql $env:SUPABASE_DB_URL -c "select count(*) as dlq_depth from public.dlq_items;"
    }
    catch {
        Write-Warning "DLQ check failed"
    }
}

# Function for acceptance testing
function Invoke-AcceptanceTest {
    Write-Header "Running Acceptance Test"
    Write-Status "Executing synthetic task test..."
    try {
        node scripts/acceptance-testing.js
    }
    catch {
        Write-Warning "Acceptance test failed"
    }
}

# Function for daily ritual
function Invoke-DailyRitual {
    Write-Header "Daily Green Posture Ritual"
    
    Write-Status "Running comprehensive health check..."
    try {
        node scripts/green-posture-script.js
    }
    catch {
        Write-Warning "Health check failed"
    }
    
    Write-Status "Checking DLQ depth..."
    try {
        psql $env:SUPABASE_DB_URL -c "select count(*) dlq_depth from public.dlq_items;"
    }
    catch {
        Write-Warning "DLQ check failed"
    }
    
    Write-Status "Checking cron jobs..."
    try {
        psql $env:SUPABASE_DB_URL -c "select cron.jobid, schedule from cron.job where jobname like 'agent_logs_%';"
    }
    catch {
        Write-Warning "Cron check failed"
    }
    
    Write-Status "Daily ritual complete"
}

# Function for gradual scale-up
function Invoke-GradualScaleUp {
    Write-Header "Gradual Scale-Up"
    
    Write-Status "Starting with conservative concurrency (10)..."
    psql $env:SUPABASE_DB_URL -c "update public.feature_flags_v2 set value=10 where key='budget.agents.maxConcurrency' and scope='global';"
    
    Write-Warning "Monitor for 5 minutes, then run: .\scripts\ops-quick-commands.ps1 scale-up-25"
    Write-Warning "Then run: .\scripts\ops-quick-commands.ps1 scale-up-50"
}

function Invoke-ScaleUp25 {
    Write-Status "Scaling up to 25 concurrency..."
    psql $env:SUPABASE_DB_URL -c "update public.feature_flags_v2 set value=25 where key='budget.agents.maxConcurrency' and scope='global';"
}

function Invoke-ScaleUp50 {
    Write-Status "Scaling up to 50 concurrency..."
    psql $env:SUPABASE_DB_URL -c "update public.feature_flags_v2 set value=50 where key='budget.agents.maxConcurrency' and scope='global';"
}

# Function to show system status
function Show-Status {
    Write-Header "System Status"
    
    Write-Status "Feature flags status:"
    psql $env:SUPABASE_DB_URL -c "select key, scope, value from public.feature_flags_v2 where key like 'autonomy.%' or key like 'agents.%' or key like 'budget.%' order by key;"
    
    Write-Status "Recent agent metrics:"
    psql $env:SUPABASE_DB_URL -c "select * from public.v_agent_metrics_15m limit 10;"
    
    Write-Status "DLQ depth:"
    try {
        psql $env:SUPABASE_DB_URL -c "select count(*) as dlq_depth from public.dlq_items;"
    }
    catch {
        Write-Warning "DLQ check failed"
    }
}

# Function to show help
function Show-Help {
    Write-Header "Ops Quick Commands"
    Write-Host "Usage: .\scripts\ops-quick-commands.ps1 [command]" -ForegroundColor $White
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor $White
    Write-Host "  sanity-ping      - Run sanity ping (60s)" -ForegroundColor $White
    Write-Host "  emergency-stop   - Big red button (instant halt)" -ForegroundColor $White
    Write-Host "  soft-degrade     - Stabilize without stopping" -ForegroundColor $White
    Write-Host "  resume           - Resume operations post-incident" -ForegroundColor $White
    Write-Host "  triage           - Quick triage (2 min)" -ForegroundColor $White
    Write-Host "  acceptance-test  - Run acceptance testing" -ForegroundColor $White
    Write-Host "  daily-ritual     - Daily green posture ritual (5 min)" -ForegroundColor $White
    Write-Host "  scale-up         - Start gradual scale-up process" -ForegroundColor $White
    Write-Host "  scale-up-25      - Scale to 25 concurrency" -ForegroundColor $White
    Write-Host "  scale-up-50      - Scale to 50 concurrency" -ForegroundColor $White
    Write-Host "  status           - Show current system status" -ForegroundColor $White
    Write-Host "  help             - Show this help message" -ForegroundColor $White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor $White
    Write-Host "  .\scripts\ops-quick-commands.ps1 sanity-ping" -ForegroundColor $White
    Write-Host "  .\scripts\ops-quick-commands.ps1 triage" -ForegroundColor $White
    Write-Host "  .\scripts\ops-quick-commands.ps1 daily-ritual" -ForegroundColor $White
}

# Main command handling
switch ($Command) {
    "sanity-ping" { Invoke-SanityPing }
    "emergency-stop" { Invoke-EmergencyStop }
    "soft-degrade" { Invoke-SoftDegrade }
    "resume" { Invoke-ResumeOperations }
    "triage" { Invoke-QuickTriage }
    "acceptance-test" { Invoke-AcceptanceTest }
    "daily-ritual" { Invoke-DailyRitual }
    "scale-up" { Invoke-GradualScaleUp }
    "scale-up-25" { Invoke-ScaleUp25 }
    "scale-up-50" { Invoke-ScaleUp50 }
    "status" { Show-Status }
    default { Show-Help }
}
