#!/usr/bin/env bash
set -euo pipefail

# Export environment secrets based on the environment name
# This script is called from the GitHub Actions workflow with secrets as arguments

env_name="${1:-}"
supabase_url="${2:-}"
service_key="${3:-}"
anon_key="${4:-}"
n8n_url="${5:-}"
slack_webhook="${6:-}"

if [[ -z "$env_name" || -z "$supabase_url" || -z "$service_key" || -z "$anon_key" ]]; then
  echo "Missing required args" >&2
  exit 1
fi

# Export to GITHUB_ENV so later steps see them as $VARS
{
  echo "ENVIRONMENT_NAME=$env_name"
  echo "SUPABASE_URL=$supabase_url"
  echo "SUPABASE_SERVICE_ROLE_KEY=$service_key"
  echo "SUPABASE_ANON_KEY=$anon_key"
  echo "N8N_URL=${n8n_url:-}"
  echo "SLACK_WEBHOOK_URL=${slack_webhook:-}"
} >> "$GITHUB_ENV"

echo "✅ Environment secrets exported for $env_name"
