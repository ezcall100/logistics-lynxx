#!/bin/bash

# Autonomous Deployment Verification Script
# Verifies all systems are operational after deployment

set -e

echo "🔍 Verifying autonomous deployment..."

# Check database connectivity
echo "📊 Checking database connectivity..."
if ! psql "$SUPABASE_DB_URL" -c "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ Database connectivity failed"
    exit 1
fi

# Check feature flags
echo "🚩 Checking feature flags..."
AUTONOMY_MODE=$(psql "$SUPABASE_DB_URL" -t -c "SELECT value FROM feature_flags_v2 WHERE key='autonomy.mode' AND scope='global';" | xargs)
EMERGENCY_STOP=$(psql "$SUPABASE_DB_URL" -t -c "SELECT value FROM feature_flags_v2 WHERE key='autonomy.emergencyStop' AND scope='global';" | xargs)

if [ "$AUTONOMY_MODE" != "FULL" ]; then
    echo "❌ Autonomy mode not set to FULL: $AUTONOMY_MODE"
    exit 1
fi

if [ "$EMERGENCY_STOP" != "false" ]; then
    echo "❌ Emergency stop is active: $EMERGENCY_STOP"
    exit 1
fi

# Check portal accessibility
echo "🌐 Checking portal accessibility..."
PORTALS=(
    "superAdmin" "admin" "tmsAdmin" "onboarding" "broker" 
    "shipper" "carrier" "driver" "ownerOperator" "factoring"
    "loadBoard" "crm" "financials" "edi" "marketplace"
    "analytics" "autonomous" "workers" "rates" "directory"
)

for portal in "${PORTALS[@]}"; do
    ENABLED=$(psql "$SUPABASE_DB_URL" -t -c "SELECT value FROM feature_flags_v2 WHERE key='portal.$portal.enabled' AND scope='global';" | xargs)
    if [ "$ENABLED" != "true" ]; then
        echo "❌ Portal $portal not enabled: $ENABLED"
        exit 1
    fi
done

# Check autonomous agents
echo "🤖 Checking autonomous agents..."
AGENTS_ENABLED=$(psql "$SUPABASE_DB_URL" -t -c "SELECT value FROM feature_flags_v2 WHERE key='agents.autonomousEnabled' AND scope='global';" | xargs)
if [ "$AGENTS_ENABLED" != "true" ]; then
    echo "❌ Autonomous agents not enabled: $AGENTS_ENABLED"
    exit 1
fi

# Check observability
echo "📈 Checking observability..."
OTEL_ENABLED=$(psql "$SUPABASE_DB_URL" -t -c "SELECT value FROM feature_flags_v2 WHERE key='obs.otelEnabled' AND scope='global';" | xargs)
if [ "$OTEL_ENABLED" != "true" ]; then
    echo "❌ OpenTelemetry not enabled: $OTEL_ENABLED"
    exit 1
fi

# Check budget rails
echo "💰 Checking budget rails..."
BUDGET_BATCH=$(psql "$SUPABASE_DB_URL" -t -c "SELECT value FROM feature_flags_v2 WHERE key='budget.replay.maxBatch' AND scope='global';" | xargs)
if [ "$BUDGET_BATCH" != "50" ]; then
    echo "❌ Budget batch size incorrect: $BUDGET_BATCH"
    exit 1
fi

echo "✅ All systems operational - Autonomous deployment verified successfully!"
echo "🚀 Full authority mode: ACTIVE"
echo "🤖 20 portals: ENABLED"
echo "📊 Observability: ACTIVE"
echo "💰 Budget rails: ACTIVE"
