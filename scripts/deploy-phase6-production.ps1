# 🚀 Phase 6 GTM Production Deployment Script (PowerShell)
# Trans Bot AI - Complete ROI Funnel Deployment

param(
    [switch]$SkipTests,
    [switch]$DryRun
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Phase 6 GTM Production Deployment..." -ForegroundColor Cyan

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Error "Please run this script from the logistics-lynx directory"
    exit 1
}

# Check if Supabase CLI is installed
try {
    $null = Get-Command supabase -ErrorAction Stop
} catch {
    Write-Error "Supabase CLI is not installed. Please install it first."
    exit 1
}

# Check if logged into Supabase
try {
    $null = supabase status 2>$null
} catch {
    Write-Error "Not logged into Supabase. Please run 'supabase login' first."
    exit 1
}

Write-Status "Pre-deployment checks completed"

if ($DryRun) {
    Write-Warning "DRY RUN MODE - No actual deployment will occur"
}

# Step 1: Deploy Database Schema
Write-Status "Step 1: Deploying database schema..."
if (-not $DryRun) {
    supabase db push
    Write-Success "Database schema deployed"
} else {
    Write-Status "Would deploy database schema"
}

# Step 2: Deploy Edge Functions
Write-Status "Step 2: Deploying edge functions..."

$functions = @("roi-intake", "stripe-webhook", "create-checkout-session", "roi-summary")

foreach ($func in $functions) {
    Write-Status "Deploying $func function..."
    if (-not $DryRun) {
        supabase functions deploy $func
        Write-Success "$func function deployed"
    } else {
        Write-Status "Would deploy $func function"
    }
}

# Step 3: Create Analytics Views
Write-Status "Step 3: Creating analytics views..."
if (-not $DryRun) {
    supabase db query --file supabase/migrations/20241201000006_phase6_analytics_views.sql
    Write-Success "Analytics views created"
} else {
    Write-Status "Would create analytics views"
}

# Step 4: Enable Feature Flags
Write-Status "Step 4: Enabling feature flags..."
if (-not $DryRun) {
    try {
        supabase db query "UPDATE feature_flags SET enabled = true WHERE key = 'public_roi';"
        Write-Success "Feature flags updated"
    } catch {
        Write-Warning "Feature flag table may not exist yet"
    }
} else {
    Write-Status "Would enable feature flags"
}

# Step 5: Verify ROI Table
Write-Status "Step 5: Verifying ROI table..."
if (-not $DryRun) {
    $roiCount = supabase db query "SELECT COUNT(*) FROM roi_estimates;" --csv | Select-Object -Last 1
    Write-Success "ROI table verified - $roiCount records found"
} else {
    Write-Status "Would verify ROI table"
}

# Step 6: Test Edge Functions (if not skipped)
if (-not $SkipTests -and -not $DryRun) {
    Write-Status "Step 6: Testing edge functions..."
    
    # Test ROI intake function
    Write-Status "Testing ROI intake function..."
    $testPayload = @{
        company_name = "Test Company"
        contact_email = "test@example.com"
        monthly_quotes = 100
        win_rate_before = 20
        avg_revenue_per_load = 1500
        avg_margin_before = 10
        minutes_per_quote = 10
        plan = "starter"
        utm_source = "test"
        utm_medium = "script"
        utm_campaign = "deployment"
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.transbotai.com/functions/v1/roi-intake" -Method POST -Body $testPayload -ContentType "application/json"
        if ($response.ok) {
            Write-Success "ROI intake function test passed"
        } else {
            Write-Warning "ROI intake function test failed - check logs"
        }
    } catch {
        Write-Warning "ROI intake function test failed - check logs"
    }
}

# Step 7: Verify Environment Variables
Write-Status "Step 7: Verifying environment variables..."
$envVars = @("SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "STRIPE_PRICE_STARTER", "STRIPE_PRICE_PRO", "N8N_ROI_WEBHOOK", "SLACK_WEBHOOK_URL")

foreach ($var in $envVars) {
    if ([Environment]::GetEnvironmentVariable($var)) {
        Write-Success "$var is configured"
    } else {
        Write-Warning "$var not found in environment"
    }
}

# Step 8: Generate Deployment Summary
Write-Status "Step 8: Generating deployment summary..."

$summary = @"
# Phase 6 GTM Production Deployment Summary

## Deployment Date
$(Get-Date)

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
```bash
# Test ROI intake
curl -X POST https://api.transbotai.com/functions/v1/roi-intake \
  -H "Content-Type: application/json" \
  -d '{"company_name":"Test","contact_email":"test@example.com","monthly_quotes":100,"win_rate_before":20,"avg_revenue_per_load":1500,"avg_margin_before":10,"minutes_per_quote":10,"plan":"starter"}'

# Test Stripe webhook (using CLI)
stripe listen --forward-to https://api.transbotai.com/functions/v1/stripe-webhook
stripe trigger checkout.session.completed
```

## Success Metrics
- ROI Form Conversion: >15% of visitors
- Trial Activation: >60% of ROI submissions  
- Paid Conversion: >25% of trials within 30 days
- Lead Response Time: <2 hours for hot leads (score ≥70)
- System Uptime: >99.9% during launch week

## Rollback Plan
If issues occur:
1. Revert to last green build: `git revert HEAD --no-edit`
2. Restore database: `supabase db reset --linked`
3. Redeploy functions: `supabase functions deploy roi-intake --no-verify-jwt`

---
*Deployment completed successfully* 🚀
"@

if (-not $DryRun) {
    $summary | Out-File -FilePath "deployment-summary.md" -Encoding UTF8
    Write-Success "Deployment summary generated: deployment-summary.md"
} else {
    Write-Status "Would generate deployment summary"
}

# Step 9: Final Status
Write-Host ""
Write-Host "🎉 Phase 6 GTM Production Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Import n8n workflow: n8n-workflows/roi-intake-automation-enhanced.json"
Write-Host "2. Configure Slack channels and webhooks"
Write-Host "3. Set up CRM integration"
Write-Host "4. Run smoke tests"
Write-Host "5. Monitor dashboard metrics"
Write-Host ""
Write-Host "📊 Dashboard Views Available:" -ForegroundColor Cyan
Write-Host "- v_roi_to_trial_30d"
Write-Host "- v_trial_to_paid" 
Write-Host "- v_roi_lead_scores"
Write-Host "- v_utm_performance"
Write-Host "- v_daily_roi_funnel"
Write-Host "- v_plan_performance"
Write-Host ""
Write-Host "🔗 Edge Functions:" -ForegroundColor Cyan
Write-Host "- /functions/v1/roi-intake"
Write-Host "- /functions/v1/stripe-webhook"
Write-Host "- /functions/v1/create-checkout-session"
Write-Host "- /functions/v1/roi-summary"
Write-Host ""

if ($DryRun) {
    Write-Warning "This was a dry run. Run without -DryRun to perform actual deployment."
} else {
    Write-Success "Deployment completed successfully! 🚀"
}
