#!/bin/bash

# Go Live Script - Full Authority Autonomous System Activation
# Activates all 20 portals + 50-page website + real-time updates + self-healing

set -e

echo "🚀 GOING LIVE - Full Authority Autonomous System Activation"
echo "🌐 20 portals + 50-page website + real-time updates + self-healing"
echo ""

# Check required environment variables
if [ -z "$SUPABASE_DB_URL" ]; then
    echo "❌ SUPABASE_DB_URL environment variable is required"
    exit 1
fi

# Step 1: Deploy RBAC & feature flags
echo "📋 Step 1: Deploying RBAC & feature flags..."
psql "$SUPABASE_DB_URL" -f ./rbac.sql
psql "$SUPABASE_DB_URL" -f ./switchboard.sql
echo "✅ RBAC & feature flags deployed"

# Step 2: Bootstrap users (if not already done)
echo "📋 Step 2: Bootstrapping users..."
if [ -f "./scripts/bootstrap-users.sh" ]; then
    bash ./scripts/bootstrap-users.sh
    echo "✅ Users bootstrapped"
else
    echo "⚠️  User bootstrap script not found - skipping"
fi

# Step 3: Deploy Supabase functions
echo "📋 Step 3: Deploying Supabase functions..."
supabase functions deploy _shared
supabase functions deploy agent-runner
supabase functions deploy dlq-admin
echo "✅ Supabase functions deployed"

# Step 4: Verify deployment
echo "📋 Step 4: Verifying deployment..."
if [ -f "./scripts/verify-deployment.sh" ]; then
    bash ./scripts/verify-deployment.sh
    echo "✅ Deployment verified"
else
    echo "⚠️  Deployment verification script not found - skipping"
fi

# Step 5: Enable full autonomy
echo "📋 Step 5: Enabling full autonomy..."
psql "$SUPABASE_DB_URL" -c "update feature_flags_v2 set value='FULL' where key='autonomy.mode' and scope='global';"
psql "$SUPABASE_DB_URL" -c "update feature_flags_v2 set value=false where key='autonomy.emergencyStop' and scope='global';"
echo "✅ Full autonomy enabled"

# Step 6: Verify system status
echo "📋 Step 6: Verifying system status..."
psql "$SUPABASE_DB_URL" -c "
    SELECT 
        key,
        value,
        scope
    FROM feature_flags_v2 
    WHERE key IN ('autonomy.mode', 'autonomy.emergencyStop', 'agents.autonomousEnabled')
    ORDER BY key;
"

# Step 7: Start autonomous system
echo "📋 Step 7: Starting autonomous system..."
echo "🤖 Starting Full Authority Autonomous System..."
npm run start:autonomous &
AUTONOMOUS_PID=$!

# Wait a moment for system to start
sleep 5

# Check if system is running
if kill -0 $AUTONOMOUS_PID 2>/dev/null; then
    echo "✅ Autonomous system started successfully (PID: $AUTONOMOUS_PID)"
else
    echo "❌ Failed to start autonomous system"
    exit 1
fi

echo ""
echo "🎉 FULL AUTHORITY AUTONOMOUS SYSTEM IS NOW LIVE!"
echo ""
echo "🌐 System Status:"
echo "   • 20 portals: ENABLED"
echo "   • 50-page website: BUILDING"
echo "   • Real-time updates: ACTIVE"
echo "   • Self-healing: ACTIVE"
echo "   • Emergency stop: DISABLED"
echo "   • Full autonomy: ENABLED"
echo ""
echo "🤖 Autonomous Operations:"
echo "   • Portal health monitoring: ACTIVE"
echo "   • Website building: ACTIVE"
echo "   • Real-time updates: ACTIVE"
echo "   • Self-healing: ACTIVE"
echo "   • Emergency monitoring: ACTIVE"
echo ""
echo "📊 Monitoring:"
echo "   • Live Feed: Available in UI"
echo "   • Metrics Bar: Real-time updates"
echo "   • Slack notifications: Active"
echo "   • Emergency stop: scripts/emergency-stop.sh"
echo ""
echo "🚨 Emergency Stop (if needed):"
echo "   bash scripts/emergency-stop.sh"
echo ""
echo "📈 Next Steps:"
echo "   1. Monitor Live Feed for real-time updates"
echo "   2. Check portal health in autonomous dashboard"
echo "   3. Verify website building progress"
echo "   4. Test emergency stop functionality"
echo "   5. Monitor Slack for notifications"
echo ""
echo "🎯 The system is now running 24/7 with full autonomy!"
echo "   No human intervention required - agents own the loop."
