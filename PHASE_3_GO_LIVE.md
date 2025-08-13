# 🚀 Trans Bot AI - Phase 3 Production Go-Live Checklist

## 📋 Go-Live Readiness Gate (10 Critical Checks)

### 1. 🌐 Domains/DNS Configuration
- [ ] `www.transbotai.com` resolves and TLS valid
- [ ] `app.transbotai.com` resolves and TLS valid  
- [ ] `n8n.transbotai.com` resolves and TLS valid
- [ ] All domains have proper SSL certificates (Let's Encrypt or commercial)
- [ ] DNS propagation verified across multiple regions

### 2. 🔒 CORS Configuration
- [ ] Only allow: `https://www.transbotai.com`, `https://app.transbotai.com`, `https://n8n.transbotai.com`
- [ ] Block all other origins
- [ ] Test CORS headers in staging environment

### 3. 🔐 Secrets Management
- [ ] All environment variables set for staging + production
- [ ] Service role keys only on server (edge/n8n), never exposed to client
- [ ] OpenAI API keys rotated and secured
- [ ] Supabase service role keys properly configured
- [ ] n8n webhook secrets generated and stored securely

### 4. 🛡️ Row Level Security (RLS)
- [ ] Cross-tenant read blocked
- [ ] RLS policies tested with smoke SQL
- [ ] No data leakage between tenants confirmed
- [ ] Admin bypass policies properly configured

### 5. 🔐 Multi-Factor Authentication (MFA)
- [ ] MFA enforced in Supabase Auth
- [ ] Password policy ≥ 12 characters
- [ ] Pwned password check enabled
- [ ] MFA recovery codes generated and stored securely

### 6. ⚙️ n8n Configuration
- [ ] Webhook credentials present and valid
- [ ] Cron jobs enabled and tested
- [ ] Concurrency set to 2-3 initially
- [ ] Error handling and retry logic configured
- [ ] Webhook security with secret path segments

### 7. 🔧 Edge Functions
- [ ] `health` function returns 200 in staging
- [ ] `ai-load-matcher` function tested
- [ ] `agent-runner` function operational
- [ ] `on-signup` function working correctly
- [ ] All functions have proper error handling

### 8. 💾 Backup Strategy
- [ ] Supabase PITR (Point-in-Time Recovery) enabled
- [ ] Daily backups configured and tested
- [ ] Restore drill performed successfully
- [ ] Backup retention policy defined (30 days minimum)

### 9. 📊 Observability
- [ ] Sentry DSNs configured for all environments
- [ ] Smoke tests passing in GitHub Actions
- [ ] Slack alerts configured and tested
- [ ] Health check endpoints responding correctly
- [ ] Error tracking and logging operational

### 10. 🔄 Rollback Plan
- [ ] One-command rollback script verified
- [ ] Previous build kept "warm" for quick rollback
- [ ] Database snapshot labeled and accessible
- [ ] Rollback procedure documented and tested

## 🚀 Cutover Flow (Staging → Production)

### Phase 1: Staging Deployment
```bash
# Deploy to staging first
./deploy-phase3.sh staging

# Wait for migrations + functions + workflows
# Run GitHub Actions: Smoke Tests (expect green)
```

### Phase 2: Staging Sanity Checks
- [ ] Create test load → n8n intake → AI match → assignment = proposed
- [ ] Simulate POD → invoice created + docs saved
- [ ] Rates quote P95 ≤ 500ms
- [ ] Directory search returns expected records
- [ ] All edge functions responding correctly

### Phase 3: Production Deployment
```bash
# Deploy to production
./deploy-phase3.sh production

# Trigger GitHub Actions: Smoke Tests
# Monitor deployment logs and health checks
```

## 🐤 Canary Rollout Strategy (Tenant Allowlist)

### Feature Flags Configuration
```typescript
// Feature flags (default: false)
const FEATURE_FLAGS = {
  rates: {
    enabled: false,
    canaryTenants: ['transbotai-demo', 'partner-1', 'partner-2']
  },
  directory: {
    enabled: false,
    canaryTenants: ['transbotai-demo', 'partner-1', 'partner-2']
  }
}
```

### Canary Rollout Phases
1. **Phase 1 (H0-H6)**: Canary tenants only (transbotai-demo, 1-3 design partners)
2. **Phase 2 (H6-H24)**: Expand to 50% of user base
3. **Phase 3 (H24-H72)**: 100% rollout

### Monitoring Metrics
- [ ] Agent success rate > 98% for 15 minutes
- [ ] Rate quote P95 < 800ms for 10 minutes
- [ ] Quarantined tasks < 50/hour
- [ ] Error rate < 2%
- [ ] Queue depth < 60 seconds

### Abort Conditions
- Agent success < 98% for 15 mins
- Rate quote P95 > 800ms for 10 mins
- Spike of quarantined tasks > 50/hour
- Critical security vulnerability detected
- Database performance degradation

## 🔐 Security Hardening

### Next.js Marketing Site Headers
```javascript
// next.config.mjs
export default {
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Content-Security-Policy", 
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;" }
      ]
    }];
  }
}
```

### Vite App Headers (Netlify)
```yaml
# _headers
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### n8n Security Configuration
- [ ] Protect webhooks with secret path segments
- [ ] Required header validation (X-Internal-Token)
- [ ] IP allowlist if possible
- [ ] Disable public workflow editing
- [ ] Admin SSO enabled

## 🧪 Enhanced Smoke Tests

### RLS Guard Test
```sql
-- Test cross-company data access
SELECT * FROM shipments WHERE company_id != auth.jwt() ->> 'company_id' LIMIT 1;
-- Expected: 401/forbidden or empty result set
```

### Rates Contract Test
```typescript
// Test contract publish → new version effective window respected
const testContractPublish = async () => {
  // Implementation for contract versioning test
}
```

### Directory COI Test
```typescript
// Test expired COI → triggers alert + blocks tendering
const testExpiredCOI = async () => {
  // Implementation for COI expiration test
}
```

### Agent Runner Error Test
```typescript
// Force an error → retries up to 5 → quarantined with log
const testAgentErrorHandling = async () => {
  // Implementation for agent error handling test
}
```

### Health Check Test
```typescript
// Kill OpenAI key in staging → /health goes yellow/red → Slack alert
const testHealthDegradation = async () => {
  // Implementation for health check degradation test
}
```

## 📈 First-72-Hours Runbook

### H0-H6: Canary Tenants Only
- [ ] Monitor queue depth, success %, P95 for quotes
- [ ] Watch error logs and Sentry alerts
- [ ] Verify Slack notifications working
- [ ] Check n8n workflow execution

### H6-H24: Expand to 50%
- [ ] Run invoice/POD path with real data
- [ ] Monitor system performance under load
- [ ] Verify all integrations working
- [ ] Check database performance

### H24: Disaster Recovery Drill
- [ ] Restore staging snapshot
- [ ] Verify RTO < 15 minutes
- [ ] Test rollback procedure
- [ ] Document lessons learned

### H24-H72: 100% Rollout
- [ ] Tune n8n concurrency settings
- [ ] Set agent-runner interval to 2m if queue > 60s
- [ ] Monitor all metrics and alerts
- [ ] Prepare for full production load

## 🔄 Maintenance & Compliance

### Secret Rotation Schedule
- [ ] OpenAI API keys: 30 days
- [ ] Slack webhook tokens: 30 days
- [ ] n8n API keys: 30 days
- [ ] Supabase service role keys: 90 days

### Access Reviews
- [ ] Monthly review of Supabase roles
- [ ] Quarterly review of organization access
- [ ] Annual security audit
- [ ] Regular penetration testing

### Audit Logging
- [ ] Enable append-only for quotes publish
- [ ] Log invoice emissions
- [ ] Track RLS policy changes
- [ ] Monitor admin actions

## ✅ Final "Go/No-Go" Checklist

### Pre-Deployment
- [ ] Staging deploy green
- [ ] Smoke tests pass (web + app + workflows)
- [ ] Feature flags in place; tenants allowlisted
- [ ] Backups verified + rollback dry run successful
- [ ] Alerts firing to Slack; on-call contact set
- [ ] Security headers live; MFA enforced; CORS locked

### Deployment Day
- [ ] All team members available
- [ ] Communication channels open
- [ ] Rollback procedures ready
- [ ] Monitoring dashboards visible
- [ ] Emergency contacts documented

### Post-Deployment
- [ ] Canary rollout successful
- [ ] All metrics within acceptable ranges
- [ ] No critical errors or alerts
- [ ] User feedback positive
- [ ] Documentation updated

## 🚨 Emergency Procedures

### Immediate Rollback
```bash
# One-command rollback
./rollback-phase3.sh production

# Verify rollback successful
./health-check.sh production
```

### Emergency Contacts
- **Primary On-Call**: [Contact Info]
- **Secondary On-Call**: [Contact Info]
- **DevOps Lead**: [Contact Info]
- **Product Manager**: [Contact Info]

### Communication Plan
- **Internal**: Slack #transbot-deployments
- **External**: Status page updates
- **Stakeholders**: Email notifications
- **Users**: In-app notifications

---

**Last Updated**: [Date]
**Version**: 1.0
**Approved By**: [Names]
