#!/bin/bash

# 🤖 24/7 AUTONOMOUS TMS SYSTEM - LINUX INSTALLER
# This script installs the autonomous system as a systemd service

set -e

echo "========================================"
echo "🤖 24/7 AUTONOMOUS TMS SYSTEM INSTALLER"
echo "========================================"
echo

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root (use sudo)"
   exit 1
fi

echo "✅ Running as root"
echo

# Configuration
SERVICE_NAME="autonomous-tms-24-7"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
SCRIPT_PATH="$(pwd)/24-7-autonomous-system.cjs"
WORKING_DIR="$(pwd)"
LOG_DIR="/var/log/autonomous-tms"

echo "📁 Working Directory: $WORKING_DIR"
echo "🔧 Script Path: $SCRIPT_PATH"
echo "🤖 Service Name: $SERVICE_NAME"
echo "📝 Service File: $SERVICE_FILE"
echo "📊 Log Directory: $LOG_DIR"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js:"
    echo "  Ubuntu/Debian: sudo apt install nodejs npm"
    echo "  CentOS/RHEL: sudo yum install nodejs npm"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo

# Check if script exists
if [[ ! -f "$SCRIPT_PATH" ]]; then
    echo "❌ Autonomous system script not found: $SCRIPT_PATH"
    echo "Please ensure 24-7-autonomous-system.cjs exists in the current directory"
    exit 1
fi

echo "✅ Autonomous system script found"
echo

# Create log directory
echo "📁 Creating log directory..."
mkdir -p "$LOG_DIR"
chmod 755 "$LOG_DIR"
echo "✅ Log directory created: $LOG_DIR"
echo

# Create service file
echo "🚀 Creating systemd service file..."
cat > "$SERVICE_FILE" << EOF
[Unit]
Description=24/7 Autonomous TMS System
Documentation=https://github.com/your-org/logistics-lynx
After=network.target
Wants=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
User=root
Group=root
WorkingDirectory=$WORKING_DIR
ExecStart=/usr/bin/node $SCRIPT_PATH
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=autonomous-tms-24-7

# Environment variables
Environment=NODE_ENV=production
Environment=MONITOR_INTERVAL=15000
Environment=HEALTH_CHECK_INTERVAL=120000
Environment=AGENT_CYCLE_INTERVAL=5000
Environment=N8N_WEBHOOK_URL=https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook

# Resource limits
LimitNOFILE=65536
MemoryMax=1G
CPUQuota=75%

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$LOG_DIR

# Logging
StandardOutput=append:$LOG_DIR/system.log
StandardError=append:$LOG_DIR/error.log

# Auto-restart configuration
StartLimitBurst=5
StartLimitInterval=60s

[Install]
WantedBy=multi-user.target
EOF

echo "✅ Service file created: $SERVICE_FILE"
echo

# Make script executable
chmod +x "$SCRIPT_PATH"
echo "✅ Made script executable"
echo

# Reload systemd
echo "🔄 Reloading systemd daemon..."
systemctl daemon-reload
echo "✅ Systemd daemon reloaded"
echo

# Enable service
echo "🚀 Enabling service..."
systemctl enable "$SERVICE_NAME"
echo "✅ Service enabled"
echo

# Start service
echo "🚀 Starting 24/7 Autonomous TMS Service..."
systemctl start "$SERVICE_NAME"

if systemctl is-active --quiet "$SERVICE_NAME"; then
    echo "✅ Service started successfully"
else
    echo "❌ Failed to start service"
    echo
    echo "🔍 Checking service status..."
    systemctl status "$SERVICE_NAME" --no-pager
    echo
    echo "📋 Recent logs:"
    journalctl -u "$SERVICE_NAME" --no-pager -n 20
    exit 1
fi

echo

# Show service status
echo "📊 Service Status:"
systemctl status "$SERVICE_NAME" --no-pager
echo

echo "========================================"
echo "🎉 24/7 AUTONOMOUS TMS SYSTEM INSTALLED"
echo "========================================"
echo
echo "✅ Service Name: $SERVICE_NAME"
echo "✅ Status: RUNNING"
echo "✅ Auto-start: ENABLED"
echo "✅ Auto-restart: ENABLED"
echo
echo "📋 Service Management Commands:"
echo "   Start:   sudo systemctl start $SERVICE_NAME"
echo "   Stop:    sudo systemctl stop $SERVICE_NAME"
echo "   Status:  sudo systemctl status $SERVICE_NAME"
echo "   Logs:    sudo journalctl -u $SERVICE_NAME -f"
echo "   Remove:  sudo systemctl disable $SERVICE_NAME && sudo rm $SERVICE_FILE"
echo
echo "📊 Log Files:"
echo "   System:  $LOG_DIR/system.log"
echo "   Errors:  $LOG_DIR/error.log"
echo "   Journal: sudo journalctl -u $SERVICE_NAME"
echo
echo "🔗 N8N Webhook: https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook"
echo "🤖 Agents: 250 autonomous agents running 24/7"
echo "⏰ Monitoring: Continuous health checks every 2 minutes"
echo
echo "🚀 The system will now run 24/7 without human intervention!"
echo "🔄 It will automatically restart on system reboot!"
echo

# Show recent logs
echo "📋 Recent system logs:"
tail -n 10 "$LOG_DIR/system.log" 2>/dev/null || echo "No logs yet - service just started"
echo
