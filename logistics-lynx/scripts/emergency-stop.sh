#!/bin/bash

# Emergency Stop Script - BIG RED BUTTON
# Stops all autonomous actions immediately

set -e

echo "🚨 EMERGENCY STOP ACTIVATED"
echo "🛑 Stopping all autonomous actions..."

# Update emergency stop flag
psql "$SUPABASE_DB_URL" -c "
  update public.feature_flags_v2
  set value=true
  where key='autonomy.emergencyStop' and scope='global';
"

echo "✅ Emergency stop flag set to TRUE"
echo "🤖 All autonomous agents will halt on their next cycle"
echo "📊 Monitor agent_logs for confirmation"
echo ""
echo "To resume autonomous operations:"
echo "  psql \"\$SUPABASE_DB_URL\" -c \"update feature_flags_v2 set value=false where key='autonomy.emergencyStop' and scope='global';\""
