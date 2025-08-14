# 🎯 **FINAL ACCEPTANCE & OPS KIT**
## **Prove Green, Keep Green, Show Auditors You Were Green**

---

## 📋 **10-MINUTE FINAL ACCEPTANCE (Copy/Paste)**

### **0) Preconditions**
```sql
-- Verify these flags are set correctly
autonomy.emergencyStop=false
autonomy.mode='FULL'
agents.autonomousEnabled=true
obs.otelEnabled=true
```

### **1) Flag Sanity + Budgets**
```sql
-- Flags
SELECT key, scope, value FROM feature_flags_v2
WHERE key IN ('autonomy.emergencyStop','autonomy.mode','agents.autonomousEnabled','obs.otelEnabled');

-- Budgets & Rails
SELECT key, value FROM feature_flags_v2
WHERE key LIKE 'budget.%' OR key LIKE 'rate.%' ORDER BY key;
```

### **2) Health Snapshot**
```sql
-- Outbox freshness (ms) & DLQ depth (last 15m)
WITH o AS (
  SELECT EXTRACT(EPOCH FROM (NOW() - MAX(created_at)))*1000 AS lag_ms
  FROM event_outbox WHERE created_at > NOW() - INTERVAL '15 minutes'
), d AS (
  SELECT COUNT(*) AS dlq_15m FROM dlq_items WHERE created_at > NOW() - INTERVAL '15 minutes'
)
SELECT COALESCE((SELECT lag_ms FROM o),0)::INT AS outbox_lag_ms,
       COALESCE((SELECT dlq_15m FROM d),0) AS dlq_15m;

-- Agent SLO (rolling 15m)
SELECT company_id,
       COUNT(*) FILTER (WHERE status IN ('queued','pending')) AS queue_depth,
       COUNT(*) FILTER (WHERE status='running') AS running,
       ROUND(100.0*COUNT(*) FILTER (WHERE status='done')::NUMERIC
         / GREATEST(1,COUNT(*) FILTER (WHERE status IN ('done','failed','quarantined'))),2) AS success_pct
FROM agent_tasks
WHERE updated_at >= NOW() - INTERVAL '15 minutes'
GROUP BY company_id
LIMIT 10;
```

### **3) Synthetic Task (Prove Realtime + Traces)**
```bash
# Run the acceptance test suite
node acceptance-test-suite.js
```

### **4) Safe Error (Prove Slack + DLQ + Trace Link)**
```bash
# Test error handling
node resilience-drills.js
```

### **5) RLS Spot-Check (No Shared-Tenant Leaks)**
```sql
-- Run with tenant-scoped JWT
SELECT COUNT(*) FROM agent_logs 
WHERE company_id <> current_setting('app.current_company_id', true)::uuid;
```

### **6) Big Red Button Function Test (2 min)**
```sql
-- Activate emergency stop
UPDATE feature_flags_v2 SET value=true
WHERE key='autonomy.emergencyStop' AND scope='global';

-- Expect: agents halt writes within next cycle; UI shows PAUSED

-- Deactivate emergency stop
UPDATE feature_flags_v2 SET value=false
WHERE key='autonomy.emergencyStop' AND scope='global';

-- Expect: agents resume; queue drains; SLOs stay green
```

---

## 🧭 **ROLE & USER MATRIX (Canonical, 0-100% Coverage)**

### **👥 Human Roles**
- **super_admin (global)**: All flags/DR/budgets/audit; sees every tenant
- **tenant_admin**: Billing, users, portal toggles for own tenant
- **ops_manager**: DLQ dry-run, approve replays; exception policies
- **dispatcher**: Tender/assign/track; read DLQ state; no config
- **finance_manager**: AR/AP/settlements/factoring controls
- **analyst**: Dashboards/exports (redacted PII)
- **developer**: Prod logs/traces (redacted), staging deploy
- **viewer**: Read-only

### **🤖 Machine Service Accounts (Rotated Every 90d)**
- **autopilot@**: Orchestrator; SLO gates; canary flag flips
- **agents@**: Workers; task exec; logs/spans/outbox writes
- **dlq@**: Replay (batch/size/20%-fail rails enforced)
- **ci@**: Post-deploy verify; auto-rollback on breach
- **n8n@**: Signed webhooks; propagates traceparent
- **system@**: Break-glass: emergencyStop only; audited

### **🏢 Portal → Role Gates (RLS Enforced)**
See `role-matrix.md` for complete portal-to-role mapping.

---

## 🔒 **GUARDRAILS THAT NEVER SWITCH OFF**

### **Security**
- RLS on all tenant tables
- JWT claims validation
- v2 HMAC (timestamp + nonce)
- Idempotency keys systemwide
- CSP/CORS locked
- Secrets never in browser

### **Budgets**
- Concurrency: 150 default
- Replay: 3/5m/tenant/IP
- Batch: ≤50 items
- Payload: ≤2MB
- Stop replay if immediate failures >20%

### **SLO Gates**
- Breach (uptime <99.95%, success <98%, p95 >2.5s)
- Auto-throttle + rollback via CI self-heal job

### **Privacy**
- PII redaction in logs/spans (email/name/URL masked) by default

### **Audit**
- Every admin/agent action writes audit + trace
- Slack error = trace link

---

## 🛠️ **24/7 SCHEDULES (Already Live, Keep)**

- **30s**: Health probes, SLO gates, queue depth, canary routing
- **5m**: DLQ replay with rails, stale lock cleanup
- **Hourly**: Guardrail scans, ETL compaction, index touch
- **Daily**: TTL cleanup (agent_logs), partition rotation, backup freshness
- **Weekly**: DR drill rehearsal, security scans, portal audit
- **Monthly**: Restore test, key rotation rehearsal, cost/SLO review

---

## 📈 **WATCHLIST (First 72 Hours)**

### **Key Metrics**
- Outbox lag p95 < 5s (steady), avg < 2s
- Agent success > 98%, quarantine < 1%
- DLQ replay < 2% failure; < 3 replays/tenant/day
- Budgets never breached
- CI self-heal never triggers rollback on main

### **Quick Queries**
```sql
-- Replay failure ratio last 24h
SELECT ROUND(100.0*COUNT(*) FILTER (WHERE status='failed')::NUMERIC / GREATEST(1,COUNT(*)),2) AS replay_fail_pct
FROM dlq_runs WHERE created_at > NOW() - INTERVAL '24 hours';

-- Self-heal events (last 24h)
SELECT created_at, details->>'reason' AS reason
FROM audit_log
WHERE action='ci_auto_rollback' AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

---

## 🧪 **RESILIENCE DRILLS (15 Minutes, Safe)**

### **Kill-Switch**
```bash
# Toggle emergency stop
node emergency-stop.js stop
# Expect: halt within one cycle
node emergency-stop.js resume
# Expect: resume within one cycle
```

### **Region Fail**
```bash
# Simulate read replica lag
node resilience-drills.js
# Verify cutover triggers only after 3×/30s failures
```

### **Replay Rails**
```bash
# Submit >50 items or >2MB payload
# Expect: rejection + audit
```

### **Idempotency**
```bash
# Re-send same signed request within window
# Expect: 409/ignored, not duplicated
```

---

## 🗺️ **SINGLE-FILE CONFIG**

The `autonomy.yaml` file serves as the single source of truth:

```yaml
mode: FULL
kill_switch: false
budgets:
  agents:
    max_concurrent: 150
  replay:
    per_5m: 3
    batch_max: 50
    payload_mb_max: 2
slos:
  uptime: 99.95
  success_pct: 98
  p95_ms: 2500
schedules:
  probe_s: 30
  replay_m: 5
  guardrails_h: 1
  ttl_d: 1
  dr_drill_w: 1
```

---

## 🟢 **BOTTOM LINE**

### **Authority**: FULL
### **Ops**: Autonomous
### **Proof**: Realtime UI + traces + Slack deep-links + audit rows
### **Safety**: Kill-switch, budgets, SLO gates, idempotency, RLS

---

## 🚀 **QUICK START COMMANDS**

### **1. Setup & Start**
```bash
# Setup feature flags
psql "$SUPABASE_DB_URL" -f autonomous-setup.sql

# Start autonomous system
node start-autonomous-system.js

# Run acceptance tests
node acceptance-test-suite.js
```

### **2. Monitor & Maintain**
```bash
# Check system status
node emergency-stop.js status

# Generate compliance report
node green-posture-script.js

# Run resilience drills
node resilience-drills.js
```

### **3. Emergency Procedures**
```bash
# Emergency stop
node emergency-stop.js stop

# Check status
node emergency-stop.js status

# Resume operations
node emergency-stop.js resume
```

---

## 📊 **OPERATIONAL MONITORING**

### **SQL Queries**
Use `operational-monitoring.sql` for:
- Replay failure ratios
- Self-heal events
- Outbox lag monitoring
- DLQ depth monitoring
- Agent SLO compliance
- Budget compliance checks
- Feature flag status
- Portal autonomy status
- Website authority status
- Audit trail summary
- System health summary

### **Quick Status Commands**
```sql
-- Emergency stop check
SELECT value FROM feature_flags_v2 WHERE key = 'autonomy.emergencyStop' AND scope = 'global';

-- Agent status check
SELECT value FROM feature_flags_v2 WHERE key = 'agents.autonomousEnabled' AND scope = 'global';

-- Portal count check
SELECT COUNT(*) FROM feature_flags_v2 WHERE key LIKE 'portal.%.autonomous' AND scope = 'global';

-- Website authority count
SELECT COUNT(*) FROM feature_flags_v2 WHERE key LIKE 'website.%.autonomous' AND scope = 'global';
```

---

## 📋 **COMPLIANCE & AUDIT**

### **Green Posture Script**
```bash
# Generate compliance artifact
node green-posture-script.js

# Output: Timestamped JSON with flags/SLOs/budgets
# Maintains: 30-day rolling trail for auditors
```

### **Compliance Artifacts**
- `compliance-artifacts/green-posture-YYYY-MM-DD-HH-MM-SS.json`
- `compliance-artifacts/green-posture-latest.json`
- 30-day retention policy
- Audit-ready format

---

## 🎯 **SUCCESS CRITERIA**

### **Operational Excellence**
- ✅ Uptime: 99.95%+
- ✅ Response Time: p95 < 2.5s
- ✅ Error Rate: < 2%
- ✅ Autonomous Decisions: 1000+ per day
- ✅ Self-Healing: 95%+ automatic resolution

### **Business Impact**
- ✅ Portal Efficiency: 50%+ improvement
- ✅ Website Performance: 40%+ faster loading
- ✅ User Experience: 60%+ satisfaction increase
- ✅ Operational Cost: 30%+ reduction
- ✅ Time to Market: 70%+ faster deployment

---

## 🔄 **CONTINUOUS OPERATION**

The autonomous system runs 24/7 with:
- **Zero human intervention required**
- **Iron-clad safety guardrails**
- **One-command emergency stop**
- **Comprehensive audit trail**
- **Real-time monitoring and alerting**
- **Automatic self-healing and optimization**

---

**🎉 The autonomous TMS system is now running 24/7 with full authority across all portals and systems, maintaining iron-clad guardrails and providing one-command emergency stop capability.**
