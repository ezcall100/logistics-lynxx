#!/usr/bin/env bash
set -euo pipefail

# This script exports URL variables to avoid GitHub Actions extension linting issues
# It uses environment variables passed from the workflow instead of direct vars.* references

# Default values
STAGING_URL="${STAGING_URL:-http://localhost:8080}"
PRODUCTION_URL="${PRODUCTION_URL:-http://localhost:8080}"
STAGING_WEBHOOK_URL="${STAGING_WEBHOOK_URL:-http://localhost:8080/webhook}"
PRODUCTION_WEBHOOK_URL="${PRODUCTION_WEBHOOK_URL:-http://localhost:8080/webhook}"
STAGING_HEALTH_CHECK_URL="${STAGING_HEALTH_CHECK_URL:-http://localhost:8080/health}"
PRODUCTION_HEALTH_CHECK_URL="${PRODUCTION_HEALTH_CHECK_URL:-http://localhost:8080/health}"

# Export all URL variables
{
  echo "STAGING_URL=$STAGING_URL"
  echo "PRODUCTION_URL=$PRODUCTION_URL"
  echo "STAGING_WEBHOOK_URL=$STAGING_WEBHOOK_URL"
  echo "PRODUCTION_WEBHOOK_URL=$PRODUCTION_WEBHOOK_URL"
  echo "STAGING_HEALTH_CHECK_URL=$STAGING_HEALTH_CHECK_URL"
  echo "PRODUCTION_HEALTH_CHECK_URL=$PRODUCTION_HEALTH_CHECK_URL"
} >> "$GITHUB_ENV"

echo "✅ URL variables exported successfully"
