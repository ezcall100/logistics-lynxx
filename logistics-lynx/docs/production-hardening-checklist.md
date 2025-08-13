# 🔒 Production Hardening Checklist
## Enterprise-Grade DLQ Replay & Outbox System

### 🎯 **Pre-Deployment Verification**

#### **1. Infrastructure Setup**
- [ ] **Feature flags system** deployed (`20241201_006_feature_flags.sql`)
- [ ] **Replay budget controls** enabled per tenant
- [ ] **Rate limiting tables** created (`edge_rate_limits`)
- [ ] **Audit logging** configured (`audit_logs`)
- [ ] **Idempotency tables** ready (`replay_runs`)

#### **2. Security Hardening**
- [ ] **HMAC secret** configured (`TRANSBOT_HMAC_SECRET`)
- [ ] **JWT authentication** working for admin operations
- [ ] **Rate limiting** enforced (3/5m/tenant+IP)
- [ ] **RLS policies** applied to all tables
- [ ] **Input validation** implemented

#### **3. Monitoring Setup**
- [ ] **Alerting thresholds** configured (SQL queries ready)
- [ ] **k6 smoke tests** with crisp thresholds
- [ ] **Observability queries** deployed
- [ ] **Slack webhooks** configured for notifications

---

### 🧪 **10-Minute Proof Drill**

#### **Run the Proof Drill Script**
```bash
# Set environment variables
export BASE_URL="https://your-project.supabase.co/functions/v1"
export TRANSBOT_HMAC_SECRET="your-hmac-secret"
export TEST_COMPANY_ID="00000000-0000-4000-8000-000000000001"
export ADMIN_JWT="your-admin-jwt-token"

# Run the proof drill
./logistics-lynx/scripts/dlq-replay-proof-drill.sh
```

#### **Expected Results**
- ✅ **HMAC Authentication**: Invalid → 401, Valid → 200
- ✅ **JWT Role Guard**: Admin JWT → 200
- ✅ **Rate Limiting**: First 3 → 200, 4th → 429
- ✅ **Idempotency**: Duplicate → short-circuit
- ✅ **Safety Rails**: Oversized batch → 400

---

### 📊 **Post-Deploy SQL Spot Checks**

#### **Run Verification Queries**
```sql
-- 1. Idempotency constraints present
SELECT conname, pg_get_constraintdef(c.oid)
FROM pg_constraint c
WHERE c.conrelid = 'public.replay_runs'::regclass;

-- 2. Rate limit window moving
SELECT key, count, window_start FROM public.edge_rate_limits
WHERE key LIKE 'replay:%' ORDER BY window_start DESC LIMIT 5;

-- 3. Audit trail entries
SELECT action, created_at, scope, target_count, success_count, failure_count
FROM public.audit_logs
WHERE action IN ('dlq_replay', 'dlq_replay_started', 'dlq_replay_completed')
ORDER BY created_at DESC LIMIT 10;

-- 4. Feature flags status
SELECT * FROM feature_flags_status WHERE key LIKE 'dlq%';

-- 5. Replay budgets status
SELECT * FROM replay_budgets_status;
```

#### **Expected Results**
- ✅ **Constraints**: Unique constraints on `replay_runs`
- ✅ **Rate Limits**: Recent activity in `edge_rate_limits`
- ✅ **Audit Logs**: Replay operations recorded
- ✅ **Feature Flags**: DLQ features enabled
- ✅ **Budgets**: Budget controls active

---

### 🚨 **Alerting Thresholds (SQL-Driven)**

#### **Critical Alerts (PAGE)**
```sql
-- 1. Replay failure rate > 40% (5m)
-- 2. Outbox lag p95 > 5s (10m)
-- 3. Agent success rate < 98% (10m)
-- 4. System resource exhaustion
```

#### **Warning Alerts (WARN)**
```sql
-- 1. Replay failure rate > 20% (5m)
-- 2. DLQ size growing 3× baseline (10m)
-- 3. Outbox lag p95 > 2s (10m)
-- 4. Rate limit violations > 10 (5m)
```

#### **Investigation Alerts (INVESTIGATE)**
```sql
-- 1. Idempotency collisions > 1% daily
-- 2. Audit log gaps (missing entries)
-- 3. Performance degradation
```

---

### 🔧 **k6 Thresholds (Fail Fast)**

#### **Enhanced Smoke Test**
```javascript
export const options = {
  thresholds: {
    http_req_failed: ['rate<0.02'],        // Error rate < 2%
    http_req_duration: ['p(95)<2500'],     // 95% < 2.5s
    outbox_lag_ms: ['p(95)<5000', 'avg<2000'], // Enhanced outbox lag
    agent_success: ['rate>0.98'],          // Success ≥ 98%
  },
};
```

#### **Run Enhanced Tests**
```bash
# Run with all checks enabled
k6 run --env TEST_OUTBOX=true --env TEST_DLQ=true --env TEST_AGENTS=true \
  logistics-lynx/k6/smoke-enhanced.js
```

---

### 🎛️ **Feature Flags & Gradual Rollout**

#### **Enable Features Gradually**
```sql
-- Phase 1: Canary (10% of tenants)
UPDATE feature_flags 
SET enabled = true, rollout_percentage = 10 
WHERE key = 'outbox.enabled';

-- Phase 2: 50% rollout
UPDATE feature_flags 
SET enabled = true, rollout_percentage = 50 
WHERE key = 'outbox.enabled';

-- Phase 3: 100% rollout
UPDATE feature_flags 
SET enabled = true, rollout_percentage = 100 
WHERE key = 'outbox.enabled';
```

#### **Replay Budget Controls**
```sql
-- Set custom budget for tenant
INSERT INTO replay_budgets (company_id, daily_limit, monthly_limit)
VALUES ('company-id', 1000, 20000)
ON CONFLICT (company_id) 
DO UPDATE SET daily_limit = EXCLUDED.daily_limit, monthly_limit = EXCLUDED.monthly_limit;
```

---

### 🛠️ **Operational Tools**

#### **HMAC Signer Utility**
```bash
# Generate signature for DLQ replay
npx ts-node logistics-lynx/scripts/sign-dlq-body.ts \
  -c "company-id" \
  -m 25 \
  -k "INC-2025-01-13-001" \
  -d \
  -v
```

#### **Dry Run Testing**
```bash
# Test replay without executing
curl -X POST https://your-project.supabase.co/functions/v1/dlq-replay \
  -H "X-Transbot-Signature: $SIGNATURE" \
  -H "Content-Type: application/json" \
  -d '{"company_id":"company-id","max":25,"dry_run":true}'
```

---

### 📋 **Release Gate in CI**

#### **Post-Deploy Verification Job**
```yaml
- name: 🧪 Run k6 smoke test
  run: |
    k6 run --env TEST_OUTBOX=true --env TEST_DLQ=true --env TEST_AGENTS=true \
      logistics-lynx/k6/smoke-enhanced.js

- name: 📊 Check outbox lag
  run: |
    psql "$DATABASE_URL" -f logistics-lynx/docs/post-deploy-sql-checks.sql

- name: 🎛️ Verify feature flags
  run: |
    psql "$DATABASE_URL" -c "SELECT * FROM feature_flags_status WHERE key LIKE 'outbox%';"

- name: 🚨 Check alerting thresholds
  run: |
    psql "$DATABASE_URL" -f logistics-lynx/docs/alerting-thresholds.sql
```

#### **Gated Rollout Logic**
```bash
# Only enable 50% if all checks pass
if [ $K6_EXIT_CODE -eq 0 ] && [ $OUTBOX_LAG -lt 2000 ] && [ $DLQ_SIZE -lt 10 ]; then
  echo "✅ All checks passed - enabling 50% rollout"
  psql "$DATABASE_URL" -c "UPDATE feature_flags SET enabled=true, rollout_percentage=50 WHERE key='outbox.enabled';"
else
  echo "❌ Checks failed - auto-rollback"
  psql "$DATABASE_URL" -c "UPDATE feature_flags SET enabled=false WHERE key='outbox.enabled';"
  exit 1
fi
```

---

### 🔄 **Emergency Procedures**

#### **Instant Rollback**
```sql
-- Disable outbox processing
UPDATE feature_flags SET enabled = false WHERE key = 'outbox.enabled';

-- Pause all agents
UPDATE agent_controls SET agents_paused = true;

-- Clear rate limits
DELETE FROM edge_rate_limits WHERE key LIKE 'replay:%';
```

#### **DLQ Recovery**
```bash
# Use HMAC signer for safe replay
npx ts-node logistics-lynx/scripts/sign-dlq-body.ts \
  -c "company-id" \
  -m 50 \
  -k "EMERGENCY-$(date +%s)" \
  -f
```

---

### 📈 **Success Metrics**

#### **Reliability Improvements**
- [ ] **Zero data loss**: All events processed or in DLQ
- [ ] **Idempotency**: No duplicate processing
- [ ] **Rate limiting**: No abuse or overload
- [ ] **Budget controls**: No runaway costs

#### **Operational Excellence**
- [ ] **Real-time monitoring**: <2s outbox lag, <10 DLQ items
- [ ] **Automated recovery**: Self-healing mechanisms
- [ ] **Audit trails**: Complete operation history
- [ ] **Gradual rollout**: Safe feature enablement

#### **Security & Compliance**
- [ ] **Authentication**: HMAC + JWT validation
- [ ] **Authorization**: Role-based access control
- [ ] **Rate limiting**: Abuse prevention
- [ ] **Audit logging**: Complete audit trails

---

### 🎉 **Production Ready Checklist**

- [ ] **Proof drill passed** (all tests green)
- [ ] **SQL spot checks** verified
- [ ] **Alerting thresholds** configured
- [ ] **k6 thresholds** set and tested
- [ ] **Feature flags** deployed
- [ ] **Replay budgets** configured
- [ ] **Operational tools** ready
- [ ] **Emergency procedures** documented
- [ ] **Success metrics** defined
- [ ] **Team trained** on new procedures

---

*This checklist ensures your DLQ replay and outbox system is enterprise-grade and production-ready with full observability, security, and operational controls.*
