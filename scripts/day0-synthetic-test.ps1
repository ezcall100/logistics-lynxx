# Day-0 Go-Live Synthetic Task Test
# This script automates the end-to-end autonomous processing test

param(
    [string]$SupabaseUrl = $env:SUPABASE_URL,
    [string]$SupabaseAnonKey = $env:SUPABASE_ANON_KEY,
    [string]$CompanyId = "00000000-0000-4000-8000-000000000001"
)

Write-Host "🚀 Day-0 Go-Live Synthetic Task Test" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Check environment variables
if (-not $SupabaseUrl) {
    Write-Host "❌ SUPABASE_URL not set. Please set environment variable or pass as parameter." -ForegroundColor Red
    exit 1
}

if (-not $SupabaseAnonKey) {
    Write-Host "❌ SUPABASE_ANON_KEY not set. Please set environment variable or pass as parameter." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Environment variables configured" -ForegroundColor Green

# Step 1: Create synthetic task
Write-Host "📝 Creating synthetic task..." -ForegroundColor Yellow

$taskPayload = @{
    company_id = $CompanyId
    fn_name = "rates.price_one"
    payload = @{
        origin = "CHI"
        dest = "DAL"
        weight = 5000
        class = "70"
        equipment = "dry-van"
    } | ConvertTo-Json -Compress
    status = "queued"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$SupabaseUrl/rest/v1/agent_tasks" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "apikey" = $SupabaseAnonKey
        "Authorization" = "Bearer $SupabaseAnonKey"
        "Prefer" = "return=representation"
    } -Body $taskPayload

    $taskId = $response.id
    Write-Host "✅ Task created with ID: $taskId" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to create task: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Execute the task via agent-runner
Write-Host "🤖 Executing task via agent-runner..." -ForegroundColor Yellow

$runnerPayload = @{
    task_id = $taskId
} | ConvertTo-Json

try {
    $startTime = Get-Date
    $runnerResponse = Invoke-RestMethod -Uri "$SupabaseUrl/functions/v1/agent-runner" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $SupabaseAnonKey"
    } -Body $runnerPayload

    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds

    Write-Host "✅ Agent runner executed successfully in $duration seconds" -ForegroundColor Green
    Write-Host "📊 Response: $($runnerResponse | ConvertTo-Json -Depth 3)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Agent runner failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "⚠️  This might be expected if the function is not deployed yet" -ForegroundColor Yellow
}

# Step 3: Verify results
Write-Host "🔍 Verifying results..." -ForegroundColor Yellow

Start-Sleep -Seconds 5  # Wait for processing

try {
    # Check task status
    $taskResponse = Invoke-RestMethod -Uri "$SupabaseUrl/rest/v1/agent_tasks?id=eq.$taskId" -Method GET -Headers @{
        "apikey" = $SupabaseAnonKey
        "Authorization" = "Bearer $SupabaseAnonKey"
    }

    if ($taskResponse) {
        $task = $taskResponse[0]
        Write-Host "📋 Task Status: $($task.status)" -ForegroundColor $(if ($task.status -eq "completed") { "Green" } else { "Yellow" })
        Write-Host "📋 Task Result: $($task.result)" -ForegroundColor Cyan
    }

    # Check logs
    $logsResponse = Invoke-RestMethod -Uri "$SupabaseUrl/rest/v1/agent_logs?company_id=eq.$CompanyId&order=created_at.desc&limit=5" -Method GET -Headers @{
        "apikey" = $SupabaseAnonKey
        "Authorization" = "Bearer $SupabaseAnonKey"
    }

    Write-Host "📝 Recent logs:" -ForegroundColor Cyan
    foreach ($log in $logsResponse) {
        $level = if ($log.level -eq "ERROR") { "Red" } elseif ($log.level -eq "WARN") { "Yellow" } else { "Green" }
        Write-Host "  [$($log.level)] $($log.message)" -ForegroundColor $level
    }

    # Check metrics
    $metricsResponse = Invoke-RestMethod -Uri "$SupabaseUrl/rest/v1/v_agent_metrics_15m?company_id=eq.$CompanyId" -Method GET -Headers @{
        "apikey" = $SupabaseAnonKey
        "Authorization" = "Bearer $SupabaseAnonKey"
    }

    if ($metricsResponse) {
        $metrics = $metricsResponse[0]
        Write-Host "📊 Metrics:" -ForegroundColor Cyan
        Write-Host "  Success Rate: $($metrics.success_rate)%" -ForegroundColor Green
        Write-Host "  Total Tasks: $($metrics.total_tasks)" -ForegroundColor Green
        Write-Host "  Avg Duration: $($metrics.avg_duration_ms)ms" -ForegroundColor Green
    }

} catch {
    Write-Host "⚠️  Could not verify results: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "🎉 Day-0 synthetic test completed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Check Autonomous Portal → Live Feed for real-time updates" -ForegroundColor White
Write-Host "2. Monitor Metrics Bar for success rate updates" -ForegroundColor White
Write-Host "3. Verify Slack notifications (if configured)" -ForegroundColor White
