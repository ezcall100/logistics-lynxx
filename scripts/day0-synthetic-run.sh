#!/usr/bin/env bash
set -Eeuo pipefail

# Usage:
#  SUPABASE_URL=... SUPABASE_DB_URL=... ./scripts/day0-synthetic-run.sh <COMPANY_ID> [ORIGIN] [DEST]
# Example:
#  SUPABASE_URL=... SUPABASE_DB_URL=... ./scripts/day0-synthetic-run.sh 00000000-0000-4000-8000-000000000001 CHI DAL

COMPANY_ID="${1:-}"
ORIGIN="${2:-CHI}"
DEST="${3:-DAL}"

if [[ -z "$COMPANY_ID" ]]; then
  echo "usage: ./scripts/day0-synthetic-run.sh <COMPANY_ID> [ORIGIN] [DEST]"
  exit 1
fi
: "${SUPABASE_URL:?SUPABASE_URL required}"
: "${SUPABASE_DB_URL:?SUPABASE_DB_URL required}"

FUNCTION_URL="${FUNCTION_URL:-$SUPABASE_URL/functions/v1/agent-runner}"

psql_exec() { psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -Atc "$1"; }

echo "🧪 Enqueuing synthetic task for company $COMPANY_ID ($ORIGIN → $DEST)…"
TASK_ID=$(
  psql_exec "insert into public.agent_tasks (company_id, fn_name, payload, status)
             values ('$COMPANY_ID','rates.price_one', json_build_object('origin','$ORIGIN','dest','$DEST')::jsonb, 'queued')
             returning id;"
)
echo "   → task_id = $TASK_ID"

echo "🚀 Invoking agent-runner…"
curl -s -X POST "$FUNCTION_URL" \
  -H "Content-Type: application/json" \
  -d "{\"task_id\":\"$TASK_ID\"}" | sed -e 's/^/   /'

echo "⏳ Waiting for completion (up to 60s)…"
DEADLINE=$(( $(date +%s) + 60 ))
STATUS=""
while [[ $(date +%s) -lt $DEADLINE ]]; do
  ROW=$(psql_exec "select coalesce(status,''), coalesce(error,''), coalesce(result::text,'') from public.agent_tasks where id='$TASK_ID'")
  STATUS="$(echo "$ROW" | cut -d'|' -f1)"
  ERR="$(echo "$ROW" | cut -d'|' -f2)"
  RES="$(echo "$ROW" | cut -d'|' -f3)"
  if [[ "$STATUS" == "done" ]]; then
    echo "✅ DONE: $RES"; exit 0
  fi
  if [[ "$STATUS" == "failed" ]]; then
    echo "❌ FAILED: $ERR"; exit 2
  fi
  sleep 2
done

echo "⚠️ Timeout waiting for task to complete (last status: $STATUS)"
exit 3
