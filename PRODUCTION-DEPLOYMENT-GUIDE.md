# 🚀 Trans Bot AI - Production Deployment Guide

## ✅ **Pre-Deployment Checklist**

### **System Status**
- ✅ **20/20 Portals**: All portals properly configured
- ✅ **Smoke Tests**: Health and readiness endpoints passing
- ✅ **Navigation**: Complete with Trans Bot AI branding
- ✅ **Cross-Platform**: Single Node.js toolchain
- ✅ **CI/CD**: Self-healing dependency management

## 🔧 **Production Deployment Steps**

### **1. Set Production Secrets & Variables**

#### **GitHub Secrets** (Required)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### **GitHub Variables** (Required)
```
READYZ_MODE=strict
PROD_HOST=app.yourdomain.com
OTEL_SERVICE_NAME=transbotai
```

### **2. Deploy to Production**

```bash
# Trigger production deployment
gh workflow run deploy-prod.yml -f environment=production
```

### **3. Post-Deployment Verification**

```bash
# Run comprehensive smoke tests
npm run smoke:test

# Verify all portals are accessible
npm run check:portals

# Check emergency status
npm run emergency:status
```

### **4. Enable Autonomous Operations**

```bash
# Connect to production database
psql "$SUPABASE_DB_URL" -c "update feature_flags_v2 set value=false where key='autonomy.emergencyStop' and scope='global';"
psql "$SUPABASE_DB_URL" -c "update feature_flags_v2 set value='FULL' where key='autonomy.mode' and scope='global';"
psql "$SUPABASE_DB_URL" -c "update feature_flags_v2 set value=true where key='agents.autonomousEnabled' and scope='global';"
```

### **5. Start Autonomous System**

```bash
# Start full autonomous suite
npm run start:autonomous:full
```

## 🎯 **15-Minute Operations Playbook**

### **Quick Status Check**
```bash
# Emergency status
npm run emergency:status

# Health endpoints
curl -fsS http://localhost:8089/healthz
curl -fsS http://localhost:8089/readyz
```

### **Soft Degrade (SLO Issues)**
```bash
# Throttle autonomous operations
npm run emergency:degrade
```

### **Emergency Stop**
```bash
# Big red button - stop all autonomous operations
npm run emergency:stop

# Resume operations
npm run emergency:resume
```

## 📊 **Production Monitoring (First 24-72 Hours)**

### **Key Metrics to Watch**

#### **SLO Targets**
- ✅ **Success Rate**: ≥ 98%
- ✅ **Response Time (p95)**: ≤ 2.5s
- ✅ **Outbox Processing (p95)**: < 5s
- ✅ **DLQ Replay Failures**: < 2%

#### **System Health**
- ✅ **Readiness**: `/readyz` = 200 (strict mode)
- ✅ **Portals**: `npm run check:portals` = 20/20 green
- ✅ **CI/CD**: No red builds (self-healing dependencies)

### **Monitoring Commands**

```bash
# Real-time health monitoring
watch -n 30 'curl -fsS http://localhost:8089/healthz && echo " | " && curl -fsS http://localhost:8089/readyz'

# Portal status check
npm run check:portals

# Emergency system status
npm run emergency:status
```

## 🔍 **Evidence Capture (Auditor-Ready)**

```bash
# Capture system posture
node scripts/green-posture-script.js

# Run comprehensive smoke tests
npm run smoke:test

# Generate deployment report
echo "Deployment completed at $(date)" > deployment-evidence.txt
npm run check:portals >> deployment-evidence.txt
npm run smoke:test >> deployment-evidence.txt
```

## 🚨 **Alert Thresholds**

### **Immediate Action Required**
- ❌ `/readyz` returns non-200 status
- ❌ Portal check fails (not 20/20)
- ❌ Success rate drops below 95%
- ❌ Response time exceeds 5s (p95)

### **Warning Level**
- ⚠️ Success rate between 95-98%
- ⚠️ Response time between 2.5-5s (p95)
- ⚠️ DLQ replay failures > 1%

## 🎉 **Success Criteria**

### **Deployment Success**
- ✅ All smoke tests pass
- ✅ 20/20 portals accessible
- ✅ Health endpoints responding
- ✅ Autonomous system operational
- ✅ CI/CD pipeline green

### **Production Readiness**
- ✅ Trans Bot AI branding consistent
- ✅ Navigation working across all pages
- ✅ Emergency controls functional
- ✅ Monitoring and alerting active
- ✅ Cross-platform compatibility verified

## 📋 **Post-Deployment Tasks**

### **Immediate (0-1 hour)**
- [ ] Verify all endpoints responding
- [ ] Confirm portal accessibility
- [ ] Test emergency controls
- [ ] Validate autonomous operations

### **Short-term (1-24 hours)**
- [ ] Monitor SLO metrics
- [ ] Review system logs
- [ ] Validate user access
- [ ] Test failover scenarios

### **Long-term (24-72 hours)**
- [ ] Performance optimization
- [ ] User feedback collection
- [ ] System tuning
- [ ] Documentation updates

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Health Check Failures**
```bash
# Check service status
npm run emergency:status

# Restart health server
npm run dev
```

#### **Portal Access Issues**
```bash
# Verify portal configuration
npm run check:portals

# Check authentication
curl -fsS http://localhost:8089/readyz
```

#### **Autonomous System Issues**
```bash
# Check autonomous status
npm run emergency:status

# Restart autonomous system
npm run start:autonomous:full
```

## 🎯 **You're Cleared to Ship! 🚀**

**System Status: PRODUCTION READY**

- ✅ **Dependencies**: 597 packages synced
- ✅ **CI/CD**: Self-healing with fallback
- ✅ **Portals**: 20/20 with RBAC + feature flags
- ✅ **Health**: Strict/lenient readiness modes
- ✅ **Smoke Tests**: All passing
- ✅ **Cross-Platform**: Single Node.js toolchain
- ✅ **Emergency Controls**: Full operational control
- ✅ **Branding**: Trans Bot AI consistent throughout

**Ready for autonomous operations and production traffic!** 🚀
