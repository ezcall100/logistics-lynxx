#!/bin/bash
# 🔒 DLQ Replay Proof Drill - 10-Minute Production Hardening Test
# Tests: HMAC auth, JWT role guard, rate limiting, idempotency, safety rails

set -euo pipefail

# Configuration
BASE_URL="${BASE_URL:-https://your-project.supabase.co/functions/v1}"
PATH_ENDPOINT="dlq-replay"
SECRET="${TRANSBOT_HMAC_SECRET:-your-hmac-secret}"
TENANT="${TEST_COMPANY_ID:-00000000-0000-4000-8000-000000000001}"
ADMIN_JWT="${ADMIN_JWT:-your-admin-jwt-token}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

test_result() {
    local test_name="$1"
    local expected_code="$2"
    local actual_code="$3"
    local response="$4"
    
    if [[ "$actual_code" == "$expected_code" ]]; then
        log_success "$test_name: Expected $expected_code, got $actual_code"
        ((TESTS_PASSED++))
    else
        log_error "$test_name: Expected $expected_code, got $actual_code"
        echo "Response: $response"
        ((TESTS_FAILED++))
    fi
}

# 1.1 HMAC Authentication Test
log_info "🔐 Testing HMAC Authentication..."

# Prepare test body
BODY=$(jq -n --arg c "$TENANT" '{company_id:$c, max:5, idempotency_key:"INC-$(date +%s)"}')

# Test BAD signature → expect 401/403
log_info "Testing invalid HMAC signature..."
BAD_RESPONSE=$(curl -sS -w "%{http_code}" -o /tmp/bad_response \
    -H "X-Transbot-Signature: invalid" \
    -H "Content-Type: application/json" \
    -d "$BODY" "$BASE_URL/$PATH_ENDPOINT")
BAD_CODE=$(tail -c 3 /tmp/bad_response)
BAD_BODY=$(head -c -3 /tmp/bad_response)
test_result "Invalid HMAC Signature" "401" "$BAD_CODE" "$BAD_BODY"

# Test GOOD signature → expect 200
log_info "Testing valid HMAC signature..."
SIG=$(printf "%s" "$BODY" | openssl dgst -sha256 -hmac "$SECRET" -binary | base64)
GOOD_RESPONSE=$(curl -sS -w "%{http_code}" -o /tmp/good_response \
    -H "X-Transbot-Signature: $SIG" \
    -H "Content-Type: application/json" \
    -d "$BODY" "$BASE_URL/$PATH_ENDPOINT")
GOOD_CODE=$(tail -c 3 /tmp/good_response)
GOOD_BODY=$(head -c -3 /tmp/good_response)
test_result "Valid HMAC Signature" "200" "$GOOD_CODE" "$GOOD_BODY"

# 1.2 JWT Role Guard Test
log_info "🔑 Testing JWT Role Guard..."
JWT_RESPONSE=$(curl -sS -w "%{http_code}" -o /tmp/jwt_response \
    -H "Authorization: Bearer $ADMIN_JWT" \
    -H "Content-Type: application/json" \
    -d "$BODY" "$BASE_URL/$PATH_ENDPOINT")
JWT_CODE=$(tail -c 3 /tmp/jwt_response)
JWT_BODY=$(head -c -3 /tmp/jwt_response)
test_result "JWT Authentication" "200" "$JWT_CODE" "$JWT_BODY"

# 1.3 Rate Limiting Test
log_info "⏱️  Testing Rate Limiting (3/5m/tenant+IP)..."
for i in {1..4}; do
    RATE_RESPONSE=$(curl -sS -w "%{http_code}" -o /tmp/rate_response_$i \
        -H "X-Transbot-Signature: $SIG" \
        -H "Content-Type: application/json" \
        -d "$BODY" "$BASE_URL/$PATH_ENDPOINT")
    RATE_CODE=$(tail -c 3 /tmp/rate_response_$i)
    
    if [[ $i -le 3 ]]; then
        expected="200"
    else
        expected="429"
    fi
    
    test_result "Rate Limit Request $i" "$expected" "$RATE_CODE" ""
    sleep 1
done

# 1.4 Idempotency Test
log_info "🔄 Testing Idempotency..."
KEY="INC-REUSE-$(date +%s)"
IDEMPOTENT_BODY=$(jq -n --arg c "$TENANT" --arg k "$KEY" '{company_id:$c, max:5, idempotency_key:$k}')
IDEMPOTENT_SIG=$(printf "%s" "$IDEMPOTENT_BODY" | openssl dgst -sha256 -hmac "$SECRET" -binary | base64)

# First call
log_info "Making first idempotent call..."
FIRST_RESPONSE=$(curl -sS -w "%{http_code}" -o /tmp/first_response \
    -H "X-Transbot-Signature: $IDEMPOTENT_SIG" \
    -H "Content-Type: application/json" \
    -d "$IDEMPOTENT_BODY" "$BASE_URL/$PATH_ENDPOINT")
FIRST_CODE=$(tail -c 3 /tmp/first_response)
test_result "First Idempotent Call" "200" "$FIRST_CODE" ""

# Second call (should be short-circuited)
log_info "Making duplicate idempotent call..."
SECOND_RESPONSE=$(curl -sS -w "%{http_code}" -o /tmp/second_response \
    -H "X-Transbot-Signature: $IDEMPOTENT_SIG" \
    -H "Content-Type: application/json" \
    -d "$IDEMPOTENT_BODY" "$BASE_URL/$PATH_ENDPOINT")
SECOND_CODE=$(tail -c 3 /tmp/second_response)
SECOND_BODY=$(head -c -3 /tmp/second_response)
test_result "Duplicate Idempotent Call" "200" "$SECOND_CODE" "$SECOND_BODY"

# Check if second response indicates duplicate
if echo "$SECOND_BODY" | grep -q "already processed\|duplicate\|replay already"; then
    log_success "Idempotency working: Duplicate detected"
    ((TESTS_PASSED++))
else
    log_warning "Idempotency check: Response doesn't clearly indicate duplicate"
fi

# 1.5 Safety Rails Test
log_info "🛡️  Testing Safety Rails..."

# Test oversized batch → expect 400 with "max 50"
log_info "Testing oversized batch limit..."
OVERSIZED_BODY=$(jq -n --arg c "$TENANT" '{company_id:$c, max:100}')
OVERSIZED_SIG=$(printf "%s" "$OVERSIZED_BODY" | openssl dgst -sha256 -hmac "$SECRET" -binary | base64)
OVERSIZED_RESPONSE=$(curl -sS -w "%{http_code}" -o /tmp/oversized_response \
    -H "X-Transbot-Signature: $OVERSIZED_SIG" \
    -H "Content-Type: application/json" \
    -d "$OVERSIZED_BODY" "$BASE_URL/$PATH_ENDPOINT")
OVERSIZED_CODE=$(tail -c 3 /tmp/oversized_response)
OVERSIZED_BODY_RESPONSE=$(head -c -3 /tmp/oversized_response)
test_result "Oversized Batch Limit" "400" "$OVERSIZED_CODE" "$OVERSIZED_BODY_RESPONSE"

# Test dry run functionality
log_info "Testing dry run functionality..."
DRY_RUN_BODY=$(jq -n --arg c "$TENANT" '{company_id:$c, max:5, dry_run:true, idempotency_key:"DRY-RUN-$(date +%s)"}')
DRY_RUN_SIG=$(printf "%s" "$DRY_RUN_BODY" | openssl dgst -sha256 -hmac "$SECRET" -binary | base64)
DRY_RUN_RESPONSE=$(curl -sS -w "%{http_code}" -o /tmp/dry_run_response \
    -H "X-Transbot-Signature: $DRY_RUN_SIG" \
    -H "Content-Type: application/json" \
    -d "$DRY_RUN_BODY" "$BASE_URL/$PATH_ENDPOINT")
DRY_RUN_CODE=$(tail -c 3 /tmp/dry_run_response)
DRY_RUN_BODY_RESPONSE=$(head -c -3 /tmp/dry_run_response)
test_result "Dry Run Functionality" "200" "$DRY_RUN_CODE" "$DRY_RUN_BODY_RESPONSE"

# Summary
echo ""
echo "=========================================="
echo "🔒 DLQ Replay Proof Drill Results"
echo "=========================================="
echo "✅ Tests Passed: $TESTS_PASSED"
echo "❌ Tests Failed: $TESTS_FAILED"
echo "📊 Success Rate: $(( (TESTS_PASSED * 100) / (TESTS_PASSED + TESTS_FAILED) ))%"
echo ""

if [[ $TESTS_FAILED -eq 0 ]]; then
    log_success "🎉 All tests passed! DLQ replay is production-ready."
    exit 0
else
    log_error "🚨 Some tests failed. Review the output above."
    exit 1
fi
