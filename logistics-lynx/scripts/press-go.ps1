# Press-GO Script for Windows PowerShell
# Strict, Safe, Idempotent Production Launch

param(
    [Parameter(Mandatory=$true)]
    [string]$PROD_HOST,
    
    [Parameter(Mandatory=$true)]
    [string]$SUPABASE_DB_URL,
    
    [Parameter(Mandatory=$true)]
    [string]$SUPABASE_URL,
    
    [Parameter(Mandatory=$true)]
    [string]$SUPABASE_SERVICE_ROLE_KEY
)

# ==== PRE-FLIGHT ====
Write-Host "🔎 Preflight OK → host=$PROD_HOST" -ForegroundColor Green

# Rollback function: big red button if anything fails
function Invoke-Rollback {
    Write-Host "⏪ Auto-rollback: halting autonomy & verifying" -ForegroundColor Red
    try { npm run emergency:stop } catch { Write-Host "Emergency stop failed: $_" }
    try { gh workflow run deploy-prod.yml -f environment=production -f rollback=true } catch { Write-Host "Rollback workflow failed: $_" }
    try { npm run verify:deployment } catch { Write-Host "Verification failed: $_" }
}

# ==== 1) PROD READINESS: strict ====
Write-Host "🧪 Forcing strict readiness in prod" -ForegroundColor Yellow
try {
    gh variable set READYZ_MODE --env production --body "strict" | Out-Null
} catch {
    Write-Host "Warning: Could not set READYZ_MODE variable" -ForegroundColor Yellow
}

Write-Host "🌡️ Warmup health surfaces" -ForegroundColor Yellow
try {
    $healthz = Invoke-RestMethod -Uri "http://$PROD_HOST/healthz" -Method Get
    $healthz | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Health check failed: $_" -ForegroundColor Red
    Invoke-Rollback
    exit 1
}

try {
    $readyz = Invoke-RestMethod -Uri "http://$PROD_HOST/readyz" -Method Get
    $readyz | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Readiness check failed: $_" -ForegroundColor Red
    Invoke-Rollback
    exit 1
}

# ==== 2) ARM OBS + AUTONOMY (idempotent) ====
Write-Host "🎛️ Arming traces & autonomy rails" -ForegroundColor Yellow
try {
    $sql = @"
insert into feature_flags_v2(key,scope,value) values
('obs.otelEnabled','global',true),
('agents.autonomousEnabled','global',true),
('autonomy.emergencyStop','global',false),
('autonomy.mode','global','FULL')
on conflict (key,scope) do update set value=excluded.value;
"@
    psql "$SUPABASE_DB_URL" -c $sql
} catch {
    Write-Host "Database update failed: $_" -ForegroundColor Red
    Invoke-Rollback
    exit 1
}

# ==== 3) GOLDEN PATH + SMOKE + VERIFY ====
Write-Host "🟢 Golden path" -ForegroundColor Yellow
try {
    npm run golden:path
} catch {
    Write-Host "Golden path failed: $_" -ForegroundColor Red
    Invoke-Rollback
    exit 1
}

Write-Host "🚬 Smoke tests" -ForegroundColor Yellow
try {
    npm run smoke:test
} catch {
    Write-Host "Smoke tests failed: $_" -ForegroundColor Red
    Invoke-Rollback
    exit 1
}

Write-Host "✅ Deployment verification" -ForegroundColor Yellow
try {
    npm run verify:deployment
} catch {
    Write-Host "Deployment verification failed: $_" -ForegroundColor Red
    Invoke-Rollback
    exit 1
}

# ==== 4) EVIDENCE + POSTURE ====
Write-Host "📦 Evidence (auditor-ready)" -ForegroundColor Yellow
try {
    npm run green:posture
} catch {
    Write-Host "Evidence capture failed: $_" -ForegroundColor Red
    Invoke-Rollback
    exit 1
}

Write-Host "🎉 LAUNCH COMPLETE — strict /readyz should be green now" -ForegroundColor Green
try {
    $finalReadyz = Invoke-RestMethod -Uri "http://$PROD_HOST/readyz" -Method Get
    $finalReadyz | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Final readiness check failed: $_" -ForegroundColor Red
    Invoke-Rollback
    exit 1
}

Write-Host "🚀 Trans Bot AI is now LIVE in production!" -ForegroundColor Green
