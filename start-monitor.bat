@echo off
echo 🚀 Starting 24/7 n8n Webhook Monitor for Autonomous Agents...
echo.

REM Set environment variable if not already set
if "%N8N_WEBHOOK_SECRET%"=="" (
    echo ⚠️ N8N_WEBHOOK_SECRET not set. Please set it first:
    echo    set N8N_WEBHOOK_SECRET=your-secret-key-here
    echo.
    pause
    exit /b 1
)

echo ✅ N8N_WEBHOOK_SECRET is configured
echo 📡 Monitoring URL: https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook
echo ⏰ Check interval: 5 minutes
echo 🔄 Monitor will run continuously...
echo.
echo Press Ctrl+C to stop the monitor
echo.

REM Run the monitor
node monitor-n8n-webhook.js
