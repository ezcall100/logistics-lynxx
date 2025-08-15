#!/bin/bash

# Ops Quick Commands Script
# Provides easy access to common operational tasks

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Check if SUPABASE_DB_URL is set
if [ -z "$SUPABASE_DB_URL" ]; then
    print_error "SUPABASE_DB_URL environment variable is not set"
    exit 1
fi

# Function to run sanity ping
sanity_ping() {
    print_header "Running Sanity Ping"
    
    print_status "Checking critical feature flags..."
    psql "$SUPABASE_DB_URL" -c "
    select key, scope, value
    from public.feature_flags_v2
    where key in ('autonomy.emergencyStop','autonomy.mode','agents.autonomousEnabled','obs.otelEnabled')
    order by key;"
    
    print_status "Checking agent metrics (15m window)..."
    psql "$SUPABASE_DB_URL" -c "select * from public.v_agent_metrics_15m limit 25;"
    
    print_status "Checking portal status..."
    npm run check:portals || print_warning "Portal check failed or not available"
}

# Function for emergency stop
emergency_stop() {
    print_header "EMERGENCY STOP"
    print_warning "This will immediately halt all autonomous operations!"
    read -p "Are you sure you want to continue? (yes/no): " confirm
    
    if [ "$confirm" = "yes" ]; then
        print_status "Activating emergency stop..."
        psql "$SUPABASE_DB_URL" -c "
        update public.feature_flags_v2
        set value=true
        where key='autonomy.emergencyStop' and scope='global';"
        print_status "Emergency stop activated"
    else
        print_status "Emergency stop cancelled"
    fi
}

# Function for soft degrade
soft_degrade() {
    print_header "Soft Degrade - Stabilizing System"
    print_status "Reducing concurrency and replay rates..."
    
    psql "$SUPABASE_DB_URL" -c "
    update public.feature_flags_v2 set value=25 where key='budget.agents.maxConcurrency' and scope='global';
    update public.feature_flags_v2 set value=1  where key='rate.replay.per5m' and scope='global';"
    
    print_status "Soft degrade applied - system should stabilize"
}

# Function to resume operations
resume_operations() {
    print_header "Resuming Operations"
    print_status "Restoring normal operation..."
    
    psql "$SUPABASE_DB_URL" -c "
    update public.feature_flags_v2 set value=false where key='autonomy.emergencyStop' and scope='global';
    update public.feature_flags_v2 set value=true  where key='agents.autonomousEnabled' and scope='global';
    update public.feature_flags_v2 set value='FULL' where key='autonomy.mode' and scope='global';"
    
    print_status "Operations resumed"
}

# Function for quick triage
quick_triage() {
    print_header "Quick Triage"
    
    print_status "Running green posture check..."
    node scripts/green-posture-script.js || print_warning "Green posture check failed"
    
    print_status "Checking recent logs..."
    supabase functions logs agent-runner --since 15m || print_warning "Log check failed"
    
    print_status "Checking DLQ depth..."
    psql "$SUPABASE_DB_URL" -c "select count(*) as dlq_depth from public.dlq_items;" 2>/dev/null || print_warning "DLQ check failed"
}

# Function for acceptance testing
run_acceptance_test() {
    print_header "Running Acceptance Test"
    print_status "Executing synthetic task test..."
    node scripts/acceptance-testing.js || print_warning "Acceptance test failed"
}

# Function for daily ritual
daily_ritual() {
    print_header "Daily Green Posture Ritual"
    
    print_status "Running comprehensive health check..."
    node scripts/green-posture-script.js || print_warning "Health check failed"
    
    print_status "Checking DLQ depth..."
    psql "$SUPABASE_DB_URL" -c "select count(*) dlq_depth from public.dlq_items;" 2>/dev/null || print_warning "DLQ check failed"
    
    print_status "Checking cron jobs..."
    psql "$SUPABASE_DB_URL" -c "select cron.jobid, schedule from cron.job where jobname like 'agent_logs_%';" 2>/dev/null || print_warning "Cron check failed"
    
    print_status "Daily ritual complete"
}

# Function for gradual scale-up
gradual_scale_up() {
    print_header "Gradual Scale-Up"
    
    print_status "Starting with conservative concurrency (10)..."
    psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=10 where key='budget.agents.maxConcurrency' and scope='global';"
    
    print_warning "Monitor for 5 minutes, then run: $0 scale-up-25"
    print_warning "Then run: $0 scale-up-50"
}

scale_up_25() {
    print_status "Scaling up to 25 concurrency..."
    psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=25 where key='budget.agents.maxConcurrency' and scope='global';"
}

scale_up_50() {
    print_status "Scaling up to 50 concurrency..."
    psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=50 where key='budget.agents.maxConcurrency' and scope='global';"
}

# Function to show system status
show_status() {
    print_header "System Status"
    
    print_status "Feature flags status:"
    psql "$SUPABASE_DB_URL" -c "select key, scope, value from public.feature_flags_v2 where key like 'autonomy.%' or key like 'agents.%' or key like 'budget.%' order by key;"
    
    print_status "Recent agent metrics:"
    psql "$SUPABASE_DB_URL" -c "select * from public.v_agent_metrics_15m limit 10;"
    
    print_status "DLQ depth:"
    psql "$SUPABASE_DB_URL" -c "select count(*) as dlq_depth from public.dlq_items;" 2>/dev/null || print_warning "DLQ check failed"
}

# Function to show help
show_help() {
    print_header "Ops Quick Commands"
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  sanity-ping      - Run sanity ping (60s)"
    echo "  emergency-stop   - Big red button (instant halt)"
    echo "  soft-degrade     - Stabilize without stopping"
    echo "  resume           - Resume operations post-incident"
    echo "  triage           - Quick triage (2 min)"
    echo "  acceptance-test  - Run acceptance testing"
    echo "  daily-ritual     - Daily green posture ritual (5 min)"
    echo "  scale-up         - Start gradual scale-up process"
    echo "  scale-up-25      - Scale to 25 concurrency"
    echo "  scale-up-50      - Scale to 50 concurrency"
    echo "  status           - Show current system status"
    echo "  help             - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 sanity-ping"
    echo "  $0 triage"
    echo "  $0 daily-ritual"
}

# Main command handling
case "${1:-help}" in
    "sanity-ping")
        sanity_ping
        ;;
    "emergency-stop")
        emergency_stop
        ;;
    "soft-degrade")
        soft_degrade
        ;;
    "resume")
        resume_operations
        ;;
    "triage")
        quick_triage
        ;;
    "acceptance-test")
        run_acceptance_test
        ;;
    "daily-ritual")
        daily_ritual
        ;;
    "scale-up")
        gradual_scale_up
        ;;
    "scale-up-25")
        scale_up_25
        ;;
    "scale-up-50")
        scale_up_50
        ;;
    "status")
        show_status
        ;;
    "help"|*)
        show_help
        ;;
esac
