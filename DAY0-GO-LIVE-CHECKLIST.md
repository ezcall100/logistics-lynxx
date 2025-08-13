# 🚀 Day-0 Go-Live Checklist: 24/7 Autonomous Operations

## Overview
This checklist ensures your autonomous TMS system is ready for 24/7 production operations with proper monitoring, alerting, and synthetic testing.

## ✅ Pre-Go-Live Verification (60-120 min)

### 1. Database & Schema Deployment
```bash
# Deploy latest schema and functions
supabase db push
supabase functions deploy agent-runner
supabase functions deploy health
supabase functions deploy usage-monitor
```

**Expected Output:**
- ✅ All migrations applied successfully
- ✅ Edge functions deployed
- ✅ RLS policies active
- ✅ Agent tables and views created

### 2. Application Deployment
```bash
# Rebuild and deploy the app (so MetricsBar + LiveFeed ship)
npm run build
npm run deploy  # or your deployment command
```

**Expected Output:**
- ✅ Build successful
- ✅ MetricsBar component deployed
- ✅ LiveFeed component deployed
- ✅ Real-time subscriptions active

### 3. Feature Flags Configuration
```typescript
// Verify autonomous processing is enabled for canary tenants
const canaryTenants = [
  '00000000-0000-4000-8000-000000000001', // Test tenant
  'transbotai-demo',
  'partner-1'
];

// Core features should be enabled
autonomousAgents: { enabled: true, canaryTenants, rolloutPercentage: 100 }
aiLoadMatching: { enabled: true, canaryTenants, rolloutPercentage: 100 }
realTimeNotifications: { enabled: true, canaryTenants, rolloutPercentage: 100 }
```

### 4. Environment Verification
```bash
# Check required environment variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY
echo $N8N_AGENT_LOG_WEBHOOK  # Slack webhook for alerts
```

**Required:**
- ✅ SUPABASE_URL configured
- ✅ SUPABASE_ANON_KEY configured
- ✅ N8N_AGENT_LOG_WEBHOOK configured (Slack)
- ✅ All secrets server-side only

## 🔧 Turn On The Lights

### 1. Enable Autonomous Processing
```sql
-- Verify canary tenants have access
SELECT * FROM public.agent_tasks 
WHERE company_id IN ('00000000-0000-4000-8000-000000000001', 'transbotai-demo', 'partner-1')
LIMIT 1;
```

### 2. Confirm Slack Integration
```bash
# Test Slack webhook (replace with your webhook URL)
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"🚀 Day-0 Go-Live: Autonomous system is online!"}' \
  $N8N_AGENT_LOG_WEBHOOK
```

**Expected:**
- ✅ Message appears in Slack
- ✅ Webhook URL not exposed client-side

### 3. Verify Real-time Pipeline
```bash
# Check real-time subscriptions
curl -X GET "$SUPABASE_URL/rest/v1/agent_logs?limit=1" \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY"
```

## 🧪 Fire Synthetic Task (End-to-End Test)

### Option 1: SQL Script
```sql
-- Run this in Supabase SQL Editor
INSERT INTO public.agent_tasks (company_id, fn_name, payload, status)
VALUES ('00000000-0000-4000-8000-000000000001', 'rates.price_one', 
        '{"origin":"CHI","dest":"DAL","weight":5000,"class":"70","equipment":"dry-van"}', 
        'queued')
RETURNING id;
```

### Option 2: PowerShell Script
```powershell
# Run the automated test script
.\scripts\day0-synthetic-test.ps1
```

### Option 3: Manual cURL
```bash
# 1. Create task
TASK_ID=$(curl -s -X POST "$SUPABASE_URL/rest/v1/agent_tasks" \
  -H "Content-Type: application/json" \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -H "Prefer: return=representation" \
  -d '{
    "company_id": "00000000-0000-4000-8000-000000000001",
    "fn_name": "rates.price_one",
    "payload": "{\"origin\":\"CHI\",\"dest\":\"DAL\",\"weight\":5000,\"class\":\"70\",\"equipment\":\"dry-van\"}",
    "status": "queued"
  }' | jq -r '.id')

# 2. Execute task
curl -s -X POST "$SUPABASE_URL/functions/v1/agent-runner" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -d "{\"task_id\":\"$TASK_ID\"}"
```

## 📊 Expected Results (10-30 seconds)

### 1. Autonomous Portal Updates
- ✅ Live Feed shows task start → processing → completion
- ✅ Real-time log entries appear
- ✅ Task status changes: queued → processing → completed

### 2. Metrics Bar Updates
- ✅ Success rate percentage updates
- ✅ Total tasks count increments
- ✅ Average duration updates
- ✅ Error rate remains low (< 2%)

### 3. Error Handling (if applicable)
- ✅ Red ERROR lines appear in Live Feed
- ✅ Slack notification sent to ops channel
- ✅ Task marked as failed with error details

## 🎯 SLOs & Alert Thresholds

### Target SLOs
- **Uptime**: ≥ 99.95%
- **p95 agent-runner latency**: ≤ 2.5s
- **Task success rate (15m)**: ≥ 98%
- **Error rate**: < 0.1%

### Alert Thresholds
```yaml
# Queue depth alerts
queue_depth_warning: 50 for 5 minutes
queue_depth_critical: 100 for 5 minutes

# Zero completions alert
zero_completions: 5 minutes while queue > 0

# Error rate alerts
error_rate_warning: > 2/min for 3 minutes
error_rate_critical: any unhandled exception

# Realtime disconnects
realtime_spike: > 10 disconnects in 1 minute

# TTL job failure
ttl_failure: cron job fails to run
```

## 📋 Day-1 to Day-7 Operations

### Daily Checks
```sql
-- Check for regressions
SELECT * FROM public.v_agent_metrics_15m 
WHERE company_id = '00000000-0000-4000-8000-000000000001'
ORDER BY time_bucket DESC LIMIT 1;

-- Check recent errors
SELECT * FROM public.agent_logs 
WHERE level = 'ERROR' 
AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### Weekly Tasks
- ✅ DR drill (restore to scratch project)
- ✅ Validate runner + logs functionality
- ✅ Review edge_rate_limits and logs volume
- ✅ Check 30-day TTL cleanup (pg_cron)

### Monthly Tasks
- ✅ Rotate Stripe + Supabase keys
- ✅ Verify CSP and webhook secrets
- ✅ Index health check (bloat analysis)
- ✅ Performance review and optimization

## 🔒 Security & Privacy

### RLS Verification
```sql
-- Verify RLS is enforced
SELECT * FROM public.agent_tasks 
WHERE company_id = '00000000-0000-4000-8000-000000000001';
-- Should only return data for authenticated user's company
```

### PII Protection
- ✅ No PII in logs (using redact() helper)
- ✅ SUPABASE_SERVICE_ROLE_KEY server-only
- ✅ Client uses JWT for authentication

## 💰 Cost & Capacity Monitoring

### Database Growth
```sql
-- Monitor daily row growth
SELECT 
  schemaname,
  tablename,
  n_tup_ins as inserts,
  n_tup_upd as updates,
  n_tup_del as deletes
FROM pg_stat_user_tables 
WHERE tablename LIKE 'agent_%';
```

### Scaling Triggers
- Queue depth > 100 for 5 minutes → Scale runners
- Log volume > 1M rows/day → Add partitioning
- Response time > 5s p95 → Optimize queries

## 🛠️ Handy One-Liners

### Tail Tenant Logs
```bash
SUPABASE_URL=... SUPABASE_ANON_KEY=... npx ts-node scripts/agent-tail.ts 00000000-0000-4000-8000-000000000001
```

### Spot-Check Metrics
```sql
SELECT * FROM public.v_agent_metrics_15m
WHERE company_id = '00000000-0000-4000-8000-000000000001';
```

### Health Check
```bash
curl -s "$SUPABASE_URL/functions/v1/health" | jq .
```

## 🎉 Go-Live Success Criteria

- ✅ Synthetic task completes successfully
- ✅ Real-time updates work in UI
- ✅ Metrics update correctly
- ✅ Error handling works (test with invalid payload)
- ✅ Slack notifications functional
- ✅ RLS policies enforced
- ✅ No PII exposure in logs

## 🚨 Rollback Plan

If issues arise:
1. Disable autonomous processing via feature flags
2. Scale down agent-runner instances
3. Investigate logs and metrics
4. Fix issues in staging environment
5. Re-enable with canary tenants only

---

**Status**: 🟡 Ready for Go-Live
**Last Updated**: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**Next Review**: $(Get-Date).AddDays(7).ToString("yyyy-MM-dd")
