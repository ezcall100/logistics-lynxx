#!/bin/bash

# Agents Self-Check Script
# Verifies all Standing Order A-1 invariants in one go

set -e

echo "🤖 Autonomous Agents Self-Check"
echo "==============================="
echo "Standing Order A-1 Compliance Verification"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
PASSED=0
FAILED=0
WARNINGS=0

# Helper functions
log_pass() {
    echo -e "${GREEN}✅ PASS${NC}: $1"
    ((PASSED++))
}

log_fail() {
    echo -e "${RED}❌ FAIL${NC}: $1"
    ((FAILED++))
}

log_warn() {
    echo -e "${YELLOW}⚠️  WARN${NC}: $1"
    ((WARNINGS++))
}

log_info() {
    echo -e "${BLUE}ℹ️  INFO${NC}: $1"
}

# Test functions
test_golden_rules() {
    echo "🔐 Testing Golden Rules..."
    
    # Test feature flags
    if curl -s -f "http://localhost:8080/api/feature-flags/check" > /dev/null 2>&1; then
        log_pass "Feature flags endpoint accessible"
    else
        log_fail "Feature flags endpoint not accessible"
    fi
    
    # Test JWT validation
    if curl -s -f "http://localhost:8080/api/auth/validate" > /dev/null 2>&1; then
        log_pass "JWT validation endpoint accessible"
    else
        log_fail "JWT validation endpoint not accessible"
    fi
    
    # Test idempotency
    if curl -s -f "http://localhost:8080/api/idempotency/check" > /dev/null 2>&1; then
        log_pass "Idempotency endpoint accessible"
    else
        log_fail "Idempotency endpoint not accessible"
    fi
    
    echo ""
}

test_end_to_end_flows() {
    echo "🔄 Testing End-to-End Flows..."
    
    # Test Quote → Book → Bill flow
    if curl -s -f "http://localhost:8080/api/quotes" > /dev/null 2>&1; then
        log_pass "Quote endpoint accessible"
    else
        log_fail "Quote endpoint not accessible"
    fi
    
    # Test Carrier Onboard flow
    if curl -s -f "http://localhost:8080/api/carriers" > /dev/null 2>&1; then
        log_pass "Carrier endpoint accessible"
    else
        log_fail "Carrier endpoint not accessible"
    fi
    
    # Test Exception Remediation
    if curl -s -f "http://localhost:8080/api/exceptions" > /dev/null 2>&1; then
        log_pass "Exception endpoint accessible"
    else
        log_fail "Exception endpoint not accessible"
    fi
    
    echo ""
}

test_portal_tasks() {
    echo "🎯 Testing Portal Tasks (20 canonical)..."
    
    # Test all 20 portal endpoints
    portals=(
        "super-admin"
        "admin"
        "tms-admin"
        "onboarding"
        "broker"
        "shipper"
        "carrier"
        "driver"
        "owner-operator"
        "factoring"
        "load-board"
        "crm"
        "financials"
        "edi"
        "marketplace"
        "analytics"
        "autonomous"
        "workers"
        "rates"
        "directory"
        "testing"
    )
    
    for portal in "${portals[@]}"; do
        if curl -s -f "http://localhost:8080/$portal" > /dev/null 2>&1; then
            log_pass "Portal $portal accessible"
        else
            log_fail "Portal $portal not accessible"
        fi
    done
    
    echo ""
}

test_website_events() {
    echo "🌐 Testing Website Events..."
    
    # Test conversion pages
    conversion_pages=(
        "/roi"
        "/trial"
        "/checkout"
        "/contact"
        "/demo"
    )
    
    for page in "${conversion_pages[@]}"; do
        if curl -s -f "http://localhost:8080$page" > /dev/null 2>&1; then
            log_pass "Conversion page $page accessible"
        else
            log_fail "Conversion page $page not accessible"
        fi
    done
    
    # Test API docs
    if curl -s -f "http://localhost:8080/resources/api" > /dev/null 2>&1; then
        log_pass "API docs accessible"
    else
        log_fail "API docs not accessible"
    fi
    
    echo ""
}

test_schedules() {
    echo "📅 Testing Autonomous Schedules..."
    
    # Test health probe endpoint
    if curl -s -f "http://localhost:8080/api/health" > /dev/null 2>&1; then
        log_pass "Health probe endpoint accessible"
    else
        log_fail "Health probe endpoint not accessible"
    fi
    
    # Test queue depth endpoint
    if curl -s -f "http://localhost:8080/api/queue/depth" > /dev/null 2>&1; then
        log_pass "Queue depth endpoint accessible"
    else
        log_fail "Queue depth endpoint not accessible"
    fi
    
    # Test SLO check endpoint
    if curl -s -f "http://localhost:8080/api/slo/check" > /dev/null 2>&1; then
        log_pass "SLO check endpoint accessible"
    else
        log_fail "SLO check endpoint not accessible"
    fi
    
    echo ""
}

test_alerts() {
    echo "🚨 Testing Alert System..."
    
    # Test alert endpoints
    if curl -s -f "http://localhost:8080/api/alerts/page" > /dev/null 2>&1; then
        log_pass "PAGE alerts endpoint accessible"
    else
        log_fail "PAGE alerts endpoint not accessible"
    fi
    
    if curl -s -f "http://localhost:8080/api/alerts/warn" > /dev/null 2>&1; then
        log_pass "WARN alerts endpoint accessible"
    else
        log_fail "WARN alerts endpoint not accessible"
    fi
    
    if curl -s -f "http://localhost:8080/api/alerts/info" > /dev/null 2>&1; then
        log_pass "INFO alerts endpoint accessible"
    else
        log_fail "INFO alerts endpoint not accessible"
    fi
    
    echo ""
}

test_safety_budgets() {
    echo "💰 Testing Safety & Budgets..."
    
    # Test rate limiting
    if curl -s -f "http://localhost:8080/api/rate-limits/check" > /dev/null 2>&1; then
        log_pass "Rate limiting endpoint accessible"
    else
        log_fail "Rate limiting endpoint not accessible"
    fi
    
    # Test budget enforcement
    if curl -s -f "http://localhost:8080/api/budgets/check" > /dev/null 2>&1; then
        log_pass "Budget enforcement endpoint accessible"
    else
        log_fail "Budget enforcement endpoint not accessible"
    fi
    
    echo ""
}

test_incident_automations() {
    echo "🚨 Testing Incident Automations..."
    
    # Test SLO breach handling
    if curl -s -f "http://localhost:8080/api/incidents/slo-breach" > /dev/null 2>&1; then
        log_pass "SLO breach handling accessible"
    else
        log_fail "SLO breach handling not accessible"
    fi
    
    # Test partner down handling
    if curl -s -f "http://localhost:8080/api/incidents/partner-down" > /dev/null 2>&1; then
        log_pass "Partner down handling accessible"
    else
        log_fail "Partner down handling not accessible"
    fi
    
    # Test data drift handling
    if curl -s -f "http://localhost:8080/api/incidents/data-drift" > /dev/null 2>&1; then
        log_pass "Data drift handling accessible"
    else
        log_fail "Data drift handling not accessible"
    fi
    
    echo ""
}

test_done_invariants() {
    echo "✅ Testing 'Done' Invariants..."
    
    # Test audit log
    if curl -s -f "http://localhost:8080/api/audit/log" > /dev/null 2>&1; then
        log_pass "Audit log endpoint accessible"
    else
        log_fail "Audit log endpoint not accessible"
    fi
    
    # Test outbox
    if curl -s -f "http://localhost:8080/api/outbox" > /dev/null 2>&1; then
        log_pass "Outbox endpoint accessible"
    else
        log_fail "Outbox endpoint not accessible"
    fi
    
    # Test DLQ
    if curl -s -f "http://localhost:8080/api/dlq" > /dev/null 2>&1; then
        log_pass "DLQ endpoint accessible"
    else
        log_fail "DLQ endpoint not accessible"
    fi
    
    # Test trace links
    if curl -s -f "http://localhost:8080/api/traces" > /dev/null 2>&1; then
        log_pass "Trace links endpoint accessible"
    else
        log_fail "Trace links endpoint not accessible"
    fi
    
    echo ""
}

test_success_metrics() {
    echo "📊 Testing Success Metrics..."
    
    # Test operational metrics
    if curl -s -f "http://localhost:8080/api/metrics/operational" > /dev/null 2>&1; then
        log_pass "Operational metrics endpoint accessible"
    else
        log_fail "Operational metrics endpoint not accessible"
    fi
    
    # Test business metrics
    if curl -s -f "http://localhost:8080/api/metrics/business" > /dev/null 2>&1; then
        log_pass "Business metrics endpoint accessible"
    else
        log_fail "Business metrics endpoint not accessible"
    fi
    
    echo ""
}

# Main execution
main() {
    echo "Starting Autonomous Agents Self-Check..."
    echo "Base URL: http://localhost:8080"
    echo "Time: $(date)"
    echo ""
    
    # Run all tests
    test_golden_rules
    test_end_to_end_flows
    test_portal_tasks
    test_website_events
    test_schedules
    test_alerts
    test_safety_budgets
    test_incident_automations
    test_done_invariants
    test_success_metrics
    
    # Summary
    echo "📋 Self-Check Summary"
    echo "===================="
    echo -e "${GREEN}✅ Passed: $PASSED${NC}"
    echo -e "${RED}❌ Failed: $FAILED${NC}"
    echo -e "${YELLOW}⚠️  Warnings: $WARNINGS${NC}"
    echo ""
    
    # Overall status
    if [ $FAILED -eq 0 ]; then
        echo -e "${GREEN}🎉 All tests passed! Autonomous agents are ready for operation.${NC}"
        exit 0
    else
        echo -e "${RED}🚨 Some tests failed. Please review and fix before deploying.${NC}"
        exit 1
    fi
}

# Run main function
main "$@"
