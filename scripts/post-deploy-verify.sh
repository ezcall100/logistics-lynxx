#!/usr/bin/env bash
set -Eeuo pipefail

# Post-Deploy Verification Script
# Verifies all critical functionality after deployment

echo "🔍 Starting post-deploy verification..."

# Configuration
BASE_URL="${BASE_URL:-http://localhost:8080}"
SUPABASE_URL="${SUPABASE_URL:-http://localhost:54321}"
SLACK_WEBHOOK="${SLACK_WEBHOOK:-}"
STRIPE_WEBHOOK_SECRET="${STRIPE_WEBHOOK_SECRET:-whsec_test}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# 1. ROI Form Validation Tests
echo "📋 Testing ROI form validation..."

# Test bad email (should return 400)
ROI_BAD_EMAIL_RESPONSE=$(curl -s -w "%{http_code}" -X POST "${BASE_URL}/api/roi-intake" \
  -H "Content-Type: application/json" \
  -d '{"email": "invalid-email", "company": "Test Corp"}' \
  -o /dev/null)

if [[ "$ROI_BAD_EMAIL_RESPONSE" == "400" ]]; then
    log_success "ROI bad email validation: PASSED (400)"
    ((TESTS_PASSED++))
else
    log_error "ROI bad email validation: FAILED (got $ROI_BAD_EMAIL_RESPONSE, expected 400)"
    ((TESTS_FAILED++))
fi

# Test rate limiting (should return 429 after 10 requests)
echo "Testing ROI rate limiting..."
for i in {1..11}; do
    RATE_LIMIT_RESPONSE=$(curl -s -w "%{http_code}" -X POST "${BASE_URL}/api/roi-intake" \
      -H "Content-Type: application/json" \
      -d "{\"email\": \"test$i@example.com\", \"company\": \"Test Corp $i\"}" \
      -o /dev/null)
    
    if [[ $i -eq 11 && "$RATE_LIMIT_RESPONSE" == "429" ]]; then
        log_success "ROI rate limiting: PASSED (429 on 11th request)"
        ((TESTS_PASSED++))
        break
    elif [[ $i -eq 11 ]]; then
        log_error "ROI rate limiting: FAILED (got $RATE_LIMIT_RESPONSE, expected 429)"
        ((TESTS_FAILED++))
    fi
done

# 2. Checkout Rate Limiting Tests
echo "💳 Testing checkout rate limiting..."

# Test rate limiting (should return 429 after 5 requests)
for i in {1..6}; do
    CHECKOUT_RATE_LIMIT_RESPONSE=$(curl -s -w "%{http_code}" -X POST "${BASE_URL}/api/checkout/create-session" \
      -H "Content-Type: application/json" \
      -d "{\"plan_id\": \"starter\", \"email\": \"test$i@example.com\"}" \
      -o /dev/null)
    
    if [[ $i -eq 6 && "$CHECKOUT_RATE_LIMIT_RESPONSE" == "429" ]]; then
        log_success "Checkout rate limiting: PASSED (429 on 6th request)"
        ((TESTS_PASSED++))
        break
    elif [[ $i -eq 6 ]]; then
        log_error "Checkout rate limiting: FAILED (got $CHECKOUT_RATE_LIMIT_RESPONSE, expected 429)"
        ((TESTS_FAILED++))
    fi
done

# 3. Stripe Webhook Idempotency Tests
echo "🔄 Testing Stripe webhook idempotency..."

# Create a test webhook event
TEST_EVENT_ID="evt_test_$(date +%s)"
TEST_EVENT_DATA='{
  "id": "'$TEST_EVENT_ID'",
  "object": "event",
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_123",
      "customer": "cus_test_123",
      "metadata": {
        "company_id": "00000000-0000-0000-0000-000000000001"
      }
    }
  }
}'

# First webhook call (should succeed)
STRIPE_FIRST_RESPONSE=$(curl -s -w "%{http_code}" -X POST "${BASE_URL}/api/stripe-webhook" \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: $(echo -n "$TEST_EVENT_DATA" | openssl dgst -sha256 -hmac "$STRIPE_WEBHOOK_SECRET" -binary | base64)" \
  -d "$TEST_EVENT_DATA" \
  -o /dev/null)

if [[ "$STRIPE_FIRST_RESPONSE" == "200" ]]; then
    log_success "Stripe webhook first call: PASSED (200)"
    ((TESTS_PASSED++))
else
    log_error "Stripe webhook first call: FAILED (got $STRIPE_FIRST_RESPONSE, expected 200)"
    ((TESTS_FAILED++))
fi

# Second webhook call with same event (should return 200 with duplicate message)
STRIPE_DUPLICATE_RESPONSE=$(curl -s -w "%{http_code}" -X POST "${BASE_URL}/api/stripe-webhook" \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: $(echo -n "$TEST_EVENT_DATA" | openssl dgst -sha256 -hmac "$STRIPE_WEBHOOK_SECRET" -binary | base64)" \
  -d "$TEST_EVENT_DATA")

if [[ "$STRIPE_DUPLICATE_RESPONSE" == "200" ]]; then
    log_success "Stripe webhook duplicate handling: PASSED (200)"
    ((TESTS_PASSED++))
else
    log_error "Stripe webhook duplicate handling: FAILED (got $STRIPE_DUPLICATE_RESPONSE, expected 200)"
    ((TESTS_FAILED++))
fi

# 4. CSP Header Tests
echo "🛡️ Testing Content Security Policy..."

# Test ROI page CSP
ROI_CSP_RESPONSE=$(curl -s -I "${BASE_URL}/roi" | grep -i "content-security-policy" || true)
if [[ -n "$ROI_CSP_RESPONSE" ]]; then
    log_success "ROI page CSP headers: PASSED"
    ((TESTS_PASSED++))
else
    log_error "ROI page CSP headers: FAILED (no CSP header found)"
    ((TESTS_FAILED++))
fi

# Test checkout page CSP
CHECKOUT_CSP_RESPONSE=$(curl -s -I "${BASE_URL}/checkout" | grep -i "content-security-policy" || true)
if [[ -n "$CHECKOUT_CSP_RESPONSE" ]]; then
    log_success "Checkout page CSP headers: PASSED"
    ((TESTS_PASSED++))
else
    log_error "Checkout page CSP headers: FAILED (no CSP header found)"
    ((TESTS_FAILED++))
fi

# 5. Database Connection Test
echo "🗄️ Testing database connection..."

DB_CONNECTION_RESPONSE=$(curl -s -w "%{http_code}" -X GET "${SUPABASE_URL}/rest/v1/health" \
  -H "apikey: ${SUPABASE_ANON_KEY:-test}" \
  -o /dev/null)

if [[ "$DB_CONNECTION_RESPONSE" == "200" ]]; then
    log_success "Database connection: PASSED (200)"
    ((TESTS_PASSED++))
else
    log_error "Database connection: FAILED (got $DB_CONNECTION_RESPONSE, expected 200)"
    ((TESTS_FAILED++))
fi

# 6. Feature Flag System Test
echo "🚩 Testing feature flag system..."

FEATURE_FLAG_RESPONSE=$(curl -s -w "%{http_code}" -X GET "${BASE_URL}/api/flags/rates" \
  -H "Content-Type: application/json" \
  -o /dev/null)

if [[ "$FEATURE_FLAG_RESPONSE" == "200" ]]; then
    log_success "Feature flag system: PASSED (200)"
    ((TESTS_PASSED++))
else
    log_error "Feature flag system: FAILED (got $FEATURE_FLAG_RESPONSE, expected 200)"
    ((TESTS_FAILED++))
fi

# 7. Agent System Test
echo "🤖 Testing agent system..."

AGENT_SYSTEM_RESPONSE=$(curl -s -w "%{http_code}" -X POST "${BASE_URL}/api/v1/agent/runner" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -o /dev/null)

if [[ "$AGENT_SYSTEM_RESPONSE" == "200" ]]; then
    log_success "Agent system: PASSED (200)"
    ((TESTS_PASSED++))
else
    log_error "Agent system: FAILED (got $AGENT_SYSTEM_RESPONSE, expected 200)"
    ((TESTS_FAILED++))
fi

# 8. Rate Quote API Test
echo "💰 Testing rate quote API..."

RATE_QUOTE_RESPONSE=$(curl -s -w "%{http_code}" -X POST "${BASE_URL}/api/v1/rate/quote" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": {"city": "Los Angeles", "state": "CA", "zip": "90210"},
    "destination": {"city": "New York", "state": "NY", "zip": "10001"},
    "equipment": "dry_van",
    "weight": 5000,
    "class": 70,
    "company_id": "00000000-0000-0000-0000-000000000001"
  }' \
  -o /dev/null)

if [[ "$RATE_QUOTE_RESPONSE" == "200" ]]; then
    log_success "Rate quote API: PASSED (200)"
    ((TESTS_PASSED++))
else
    log_error "Rate quote API: FAILED (got $RATE_QUOTE_RESPONSE, expected 200)"
    ((TESTS_FAILED++))
fi

# Summary
echo ""
echo "📊 Verification Summary:"
echo "========================"
echo "Tests Passed: $TESTS_PASSED"
echo "Tests Failed: $TESTS_FAILED"
echo "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"

if [[ $TESTS_FAILED -eq 0 ]]; then
    log_success "🎉 All tests passed! Deployment verification successful."
    
    # Send success notification to Slack if webhook is configured
    if [[ -n "$SLACK_WEBHOOK" ]]; then
        curl -s -X POST -H 'Content-type: application/json' \
          --data "{
            \"text\": \"✅ Post-deploy verification completed successfully!\",
            \"attachments\": [{
              \"fields\": [
                {\"title\": \"Tests Passed\", \"value\": \"$TESTS_PASSED\", \"short\": true},
                {\"title\": \"Tests Failed\", \"value\": \"$TESTS_FAILED\", \"short\": true},
                {\"title\": \"Environment\", \"value\": \"$ENVIRONMENT\", \"short\": true}
              ],
              \"color\": \"good\"
            }]
          }" "$SLACK_WEBHOOK"
    fi
    
    exit 0
else
    log_error "❌ Some tests failed! Please review the deployment."
    
    # Send failure notification to Slack if webhook is configured
    if [[ -n "$SLACK_WEBHOOK" ]]; then
        curl -s -X POST -H 'Content-type: application/json' \
          --data "{
            \"text\": \"❌ Post-deploy verification failed!\",
            \"attachments\": [{
              \"fields\": [
                {\"title\": \"Tests Passed\", \"value\": \"$TESTS_PASSED\", \"short\": true},
                {\"title\": \"Tests Failed\", \"value\": \"$TESTS_FAILED\", \"short\": true},
                {\"title\": \"Environment\", \"value\": \"$ENVIRONMENT\", \"short\": true}
              ],
              \"color\": \"danger\"
            }]
          }" "$SLACK_WEBHOOK"
    fi
    
    exit 1
fi
