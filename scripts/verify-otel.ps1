# PR-105 OpenTelemetry Verification Script (PowerShell)
param(
    [Parameter(Mandatory=$true)]
    [string]$OtelEndpoint,
    
    [Parameter(Mandatory=$true)]
    [string]$SupabaseUrl,
    
    [Parameter(Mandatory=$true)]
    [string]$SupabaseKey
)

Write-Host "== PR-105 verification ==" -ForegroundColor Green

# Check required environment variables
if (-not $OtelEndpoint) {
    Write-Error "OTEL_EXPORTER_OTLP_ENDPOINT is required"
    exit 1
}

if (-not $SupabaseUrl) {
    Write-Error "SUPABASE_URL is required"
    exit 1
}

if (-not $SupabaseKey) {
    Write-Error "SUPABASE_SERVICE_ROLE_KEY is required"
    exit 1
}

Write-Host "[1/4] Trigger synthetic task to generate spans" -ForegroundColor Yellow

try {
    $headers = @{
        "Authorization" = "Bearer $SupabaseKey"
        "Content-Type" = "application/json"
    }
    
    $body = @{
        task_id = "00000000-0000-4000-8000-000000000099"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$SupabaseUrl/functions/v1/agent-runner" -Method POST -Headers $headers -Body $body
    Write-Host "✅ Synthetic task triggered successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Synthetic task failed (this is expected if no tasks exist): $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "[2/4] Open your OTEL backend and search for service.name=transbot-ai within last 2m" -ForegroundColor Yellow
Write-Host "      Also expect client spans: service.name=transbot-ai-web (if browser open)." -ForegroundColor Gray

Write-Host "[3/4] Check flag gating" -ForegroundColor Yellow
Write-Host "      If traces not appearing, ensure feature flag obs.otelEnabled is true for env." -ForegroundColor Gray

Write-Host "[4/4] (Optional) Send a minimal OTLP smoke request (if backend accepts unauth)" -ForegroundColor Yellow
Write-Host "      Skipping generic payload; many vendors require auth/header formats." -ForegroundColor Gray

Write-Host "Done." -ForegroundColor Green
