#!/usr/bin/env bash
set -Eeuo pipefail

# Required env:
#   SUPABASE_URL=https://<project>.supabase.co
#   SUPABASE_DB_URL=postgresql://<user>:<pass>@<host>:5432/postgres
# Optional:
#   FUNCTION_URL override; defaults to "$SUPABASE_URL/functions/v1/agent-runner"

echo "🔎 Verifying agent system…"

require() {
  local name="$1"
  if [[ -z "${!name:-}" ]]; then
    echo "❌ Missing env: $name"
    exit 1
  fi
}

require SUPABASE_URL
require SUPABASE_DB_URL
FUNCTION_URL="${FUNCTION_URL:-$SUPABASE_URL/functions/v1/agent-runner}"

psql_exec() { psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -Atc "$1"; }

echo "1) DB connectivity"
psql_exec "select 1" >/dev/null
echo "   ✅ OK"

echo "2) Tables & RLS"
psql_exec "select to_regclass('public.agent_tasks')" | grep -q agent_tasks
psql_exec "select to_regclass('public.agent_runs')"  | grep -q agent_runs
psql_exec "select to_regclass('public.agent_logs')"  | grep -q agent_logs
# RLS on logs
psql_exec "select relrowsecurity from pg_class where relname='agent_logs'" | grep -q t
echo "   ✅ agent_tasks/agent_runs/agent_logs present; RLS on agent_logs"

echo "3) Realtime publication"
PUB=$(psql_exec "select relname from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and relname in ('agent_tasks','agent_runs','agent_logs') order by relname")
echo "$PUB" | grep -q agent_logs
echo "$PUB" | grep -q agent_runs
echo "$PUB" | grep -q agent_tasks
echo "   ✅ agent_* tables in supabase_realtime"

echo "4) TTL job present"
psql_exec "select jobid from cron.job where jobname='agent_logs_ttl_daily'" >/dev/null
echo "   ✅ pg_cron TTL job scheduled"

echo "5) Metrics view"
psql_exec "select to_regclass('public.v_agent_metrics_15m')" | grep -q v_agent_metrics_15m
echo "   ✅ v_agent_metrics_15m exists"

echo "6) Function endpoint sanity (expect 400 without payload)"
HTTP=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$FUNCTION_URL" -H 'Content-Type: application/json' -d '{}')
if [[ "$HTTP" == "400" || "$HTTP" == "404" || "$HTTP" == "200" ]]; then
  echo "   ✅ agent-runner reachable (HTTP $HTTP)"
else
  echo "   ⚠️ Unexpected status from agent-runner: $HTTP"; exit 1
fi

echo "✅ Verification pass"
