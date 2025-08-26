# ✅ OPTIMIZATION PATCH: AnalyticsAgent
# 📦 TransBot AI | MCP Agent Optimizer — Production Grade
# 🗓️ Timestamp: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Write-Host "🚀 INITIATING: AnalyticsAgent Optimization Sequence..." -ForegroundColor Cyan

# STEP 1: Stop any existing container instance
Write-Host "🛑 Halting active AnalyticsAgent instance..." -ForegroundColor Yellow
docker stop analytics-agent 2>$null
docker rm analytics-agent 2>$null

# STEP 2: Deploy with updated memory allocation (2GB)
Write-Host "🔁 Re-deploying AnalyticsAgent with enhanced memory (2GB)..." -ForegroundColor Yellow
docker run -d `
  --name analytics-agent `
  --memory="2g" `
  --env-file .env.production `
  -v "$(Get-Location)\logs:/app/logs" `
  transbotai/analytics-agent:latest

# STEP 3: Trigger debug + diagnostics mode inside container
Write-Host "🧠 Activating debug diagnostics..." -ForegroundColor Yellow
docker exec analytics-agent node -e @"
  const agent = require('./agent');
  agent.enableDebug('memory', 'query');
  agent.runDiagnostics({ duration: '10m', throttle: true });
"@

# STEP 4: Clear agent backlog via SelfHealingAgent
Write-Host "🧹 Clearing task queue using SelfHealingAgent..." -ForegroundColor Yellow
docker exec self-healing-agent node -e @"
  const agent = require('./agent');
  agent.clearQueue('analytics-agent', { maxAge: 5 * 60 * 1000 });
"@

# STEP 5: Display system status
Write-Host "✅ Optimization complete. Showing running containers..." -ForegroundColor Green
docker ps --filter "name=analytics-agent"

Write-Host "🧠 LOGS: Use 'docker logs -f analytics-agent' to monitor in real time." -ForegroundColor Cyan
