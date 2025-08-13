#!/bin/bash

# 🔍 Phase 6 GTM Deployment Verification Script
# Comprehensive testing of all deployed components

set -e

echo "🔍 Starting Phase 6 GTM Deployment Verification..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[PASS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[FAIL]${NC} $1"
}

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run test and count results
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    print_status "Running: $test_name"
    
    if eval "$test_command" > /dev/null 2>&1; then
        print_success "$test_name"
        ((TESTS_PASSED++))
    else
        print_error "$test_name"
        ((TESTS_FAILED++))
    fi
}

echo "=== Database Tests ==="

# Test 1: ROI table exists
run_test "ROI table exists" "supabase db query 'SELECT COUNT(*) FROM roi_estimates;'"

# Test 2: Analytics views exist
run_test "Analytics views exist" "supabase db query 'SELECT * FROM v_roi_to_trial_30d LIMIT 1;'"

# Test 3: Feature flag enabled
run_test "Feature flag enabled" "supabase db query 'SELECT enabled FROM feature_flags WHERE key = \"public_roi\";'"

echo "=== Edge Function Tests ==="

# Test 4: ROI intake function
run_test "ROI intake function accessible" "curl -s -f https://api.transbotai.com/functions/v1/roi-intake"

# Test 5: Stripe webhook function
run_test "Stripe webhook function accessible" "curl -s -f https://api.transbotai.com/functions/v1/stripe-webhook"

# Test 6: Create checkout session function
run_test "Create checkout session function accessible" "curl -s -f https://api.transbotai.com/functions/v1/create-checkout-session"

# Test 7: ROI summary function
run_test "ROI summary function accessible" "curl -s -f https://api.transbotai.com/functions/v1/roi-summary"

echo "=== Functionality Tests ==="

# Test 8: ROI intake submission
print_status "Testing ROI intake submission..."
TEST_RESPONSE=$(curl -s -X POST https://api.transbotai.com/functions/v1/roi-intake \
  -H "Content-Type: application/json" \
  -d '{
    "company_name":"Verification Test Co",
    "contact_email":"verify@test.com",
    "monthly_quotes":150,
    "win_rate_before":25,
    "avg_revenue_per_load":2000,
    "avg_margin_before":15,
    "minutes_per_quote":12,
    "plan":"pro",
    "utm_source":"verification",
    "utm_medium":"script",
    "utm_campaign":"test"
  }' || echo "{}")

if echo "$TEST_RESPONSE" | grep -q '"ok":true'; then
    print_success "ROI intake submission test"
    ((TESTS_PASSED++))
    
    # Extract ROI ID for further tests
    ROI_ID=$(echo "$TEST_RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "Generated ROI ID: $ROI_ID"
else
    print_error "ROI intake submission test"
    ((TESTS_FAILED++))
fi

# Test 9: ROI summary generation (if ROI ID exists)
if [ -n "$ROI_ID" ]; then
    print_status "Testing ROI summary generation..."
    SUMMARY_RESPONSE=$(curl -s -X POST https://api.transbotai.com/functions/v1/roi-summary \
      -H "Content-Type: application/json" \
      -d "{
        \"id\": \"$ROI_ID\",
        \"company_name\": \"Verification Test Co\",
        \"calc\": {
          \"monthlyImpact\": 5000,
          \"incrGP\": 3000,
          \"hrsSaved\": 20,
          \"paybackDays\": 45
        }
      }" || echo "{}")
    
    if echo "$SUMMARY_RESPONSE" | grep -q '"url"'; then
        print_success "ROI summary generation test"
        ((TESTS_PASSED++))
    else
        print_error "ROI summary generation test"
        ((TESTS_FAILED++))
    fi
fi

# Test 10: Checkout session creation
print_status "Testing checkout session creation..."
CHECKOUT_RESPONSE=$(curl -s -X POST https://api.transbotai.com/functions/v1/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "email": "verify@test.com",
    "plan": "pro",
    "return_url": "https://app.transbotai.com"
  }' || echo "{}")

if echo "$CHECKOUT_RESPONSE" | grep -q '"url"'; then
    print_success "Checkout session creation test"
    ((TESTS_PASSED++))
else
    print_error "Checkout session creation test"
    ((TESTS_FAILED++))
fi

echo "=== Environment Tests ==="

# Test 11: Environment variables
run_test "SUPABASE_URL configured" "[ -n \"\$SUPABASE_URL\" ]"
run_test "SUPABASE_SERVICE_ROLE_KEY configured" "[ -n \"\$SUPABASE_SERVICE_ROLE_KEY\" ]"
run_test "STRIPE_SECRET_KEY configured" "[ -n \"\$STRIPE_SECRET_KEY\" ]"
run_test "STRIPE_WEBHOOK_SECRET configured" "[ -n \"\$STRIPE_WEBHOOK_SECRET\" ]"

echo "=== Integration Tests ==="

# Test 12: n8n webhook URL
if [ -n "$N8N_ROI_WEBHOOK" ]; then
    print_status "Testing n8n webhook connectivity..."
    if curl -s -f "$N8N_ROI_WEBHOOK" > /dev/null 2>&1; then
        print_success "n8n webhook connectivity"
        ((TESTS_PASSED++))
    else
        print_warning "n8n webhook connectivity (may be expected if workflow not active)"
        ((TESTS_FAILED++))
    fi
else
    print_warning "N8N_ROI_WEBHOOK not configured"
fi

# Test 13: Slack webhook URL
if [ -n "$SLACK_WEBHOOK_URL" ]; then
    print_status "Testing Slack webhook connectivity..."
    if curl -s -f "$SLACK_WEBHOOK_URL" > /dev/null 2>&1; then
        print_success "Slack webhook connectivity"
        ((TESTS_PASSED++))
    else
        print_warning "Slack webhook connectivity (may be expected if channel not configured)"
        ((TESTS_FAILED++))
    fi
else
    print_warning "SLACK_WEBHOOK_URL not configured"
fi

echo "=== Performance Tests ==="

# Test 14: Response time for ROI intake
print_status "Testing ROI intake response time..."
START_TIME=$(date +%s%N)
curl -s -X POST https://api.transbotai.com/functions/v1/roi-intake \
  -H "Content-Type: application/json" \
  -d '{"company_name":"Perf Test","contact_email":"perf@test.com","monthly_quotes":100,"win_rate_before":20,"avg_revenue_per_load":1500,"avg_margin_before":10,"minutes_per_quote":10,"plan":"starter"}' > /dev/null
END_TIME=$(date +%s%N)
RESPONSE_TIME=$(( (END_TIME - START_TIME) / 1000000 ))

if [ $RESPONSE_TIME -lt 5000 ]; then
    print_success "ROI intake response time: ${RESPONSE_TIME}ms"
    ((TESTS_PASSED++))
else
    print_warning "ROI intake response time: ${RESPONSE_TIME}ms (slow)"
    ((TESTS_FAILED++))
fi

echo "=== Summary ==="
echo ""
echo "📊 Test Results:"
echo "✅ Tests Passed: $TESTS_PASSED"
echo "❌ Tests Failed: $TESTS_FAILED"
echo "📈 Success Rate: $(( (TESTS_PASSED * 100) / (TESTS_PASSED + TESTS_FAILED) ))%"

if [ $TESTS_FAILED -eq 0 ]; then
    echo ""
    echo "🎉 All tests passed! Phase 6 GTM deployment is ready for production."
    echo ""
    echo "🚀 Next Steps:"
    echo "1. Import n8n workflow: n8n-workflows/roi-intake-automation-enhanced.json"
    echo "2. Configure Slack channels (#ae-hot, #sdr-queue, #auto-nurture)"
    echo "3. Set up CRM integration"
    echo "4. Monitor dashboard metrics"
    echo "5. Run end-to-end user journey test"
    exit 0
else
    echo ""
    echo "⚠️  Some tests failed. Please review the issues above before going live."
    echo ""
    echo "🔧 Common Issues:"
    echo "- Check environment variables are set correctly"
    echo "- Verify Supabase project is linked"
    echo "- Ensure edge functions are deployed"
    echo "- Check n8n and Slack webhook configurations"
    exit 1
fi
