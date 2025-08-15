# 🚀 Production Deployment Checklist

## Preflight Verification (2 minutes)

### ✅ Secrets Verification
- [ ] `SUPABASE_URL` (GitHub Actions secret)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (GitHub Actions secret)
- [ ] `OTEL_EXPORTER_OTLP_ENDPOINT` (optional - GitHub Actions secret)
- [ ] `OTEL_SERVICE_NAME` (optional - GitHub Actions variable)

### ✅ Environment Variables
- [ ] `READYZ_MODE=strict` (production environment variable)
- [ ] `PROD_HOST` (your production hostname/IP)

### ✅ System Checks
- [ ] Runner/system time synced (NTP)
- [ ] Valid TLS chain on $PROD_HOST (if applicable)

### ✅ Database Flags Verification
```sql
-- Check these flags are set correctly
SELECT key, value FROM feature_flags_v2 WHERE key IN (
  'autonomy.emergencyStop',
  'agents.autonomousEnabled',
  'portal.rates.enabled',
  'portal.quotes.enabled',
  'portal.shipments.enabled',
  'portal.directory.enabled',
  'portal.analytics.enabled'
);
```

**Expected values:**
- `autonomy.emergencyStop` = `false`
- `agents.autonomousEnabled` = `true`
- All `portal.*.enabled` = `true` (or per-tenant overrides as intended)

## 🚀 Deploy to Production

### Option 1: GitHub Actions UI
1. Go to your repository on GitHub
2. Navigate to **Actions** tab
3. Select **"Deploy to Production"** workflow
4. Click **"Run workflow"**
5. Set environment to **"production"**
6. Click **"Run workflow"**

### Option 2: GitHub CLI
```bash
gh workflow run deploy-prod.yml -f environment=production
```

## 🔍 Post-Deploy Smoke Test

### Quick Health Check (copy-paste)
```bash
# Health / readiness (strict)
curl -fsS http://$PROD_HOST:8089/healthz && echo "healthz OK"
curl -fsS http://$PROD_HOST:8089/readyz | jq   # expect: {"ready":true,"mode":"strict",...}

# Web surface
curl -I http://$PROD_HOST:8084 | head -n1     # HTTP/1.1 200

# Synthetic task (adjust IDs to your canary tenant)
psql "$SUPABASE_DB_URL" -c \
"insert into public.agent_tasks(company_id, kind, payload, priority)
 values ('00000000-0000-4000-8000-000000000001','rates.price_one','{\"lane\":\"DAL→LAX\"}','normal');"

# Run your script suite
npm run smoke:test
```

### Automated Smoke Test
```bash
# Run comprehensive smoke test
npm run smoke:test
```

## 🎯 Good Signs (≤ 60s)
- ✅ Live Feed shows "Starting... / Completed..."
- ✅ `/readyz` stays green (strict mode)
- ✅ No DLQ spike
- ✅ Slack error ping only if you force an error (with trace link)

## 🚨 Emergency Controls (Already Wired)

### Big Red Button
```bash
npm run emergency:stop
```

### Resume Operations
```bash
npm run emergency:resume
```

### Degrade Mode (buy time)
```bash
npm run emergency:degrade
```

### Status Check
```bash
npm run emergency:status
```

## 📊 15-Minute Watch (What "Green" Looks Like)

### Performance Metrics
- ✅ Outbox lag p95 < 5s
- ✅ DLQ replay fail < 2%
- ✅ Agent success > 98%, p95 ≤ 2.5s
- ✅ Traces present (edge ↔ agents ↔ downstream)
- ✅ Slack "Open Trace" works
- ✅ `/readyz` remains 200 (strict) throughout

## 🔧 Common Snags & Fixes

### `/readyz` 503 in prod
**Problem:** Missing SUPABASE_* secrets or wrong READYZ_MODE
**Fix:** Set secrets; keep READYZ_MODE=strict

### Agents not "ready"
**Problem:** Missing .js specifiers / bad paths
**Fix:** Run `npm run agents:doctor`, then redeploy job

### CI npm ci fails
**Problem:** Missing package-lock.json
**Fix:** Ensure package-lock.json committed ✅ (already fixed)

## 🎉 Optional Enhancements

### Observability Setup
- Set `OTEL_SERVICE_NAME=transbot-ai-prod`
- Confirm spans arrive in your backend
- Add Grafana/Datadog panel linking exemplar metrics → trace IDs

### Monitoring Dashboard
- Set up alerts for DLQ spikes
- Monitor agent success rates
- Track portal availability

## 🚀 Ready to Deploy!

Your system is production-ready with:
- ✅ Comprehensive health checks
- ✅ Emergency controls
- ✅ Automated smoke tests
- ✅ Observability integration
- ✅ Graceful degradation

**You're cleared to push the button!** 🎯

---

*Last updated: $(date)*
*Deployment guide version: 1.0*
