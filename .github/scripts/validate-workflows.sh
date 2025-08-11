#!/bin/bash

# GitHub Actions Workflow Validation Script
# This script helps validate that all required environment variables and secrets are properly configured

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "success")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "warning")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "error")
            echo -e "${RED}❌ $message${NC}"
            ;;
        "info")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
    esac
}

# Function to check if a file exists
check_file() {
    local file=$1
    if [ -f "$file" ]; then
        print_status "success" "Found: $file"
        return 0
    else
        print_status "error" "Missing: $file"
        return 1
    fi
}

# Function to validate workflow syntax
validate_workflow() {
    local workflow=$1
    print_status "info" "Validating workflow syntax: $workflow"
    
    if command -v yamllint >/dev/null 2>&1; then
        if yamllint "$workflow" >/dev/null 2>&1; then
            print_status "success" "YAML syntax is valid"
        else
            print_status "error" "YAML syntax errors found"
            yamllint "$workflow"
        fi
    else
        print_status "warning" "yamllint not installed, skipping YAML validation"
    fi
}

# Function to extract environment variables from workflow
extract_env_vars() {
    local workflow=$1
    local vars_file=$(mktemp)
    
    # Extract variables and secrets from workflow files
    grep -E '\${{.*vars\.[A-Z_]+.*}}' "$workflow" | \
        sed -E 's/.*vars\.([A-Z_]+).*/\1/' | \
        sort -u > "$vars_file" 2>/dev/null || true
    
    grep -E '\${{.*secrets\.[A-Z_]+.*}}' "$workflow" | \
        sed -E 's/.*secrets\.([A-Z_]+).*/\1/' | \
        sort -u >> "$vars_file" 2>/dev/null || true
    
    cat "$vars_file" | sort -u
    rm -f "$vars_file"
}

# Main validation function
main() {
    echo "🔍 GitHub Actions Workflow Validation"
    echo "===================================="
    echo ""
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_status "error" "Not in a git repository"
        exit 1
    fi
    
    # Check for required directories and files
    print_status "info" "Checking repository structure..."
    
    local missing_files=0
    
    # Check for workflows directory
    if [ ! -d ".github/workflows" ]; then
        print_status "error" "Missing .github/workflows directory"
        missing_files=1
    else
        print_status "success" "Found .github/workflows directory"
    fi
    
    # Check for specific workflow files
    local workflows=(
        ".github/workflows/autonomous-ci-cd.yml"
        ".github/workflows/autonomous-deploy.yml"
        ".github/workflows/autonomous-deploy-refactored.yml"
        ".github/workflows/codeql.yml"
        ".github/workflows/local-validation.yml"
        ".github/workflows/network-diagnostic.yml"
    )
    
    for workflow in "${workflows[@]}"; do
        if check_file "$workflow"; then
            validate_workflow "$workflow"
        else
            missing_files=1
        fi
    done
    
    # Check for .gitattributes
    if check_file ".gitattributes"; then
        if grep -q "text eol=lf" ".gitattributes"; then
            print_status "success" "Line ending configuration found"
        else
            print_status "warning" "Line ending configuration missing"
        fi
    else
        missing_files=1
    fi
    
    echo ""
    print_status "info" "Extracting required environment variables and secrets..."
    echo ""
    
    # Extract and display required variables
    local all_vars=""
    for workflow in "${workflows[@]}"; do
        if [ -f "$workflow" ]; then
            local vars=$(extract_env_vars "$workflow")
            if [ -n "$vars" ]; then
                echo "📋 Required variables for $workflow:"
                echo "$vars" | while read -r var; do
                    if [ -n "$var" ]; then
                        echo "  - $var"
                        all_vars="$all_vars $var"
                    fi
                done
                echo ""
            fi
        fi
    done
    
    echo ""
    print_status "info" "Configuration Checklist:"
    echo ""
    echo "🔧 Repository Variables (Settings > Secrets and variables > Actions > Variables):"
    echo "  - ENVIRONMENT_NAME"
    echo "  - APP_URL"
    echo "  - STAGING_URL"
    echo "  - PRODUCTION_URL"
    echo "  - STAGING_WEBHOOK_URL"
    echo "  - PRODUCTION_WEBHOOK_URL"
    echo "  - STAGING_HEALTH_CHECK_URL"
    echo "  - PRODUCTION_HEALTH_CHECK_URL"
    echo "  - DEPLOYMENT_WEBHOOK_URL"
    echo "  - N8N_ENABLED"
    echo "  - N8N_BASE_URL"
    echo ""
    echo "🔐 Repository Secrets (Settings > Secrets and variables > Actions > Secrets):"
    echo "  - SUPABASE_URL"
    echo "  - SUPABASE_ANON_KEY"
    echo "  - OPENAI_API_KEY"
    echo "  - N8N_API_KEY"
    echo "  - N8N_WEBHOOK_URL"
    echo "  - N8N_WEBHOOK_SECRET"
    echo ""
    
    # Check if act is available for local testing
    if command -v act >/dev/null 2>&1; then
        print_status "success" "act is installed - you can test workflows locally"
        echo ""
        echo "🧪 Local testing commands:"
        echo "  act workflow_dispatch -e .github/workflows/autonomous-ci-cd.yml"
        echo "  act push -P ubuntu-latest=catthehacker/ubuntu:act-latest"
    else
        print_status "warning" "act not installed - install it for local workflow testing"
        echo ""
        echo "📦 Install act:"
        echo "  curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash"
    fi
    
    echo ""
    if [ $missing_files -eq 0 ]; then
        print_status "success" "Repository structure validation passed"
        echo ""
        print_status "info" "Next steps:"
        echo "1. Configure the required variables and secrets in GitHub"
        echo "2. Test workflows locally with act (optional)"
        echo "3. Push changes to trigger workflows"
    else
        print_status "error" "Repository structure validation failed"
        echo ""
        print_status "info" "Fix the missing files and run this script again"
        exit 1
    fi
}

# Run main function
main "$@"
