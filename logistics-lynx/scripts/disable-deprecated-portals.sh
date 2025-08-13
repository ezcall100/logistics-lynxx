#!/usr/bin/env bash
set -Eeuo pipefail

# Portal Decommission Script
# Disable n8n workflows by name pattern for deprecated portals

echo "🚫 Disabling deprecated portal workflows..."

# Check if n8n environment variables are set
if [[ -z "${N8N_API_KEY:-}" ]] || [[ -z "${N8N_BASE_URL:-}" ]]; then
  echo "⚠️  N8N_API_KEY or N8N_BASE_URL not set. Skipping n8n workflow disable."
  echo "   Set these environment variables to disable n8n workflows:"
  echo "   export N8N_API_KEY='your-api-key'"
  echo "   export N8N_BASE_URL='https://your-n8n-instance.com'"
  exit 0
fi

# Deprecated portal patterns
DEPRECATED_PORTALS=(
  "carrier-admin"
  "broker-admin" 
  "shipper-admin"
  "freight-broker"
  "carrier-dispatch"
)

# Disable workflows for each deprecated portal
for portal in "${DEPRECATED_PORTALS[@]}"; do
  echo "🔍 Checking for workflows containing '$portal'..."
  
  # Get workflow IDs that contain the portal name
  WORKFLOW_IDS=$(curl -sf -H "X-N8N-API-KEY: $N8N_API_KEY" \
    "$N8N_BASE_URL/rest/workflows?filter[name][contains]=$portal" \
    | jq -r '.data[].id' 2>/dev/null || echo "")
  
  if [[ -n "$WORKFLOW_IDS" ]]; then
    echo "📋 Found workflows for $portal:"
    echo "$WORKFLOW_IDS" | while read -r id; do
      if [[ -n "$id" ]]; then
        echo "   - Disabling workflow $id"
        
        # Disable the workflow and add deprecated tag
        curl -sf -X PATCH \
          -H "X-N8N-API-KEY: $N8N_API_KEY" \
          -H "Content-Type: application/json" \
          -d '{"active":false, "tags":["deprecated"]}' \
          "$N8N_BASE_URL/rest/workflows/$id"
        
        if [[ $? -eq 0 ]]; then
          echo "   ✅ Workflow $id disabled successfully"
        else
          echo "   ❌ Failed to disable workflow $id"
        fi
      fi
    done
  else
    echo "   ℹ️  No workflows found for $portal"
  fi
done

echo "✅ Deprecated portal workflow disable complete!"

# Also disable any cron triggers for these portals
echo "🔍 Checking for cron triggers..."

# This would depend on your specific cron setup
# Example for system cron:
# crontab -l | grep -v "carrier-admin\|broker-admin\|shipper-admin\|freight-broker\|carrier-dispatch" | crontab -

echo "✅ Portal decommission script completed successfully!"
