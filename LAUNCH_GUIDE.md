# 🚀 Production Launch Guide

## Quick Start

### 1. Set Production Environment Variables

```bash
# Required environment variables
export PROD_HOST="app.yourdomain.com"
export SUPABASE_URL="your-supabase-url"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
export SUPABASE_DB_URL="postgresql://postgres:password@host:port/postgres"

# Set readiness mode to strict
export READYZ_MODE="strict"
```

### 2. Press GO

**Linux/macOS:**
```bash
npm run press:go
```

**Windows:**
```bash
npm run press:go:win
```

### 3. Monitor First 30 Minutes

**Success Criteria:**
- ✅ Success rate ≥ 98%
- ✅ p95 response time ≤ 2.5s
- ✅ Outbox p95 < 5s
- ✅ DLQ replay fail < 2%
- ✅ `/readyz` (strict) = 200
- ✅ `npm run check:portals` → 20/20
- ✅ Slack errors carry trace links
- ✅ DLQ flat

## Emergency Controls

### Soft Throttle
```bash
npm run emergency:degrade
```

### Big Red Button
```bash
npm run emergency:stop
```

### Resume Operations
```bash
npm run emergency:resume
```

### Check Status
```bash
npm run emergency:status
```

## Portal Sanity Check

Prevent future "missing portal config" drifts:

```bash
npm run check:portals:config
```

This compares the canonical registry with your UI config + sidebar. Fails CI if anything is missing.

## What Press-GO Does

1. **Pre-flight Checks** - Validates all required environment variables
2. **Production Readiness** - Forces strict readiness mode
3. **Health Warmup** - Checks `/healthz` and `/readyz` endpoints
4. **Observability & Autonomy** - Enables traces and autonomous systems
5. **Golden Path Testing** - Tests critical user journeys
6. **Smoke Tests** - Validates all portal accessibility
7. **Deployment Verification** - Confirms successful deployment
8. **Evidence Generation** - Creates auditor-ready compliance artifacts

## Troubleshooting

### If Press-GO Fails

1. Check environment variables are set correctly
2. Verify production host is accessible
3. Check Supabase connection
4. Review error logs for specific issues

### If Portals Missing

1. Run `npm run check:portals:config` to identify missing configurations
2. Check SuperAdminPortal.tsx for missing portal mappings
3. Verify sidebar menu includes all portals
4. Ensure portal URLs are correctly defined

### If Emergency Stop Needed

1. Run `npm run emergency:stop`
2. Check system status with `npm run emergency:status`
3. Investigate root cause
4. Resume with `npm run emergency:resume` when ready

## Success Indicators

- 🟢 All portals accessible (20/20)
- 🟢 Health endpoints responding
- 🟢 Autonomous systems running
- 🟢 No critical alerts
- 🟢 Performance metrics within SLOs
- 🟢 Evidence artifacts generated

## Post-Launch Monitoring

- Monitor `/readyz` endpoint
- Watch error rates and response times
- Check autonomous agent health
- Review generated evidence artifacts
- Monitor portal accessibility

---

**Ready to launch? Run `npm run press:go` and watch the magic happen! 🚀**
