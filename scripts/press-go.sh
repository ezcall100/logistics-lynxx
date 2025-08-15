#!/usr/bin/env bash
set -euo pipefail

# ===== PRE-FLIGHT =====
: "${PROD_HOST:?missing PROD_HOST (e.g. app.yourdomain.com)}"
: "${SUPABASE_DB_URL:?missing SUPABASE_DB_URL}"
: "${SUPABASE_URL:?missing SUPABASE_URL}"
: "${SUPABASE_SERVICE_ROLE_KEY:?missing SUPABASE_SERVICE_ROLE_KEY}"

echo "🔎 Preflight OK → host=$PROD_HOST"

rollback() {
  echo "⏪ Auto-rollback: halting autonomy & verifying"
  npm run emergency:stop || true
  gh workflow run deploy-prod.yml -f environment=production -f rollback=true || true
  npm run verify:deployment || true
}
trap rollback ERR

# ===== 1) PROD READINESS → strict =====
echo "🧪 Forcing strict readiness"
gh variable set READYZ_MODE --env production --body "strict" >/dev/null 2>&1 || true

echo "🌡️ Warmup health surfaces"
curl -fsS "http://$PROD_HOST/healthz" | jq .
curl -fsS "http://$PROD_HOST/readyz"  | jq .

# ===== 2) ARM OBS + AUTONOMY (idempotent) =====
echo "🎛️ Enabling traces & autonomy"
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -c "
insert into feature_flags_v2(key,scope,value) values
('obs.otelEnabled','global',true),
('agents.autonomousEnabled','global',true),
('autonomy.emergencyStop','global',false),
('autonomy.mode','global','FULL')
on conflict (key,scope) do update set value=excluded.value;"

# ===== 3) GOLDEN PATH + SMOKE + VERIFY =====
echo "🟢 Golden path"
npm run golden:path

echo "🚬 Smoke tests"
npm run smoke:test

echo "✅ Deployment verification"
npm run verify:deployment

# ===== 4) EVIDENCE + POSTURE =====
echo "📦 Evidence (auditor-ready)"
npm run green:posture

echo "🎉 LAUNCH COMPLETE — strict /readyz:"
curl -fsS "http://$PROD_HOST/readyz" | jq .
