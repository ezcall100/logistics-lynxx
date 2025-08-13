# 🚀 Complete Deployment Guide: PR-001, PR-002, PR-003
## Event Outbox + DLQ + CI Reusable Workflows

### 📋 **Preflight Checklist (One-time Setup)**

#### **1. Environment Variables**
```bash
# Required secrets (set in your deployment platform)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
N8N_BASE_URL=https://your-n8n-instance.com
N8N_API_KEY=your-n8n-api-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url  # Optional
```

#### **2. Database Sanity Check**
```bash
# Verify migrations are clean
supabase db lint

# Check current schema
supabase db diff
```

#### **3. Install Dependencies**
```bash
# Install k6 for load testing
# macOS: brew install k6
# Ubuntu: sudo apt-get install k6
# Windows: choco install k6
# Or download from: https://k6.io/docs/getting-started/installation/
```

---

### 🔄 **Merge Order (Critical)**

**1. PR-001: Event Outbox** 
- Schema: `event_outbox` table + indexes
- Worker: `outbox-worker` edge function
- Idempotency: Unique constraints

**2. PR-002: DLQ + Pause/Drain**
- Schema: `dead_letter_queue` + `agent_controls` tables
- Worker updates: Enhanced error handling
- Feature flags: Operational controls

**3. PR-003: CI Reusable**
- Workflows: Standardized job templates
- Security: CodeQL, gitleaks, Snyk
- Post-deploy: k6 verification

---

### 🚀 **Deploy Commands (Safe, Additive)**

```bash
# 1. Database: schemas, policies, indexes (idempotent)
supabase db push

# 2. Functions: workers
supabase functions deploy outbox-worker
supabase functions deploy agent-runner      # now emits DLQ-friendly errors
supabase functions deploy dlq-replay        # hardened replay function with auth/rate-limit/idempotency

# 3. App: picks up flags/controls (Vercel/Netlify)
git tag v6.3.0-outbox && git push --tags
```

---

### 🎛️ **Enable Gradually (Canary → All)**

#### **Feature Flags (SQL)**
```sql
-- Enable outbox publish for canary only
UPDATE feature_flags
SET enabled = true
WHERE key = 'outbox.enabled' 
  AND company_id = '00000000-0000-4000-8000-000000000001';

-- Keep consumers dual-path for 24h (outbox+legacy)
UPDATE feature_flags 
SET enabled = true 
WHERE key = 'outbox.dual_write';
```

#### **Pause/Drain Controls (PR-002)**
```sql
-- Pause new tasks for tenant
UPDATE companies 
SET agents_paused = true 
WHERE id = '<tenant>';

-- Drain: finish in-flight then stop
UPDATE companies 
SET agents_drain = true 
WHERE id = '<tenant>';
```

---

### 🧪 **Prove It Works (Copy/Paste Tests)**

#### **A) Outbox Happy-Path**
```sql
-- 1) Insert synthetic event with idempotency key
INSERT INTO event_outbox (company_id, event_type, topic, idempotency_key, payload, target_system)
VALUES (
  '00000000-0000-4000-8000-000000000001', 
  'test', 
  'rates.quote.created', 
  'demo-key-001', 
  '{"quote_id":"Q-123"}',
  'n8n'
);

-- 2) Within ~2s expect processed_at set (worker marks it)
SELECT id, processed_at, attempts 
FROM event_outbox 
WHERE idempotency_key='demo-key-001';
```

#### **B) Idempotency (Duplicate)**
```sql
-- Insert the same idempotency_key again
INSERT INTO event_outbox (company_id, event_type, topic, idempotency_key, payload, target_system)
VALUES (
  '00000000-0000-4000-8000-000000000001', 
  'test', 
  'rates.quote.created', 
  'demo-key-001', 
  '{"quote_id":"Q-123"}',
  'n8n'
);

-- Expect: either constraint violation OR processed row count unchanged
```

#### **C) Failure → Backoff → DLQ**
```sql
-- Temporarily break the n8n endpoint (or set a bogus URL env) and insert a new event:
INSERT INTO event_outbox (company_id, event_type, topic, idempotency_key, payload, target_system)
VALUES (
  '00000000-0000-4000-8000-000000000001', 
  'test', 
  'rates.quote.created', 
  'demo-key-err', 
  '{"quote_id":"Q-ERR"}',
  'n8n'
);

-- Expect attempts to rise; after max_attempts the record appears in dlq table with reason
SELECT * FROM dead_letter_queue ORDER BY created_at DESC LIMIT 3;
```

#### **D) Pause/Drain Behavior**
```sql
-- Pause tenant
UPDATE companies 
SET agents_paused = true 
WHERE id='00000000-0000-4000-8000-000000000001';

-- Enqueue a task and confirm it is NOT picked up
INSERT INTO agent_tasks (company_id, agent_name, payload, status)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  'rates.price_one',
  '{"lane":"SEA→DFW"}',
  'queued'
);

-- Expect remains queued until unpaused
UPDATE companies 
SET agents_paused = false 
WHERE id='00000000-0000-4000-8000-000000000001';
```

---

### 📊 **Observability Queries (Drop into Exec Dashboard)**

#### **Outbox Lag (seconds)**
```sql
SELECT 
  COALESCE(EXTRACT(EPOCH FROM (NOW() - inserted_at)), 0)::int AS lag_s
FROM event_outbox
WHERE processed_at IS NULL
ORDER BY inserted_at ASC
LIMIT 1;
```

#### **DLQ Size & Hot Tenants**
```sql
SELECT 
  company_id, 
  COUNT(*) AS dlq_items
FROM dead_letter_queue
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY company_id
ORDER BY dlq_items DESC
LIMIT 10;
```

#### **Agent SLO (15m window)**
```sql
SELECT
  ROUND(100.0 * SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END)::numeric
        / NULLIF(SUM(CASE WHEN status IN ('completed','failed','quarantined') THEN 1 ELSE 0 END), 0), 2) AS success_pct,
  COUNT(*) FILTER (WHERE status = 'running') AS running,
  COUNT(*) FILTER (WHERE status IN ('queued','pending')) AS queue_depth
FROM agent_tasks
WHERE updated_at >= NOW() - INTERVAL '15 minutes';
```

---

### 🔧 **CI Adoption Checklist (PR-003)**

All workflows must call your reusable workflow_call with:

```yaml
permissions: 
  contents: read  # least-priv

concurrency: 
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

timeout-minutes: 15  # per job

# Slack steps guarded
- name: Notify Slack
  if: env.SLACK_WEBHOOK != ''
  run: |
    curl -X POST -H 'Content-type: application/json' \
      --data '{"text":"Deployment completed"}' \
      ${{ env.SLACK_WEBHOOK }}
```

**Security jobs enabled:**
- CodeQL (code scanning)
- gitleaks (secret scanning)  
- Snyk (dependency scanning) - nightly

**Post-deploy verify job runs on main deploy:**
- k6 smoke (60s @ ~100 RPS canary)
- Outbox lag < 2s, DLQ spike < threshold
- Agent success ≥ 98% (15m window)
- Fail fast & auto-open incident issue if thresholds breached

---

### ✅ **Go/No-Go Gates (Merge Success if All Green)**

| Check | Threshold | Action |
|-------|-----------|---------|
| **Data durability** | No missed events | ✅ Merge |
| **Resilience** | DLQ populated on hard failures | ✅ Merge |
| **Control** | Pause prevents new work | ✅ Merge |
| **CI** | All pipelines use reusable job | ✅ Merge |
| **Security** | Scanners pass, no false-positives | ✅ Merge |
| **Post-deploy** | k6 verify green | ✅ Merge |

---

### 🔄 **Rollback (Instant, Zero Data Loss)**

```bash
# 1. Flip feature flags off
UPDATE feature_flags SET enabled = false WHERE key = 'outbox.enabled';
UPDATE companies SET agents_paused = true WHERE id IN ('<affected-tenants>');

# 2. Keep outbox/DLQ tables (additive) — no schema rollback required

# 3. Re-deploy previous function build if needed
supabase functions deploy agent-runner --version <previous-version>

# 4. Use DLQ replay script when upstream is healthy
curl -X POST \
  -H "Authorization: Bearer <admin_jwt_or_hmac>" \
  -H "Content-Type: application/json" \
  -d '{"company_id": "<tenant>", "max": 25, "idempotency_key":"INC-2025-01-13-001"}' \
  https://your-project.supabase.co/functions/v1/dlq-replay
```

---

### 🎯 **What You'll See**

| Metric | Before | After |
|--------|--------|-------|
| **Reliability** | Lost events on network blips | Zero lost events, clean retries |
| **Operational Control** | Manual intervention required | Pause/drain at tenant level |
| **Security** | Inconsistent CI practices | Least-priv + scanners, no noise |
| **Observability** | Limited visibility | Real-time lag + DLQ monitoring |

---

### 🚀 **Deployment Verification**

Run the automated verification script:

```bash
# Set environment variables
export BASE_URL="https://your-app.vercel.app"
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_ANON_KEY="your-anon-key"
export TEST_COMPANY_ID="00000000-0000-4000-8000-000000000001"
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/your/webhook/url"

# Run verification
./logistics-lynx/scripts/verify-deployment.sh
```

**Expected Output:**
```
🚀 Starting deployment verification...
📋 Checking prerequisites...
✅ Prerequisites check passed
🔗 Testing basic connectivity...
✅ Application is reachable
🗄️  Testing database connectivity...
✅ Database is accessible
📬 Checking outbox table...
✅ Event outbox table exists
📋 Checking DLQ table...
✅ Dead letter queue table exists
🎛️  Checking agent controls table...
✅ Agent controls table exists
🧪 Running k6 smoke test...
✅ k6 smoke test passed
📤 Testing outbox functionality...
✅ Test event inserted successfully
✅ Outbox processing is working
🔄 Testing DLQ replay functionality...
✅ DLQ replay function is accessible
🏥 Running final health check...
✅ Outbox is processing events normally
✅ DLQ is healthy
🎉 Deployment verification completed successfully!
```

---

### 📞 **Support & Troubleshooting**

**Common Issues:**
1. **Outbox lag > 2s**: Check `outbox-worker` function logs
2. **DLQ items not retrying**: Verify `retry_after` timestamps
3. **Agents paused unexpectedly**: Check `agent_controls` table
4. **CI failures**: Ensure all workflows use reusable templates

**Emergency Contacts:**
- **Database**: `supabase db reset` (⚠️ destructive)
- **Functions**: `supabase functions deploy --no-verify-jwt`
- **Rollback**: Use feature flags, not schema changes

**Monitoring Dashboard:**
- Copy queries from `logistics-lynx/docs/observability-queries.sql`
- Set up alerts for critical thresholds
- Monitor DLQ replay success rates

---

### 🎉 **Success Criteria**

You've successfully deployed when:

✅ **Zero data loss**: All events processed or in DLQ  
✅ **Operational control**: Pause/drain works per tenant  
✅ **Security compliance**: CI passes all scanners  
✅ **Observability**: Real-time metrics visible  
✅ **Resilience**: Failures gracefully handled  

**Next Steps:**
1. Monitor for 24 hours
2. Enable for all tenants
3. Set up automated DLQ replay
4. Document runbooks for common issues

---

*This deployment guide ensures a smooth, safe rollout with full observability and instant rollback capability.*
