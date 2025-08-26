# ⚙️ OPTIMIZATION PATCH: AnalyticsAgent
# 🔐 Secure Runtime Patch – TransBot AI MCP
# 📅 Timestamp: $(Get-Date)

Write-Host "🚀 Starting AnalyticsAgent Optimization Patch..." -ForegroundColor Cyan

# STEP 1: Stop the running container
Write-Host "🛑 Stopping existing AnalyticsAgent container..." -ForegroundColor Yellow
docker stop analytics-agent
docker rm analytics-agent

# STEP 2: Allocate more memory (increase to 2GB)
Write-Host "🔧 Re-deploying with increased memory limit (2GB)..." -ForegroundColor Yellow
docker run -d `
  --name analytics-agent `
  --memory="2g" `
  --env-file .env.production `
  -v $(Get-Location)/logs:/app/logs `
  transbotai/analytics-agent:latest

# STEP 3: Enable debug & throttle mode (low-load diagnostics)
Write-Host "🧪 Enabling debug + diagnostics mode..." -ForegroundColor Yellow
docker exec analytics-agent node -e `
"require('./agent').enableDebug('memory','query');" ; `
"require('./agent').runDiagnostics({ duration: '10m', throttle: true });"

# STEP 4: Clear queued backlog using SelfHealingAgent
Write-Host "🧹 Dispatching SelfHealingAgent to clear backlog..." -ForegroundColor Yellow
docker exec self-healing-agent node -e `
"require('./agent').clearQueue('analytics-agent', { maxAge: 5 * 60 * 1000 });"

# STEP 5: Confirm deployment
Write-Host "✅ AnalyticsAgent re-optimized and deployed with diagnostics active." -ForegroundColor Green

# STEP 6: Post-deployment verification
Write-Host "🔍 Running post-deployment checks..." -ForegroundColor Cyan

# Check container status
Write-Host "📊 Container Status:" -ForegroundColor White
docker ps | findstr analytics-agent

# Check memory usage
Write-Host "🧠 Memory Usage:" -ForegroundColor White
docker stats analytics-agent --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"

# Check logs for any errors
Write-Host "📋 Recent Logs:" -ForegroundColor White
docker logs --tail 10 analytics-agent

Write-Host "✅ AnalyticsAgent Optimization Patch Complete!" -ForegroundColor Green
Write-Host "🫡 Commander, your MCP agent is now optimized and ready for peak performance." -ForegroundColor Cyan
