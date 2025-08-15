# 🚀 Production Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the autonomous TMS system to production with proper health monitoring, strict readiness checks, and emergency controls.

## Pre-Deployment Checklist

### 1. GitHub Actions Secrets (Required)

Navigate to your repository → Settings → Secrets and variables → Actions

**Required Secrets:**
```
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... (server-only)
```

**Required Variables:**
```
READYZ_MODE=strict
PROD_HOST=<your-production-hostname>
OTEL_SERVICE_NAME=transbot-ai-prod
```

### 2. Environment Configuration

**Production Environment:**
- `READYZ_MODE=strict` (requires database connectivity)
- `NODE_ENV=production`
- `LOG_LEVEL=info`

**Development Environment:**
- `READYZ_MODE=lenient` (agents only, no DB required)
- `NODE_ENV=development`

## Deployment Process

### Step 1: Trigger Deployment

1. Go to GitHub Actions → "Deploy to Production"
2. Click "Run workflow"
3. Select environment: `production`
4. Click "Run workflow"

### Step 2: Monitor Deployment

The deployment workflow will:

1. ✅ Install dependencies
2. ✅ Run lint analysis (non-blocking)
3. ✅ Build application
4. ✅ Deploy to production
5. ✅ Run smoke tests:
   - Health endpoint (`/healthz`)
   - Readiness endpoint (`/readyz`)
   - Web interface (`/`)

### Step 3: Verify Deployment

**Expected Results:**
```
✅ Health endpoint: OK
✅ Readiness endpoint: OK
   Mode: strict
   Agents: OK
   Database: OK
✅ Web interface: OK
```

## Post-Deployment Verification

### 1. Manual Smoke Test

```bash
# Run comprehensive smoke test
npm run smoke:test

# Or test individual endpoints
curl -fsS http://<prod-host>:8089/healthz && echo "healthz OK"
curl -fsS http://<prod-host>:8089/readyz | jq
curl -fsS http://<prod-host>:8084 && echo "web interface OK"
```

### 2. Autonomous Agent Verification

1. Visit `http://<prod-host>:8084/autonomous`
2. Check Live Feed for agent activity
3. Verify "System health check: OK" messages

### 3. Database Connectivity Test

```bash
# Test synthetic task insertion
psql "$SUPABASE_DB_URL" -c "
insert into public.agent_tasks(company_id, kind, payload, priority)
values ('00000000-0000-4000-8000-000000000001','rates.price_one','{\"lane\":\"DAL→LAX\"}','normal');
"
```

**Expected:** Live Feed shows "Starting ... / Completed ..."

## Monitoring & Health Checks

### Load Balancer Configuration

**Readiness Probe:**
- URL: `http://<host>:8089/readyz`
- Timeout: 2s
- Failure Threshold: 3
- Period: 10s

**Liveness Probe:**
- URL: `http://<host>:8089/healthz`
- Timeout: 2s
- Failure Threshold: 3
- Period: 10s

### Key Metrics to Monitor

1. **Readiness Status:** `/readyz` should return 200
2. **Agent Health:** Live Feed should show steady activity
3. **Database Connectivity:** No connection errors
4. **Performance:** Response times < 2s

## Emergency Controls

### Emergency Stop

```bash
# Stop all autonomous operations
npm run emergency:stop
```

### Emergency Resume

```bash
# Resume autonomous operations
npm run emergency:resume
```

### Performance Degradation

```bash
# Reduce performance (buy time for investigation)
npm run emergency:degrade
```

### Status Check

```bash
# Check current system status
npm run emergency:status
```

## Troubleshooting

### Readiness Endpoint Returns 503

**Possible Causes:**
1. Missing `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY`
2. Database connectivity issues
3. Autonomous agents not running

**Solutions:**
1. Verify GitHub Actions secrets are set
2. Check database connectivity
3. Review agent logs

### Agents Not Running

**Check:**
1. Agent process logs
2. Feature flags configuration
3. Emergency stop status

**Fix:**
```bash
npm run emergency:status
npm run emergency:resume  # if stopped
```

### Performance Issues

**Monitor:**
1. Outbox lag (p95 < 5s)
2. Replay failure rate (< 2%)
3. Agent concurrency

**Degrade if needed:**
```bash
npm run emergency:degrade
```

## Rollback Procedure

### Quick Rollback

1. **Emergency Stop:**
   ```bash
   npm run emergency:stop
   ```

2. **Revert Deployment:**
   - Use GitHub Actions to rollback to previous version
   - Or manually deploy previous commit

3. **Resume Operations:**
   ```bash
   npm run emergency:resume
   ```

## Security Considerations

### Environment Variables

- ✅ `SUPABASE_SERVICE_ROLE_KEY` is server-only
- ✅ Never exposed to browser/client
- ✅ Used only for health checks and emergency controls

### Access Control

- ✅ Production secrets in GitHub Actions
- ✅ Database access via service role key
- ✅ Emergency controls require database access

## Support

For deployment issues:

1. Check GitHub Actions logs
2. Review smoke test results
3. Verify environment variables
4. Check emergency control status

---

**🎉 Your autonomous TMS system is now production-ready!**
