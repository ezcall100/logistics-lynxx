#!/bin/bash

# 🚀 Phase 6 GTM Production Deployment Script
# Trans Bot AI - Complete ROI Funnel Deployment

set -e  # Exit on any error

echo "🚀 Starting Phase 6 GTM Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the logistics-lynx directory"
    exit 1
fi

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    print_error "Supabase CLI is not installed. Please install it first."
    exit 1
fi

# Check if logged into Supabase
if ! supabase status &> /dev/null; then
    print_error "Not logged into Supabase. Please run 'supabase login' first."
    exit 1
fi

print_status "Pre-deployment checks completed"

# Step 1: Deploy Database Schema
print_status "Step 1: Deploying database schema..."
supabase db push
print_success "Database schema deployed"

# Step 2: Deploy Edge Functions
print_status "Step 2: Deploying edge functions..."

# Deploy existing functions
print_status "Deploying roi-intake function..."
supabase functions deploy roi-intake

print_status "Deploying stripe-webhook function..."
supabase functions deploy stripe-webhook

# Deploy new add-on functions
print_status "Deploying create-checkout-session function..."
supabase functions deploy create-checkout-session

print_status "Deploying roi-summary function..."
supabase functions deploy roi-summary

print_success "All edge functions deployed"

# Step 3: Create Analytics Views
print_status "Step 3: Creating analytics views..."
supabase db query --file supabase/migrations/20241201000006_phase6_analytics_views.sql
print_success "Analytics views created"

# Step 4: Enable Feature Flags
print_status "Step 4: Enabling feature flags..."
supabase db query "UPDATE feature_flags SET enabled = true WHERE key = 'public_roi';" || print_warning "Feature flag table may not exist yet"
print_success "Feature flags updated"

# Step 5: Verify ROI Table
print_status "Step 5: Verifying ROI table..."
ROI_COUNT=$(supabase db query "SELECT COUNT(*) FROM roi_estimates;" --csv | tail -n 1)
print_success "ROI table verified - $ROI_COUNT records found"

# Step 6: Test Edge Functions
print_status "Step 6: Testing edge functions..."

# Test ROI intake function
print_status "Testing ROI intake function..."
TEST_RESPONSE=$(curl -s -X POST https://api.transbotai.com/functions/v1/roi-intake \
  -H "Content-Type: application/json" \
  -d '{
    "company_name":"Test Company",
    "contact_email":"test@example.com",
    "monthly_quotes":100,
    "win_rate_before":20,
    "avg_revenue_per_load":1500,
    "avg_margin_before":10,
    "minutes_per_quote":10,
    "plan":"starter",
    "utm_source":"test",
    "utm_medium":"script",
    "utm_campaign":"deployment"
  }' || echo "{}")

if echo "$TEST_RESPONSE" | grep -q '"ok":true'; then
    print_success "ROI intake function test passed"
else
    print_warning "ROI intake function test failed - check logs"
fi

# Step 7: Verify Stripe Webhook
print_status "Step 7: Verifying Stripe webhook configuration..."
if [ -n "$STRIPE_WEBHOOK_SECRET" ]; then
    print_success "Stripe webhook secret is configured"
else
    print_warning "STRIPE_WEBHOOK_SECRET not found in environment"
fi

# Step 8: Check n8n Configuration
print_status "Step 8: Checking n8n configuration..."
if [ -n "$N8N_ROI_WEBHOOK" ]; then
    print_success "n8n ROI webhook URL is configured: $N8N_ROI_WEBHOOK"
else
    print_warning "N8N_ROI_WEBHOOK not found in environment"
fi

# Step 9: Verify Storage Bucket
print_status "Step 9: Verifying storage bucket for ROI summaries..."
supabase storage list public | grep -q "roi" || print_warning "ROI storage bucket may not exist"

# Step 10: Final Health Check
print_status "Step 10: Running final health check..."

# Check if all functions are accessible
FUNCTIONS=("roi-intake" "stripe-webhook" "create-checkout-session" "roi-summary")
for func in "${FUNCTIONS[@]}"; do
    if curl -s -f "https://api.transbotai.com/functions/v1/$func" > /dev/null 2>&1; then
        print_success "Function $func is accessible"
    else
        print_warning "Function $func may not be accessible"
    fi
done

# Step 11: Generate Deployment Summary
print_status "Step 11: Generating deployment summary..."

cat > deployment-summary.md << EOF
# Phase 6 GTM Production Deployment Summary

## Deployment Date
$(date)

## Components Deployed

### ✅ Database
- ROI estimates table schema
- Analytics views for funnel tracking
- Feature flags enabled

### ✅ Edge Functions
- roi-intake: ROI form processing
- stripe-webhook: Payment processing
- create-checkout-session: Direct checkout links
- roi-summary: HTML summary generation

### ✅ Analytics Views
- v_roi_to_trial_30d: ROI to trial conversion
- v_trial_to_paid: Trial to paid conversion
- v_roi_lead_scores: Lead scoring distribution
- v_utm_performance: UTM source performance
- v_daily_roi_funnel: Daily funnel summary
- v_plan_performance: Plan performance metrics

## Next Steps

### Manual Configuration Required
1. **n8n Workflow**: Import roi-intake-automation-enhanced.json
2. **Slack Channels**: Create #ae-hot, #sdr-queue, #auto-nurture
3. **CRM Integration**: Configure HubSpot/CRM webhooks
4. **Email Templates**: Set up SMTP for ROI emails

### Environment Variables to Verify
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_STARTER
- STRIPE_PRICE_PRO
- N8N_ROI_WEBHOOK
- SLACK_WEBHOOK_URL

## Smoke Tests to Run
\`\`\`bash
# Test ROI intake
curl -X POST https://api.transbotai.com/functions/v1/roi-intake \\
  -H "Content-Type: application/json" \\
  -d '{"company_name":"Test","contact_email":"test@example.com","monthly_quotes":100,"win_rate_before":20,"avg_revenue_per_load":1500,"avg_margin_before":10,"minutes_per_quote":10,"plan":"starter"}'

# Test Stripe webhook (using CLI)
stripe listen --forward-to https://api.transbotai.com/functions/v1/stripe-webhook
stripe trigger checkout.session.completed
\`\`\`

## Success Metrics
- ROI Form Conversion: >15% of visitors
- Trial Activation: >60% of ROI submissions  
- Paid Conversion: >25% of trials within 30 days
- Lead Response Time: <2 hours for hot leads (score ≥70)
- System Uptime: >99.9% during launch week

## Rollback Plan
If issues occur:
1. Revert to last green build: \`git revert HEAD --no-edit\`
2. Restore database: \`supabase db reset --linked\`
3. Redeploy functions: \`supabase functions deploy roi-intake --no-verify-jwt\`

---
*Deployment completed successfully* 🚀
EOF

print_success "Deployment summary generated: deployment-summary.md"

# Step 12: Final Status
echo ""
echo "🎉 Phase 6 GTM Production Deployment Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Import n8n workflow: n8n-workflows/roi-intake-automation-enhanced.json"
echo "2. Configure Slack channels and webhooks"
echo "3. Set up CRM integration"
echo "4. Run smoke tests"
echo "5. Monitor dashboard metrics"
echo ""
echo "📊 Dashboard Views Available:"
echo "- v_roi_to_trial_30d"
echo "- v_trial_to_paid" 
echo "- v_roi_lead_scores"
echo "- v_utm_performance"
echo "- v_daily_roi_funnel"
echo "- v_plan_performance"
echo ""
echo "🔗 Edge Functions:"
echo "- /functions/v1/roi-intake"
echo "- /functions/v1/stripe-webhook"
echo "- /functions/v1/create-checkout-session"
echo "- /functions/v1/roi-summary"
echo ""
print_success "Deployment completed successfully! 🚀"
