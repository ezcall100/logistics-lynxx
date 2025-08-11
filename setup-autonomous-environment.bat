@echo off
echo 🚀 Setting up 24/7 Autonomous System Environment
echo ===============================================
echo.

echo 📋 This script will help you configure all required API keys and settings
echo    for the autonomous system to run 24/7 without human intervention.
echo.

echo 🔧 Required Services:
echo    ✅ n8n Webhook (Already configured)
echo    ⚙️  Supabase (Database)
echo    ⚙️  OpenAI (AI Analysis)
echo    ⚙️  GitHub (Repository sync)
echo    ⚙️  Lovable AI (AI Integration)
echo.

echo 📝 Environment Variables Setup:
echo.

REM Set n8n webhook (already working)
set N8N_WEBHOOK_URL=https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook
echo ✅ N8N_WEBHOOK_URL=%N8N_WEBHOOK_URL%

REM Prompt for N8N_WEBHOOK_SECRET
set /p N8N_WEBHOOK_SECRET="Enter your n8n webhook secret (or press Enter for default): "
if "%N8N_WEBHOOK_SECRET%"=="" set N8N_WEBHOOK_SECRET=your-secret-key-here
echo ✅ N8N_WEBHOOK_SECRET=***configured***

REM Prompt for Supabase
set /p SUPABASE_URL="Enter your Supabase URL: "
if "%SUPABASE_URL%"=="" set SUPABASE_URL=your-supabase-url
echo ✅ SUPABASE_URL=%SUPABASE_URL%

set /p SUPABASE_ANON_KEY="Enter your Supabase anonymous key: "
if "%SUPABASE_ANON_KEY%"=="" set SUPABASE_ANON_KEY=your-supabase-anon-key
echo ✅ SUPABASE_ANON_KEY=***configured***

REM Prompt for OpenAI
set /p OPENAI_API_KEY="Enter your OpenAI API key: "
if "%OPENAI_API_KEY%"=="" set OPENAI_API_KEY=your-openai-api-key
echo ✅ OPENAI_API_KEY=***configured***

REM Prompt for GitHub
set /p GITHUB_TOKEN="Enter your GitHub personal access token: "
if "%GITHUB_TOKEN%"=="" set GITHUB_TOKEN=your-github-token
echo ✅ GITHUB_TOKEN=***configured***

set /p GITHUB_REPO="Enter your GitHub repository (username/repo): "
if "%GITHUB_REPO%"=="" set GITHUB_REPO=your-username/your-repo
echo ✅ GITHUB_REPO=%GITHUB_REPO%

REM Prompt for Lovable AI
set /p LOVABLE_API_KEY="Enter your Lovable AI API key: "
if "%LOVABLE_API_KEY%"=="" set LOVABLE_API_KEY=your-lovable-api-key
echo ✅ LOVABLE_API_KEY=***configured***

echo.
echo 🔧 Creating environment file...
echo.

REM Create .env file
(
echo # 24/7 Autonomous System Environment Variables
echo # Generated on %date% %time%
echo.
echo # n8n Webhook Configuration
echo N8N_WEBHOOK_URL=%N8N_WEBHOOK_URL%
echo N8N_WEBHOOK_SECRET=%N8N_WEBHOOK_SECRET%
echo.
echo # Supabase Configuration
echo SUPABASE_URL=%SUPABASE_URL%
echo SUPABASE_ANON_KEY=%SUPABASE_ANON_KEY%
echo.
echo # OpenAI Configuration
echo OPENAI_API_KEY=%OPENAI_API_KEY%
echo.
echo # GitHub Configuration
echo GITHUB_TOKEN=%GITHUB_TOKEN%
echo GITHUB_REPO=%GITHUB_REPO%
echo.
echo # Lovable AI Configuration
echo LOVABLE_API_KEY=%LOVABLE_API_KEY%
echo.
echo # System Configuration
echo CHECK_INTERVAL=300000
echo MAX_RETRIES=3
echo HEALTH_CHECK_INTERVAL=60000
) > .env

echo ✅ Environment file created: .env
echo.

echo 🧪 Testing webhook connectivity...
node test-webhook-simple.js
echo.

echo 📦 Installing required dependencies...
npm install @supabase/supabase-js
echo.

echo 🚀 Starting autonomous system...
echo.
echo 📋 System will run 24/7 with the following agents:
echo    🤖 Deployment Agent - Handles autonomous deployments
echo    🤖 Monitoring Agent - Monitors system health
echo    🤖 AI Analysis Agent - Performs OpenAI-powered analysis
echo    🤖 Database Agent - Maintains Supabase database
echo    🤖 GitHub Agent - Syncs with GitHub repository
echo    🤖 Lovable Agent - Integrates with Lovable AI
echo.

echo 🎯 Expected Behavior:
echo    • System runs continuously without human intervention
echo    • All agents execute their tasks automatically
echo    • n8n webhook receives notifications for all activities
echo    • Supabase stores system health and analysis data
echo    • GitHub repository stays synchronized
echo    • AI analysis provides continuous optimization insights
echo.

echo ⚠️  Important Notes:
echo    • Press Ctrl+C to stop the system
echo    • Check logs for system status and agent activities
echo    • Monitor n8n workflow for incoming webhooks
echo    • Verify Slack notifications (if configured)
echo.

echo 🎉 Ready to start autonomous operation!
echo.
pause

echo 🚀 Starting 24/7 Autonomous System...
node 24-7-autonomous-system.cjs
