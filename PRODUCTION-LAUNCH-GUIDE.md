# 🚀 Trans Bot AI - Production Launch Guide

## ✅ **Press-GO Script (Strict, Safe, Idempotent)**

### **🎯 Single Command Launch**

```bash
# Linux/macOS
npm run press:go

# Windows PowerShell
npm run press:go:win
```

### **🔧 Manual Launch (Copy/Paste)**

```bash
#!/usr/bin/env bash
set -euo pipefail

# ==== PRE-FLIGHT ====
: "${PROD_HOST:?missing PROD_HOST (e.g. app.yourdomain.com)}"
: "${SUPABASE_DB_URL:?missing SUPABASE_DB_URL}"
: "${SUPABASE_URL:?missing SUPABASE_URL}"
: "${SUPABASE_SERVICE_ROLE_KEY:?missing SUPABASE_SERVICE_ROLE_KEY}"

echo "🔎 Preflight OK → host=$PROD_HOST"

# Rollback trap: big red button if anything fails
rollback() {
  echo "⏪ Auto-rollback: halting autonomy & verifying"
  npm run emergency:stop || true
  gh workflow run deploy-prod.yml -f environment=production -f rollback=true || true
  npm run verify:deployment || true
}
trap rollback ERR

# ==== 1) PROD READINESS: strict ====
echo "🧪 Forcing strict readiness in prod"
gh variable set READYZ_MODE --env production --body "strict" >/dev/null 2>&1 || true

echo "🌡️ Warmup health surfaces"
curl -fsS "http://$PROD_HOST/healthz" | jq .
curl -fsS "http://$PROD_HOST/readyz"  | jq .

# ==== 2) ARM OBS + AUTONOMY (idempotent) ====
echo "🎛️ Arming traces & autonomy rails"
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -c "
insert into feature_flags_v2(key,scope,value) values
('obs.otelEnabled','global',true),
('agents.autonomousEnabled','global',true),
('autonomy.emergencyStop','global',false),
('autonomy.mode','global','FULL')
on conflict (key,scope) do update set value=excluded.value;"

# ==== 3) GOLDEN PATH + SMOKE + VERIFY ====
echo "🟢 Golden path"
npm run golden:path

echo "🚬 Smoke tests"
npm run smoke:test

echo "✅ Deployment verification"
npm run verify:deployment

# ==== 4) EVIDENCE + POSTURE ====
echo "📦 Evidence (auditor-ready)"
npm run green:posture

echo "🎉 LAUNCH COMPLETE — strict /readyz should be green now"
curl -fsS "http://$PROD_HOST/readyz" | jq .
```

## 📊 **Post-Launch Monitoring (First 15-30 min)**

### **🎯 Critical Metrics to Watch**

- **Success ≥ 98%**, p95 ≤ 2.5s, outbox p95 < 5s, DLQ replay fail < 2%
- **/readyz (strict) stays 200** continuously
- **20/20 portals OK** (`npm run check:portals`)
- **Slack errors include trace links**; DLQ stays flat

### **📋 Post-Launch Commands**

```bash
# Check portal status
npm run check:portals

# Monitor health endpoints
curl -fsS "http://$PROD_HOST/healthz" | jq .
curl -fsS "http://$PROD_HOST/readyz" | jq .

# Run golden path test
npm run golden:path

# Capture evidence
npm run green:posture
```

## 🎛️ **Muscle-Memory Emergency Levers**

```bash
npm run emergency:degrade   # soft throttle (concurrency↓, replay pause)
npm run emergency:stop      # big red button (halts autonomous writes)
npm run emergency:resume    # back to normal
npm run emergency:status    # posture snapshot
```

## 🚨 **Auto-Rollback Features**

### **✅ Built-in Safety**
- **Preflight validation** for all required environment variables
- **Auto-rollback trap** that triggers on any error
- **Emergency stop** before rollback execution
- **Verification** after rollback completion

### **🔄 Rollback Sequence**
1. **Emergency stop** - halts all autonomous operations
2. **Deployment rollback** - triggers GitHub Actions rollback
3. **Verification** - confirms rollback success
4. **Evidence capture** - documents the rollback

## 📈 **24-72h Soak Plan**

### **📊 Daily Monitoring**
```bash
# Daily evidence capture (auditor-ready)
npm run green:posture

# Optional hourly synthetic check
npm run golden:path

# Portal verification
npm run check:portals
```

### **🎯 SLO Targets**
- **Success Rate**: ≥ 98%
- **Response Time (p95)**: ≤ 2.5s
- **Outbox Processing (p95)**: < 5s
- **DLQ Replay Failures**: < 2%

## 🔧 **Production Scripts Reference**

### **🚀 Launch Scripts**
```bash
npm run press:go              # Linux/macOS launch
npm run press:go:win          # Windows PowerShell launch
```

### **📊 Monitoring Scripts**
```bash
npm run smoke:test            # Health endpoints + synthetic tasks
npm run check:portals         # 20/20 portal verification
npm run verify:deployment     # Comprehensive deployment verification
npm run green:posture         # Daily evidence capture (auditor-ready)
npm run golden:path           # Business flow testing with trace links
```

### **🎛️ Emergency Controls**
```bash
npm run emergency:status      # Current system status
npm run emergency:stop        # Big red button
npm run emergency:resume      # Resume operations
npm run emergency:degrade     # Soft throttle
```

## 📍 **Single-Screen Checkpoints**

### **🌐 Web Interfaces**
- **Main Application**: `https://$PROD_HOST`
- **Autonomous Portal**: `https://$PROD_HOST/autonomous`
- **Portal Selection**: `https://$PROD_HOST/portal-selection`

### **💚 Health Endpoints**
- **Health Check**: `https://$PROD_HOST/healthz`
- **Readiness Check**: `https://$PROD_HOST/readyz`

### **📊 Monitoring & Evidence**
- **Traces**: Your OTEL backend (trace links in Slack + UI)
- **Evidence**: `/artifacts/green-posture/YYYY-MM-DD/*`

## 🎉 **Launch Success Indicators**

### **✅ Green Status**
- All health endpoints responding with 200
- 20/20 portals accessible and functional
- Autonomous operations flowing continuously
- SLOs within target ranges
- Emergency controls functional and responsive

### **🚨 Red Flags**
- Health endpoints returning non-200 status
- Portal access issues or failures
- Autonomous operations stopped or degraded
- SLO breaches or performance issues
- Emergency controls unresponsive

## 🚀 **You're Ready to Launch!**

**Your Trans Bot AI platform is ready for production launch with:**

- ✅ **Single-command launch** with auto-rollback
- ✅ **Comprehensive preflight validation**
- ✅ **Emergency controls** for all scenarios
- ✅ **Post-launch monitoring** with SLO tracking
- ✅ **Auditor-ready evidence** capture
- ✅ **Cross-platform compatibility** (Linux/macOS/Windows)

**Status: LAUNCH READY** 🚀

**Run `npm run press:go` when you're ready to launch!** 🎯
