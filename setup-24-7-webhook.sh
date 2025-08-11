#!/bin/bash

# 24/7 n8n Webhook Setup Script for Autonomous Agents
# This script sets up continuous monitoring of the n8n webhook

set -euo pipefail

echo "🚀 Setting up 24/7 n8n Webhook Monitor for Autonomous Agents"
echo "=========================================================="

# Configuration
WEBHOOK_URL="https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook"
PROJECT_DIR="$(pwd)"
SERVICE_NAME="n8n-webhook-monitor"

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root for systemd service installation"
   exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if required files exist
if [[ ! -f "monitor-n8n-webhook.js" ]]; then
    echo "❌ monitor-n8n-webhook.js not found in current directory"
    exit 1
fi

if [[ ! -f "test-n8n-webhook-24-7.js" ]]; then
    echo "❌ test-n8n-webhook-24-7.js not found in current directory"
    exit 1
fi

# Create logs directory
mkdir -p logs
echo "✅ Created logs directory"

# Set up environment variables
if [[ -z "${N8N_WEBHOOK_SECRET:-}" ]]; then
    echo "⚠️ N8N_WEBHOOK_SECRET not set. Please set it before running the monitor."
    echo "   export N8N_WEBHOOK_SECRET='your-secret-key-here'"
fi

# Test the webhook first
echo "🔍 Testing webhook connectivity..."
if node test-n8n-webhook-24-7.js; then
    echo "✅ Webhook test successful"
else
    echo "⚠️ Webhook test failed. Please check your n8n configuration."
    echo "   Make sure the workflow is ACTIVE in n8n."
fi

# Update service file with correct paths
sed -i "s|/path/to/your/project|${PROJECT_DIR}|g" n8n-webhook-monitor.service

# Install systemd service
echo "📦 Installing systemd service..."
cp n8n-webhook-monitor.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable ${SERVICE_NAME}

echo "✅ Service installed and enabled"

# Start the service
echo "🚀 Starting 24/7 webhook monitor..."
systemctl start ${SERVICE_NAME}

# Check service status
if systemctl is-active --quiet ${SERVICE_NAME}; then
    echo "✅ Service is running successfully"
    echo "📊 Service status:"
    systemctl status ${SERVICE_NAME} --no-pager -l
else
    echo "❌ Service failed to start"
    echo "📋 Service logs:"
    journalctl -u ${SERVICE_NAME} --no-pager -l -n 20
    exit 1
fi

echo ""
echo "🎉 24/7 n8n Webhook Monitor Setup Complete!"
echo "=========================================="
echo ""
echo "📡 Webhook URL: ${WEBHOOK_URL}"
echo "🔧 Service Name: ${SERVICE_NAME}"
echo "📁 Project Directory: ${PROJECT_DIR}"
echo ""
echo "📋 Useful Commands:"
echo "   Check status:    systemctl status ${SERVICE_NAME}"
echo "   View logs:       journalctl -u ${SERVICE_NAME} -f"
echo "   Stop service:    systemctl stop ${SERVICE_NAME}"
echo "   Start service:   systemctl start ${SERVICE_NAME}"
echo "   Restart service: systemctl restart ${SERVICE_NAME}"
echo ""
echo "🤖 Autonomous agents can now communicate with n8n 24/7!"
echo "📊 Monitor will check webhook health every 5 minutes"
echo "🚨 Alerts will be triggered after 3 consecutive failures"
