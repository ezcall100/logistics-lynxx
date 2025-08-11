@echo off
echo 🔧 Webhook Sync Setup for GitHub Actions
echo ======================================
echo.

echo 📋 Current Status:
echo    Webhook URL: https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook
echo    Test Script: Working ✅
echo    GitHub Actions: Needs configuration ⚠️
echo.

echo 🚀 Step 1: Configure GitHub Repository Secrets
echo.
echo   1. Go to your GitHub repository
echo   2. Click Settings → Secrets and variables → Actions
echo   3. Click "New repository secret"
echo   4. Add these secrets:
echo.
echo   Name: N8N_WEBHOOK_URL
echo   Value: https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook
echo.
echo   Name: N8N_WEBHOOK_SECRET
echo   Value: [your-secret-key-here]
echo.

echo 🧪 Step 2: Test Webhook Configuration
echo.
echo   Running webhook sync configuration...
echo.
node sync-webhook-config.js
echo.

echo 📋 Step 3: Trigger GitHub Actions
echo.
echo   To test the webhook sync:
echo   1. Make a small change to any file
echo   2. Commit and push to GitHub
echo   3. Check GitHub Actions tab
echo   4. Look for webhook notifications in n8n
echo.

echo 🎯 Expected Results:
echo   • GitHub Actions will send webhooks to n8n ✅
echo   • n8n will verify HMAC signature ✅
echo   • n8n will send Slack notifications ✅
echo   • You'll see deployment status in Slack ✅
echo.

echo ⚠️  Troubleshooting:
echo   • If webhook fails: Check GitHub secrets are set correctly
echo   • If signature fails: Verify N8N_WEBHOOK_SECRET matches in both places
echo   • If no Slack notification: Check n8n workflow is active
echo   • If GitHub Actions fails: Check workflow file syntax
echo.

pause
