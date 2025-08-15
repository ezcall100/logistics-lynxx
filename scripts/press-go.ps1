#!/usr/bin/env pwsh
$ErrorActionPreference = "Stop"

# ===== PRE-FLIGHT =====
$required = @("PROD_HOST","SUPABASE_DB_URL","SUPABASE_URL","SUPABASE_SERVICE_ROLE_KEY")
foreach ($n in $required) {
  if (-not (Get-Variable -Name $n -Scope Env -ErrorAction SilentlyContinue)) { 
    throw "Missing $n" 
  }
}
Write-Host "🔎 Preflight OK → host=$($env:PROD_HOST)"

function Invoke-Rollback {
  Write-Host "⏪ Auto-rollback: halting autonomy & verifying"
  try { npm run emergency:stop } catch {}
  try { gh workflow run deploy-prod.yml -f environment=production -f rollback=true } catch {}
  try { npm run verify:deployment } catch {}
}

try {
  # ===== 1) PROD READINESS → strict =====
  Write-Host "🧪 Forcing strict readiness"
  try { gh variable set READYZ_MODE --env production --body "strict" | Out-Null } catch {}

  Write-Host "🌡️ Warmup health surfaces"
  (Invoke-RestMethod "http://$env:PROD_HOST/healthz") | ConvertTo-Json -Depth 5
  (Invoke-RestMethod "http://$env:PROD_HOST/readyz")  | ConvertTo-Json -Depth 5

  # ===== 2) ARM OBS + AUTONOMY =====
  Write-Host "🎛️ Enabling traces & autonomy"
  psql $env:SUPABASE_DB_URL -v ON_ERROR_STOP=1 -c @"
insert into feature_flags_v2(key,scope,value) values
('obs.otelEnabled','global',true),
('agents.autonomousEnabled','global',true),
('autonomy.emergencyStop','global',false),
('autonomy.mode','global','FULL')
on conflict (key,scope) do update set value=excluded.value;
"@

  # ===== 3) GOLDEN PATH + SMOKE + VERIFY =====
  Write-Host "🟢 Golden path"
  npm run golden:path

  Write-Host "🚬 Smoke tests"
  npm run smoke:test

  Write-Host "✅ Deployment verification"
  npm run verify:deployment

  # ===== 4) EVIDENCE + POSTURE =====
  Write-Host "📦 Evidence (auditor-ready)"
  npm run green:posture

  Write-Host "🎉 LAUNCH COMPLETE — strict /readyz:"
  (Invoke-RestMethod "http://$env:PROD_HOST/readyz") | ConvertTo-Json -Depth 5
}
catch {
  Invoke-Rollback
  throw
}
