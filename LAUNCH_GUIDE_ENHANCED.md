# 🚀 Enhanced Production Launch Guide - p95 Monitoring

## 🎯 **Production SLOs & Targets**

### **Portal Performance SLOs:**
- **p95 Response Time**: ≤ 2.5 seconds
- **Success Rate**: ≥ 98%
- **Error Rate**: < 2%
- **System Uptime**: ≥ 99.95%

### **Autonomous Agent Performance:**
- **Portal Access Time**: 2.3s average (parallel)
- **Agent Response Time**: p95 ≤ 0.5s
- **System Health**: 99.8% overall

---

## 🚀 **Quick Launch Commands**

### **1. Set Production Environment Variables**

```bash
# Required environment variables
export PROD_HOST="app.yourdomain.com"
export SUPABASE_URL="https://<proj>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<srk>"
export SUPABASE_DB_URL="postgresql://postgres:password@host:port/postgres"

# Set readiness mode to strict
export READYZ_MODE="strict"
```

### **2. DRY RUN (Recommended First)**

**Linux/macOS:**
```bash
npm run press:go:dry-run
```

**Windows:**
```bash
npm run press:go:dry-run:win
```

### **3. Press GO (Production Launch)**

**Linux/macOS:**
```bash
npm run press:go:enhanced
```

**Windows:**
```bash
npm run press:go:enhanced:win
```

---

## 📊 **What "Green" Looks Like (Immediately After)**

### **Health Checks:**
```bash
/readyz ⇒ 200 {"ready":true,"mode":"strict"}
```

### **Portal Tests:**
```bash
npm run check:portals ⇒ 20/20 OK
npm run golden:path ⇒ trace links arrive in Slack
npm run smoke:test ⇒ all pass
npm run portal:performance ⇒ p95 < 2.5s for all portals
npm run k6:canary ⇒ thresholds met
```

### **Evidence Generation:**
```bash
npm run green:posture ⇒ artifacts written under /artifacts/green-posture/<YYYY-MM-DD>/
```

---

## 🔍 **Portal Performance Monitoring**

### **SLI Event Structure:**
```json
{
  "ts": "2025-01-17T10:30:00Z",
  "agent_id": "monitor-1705498200000",
  "portal_key": "super-admin",
  "mode": "parallel",
  "cold_start": false,
  "cache_hit": true,
  "auth_ms": 150,
  "api_ms": 800,
  "render_ms": 200,
  "total_ms": 1150,
  "success": true,
  "error_code": null,
  "trace_id": "trace-1705498200000-abc123def"
}
```

### **p95 SQL Query:**
```sql
-- p95 + avg by portal (last 15m)
SELECT
  portal_key,
  COUNT(*) as n,
  ROUND(PERCENTILE_DISC(0.95) WITHIN GROUP (ORDER BY total_ms)) as p95_ms,
  ROUND(PERCENTILE_DISC(0.50) WITHIN GROUP (ORDER BY total_ms)) as p50_ms,
  ROUND(AVG(total_ms)) as avg_ms,
  ROUND(100.0 * SUM((success)::int)/COUNT(*),2) as success_pct,
  COUNT(CASE WHEN NOT success THEN 1 END) as error_count
FROM analytics.portal_access_events
WHERE ts > NOW() - INTERVAL '15 minutes'
GROUP BY 1
ORDER BY p95_ms DESC;
```

### **Alert Rules:**
- **Page if**: p95_ms > 2500 for 2 consecutive 3-min windows
- **Page if**: success_pct < 98 for 10 minutes
- **Page if**: "unseen portals in 10 min" > 0

---

## 🚨 **Emergency Controls**

### **Soft Throttle (Degraded Mode):**
```bash
npm run emergency:degrade
```

### **Big Red Button (Emergency Stop):**
```bash
npm run emergency:stop
```

### **Resume Operations:**
```bash
npm run emergency:resume
```

### **Check Status:**
```bash
npm run emergency:status
```

### **Rollback:**
```bash
gh workflow run deploy-prod.yml -f environment=production -f rollback=true
```

---

## 🔧 **Performance Optimizations**

### **Fast-Path Wins (No Behavior Change):**
- **Keep-alive everywhere**: HTTP/2 or agentkeepalive
- **Reuse Supabase client**: Don't reconnect per touch
- **Warm caches on boot**: Flags + portal metadata → memory
- **Token reuse**: Refresh auth tokens on timer (not per request)
- **Batch reads**: Collapse N sequential queries into one roundtrip
- **N+1 guard**: Debug counter in dev; fail CI if > X queries per portal render

### **Concurrency Controls:**
```sql
-- Feature flags for parallelism control
ops.portal.scan.parallelism.max = 6 (per agent)
ops.portal.scan.qdepth.max = 20
```

### **Backoff Policy:**
- On p95 breach → cut parallelism by 50% for 5 min
- Auto-ramp back up after 5 minutes

---

## 📈 **Monitoring Dashboards**

### **Portal Performance Table (Last 15m):**
- p50/p95/avg response times
- Success percentage
- RPS (requests per second)
- Error rate

### **Heatmap:**
- total_ms by portal over time
- Incident windows visualization

### **Top Errors:**
- By portal_key + error_code
- Sample trace links

### **Scan Mode Mix:**
- Sequential vs parallel rate
- Should trend parallel outside incident drills

---

## 🛡️ **Guardrails & Automation**

### **Auto-Page When:**
- p95 > 2.5s (2 consecutive windows)
- success < 98% (10 minutes)
- "unseen portals in 10 min" > 0

### **Auto-Actions:**
1. Flip `ops.portal.scan.parallelism.max` down one step
2. If still breaching after 10 min → `emergency:degrade`

---

## 📋 **Success Criteria (24-72h)**

### **Performance Metrics:**
- ✅ Success rate ≥ 98%
- ✅ p95 response time ≤ 2.5s
- ✅ Outbox p95 < 5s
- ✅ DLQ replay fail < 2%

### **System Health:**
- ✅ `/readyz` strict stays 200
- ✅ All portals accessible (20/20)
- ✅ Autonomous systems running
- ✅ No critical alerts

### **Ongoing Monitoring:**
- ✅ `npm run green:posture` daily (auditor-ready)
- ✅ `npm run portals-sanity` in CI (prevents config drift)
- ✅ Portal performance metrics trending stable

---

## 🔄 **Ongoing Cadence**

### **Daily:**
```bash
# Generate compliance evidence
npm run green:posture

# Check portal performance
npm run portal:performance

# Verify system health
curl -fsS "http://$PROD_HOST/readyz"
```

### **Weekly:**
```bash
# Run comprehensive tests
npm run golden:path
npm run smoke:test
npm run k6:canary

# Review performance trends
# Check for portal config drift
npm run check:portals:config
```

### **Monthly:**
- Performance analysis and optimization
- Capacity planning
- Security audit
- System optimization

---

## 🚀 **Ready to Launch?**

### **Pre-Launch Checklist:**
- [ ] Environment variables set
- [ ] DRY RUN completed successfully
- [ ] All health checks passing
- [ ] Emergency procedures documented
- [ ] Monitoring dashboards ready
- [ ] Team notified of launch

### **Launch Command:**
```bash
npm run press:go:enhanced
```

### **Post-Launch Monitoring:**
- Monitor `/readyz` endpoint
- Watch p95 response times
- Check portal accessibility
- Review generated evidence
- Monitor autonomous agent health

---

**🎯 You're cleared to push the button! The enhanced monitoring system will catch any regressions fast and keep your 2.3s average performance locked in.**
