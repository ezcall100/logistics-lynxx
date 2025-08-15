#!/bin/bash

# Setup Schedulers for Autonomous TMS System
# This script sets up cron jobs for automated operational tasks

echo "🕐 Setting up operational schedulers..."

# Create logs directory if it doesn't exist
mkdir -p logs

# Get the current directory
APP_DIR=$(pwd)

# Create the cron entries
CRON_ENTRIES=(
    "# Every 15m: green posture check"
    "*/15 * * * * cd $APP_DIR && /usr/bin/node scripts/green-posture-script.js >> logs/green-posture.log 2>&1"
    ""
    "# Daily 07:05: posture artifact + cleanup"
    "5 7 * * * cd $APP_DIR && /usr/bin/node scripts/operational-cadence.js daily >> logs/cadence.log 2>&1"
    ""
    "# Weekly Sun 07:15: resilience drill (15m)"
    "15 7 * * 0 cd $APP_DIR && /usr/bin/node scripts/resilience-drills.js >> logs/resilience.log 2>&1"
)

# Function to add cron jobs
add_cron_jobs() {
    echo "📅 Adding cron jobs..."
    
    # Create temporary file with new cron entries
    TEMP_CRON=$(mktemp)
    
    # Add existing cron jobs (if any)
    crontab -l 2>/dev/null | grep -v "green-posture\|operational-cadence\|resilience-drills" > "$TEMP_CRON" || true
    
    # Add new cron entries
    for entry in "${CRON_ENTRIES[@]}"; do
        echo "$entry" >> "$TEMP_CRON"
    done
    
    # Install the new crontab
    crontab "$TEMP_CRON"
    
    # Clean up
    rm "$TEMP_CRON"
    
    echo "✅ Cron jobs installed successfully!"
}

# Function to show current cron jobs
show_cron_jobs() {
    echo "📋 Current cron jobs:"
    crontab -l 2>/dev/null | grep -E "(green-posture|operational-cadence|resilience-drills)" || echo "No TMS cron jobs found"
}

# Function to remove cron jobs
remove_cron_jobs() {
    echo "🗑️ Removing TMS cron jobs..."
    
    # Create temporary file without TMS cron jobs
    TEMP_CRON=$(mktemp)
    crontab -l 2>/dev/null | grep -v "green-posture\|operational-cadence\|resilience-drills" > "$TEMP_CRON" || true
    
    # Install the filtered crontab
    crontab "$TEMP_CRON"
    
    # Clean up
    rm "$TEMP_CRON"
    
    echo "✅ TMS cron jobs removed!"
}

# Main script logic
case "${1:-install}" in
    "install")
        add_cron_jobs
        show_cron_jobs
        ;;
    "show")
        show_cron_jobs
        ;;
    "remove")
        remove_cron_jobs
        ;;
    "help"|*)
        echo "Usage: $0 [install|show|remove|help]"
        echo ""
        echo "Commands:"
        echo "  install  - Install operational cron jobs (default)"
        echo "  show     - Show current TMS cron jobs"
        echo "  remove   - Remove TMS cron jobs"
        echo "  help     - Show this help message"
        echo ""
        echo "Cron jobs to be installed:"
        for entry in "${CRON_ENTRIES[@]}"; do
            echo "  $entry"
        done
        ;;
esac
