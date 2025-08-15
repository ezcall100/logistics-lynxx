# 🚀 Trans Bot AI - Production Operations Playbook

## ⏰ **10-Minute Production Ritual**

### **Daily Production Check (Copy/Paste)**

```bash
# 1) Sanity: endpoints
curl -fsS http://$PROD_HOST/healthz | jq      # expect: {"ok":true,...}
curl -fsS http://$PROD_HOST/readyz | jq       # expect: {"ready":true,"mode":"strict"}

# 2) Portals behind auth (your script)
npm run check:portals                          # expect 20/20 green

# 3) Synthetic business flow (rates → task → trace)
npm run smoke:test                             # ends with ✅ summary

# 4) Enable autonomy (if not already)
psql "$SUPABASE_DB_URL" -c "update feature_flags_v2 set value=false where key='autonomy.emergencyStop' and scope='global';"
psql "$SUPABASE_DB_URL" -c "update feature_flags_v2 set value='FULL'  where key='autonomy.mode'         and scope='global';"
psql "$SUPABASE_DB_URL" -c "update feature_flags_v2 set value=true   where key='agents.autonomousEnabled'and scope='global';"

# 5) Start the full suite (if not service-managed)
npm run start:autonomous:full
```

## 👀 **What to Watch (First 60 Minutes)**

### **Critical Metrics**
- **/readyz (strict)**: stays 200
- **SLOs**: success ≥ 98%, p95 ≤ 2.5s, outbox p95 < 5s, DLQ replay fail < 2%
- **Live Feed**: tasks continuously flowing; Slack errors carry trace links
- **Portals**: `npm run check:portals` remains green after each deploy

## 🎛️ **One-Page Emergency Levers (Muscle Memory)**

```bash
# Soft-degrade (reduce concurrency, pause DLQ safely)
npm run emergency:degrade

# Big red button (halt all autonomous writes)
npm run emergency:stop

# Resume operations
npm run emergency:resume

# Current posture
npm run emergency:status
```

## 🔍 **Prove-It Pack (Auditor Ready)**

```bash
# Captures daily artifacts: flags, SLO snapshot, outbox lag, alert SQL, trace sample, audit digest
npm run green:posture

# Full production verification bundle
npm run verify:deployment

# Golden path business flow test
npm run golden:path
```

## 📅 **Day-2(+) Cadence (Set & Forget)**

### **Every 15 Minutes**
```bash
# Green posture check
npm run green:posture
```

### **Daily 07:05**
```bash
# TTL cleanup, indexes, budgets, evidence pack
npm run green:posture
npm run verify:deployment
```

### **Weekly Sunday 07:15**
```bash
# DR drill + resilience tests (auto-rollback verified)
npm run emergency:stop
npm run emergency:resume
npm run verify:deployment
```

### **Monthly**
```bash
# Key rotation rehearsal + restore test (RPO/RTO)
npm run green:posture
npm run golden:path
```

## 🚨 **Quick Fault Drill (30 Seconds)**

```bash
# Simulate incident → verify controls
npm run emergency:degrade
curl -fsS http://$PROD_HOST/readyz | jq       # should remain ready:true
npm run emergency:resume
```

## 📊 **Golden Dashboards (Pin/Bookmark)**

### **Primary Dashboards**
- **Autonomous Portal**: `/autonomous` (live feed + budgets)
- **Traces**: Super-Admin Traces page (deep links to your OTEL backend)
- **CI**: "Deploy to Production" workflow + post-deploy smoke

### **Monitoring URLs**
- **Health**: `http://$PROD_HOST/healthz`
- **Readiness**: `http://$PROD_HOST/readyz`
- **Portal Selection**: `http://$PROD_HOST/portal-selection`
- **Analytics**: `http://$PROD_HOST/analytics`

## 🔧 **Production Scripts Reference**

### **Health & Monitoring**
```bash
npm run smoke:test              # Health endpoints + synthetic tasks
npm run check:portals           # 20/20 portal verification
npm run verify:deployment       # Comprehensive deployment verification
npm run green:posture           # Daily evidence capture
npm run golden:path             # Business flow testing
```

### **Emergency Controls**
```bash
npm run emergency:status        # Current system status
npm run emergency:stop          # Big red button
npm run emergency:resume        # Resume operations
npm run emergency:degrade       # Soft throttle
```

### **Autonomous Operations**
```bash
npm run start:autonomous:full   # Start full autonomous suite
npm run build:portals           # Rebuild portal infrastructure
npm run update:deps             # Dependency management
```

## 📋 **Alert Thresholds**

### **Immediate Action Required**
- ❌ `/readyz` returns non-200 status
- ❌ Portal check fails (not 20/20)
- ❌ Success rate drops below 95%
- ❌ Response time exceeds 5s (p95)

### **Warning Level**
- ⚠️ Success rate between 95-98%
- ⚠️ Response time between 2.5-5s (p95)
- ⚠️ DLQ replay failures > 1%

## 🎯 **SLO Targets**

### **Performance SLOs**
- **Success Rate**: ≥ 98%
- **Response Time (p95)**: ≤ 2.5s
- **Outbox Processing (p95)**: < 5s
- **DLQ Replay Failures**: < 2%

### **Operational SLOs**
- **Portal Availability**: 20/20 accessible
- **Health Endpoints**: 200 status
- **Autonomous Operations**: Continuous task flow
- **Emergency Response**: < 30 seconds

## 🔄 **Incident Response Playbook**

### **Level 1: Performance Degradation**
```bash
# 1. Check current status
npm run emergency:status
curl -fsS http://$PROD_HOST/readyz | jq

# 2. Soft degrade if needed
npm run emergency:degrade

# 3. Monitor for 5 minutes
watch -n 30 'curl -fsS http://$PROD_HOST/readyz | jq'

# 4. Resume if stable
npm run emergency:resume
```

### **Level 2: System Unavailable**
```bash
# 1. Emergency stop
npm run emergency:stop

# 2. Verify stop
npm run emergency:status

# 3. Investigate (check logs, database, etc.)

# 4. Resume when resolved
npm run emergency:resume
```

### **Level 3: Data Integrity Issues**
```bash
# 1. Emergency stop
npm run emergency:stop

# 2. Verify data integrity
psql "$SUPABASE_DB_URL" -c "SELECT COUNT(*) FROM outbox WHERE status = 'pending';"

# 3. Check for corruption
npm run green:posture

# 4. Resume with monitoring
npm run emergency:resume
```

## 📈 **Performance Monitoring**

### **Real-Time Monitoring**
```bash
# Health check loop
watch -n 30 'curl -fsS http://$PROD_HOST/healthz && echo " | " && curl -fsS http://$PROD_HOST/readyz'

# Portal status loop
watch -n 60 'npm run check:portals'

# Emergency status loop
watch -n 30 'npm run emergency:status'
```

### **Daily Reports**
```bash
# Generate daily evidence
npm run green:posture

# Run golden path test
npm run golden:path

# Verify deployment health
npm run verify:deployment
```

## 🎉 **Success Indicators**

### **Green Status**
- ✅ All health endpoints responding
- ✅ 20/20 portals accessible
- ✅ Autonomous operations flowing
- ✅ SLOs within targets
- ✅ Emergency controls functional

### **Red Flags**
- ❌ Health endpoints failing
- ❌ Portal access issues
- ❌ Autonomous operations stopped
- ❌ SLO breaches
- ❌ Emergency controls unresponsive

## 🚀 **You're in Lights-Out Mode!**

**Your Trans Bot AI platform is fully operational with:**

- ✅ **Complete 10-minute ritual** for daily operations
- ✅ **Emergency controls** for all scenarios
- ✅ **Comprehensive monitoring** and alerting
- ✅ **Auditor-ready evidence** capture
- ✅ **Golden path testing** for business flows
- ✅ **Automated cadence** for ongoing operations

**Ready for production traffic and autonomous operations!** 🎯
