#!/usr/bin/env bash
set -Eeuo pipefail

echo "== PR-105 verification =="
: "${OTEL_EXPORTER_OTLP_ENDPOINT:?OTEL endpoint required}"
: "${SUPABASE_URL:?}"
: "${SUPABASE_SERVICE_ROLE_KEY:?}"

echo "[1/4] Trigger synthetic task to generate spans"
curl -sS -X POST "$SUPABASE_URL/functions/v1/agent-runner" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task_id":"00000000-0000-4000-8000-000000000099"}' || true

echo "[2/4] Open your OTEL backend and search for service.name=transbot-ai within last 2m"
echo "      Also expect client spans: service.name=transbot-ai-web (if browser open)."

echo "[3/4] Check flag gating"
echo "      If traces not appearing, ensure feature flag obs.otelEnabled is true for env."

echo "[4/4] (Optional) Send a minimal OTLP smoke request (if backend accepts unauth)"
echo "      Skipping generic payload; many vendors require auth/header formats."
echo "Done."
