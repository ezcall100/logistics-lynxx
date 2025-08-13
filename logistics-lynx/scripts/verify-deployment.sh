#!/bin/bash

# Deployment Verification Script
# Runs after PR-001, PR-002, PR-003 are merged to verify the deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BASE_URL=${BASE_URL:-"http://localhost:8080"}
SUPABASE_URL=${SUPABASE_URL:-"https://your-project.supabase.co"}
SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY:-"your-anon-key"}
TEST_COMPANY_ID=${TEST_COMPANY_ID:-"00000000-0000-4000-8000-000000000001"}
SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL:-""}

echo -e "${BLUE}🚀 Starting deployment verification...${NC}"

# Function to send Slack notification
send_slack_notification() {
    local message="$1"
    local color="$2"
    
    if [ -n "$SLACK_WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"$message\",\"attachments\":[{\"color\":\"$color\",\"text\":\"Deployment verification completed\"}]}" \
            "$SLACK_WEBHOOK_URL"
    fi
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"

if ! command_exists k6; then
    echo -e "${RED}❌ k6 is not installed. Please install it first.${NC}"
    echo "Installation: https://k6.io/docs/getting-started/installation/"
    exit 1
fi

if ! command_exists curl; then
    echo -e "${RED}❌ curl is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Step 1: Basic connectivity test
echo -e "${BLUE}🔗 Testing basic connectivity...${NC}"

if curl -f -s "$BASE_URL" > /dev/null; then
    echo -e "${GREEN}✅ Application is reachable${NC}"
else
    echo -e "${RED}❌ Application is not reachable at $BASE_URL${NC}"
    send_slack_notification "🚨 Deployment verification failed: Application not reachable" "danger"
    exit 1
fi

# Step 2: Database connectivity test
echo -e "${BLUE}🗄️  Testing database connectivity...${NC}"

DB_RESPONSE=$(curl -s -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    "$SUPABASE_URL/rest/v1/agent_tasks?select=count&limit=1")

if echo "$DB_RESPONSE" | grep -q "count"; then
    echo -e "${GREEN}✅ Database is accessible${NC}"
else
    echo -e "${RED}❌ Database is not accessible${NC}"
    send_slack_notification "🚨 Deployment verification failed: Database not accessible" "danger"
    exit 1
fi

# Step 3: Check if outbox table exists
echo -e "${BLUE}📬 Checking outbox table...${NC}"

OUTBOX_RESPONSE=$(curl -s -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    "$SUPABASE_URL/rest/v1/event_outbox?select=count&limit=1")

if echo "$OUTBOX_RESPONSE" | grep -q "count"; then
    echo -e "${GREEN}✅ Event outbox table exists${NC}"
else
    echo -e "${RED}❌ Event outbox table not found${NC}"
    send_slack_notification "🚨 Deployment verification failed: Outbox table missing" "danger"
    exit 1
fi

# Step 4: Check if DLQ table exists
echo -e "${BLUE}📋 Checking DLQ table...${NC}"

DLQ_RESPONSE=$(curl -s -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    "$SUPABASE_URL/rest/v1/dead_letter_queue?select=count&limit=1")

if echo "$DLQ_RESPONSE" | grep -q "count"; then
    echo -e "${GREEN}✅ Dead letter queue table exists${NC}"
else
    echo -e "${RED}❌ Dead letter queue table not found${NC}"
    send_slack_notification "🚨 Deployment verification failed: DLQ table missing" "danger"
    exit 1
fi

# Step 5: Check if agent controls table exists
echo -e "${BLUE}🎛️  Checking agent controls table...${NC}"

CONTROLS_RESPONSE=$(curl -s -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    "$SUPABASE_URL/rest/v1/agent_controls?select=count&limit=1")

if echo "$CONTROLS_RESPONSE" | grep -q "count"; then
    echo -e "${GREEN}✅ Agent controls table exists${NC}"
else
    echo -e "${RED}❌ Agent controls table not found${NC}"
    send_slack_notification "🚨 Deployment verification failed: Agent controls table missing" "danger"
    exit 1
fi

# Step 6: Run k6 smoke test
echo -e "${BLUE}🧪 Running k6 smoke test...${NC}"

export TEST_OUTBOX=true
export TEST_DLQ=true
export TEST_AGENTS=true

k6 run \
    --env BASE_URL="$BASE_URL" \
    --env SUPABASE_URL="$SUPABASE_URL" \
    --env SUPABASE_ANON_KEY="$SUPABASE_ANON_KEY" \
    --env TEST_COMPANY_ID="$TEST_COMPANY_ID" \
    --env SLACK_WEBHOOK_URL="$SLACK_WEBHOOK_URL" \
    --env TEST_OUTBOX=true \
    --env TEST_DLQ=true \
    --env TEST_AGENTS=true \
    k6/smoke-enhanced.js

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ k6 smoke test passed${NC}"
else
    echo -e "${RED}❌ k6 smoke test failed${NC}"
    send_slack_notification "🚨 Deployment verification failed: k6 smoke test failed" "danger"
    exit 1
fi

# Step 7: Test outbox functionality
echo -e "${BLUE}📤 Testing outbox functionality...${NC}"

# Insert a test event
TEST_EVENT_RESPONSE=$(curl -s -X POST \
    -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=minimal" \
    -d "{
        \"company_id\": \"$TEST_COMPANY_ID\",
        \"event_type\": \"test\",
        \"topic\": \"deployment.verification\",
        \"payload\": {\"test\": true, \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"},
        \"idempotency_key\": \"deploy-verify-$(date +%s)\",
        \"target_system\": \"n8n\"
    }" \
    "$SUPABASE_URL/rest/v1/event_outbox")

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Test event inserted successfully${NC}"
    
    # Wait a moment for processing
    sleep 2
    
    # Check if event was processed
    PROCESSED_CHECK=$(curl -s -H "apikey: $SUPABASE_ANON_KEY" \
        -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
        "$SUPABASE_URL/rest/v1/event_outbox?select=processed_at&idempotency_key=eq.deploy-verify-$(date +%s)")
    
    if echo "$PROCESSED_CHECK" | grep -q "processed_at"; then
        echo -e "${GREEN}✅ Outbox processing is working${NC}"
    else
        echo -e "${YELLOW}⚠️  Outbox event not yet processed (this may be normal)${NC}"
    fi
else
    echo -e "${RED}❌ Failed to insert test event${NC}"
    send_slack_notification "🚨 Deployment verification failed: Outbox test failed" "danger"
    exit 1
fi

# Step 8: Test DLQ replay functionality
echo -e "${BLUE}🔄 Testing DLQ replay functionality...${NC}"

# Check if DLQ replay function is accessible
DLQ_REPLAY_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"company_id": "'$TEST_COMPANY_ID'"}' \
    "$SUPABASE_URL/functions/v1/dlq-replay")

if echo "$DLQ_REPLAY_RESPONSE" | grep -q "message"; then
    echo -e "${GREEN}✅ DLQ replay function is accessible${NC}"
else
    echo -e "${YELLOW}⚠️  DLQ replay function may not be deployed yet${NC}"
fi

# Step 9: Final health check
echo -e "${BLUE}🏥 Running final health check...${NC}"

# Check outbox lag
OUTBOX_LAG=$(curl -s -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    "$SUPABASE_URL/rest/v1/event_outbox?select=inserted_at&processed_at=is.null&order=inserted_at.asc&limit=1")

if [ -n "$OUTBOX_LAG" ] && [ "$OUTBOX_LAG" != "[]" ]; then
    echo -e "${YELLOW}⚠️  There are unprocessed outbox events${NC}"
else
    echo -e "${GREEN}✅ Outbox is processing events normally${NC}"
fi

# Check DLQ health
DLQ_HEALTH=$(curl -s -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    "$SUPABASE_URL/rest/v1/dead_letter_queue?select=count&retry_count=gte.5")

if echo "$DLQ_HEALTH" | grep -q "count.*[1-9]"; then
    echo -e "${YELLOW}⚠️  There are exhausted DLQ items${NC}"
else
    echo -e "${GREEN}✅ DLQ is healthy${NC}"
fi

# Success notification
echo -e "${GREEN}🎉 Deployment verification completed successfully!${NC}"
send_slack_notification "✅ Deployment verification completed successfully" "good"

echo -e "${BLUE}📊 Next steps:${NC}"
echo -e "  1. Monitor the observability dashboard"
echo -e "  2. Enable feature flags gradually"
echo -e "  3. Run the DLQ replay function if needed"
echo -e "  4. Set up alerting for the critical thresholds"

exit 0
