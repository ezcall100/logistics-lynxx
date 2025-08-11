#!/usr/bin/env bash
set -euo pipefail

WEBHOOK_URL="${WEBHOOK_URL:-}"
WEBHOOK_SECRET="${WEBHOOK_SECRET:-}"
PAYLOAD="${1:-payload.json}"

if [[ -z "${WEBHOOK_URL}" || -z "${WEBHOOK_SECRET}" ]]; then
  echo "Usage: WEBHOOK_URL=... WEBHOOK_SECRET=... ./replay.sh [payload.json]" >&2
  exit 2
fi

idem="local-$(uuidgen 2>/dev/null || echo $RANDOM)"
sig="$(openssl dgst -sha256 -hmac "$WEBHOOK_SECRET" -binary "$PAYLOAD" | base64)"

curl -fsS --retry 5 --retry-all-errors --max-time 20 \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: $idem" \
  -H "X-Signature-256: sha256=$sig" \
  --data-binary @"$PAYLOAD" \
  "$WEBHOOK_URL"
echo "OK"
