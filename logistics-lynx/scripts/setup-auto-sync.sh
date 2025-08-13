#!/bin/bash

# 🔧 Auto-Sync Setup Script
# Sets up automatic synchronization to GitHub repository

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SYNC_SCRIPT="$SCRIPT_DIR/sync-to-github.sh"
CRON_JOB=""
REPO_NAME="logistics-lynxx"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to detect OS
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        echo "windows"
    else
        echo "unknown"
    fi
}

# Function to setup cron job (Linux/macOS)
setup_cron() {
    local interval="$1"
    local cron_expression=""
    
    case $interval in
        "hourly")
            cron_expression="0 * * * *"
            ;;
        "daily")
            cron_expression="0 0 * * *"
            ;;
        "weekly")
            cron_expression="0 0 * * 0"
            ;;
        "every-15-min")
            cron_expression="*/15 * * * *"
            ;;
        "every-30-min")
            cron_expression="*/30 * * * *"
            ;;
        *)
            error "Invalid interval: $interval"
            exit 1
            ;;
    esac
    
    # Create cron job entry
    CRON_JOB="$cron_expression cd $PROJECT_DIR && $SYNC_SCRIPT >> $PROJECT_DIR/logs/auto-sync.log 2>&1"
    
    # Check if cron job already exists
    if crontab -l 2>/dev/null | grep -q "$SYNC_SCRIPT"; then
        warning "Cron job already exists. Removing old entry..."
        crontab -l 2>/dev/null | grep -v "$SYNC_SCRIPT" | crontab -
    fi
    
    # Add new cron job
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    
    success "Cron job added successfully!"
    log "Auto-sync will run $interval"
    log "Logs will be saved to: $PROJECT_DIR/logs/auto-sync.log"
}

# Function to setup Windows Task Scheduler
setup_windows_task() {
    local interval="$1"
    local task_name="LogisticsLynxAutoSync"
    
    # Create logs directory
    mkdir -p "$PROJECT_DIR/logs"
    
    # Create PowerShell script for task scheduler
    cat > "$SCRIPT_DIR/run-sync.ps1" << EOF
# Windows Task Scheduler wrapper for auto-sync
Set-Location "$PROJECT_DIR"
& "$SYNC_SCRIPT" | Tee-Object -FilePath "$PROJECT_DIR/logs/auto-sync.log" -Append
EOF
    
    # Remove existing task if it exists
    schtasks /delete /tn "$task_name" /f 2>/dev/null || true
    
    # Create new task
    case $interval in
        "hourly")
            schtasks /create /tn "$task_name" /tr "powershell.exe -ExecutionPolicy Bypass -File \"$SCRIPT_DIR/run-sync.ps1\"" /sc hourly /f
            ;;
        "daily")
            schtasks /create /tn "$task_name" /tr "powershell.exe -ExecutionPolicy Bypass -File \"$SCRIPT_DIR/run-sync.ps1\"" /sc daily /f
            ;;
        "weekly")
            schtasks /create /tn "$task_name" /tr "powershell.exe -ExecutionPolicy Bypass -File \"$SCRIPT_DIR/run-sync.ps1\"" /sc weekly /f
            ;;
        *)
            error "Invalid interval: $interval"
            exit 1
            ;;
    esac
    
    success "Windows Task Scheduler task created successfully!"
    log "Auto-sync will run $interval"
    log "Logs will be saved to: $PROJECT_DIR/logs/auto-sync.log"
}

# Main setup function
main() {
    log "Setting up automatic synchronization for logistics-lynx repository..."
    
    # Check if sync script exists
    if [[ ! -f "$SYNC_SCRIPT" ]]; then
        error "Sync script not found: $SYNC_SCRIPT"
        exit 1
    fi
    
    # Make sync script executable
    chmod +x "$SYNC_SCRIPT"
    
    # Create logs directory
    mkdir -p "$PROJECT_DIR/logs"
    
    # Detect OS
    OS=$(detect_os)
    log "Detected OS: $OS"
    
    # Get sync interval from user
    echo "Select sync interval:"
    echo "1) Every 15 minutes"
    echo "2) Every 30 minutes"
    echo "3) Hourly"
    echo "4) Daily"
    echo "5) Weekly"
    echo "6) Manual only (no auto-sync)"
    
    read -p "Enter your choice (1-6): " choice
    
    case $choice in
        1) interval="every-15-min" ;;
        2) interval="every-30-min" ;;
        3) interval="hourly" ;;
        4) interval="daily" ;;
        5) interval="weekly" ;;
        6) 
            success "Manual sync only. Use './scripts/sync-to-github.sh' to sync manually."
            exit 0
            ;;
        *)
            error "Invalid choice"
            exit 1
            ;;
    esac
    
    # Setup based on OS
    case $OS in
        "linux"|"macos")
            setup_cron "$interval"
            ;;
        "windows")
            setup_windows_task "$interval"
            ;;
        *)
            error "Unsupported OS: $OS"
            log "Please run the sync script manually: $SYNC_SCRIPT"
            exit 1
            ;;
    esac
    
    # Test the sync script
    log "Testing sync script..."
    if "$SYNC_SCRIPT"; then
        success "Sync script test successful!"
    else
        warning "Sync script test failed. Please check your git configuration."
    fi
    
    echo ""
    success "Auto-sync setup completed!"
    echo ""
    echo "📋 Setup Summary:"
    echo "   • Repository: ezcall100/logistics-lynx"
    echo "   • Sync interval: $interval"
    echo "   • Log file: $PROJECT_DIR/logs/auto-sync.log"
    echo "   • Manual sync: $SYNC_SCRIPT"
    echo ""
    echo "🔧 Management Commands:"
    echo "   • View cron jobs: crontab -l"
    echo "   • Remove cron job: crontab -e (then delete the line)"
    echo "   • View logs: tail -f $PROJECT_DIR/logs/auto-sync.log"
    echo "   • Manual sync: $SYNC_SCRIPT"
}

# Run main function
main "$@"
