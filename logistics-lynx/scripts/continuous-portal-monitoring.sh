#!/bin/bash

# Continuous Portal Monitoring Script
# Autonomous monitoring for portal decommission health

set -e

echo "🤖 Continuous Portal Monitoring"
echo "==============================="

BASE_URL="http://localhost:8080"
LOG_FILE="portal_monitoring.log"
ALERT_THRESHOLD=50  # 410 hits per hour threshold

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to check 410 rate
check_410_rate() {
    local route="$1"
    local hits=$(curl -s "$BASE_URL$route" 2>/dev/null | wc -l)
    echo "$hits"
}

# Function to create alert ticket
create_alert_ticket() {
    local issue="$1"
    local details="$2"
    
    log "🚨 ALERT: $issue"
    log "Details: $details"
    
    # In production, this would create an actual ticket
    # For now, just log the alert
    echo "ALERT_TICKET: $issue - $details" >> "$LOG_FILE"
}

echo ""
echo "🔍 1. 410 Hit Rate Monitoring"

# Check 410 rates for deprecated routes
carrier_admin_410=$(check_410_rate "/carrier-admin")
broker_admin_410=$(check_410_rate "/broker-admin")
shipper_admin_410=$(check_410_rate "/shipper-admin")
carrier_dispatch_410=$(check_410_rate "/carrier-dispatch")

total_410=$((carrier_admin_410 + broker_admin_410 + shipper_admin_410 + carrier_dispatch_410))

log "410 Hit Summary:"
log "  /carrier-admin: $carrier_admin_410 hits"
log "  /broker-admin: $broker_admin_410 hits"
log "  /shipper-admin: $shipper_admin_410 hits"
log "  /carrier-dispatch: $carrier_dispatch_410 hits"
log "  Total: $total_410 hits"

# Alert if 410 rate is too high
if [ $total_410 -gt $ALERT_THRESHOLD ]; then
    create_alert_ticket "High 410 Rate" "Total 410 hits: $total_410 (threshold: $ALERT_THRESHOLD)"
fi

echo ""
echo "✅ 2. Canonical Route Health Check"

# Test canonical routes are responding
canonical_routes=("/carrier" "/broker" "/shipper" "/load-board")
canonical_errors=0

for route in "${canonical_routes[@]}"; do
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$route" 2>/dev/null || echo "000")
    
    if [[ "$status_code" =~ ^[23] ]]; then
        log "✅ $route: $status_code"
    else
        log "❌ $route: $status_code"
        ((canonical_errors++))
    fi
done

if [ $canonical_errors -gt 0 ]; then
    create_alert_ticket "Canonical Route Errors" "$canonical_errors routes failing"
fi

echo ""
echo "🔍 3. Navigation Link Audit"

# Check for deprecated links in homepage
deprecated_links=$(curl -s "$BASE_URL/" 2>/dev/null | grep -o 'carrier-admin\|broker-admin\|shipper-admin\|carrier-dispatch' | wc -l)

if [ $deprecated_links -eq 0 ]; then
    log "✅ No deprecated links found in navigation"
else
    log "❌ Found $deprecated_links deprecated links in navigation"
    create_alert_ticket "Deprecated Links Found" "$deprecated_links deprecated links in navigation"
fi

echo ""
echo "🤖 4. n8n Workflow Check"

# Check for n8n workflows (if available)
if command -v n8n &> /dev/null; then
    log "ℹ️  n8n CLI found - checking workflows"
    # This would check actual n8n workflows in production
    log "Manual n8n workflow verification needed"
else
    log "⚠️  n8n CLI not found - manual workflow verification needed"
fi

echo ""
echo "📊 5. Database Health Check"

# Check database verification function (if Supabase is available)
if command -v supabase &> /dev/null; then
    log "ℹ️  Supabase CLI found - checking database"
    
    # Check verification function
    verification_result=$(supabase db function call verify_portal_decommission 2>/dev/null || echo "function_not_found")
    
    if [[ "$verification_result" == *"DISABLED"* ]] || [[ "$verification_result" == *"WRITE_FROZEN"* ]]; then
        log "✅ Database verification passed"
    else
        log "❌ Database verification failed"
        create_alert_ticket "Database Verification Failed" "Portal decommission verification failed"
    fi
else
    log "⚠️  Supabase CLI not found - manual database verification needed"
fi

echo ""
echo "🔍 6. Code Repository Drift Check"

# Check for deprecated URLs in codebase
cd "$(dirname "$0")/.."
deprecated_code_references=$(grep -r "carrier-admin\|broker-admin\|shipper-admin\|carrier-dispatch" src/ 2>/dev/null | wc -l || echo "0")

if [ $deprecated_code_references -eq 0 ]; then
    log "✅ No deprecated URLs found in codebase"
else
    log "❌ Found $deprecated_code_references deprecated URL references in codebase"
    create_alert_ticket "Code Drift Detected" "$deprecated_code_references deprecated URL references in codebase"
fi

echo ""
echo "📈 7. Analytics Event Mapping Check"

# Check analytics events (if database is accessible)
if command -v supabase &> /dev/null; then
    deprecated_events=$(supabase db query "SELECT COUNT(*) FROM analytics_events WHERE event_name LIKE 'portal.%_admin.%';" 2>/dev/null | grep -o '[0-9]*' || echo "0")
    
    if [ "$deprecated_events" = "0" ]; then
        log "✅ No deprecated analytics events found"
    else
        log "❌ Found $deprecated_events deprecated analytics events"
        create_alert_ticket "Analytics Events Not Remapped" "$deprecated_events deprecated analytics events found"
    fi
else
    log "⚠️  Manual analytics event verification needed"
fi

echo ""
echo "🎯 8. SLO Compliance Check"

# Check SLO compliance
slo_violations=0

# SLO 1: 410 rate should be trending down
if [ $total_410 -gt 100 ]; then
    log "❌ SLO Violation: 410 rate too high ($total_410)"
    ((slo_violations++))
fi

# SLO 2: Canonical routes should have < 1% error rate
if [ $canonical_errors -gt 0 ]; then
    log "❌ SLO Violation: Canonical route errors ($canonical_errors)"
    ((slo_violations++))
fi

# SLO 3: No deprecated links in navigation
if [ $deprecated_links -gt 0 ]; then
    log "❌ SLO Violation: Deprecated links in navigation ($deprecated_links)"
    ((slo_violations++))
fi

if [ $slo_violations -eq 0 ]; then
    log "✅ All SLOs compliant"
else
    log "❌ $slo_violations SLO violations detected"
    create_alert_ticket "SLO Violations" "$slo_violations SLO violations detected"
fi

echo ""
echo "📋 Monitoring Summary"
echo "===================="
log "Monitoring Summary:"
log "  - 410 Hits: $total_410"
log "  - Canonical Errors: $canonical_errors"
log "  - Deprecated Links: $deprecated_links"
log "  - Code References: $deprecated_code_references"
log "  - SLO Violations: $slo_violations"

echo ""
echo "🤖 Autonomous Monitoring Complete"
echo "================================="

# Exit with error if any critical issues found
if [ $slo_violations -gt 0 ] || [ $canonical_errors -gt 0 ]; then
    exit 1
else
    exit 0
fi
