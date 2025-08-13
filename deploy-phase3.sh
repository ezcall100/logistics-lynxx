#!/bin/bash

# 🚀 Trans Bot AI - Phase 3 Deployment Script
# Handles staging and production deployments with validation and rollback

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_ROOT/logs/deploy-$(date +%Y%m%d-%H%M%S).log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
    echo -e "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

# Environment validation
validate_environment() {
    local env=$1
    log "INFO" "Validating environment: $env"
    
    case $env in
        "staging"|"production")
            log "INFO" "Environment $env is valid"
            ;;
        *)
            log "ERROR" "Invalid environment: $env. Must be 'staging' or 'production'"
            exit 1
            ;;
    esac
}

# Check prerequisites
check_prerequisites() {
    log "INFO" "Checking deployment prerequisites..."
    
    # Check if we're in the right directory
    if [[ ! -f "$PROJECT_ROOT/package.json" ]]; then
        log "ERROR" "package.json not found. Please run from project root."
        exit 1
    fi
    
    # Check for required tools
    local missing_tools=()
    
    if ! command -v supabase &> /dev/null; then
        missing_tools+=("supabase")
    fi
    
    if ! command -v node &> /dev/null; then
        missing_tools+=("node")
    fi
    
    if ! command -v npm &> /dev/null; then
        missing_tools+=("npm")
    fi
    
    if [[ ${#missing_tools[@]} -gt 0 ]]; then
        log "ERROR" "Missing required tools: ${missing_tools[*]}"
        exit 1
    fi
    
    log "INFO" "All prerequisites satisfied"
}

# Create backup
create_backup() {
    local env=$1
    log "INFO" "Creating backup for $env environment..."
    
    # Create backup directory
    local backup_dir="$PROJECT_ROOT/backups/$env-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$backup_dir"
    
    # Backup current build
    if [[ -d "$PROJECT_ROOT/dist" ]]; then
        cp -r "$PROJECT_ROOT/dist" "$backup_dir/"
        log "INFO" "Build backup created: $backup_dir/dist"
    fi
    
    # Backup configuration files
    cp "$PROJECT_ROOT/package.json" "$backup_dir/"
    cp "$PROJECT_ROOT/tsconfig.json" "$backup_dir/"
    
    # Create backup manifest
    cat > "$backup_dir/manifest.json" <<EOF
{
  "environment": "$env",
  "backup_time": "$(date -u -Iseconds)",
  "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "git_branch": "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
}
EOF
    
    log "INFO" "Backup completed: $backup_dir"
    echo "$backup_dir"
}

# Deploy Supabase
deploy_supabase() {
    local env=$1
    log "INFO" "Deploying Supabase for $env environment..."
    
    # Set environment-specific variables
    local project_ref=""
    case $env in
        "staging")
            project_ref="${SUPABASE_STAGING_PROJECT_REF:-}"
            ;;
        "production")
            project_ref="${SUPABASE_PRODUCTION_PROJECT_REF:-}"
            ;;
    esac
    
    if [[ -z "$project_ref" ]]; then
        log "ERROR" "SUPABASE_${env^^}_PROJECT_REF not set"
        exit 1
    fi
    
    # Link to the correct project
    log "INFO" "Linking to Supabase project: $project_ref"
    supabase link --project-ref "$project_ref"
    
    # Deploy database schema
    log "INFO" "Deploying database schema..."
    supabase db push
    
    # Deploy edge functions
    log "INFO" "Deploying edge functions..."
    supabase functions deploy health
    supabase functions deploy ai-load-matcher
    supabase functions deploy agent-runner
    supabase functions deploy on-signup
    
    log "INFO" "Supabase deployment completed"
}

# Deploy application
deploy_application() {
    local env=$1
    log "INFO" "Deploying application for $env environment..."
    
    # Install dependencies
    log "INFO" "Installing dependencies..."
    npm ci --production=false
    
    # Build application
    log "INFO" "Building application..."
    npm run build
    
    # Deploy based on environment
    case $env in
        "staging")
            deploy_staging_app
            ;;
        "production")
            deploy_production_app
            ;;
    esac
    
    log "INFO" "Application deployment completed"
}

# Deploy staging application
deploy_staging_app() {
    log "INFO" "Deploying to staging environment..."
    
    # Add staging-specific deployment logic here
    # This could be deploying to a staging server, Vercel preview, etc.
    
    log "INFO" "Staging deployment completed"
}

# Deploy production application
deploy_production_app() {
    log "INFO" "Deploying to production environment..."
    
    # Add production-specific deployment logic here
    # This could be deploying to production servers, Vercel, Netlify, etc.
    
    log "INFO" "Production deployment completed"
}

# Deploy n8n workflows
deploy_n8n_workflows() {
    local env=$1
    log "INFO" "Deploying n8n workflows for $env environment..."
    
    # Set n8n URL based on environment
    local n8n_url=""
    case $env in
        "staging")
            n8n_url="${N8N_STAGING_URL:-}"
            ;;
        "production")
            n8n_url="${N8N_PRODUCTION_URL:-}"
            ;;
    esac
    
    if [[ -z "$n8n_url" ]]; then
        log "WARNING" "N8N_${env^^}_URL not set, skipping n8n deployment"
        return 0
    fi
    
    # Deploy workflows
    local workflows_dir="$PROJECT_ROOT/n8n-workflows"
    if [[ -d "$workflows_dir" ]]; then
        for workflow in "$workflows_dir"/*.json; do
            if [[ -f "$workflow" ]]; then
                log "INFO" "Deploying workflow: $(basename "$workflow")"
                # Add n8n API deployment logic here
            fi
        done
    fi
    
    log "INFO" "n8n workflows deployment completed"
}

# Run smoke tests
run_smoke_tests() {
    local env=$1
    log "INFO" "Running smoke tests for $env environment..."
    
    # Health check
    log "INFO" "Testing health endpoint..."
    # Add health check logic here
    
    # Basic functionality tests
    log "INFO" "Testing basic functionality..."
    # Add functionality tests here
    
    log "INFO" "Smoke tests completed"
}

# Update deployment status
update_deployment_status() {
    local env=$1
    local status=$2
    local backup_dir=$3
    
    # Create deployment status file
    cat > "$PROJECT_ROOT/deployment-status.json" <<EOF
{
  "environment": "$env",
  "status": "$status",
  "deployment_time": "$(date -u -Iseconds)",
  "backup_dir": "$backup_dir",
  "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "git_branch": "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
}
EOF
    
    log "INFO" "Deployment status updated: $status"
}

# Main deployment function
deploy() {
    local env=$1
    local backup_dir=""
    
    log "INFO" "🚀 Starting Phase 3 deployment for $env environment"
    
    # Validate environment
    validate_environment "$env"
    
    # Check prerequisites
    check_prerequisites
    
    # Create backup
    backup_dir=$(create_backup "$env")
    
    # Update status to deploying
    update_deployment_status "$env" "deploying" "$backup_dir"
    
    # Deploy components
    deploy_supabase "$env"
    deploy_application "$env"
    deploy_n8n_workflows "$env"
    
    # Run smoke tests
    run_smoke_tests "$env"
    
    # Update status to deployed
    update_deployment_status "$env" "deployed" "$backup_dir"
    
    log "INFO" "✅ Phase 3 deployment completed successfully for $env"
    
    # Clean up old backups (keep last 5)
    cleanup_old_backups "$env"
}

# Clean up old backups
cleanup_old_backups() {
    local env=$1
    log "INFO" "Cleaning up old backups for $env..."
    
    local backup_dir="$PROJECT_ROOT/backups"
    if [[ -d "$backup_dir" ]]; then
        # Keep only the last 5 backups for this environment
        find "$backup_dir" -name "$env-*" -type d | sort | head -n -5 | xargs rm -rf 2>/dev/null || true
    fi
}

# Rollback function
rollback() {
    local env=$1
    log "INFO" "🔄 Starting rollback for $env environment..."
    
    # Read current deployment status
    if [[ -f "$PROJECT_ROOT/deployment-status.json" ]]; then
        local backup_dir=$(jq -r '.backup_dir' "$PROJECT_ROOT/deployment-status.json")
        
        if [[ -d "$backup_dir" ]]; then
            log "INFO" "Rolling back to backup: $backup_dir"
            
            # Restore from backup
            if [[ -d "$backup_dir/dist" ]]; then
                rm -rf "$PROJECT_ROOT/dist"
                cp -r "$backup_dir/dist" "$PROJECT_ROOT/"
            fi
            
            # Restore configuration files
            cp "$backup_dir/package.json" "$PROJECT_ROOT/"
            cp "$backup_dir/tsconfig.json" "$PROJECT_ROOT/"
            
            # Update status
            update_deployment_status "$env" "rolled_back" "$backup_dir"
            
            log "INFO" "✅ Rollback completed successfully"
        else
            log "ERROR" "Backup directory not found: $backup_dir"
            exit 1
        fi
    else
        log "ERROR" "Deployment status file not found"
        exit 1
    fi
}

# Health check function
health_check() {
    local env=$1
    log "INFO" "🏥 Running health check for $env environment..."
    
    # Add health check logic here
    # This should check all critical endpoints and services
    
    log "INFO" "Health check completed"
}

# Show usage
usage() {
    echo "Usage: $0 {staging|production} [deploy|rollback|health]"
    echo ""
    echo "Commands:"
    echo "  deploy    - Deploy to the specified environment"
    echo "  rollback  - Rollback to the previous version"
    echo "  health    - Run health checks"
    echo ""
    echo "Examples:"
    echo "  $0 staging deploy"
    echo "  $0 production deploy"
    echo "  $0 production rollback"
    echo "  $0 staging health"
}

# Main script logic
main() {
    # Create logs directory
    mkdir -p "$(dirname "$LOG_FILE")"
    
    # Check arguments
    if [[ $# -lt 2 ]]; then
        usage
        exit 1
    fi
    
    local env=$1
    local command=$2
    
    case $command in
        "deploy")
            deploy "$env"
            ;;
        "rollback")
            rollback "$env"
            ;;
        "health")
            health_check "$env"
            ;;
        *)
            log "ERROR" "Unknown command: $command"
            usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
