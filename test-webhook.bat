@echo off
echo 🚀 Testing 24/7 n8n Webhook for Autonomous Agents...
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
echo.

REM Run the test
node test-n8n-webhook-24-7.js

echo.
echo Test completed. Press any key to exit...
pause >nul
