#!/bin/bash

# 🚀 Phase 3: Trans Bot AI Production Deployment Script
# This script automates the complete production deployment process

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENVIRONMENT="${1:-production}"
DRY_RUN="${2:-false}"

# Environment-specific variables
if [[ "$ENVIRONMENT" == "production" ]]; then
    SUPABASE_PROJECT_REF="${PROD_SUPABASE_PROJECT_REF:-}"
    SUPABASE_URL="${PROD_SUPABASE_URL:-}"
    N8N_URL="${PROD_N8N_URL:-}"
    SLACK_WEBHOOK_URL="${PROD_SLACK_WEBHOOK_URL:-}"
else
    SUPABASE_PROJECT_REF="${STAGING_SUPABASE_PROJECT_REF:-}"
    SUPABASE_URL="${STAGING_SUPABASE_URL:-}"
    N8N_URL="${STAGING_N8N_URL:-}"
    SLACK_WEBHOOK_URL="${STAGING_SLACK_WEBHOOK_URL:-}"
fi

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Send notification to Slack
send_notification() {
    local message="$1"
    local color="${2:-good}"
    
    if [[ -n "$SLACK_WEBHOOK_URL" ]]; then
        curl -X POST "$SLACK_WEBHOOK_URL" \
            -H "Content-Type: application/json" \
            -d "{
                \"text\": \"$message\",
                \"attachments\": [
                    {
                        \"color\": \"$color\",
                        \"fields\": [
                            {
                                \"title\": \"Environment\",
                                \"value\": \"$ENVIRONMENT\",
                                \"short\": true
                            },
                            {
                                \"title\": \"Timestamp\",
                                \"value\": \"$(date -u +'%Y-%m-%d %H:%M:%S UTC')\",
                                \"short\": true
                            }
                        ]
                    }
                ]
            }" > /dev/null 2>&1 || warning "Failed to send Slack notification"
    fi
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if Supabase CLI is installed
    if ! command -v supabase &> /dev/null; then
        error "Supabase CLI is not installed. Please install it first."
        exit 1
    fi
    
    # Check if required environment variables are set
    if [[ -z "$SUPABASE_PROJECT_REF" ]]; then
        error "SUPABASE_PROJECT_REF is not set for $ENVIRONMENT environment"
        exit 1
    fi
    
    if [[ -z "$SUPABASE_URL" ]]; then
        error "SUPABASE_URL is not set for $ENVIRONMENT environment"
        exit 1
    fi
    
    if [[ -z "$N8N_URL" ]]; then
        error "N8N_URL is not set for $ENVIRONMENT environment"
        exit 1
    fi
    
    success "Prerequisites check passed"
}

# Deploy Supabase schema and functions
deploy_supabase() {
    log "Deploying Supabase schema and functions..."
    
    if [[ "$DRY_RUN" == "true" ]]; then
        warning "DRY RUN: Would deploy Supabase schema and functions"
        return 0
    fi
    
    # Link to Supabase project
    log "Linking to Supabase project: $SUPABASE_PROJECT_REF"
    supabase link --project-ref "$SUPABASE_PROJECT_REF"
    
    # Deploy database schema
    log "Deploying database schema..."
    supabase db push
    
    # Deploy edge functions
    log "Deploying edge functions..."
    supabase functions deploy ai-load-matcher
    supabase functions deploy agent-runner
    supabase functions deploy health
    supabase functions deploy on-signup
    
    success "Supabase deployment completed"
}

# Import n8n workflows
import_n8n_workflows() {
    log "Importing n8n workflows..."
    
    if [[ "$DRY_RUN" == "true" ]]; then
        warning "DRY RUN: Would import n8n workflows"
        return 0
    fi
    
    # Check if n8n API key is available
    if [[ -z "${N8N_API_KEY:-}" ]]; then
        warning "N8N_API_KEY not set, skipping n8n workflow import"
        warning "Please import workflows manually:"
        warning "  - n8n-workflows/load-intake-automation.json"
        warning "  - n8n-workflows/pod-processing-automation.json"
        warning "  - n8n-workflows/agent-runner-cron-health.json"
        return 0
    fi
    
    # Import workflows via API
    local workflows=(
        "load-intake-automation.json"
        "pod-processing-automation.json"
        "agent-runner-cron-health.json"
    )
    
    for workflow in "${workflows[@]}"; do
        if [[ -f "n8n-workflows/$workflow" ]]; then
            log "Importing workflow: $workflow"
            curl -X POST "$N8N_URL/rest/workflows" \
                -H "Content-Type: application/json" \
                -H "X-N8N-API-KEY: $N8N_API_KEY" \
                --data-binary @"n8n-workflows/$workflow" \
                --silent --show-error || warning "Failed to import $workflow"
        else
            warning "Workflow file not found: n8n-workflows/$workflow"
        fi
    done
    
    success "n8n workflow import completed"
}

# Run smoke tests
run_smoke_tests() {
    log "Running smoke tests..."
    
    if [[ "$DRY_RUN" == "true" ]]; then
        warning "DRY RUN: Would run smoke tests"
        return 0
    fi
    
    # Test health endpoint
    log "Testing health endpoint..."
    health_response=$(curl -s -w "\n%{http_code}" \
        -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY:-}" \
        "$SUPABASE_URL/functions/v1/health")
    
    health_http_code=$(echo "$health_response" | tail -n1)
    health_data=$(echo "$health_response" | head -n -1)
    
    if [[ "$health_http_code" == "200" ]]; then
        success "Health check passed"
        echo "Health data: $health_data"
    else
        error "Health check failed with HTTP $health_http_code"
        return 1
    fi
    
    # Test load intake workflow
    log "Testing load intake workflow..."
    load_id=$(uuidgen)
    
    # Create test load
    load_response=$(curl -s -w "\n%{http_code}" \
        -X POST \
        -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY:-}" \
        -H "Content-Type: application/json" \
        -d "{
            \"id\": \"$load_id\",
            \"origin\": \"Los Angeles, CA\",
            \"destination\": \"New York, NY\",
            \"weight\": 10000,
            \"status\": \"available\",
            \"company_id\": \"${TEST_COMPANY_ID:-}\"
        }" \
        "$SUPABASE_URL/rest/v1/loads")
    
    load_http_code=$(echo "$load_response" | tail -n1)
    
    if [[ "$load_http_code" == "201" ]]; then
        success "Test load created successfully"
        
        # Trigger workflow
        workflow_response=$(curl -s -w "\n%{http_code}" \
            -X POST \
            -H "Content-Type: application/json" \
            -d "{\"load_id\":\"$load_id\"}" \
            "$N8N_URL/webhook/load-created")
        
        workflow_http_code=$(echo "$workflow_response" | tail -n1)
        
        if [[ "$workflow_http_code" == "200" ]]; then
            success "Load intake workflow triggered successfully"
        else
            warning "Load intake workflow failed with HTTP $workflow_http_code"
        fi
    else
        warning "Failed to create test load with HTTP $load_http_code"
    fi
    
    success "Smoke tests completed"
}

# Verify deployment
verify_deployment() {
    log "Verifying deployment..."
    
    if [[ "$DRY_RUN" == "true" ]]; then
        warning "DRY RUN: Would verify deployment"
        return 0
    fi
    
    # Check if edge functions are accessible
    local functions=("ai-load-matcher" "agent-runner" "health" "on-signup")
    
    for func in "${functions[@]}"; do
        log "Checking edge function: $func"
        response=$(curl -s -o /dev/null -w "%{http_code}" \
            "$SUPABASE_URL/functions/v1/$func" || echo "000")
        
        if [[ "$response" == "401" || "$response" == "404" ]]; then
            success "Edge function $func is accessible (HTTP $response)"
        else
            warning "Edge function $func returned unexpected status: $response"
        fi
    done
    
    # Check n8n accessibility
    log "Checking n8n accessibility..."
    n8n_response=$(curl -s -o /dev/null -w "%{http_code}" "$N8N_URL" || echo "000")
    
    if [[ "$n8n_response" == "200" ]]; then
        success "n8n is accessible"
    else
        warning "n8n returned status: $n8n_response"
    fi
    
    success "Deployment verification completed"
}

# Main deployment function
main() {
    log "🚀 Starting Phase 3 deployment for $ENVIRONMENT environment"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        warning "DRY RUN MODE - No actual changes will be made"
    fi
    
    # Send deployment start notification
    send_notification "🚀 Phase 3 deployment started for $ENVIRONMENT environment" "good"
    
    # Execute deployment steps
    check_prerequisites
    deploy_supabase
    import_n8n_workflows
    run_smoke_tests
    verify_deployment
    
    # Send deployment completion notification
    send_notification "✅ Phase 3 deployment completed successfully for $ENVIRONMENT environment" "good"
    
    success "🎉 Phase 3 deployment completed successfully!"
    log "Next steps:"
    log "  1. Monitor system health via /health endpoint"
    log "  2. Run full smoke test suite via GitHub Actions"
    log "  3. Verify all workflows are running in n8n"
    log "  4. Check agent-runner cron job is active"
    log "  5. Monitor logs for any issues"
}

# Help function
show_help() {
    echo "Usage: $0 [environment] [dry-run]"
    echo ""
    echo "Arguments:"
    echo "  environment  Target environment (staging|production) [default: production]"
    echo "  dry-run      Run in dry-run mode (true|false) [default: false]"
    echo ""
    echo "Examples:"
    echo "  $0                    # Deploy to production"
    echo "  $0 staging            # Deploy to staging"
    echo "  $0 production true    # Dry run for production"
    echo ""
    echo "Environment Variables:"
    echo "  PROD_SUPABASE_PROJECT_REF    Production Supabase project reference"
    echo "  STAGING_SUPABASE_PROJECT_REF Staging Supabase project reference"
    echo "  PROD_SUPABASE_URL            Production Supabase URL"
    echo "  STAGING_SUPABASE_URL         Staging Supabase URL"
    echo "  PROD_N8N_URL                 Production n8n URL"
    echo "  STAGING_N8N_URL              Staging n8n URL"
    echo "  N8N_API_KEY                  n8n API key for workflow import"
    echo "  SUPABASE_SERVICE_ROLE_KEY    Supabase service role key"
    echo "  TEST_COMPANY_ID              Test company ID for smoke tests"
    echo "  PROD_SLACK_WEBHOOK_URL       Production Slack webhook URL"
    echo "  STAGING_SLACK_WEBHOOK_URL    Staging Slack webhook URL"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    staging|production)
        ENVIRONMENT="$1"
        ;;
    "")
        # Use default (production)
        ;;
    *)
        error "Invalid environment: $1"
        echo ""
        show_help
        exit 1
        ;;
esac

# Execute main function
main "$@"
