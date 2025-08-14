# 🤖 Autonomous TMS — No-Human Ops Blueprint (A→Z)

## **Complete Implementation Guide for 24/7 Autonomous Operations**

---

## **1. Objectives & Non-Goals**

### **🎯 Goal**
Fully autonomous intake → decisioning → execution → settlement → learning with 24/7 uptime, zero manual steps, safe escalation only on policy breach.

### **❌ Non-goals**
- Manual backfills
- Ad-hoc scripts
- Processes that bypass RLS/flags

---

## **2. End-to-End Lifecycle (What Runs, In Order)**

### **📥 Intake**
**Sources**: EDI 204/990/214/210, email/PDF, portal forms, APIs, load boards, CRM, ROI calculator.

**Agents**: Intake Normalizer, Document Classifier/OCR, Lead→Trial Orchestrator.

**Guarantees**: Idempotent webhooks (stripe_events), v2 HMAC signing (timestamp + nonce), RLS on all writes.

### **🔍 Validation & Enrichment**
Normalize locations/equipment/dates, check entitlements, compliance, COI, safety ratings.

**Tools**: company-scoped lookups, feature flags, plan limits (useEntitlement/useLimit), rate limits (edge_rate_limits).

### **🧠 Decisioning**
**Pricing (Rates Agent)**: contract lookup → market model → fuel/acc → plan guardrails.

**Carrier matching (Match Agent)**: score by lane, performance, COI, capacity, price.

**Policy**: tool allow-lists, cost caps, timeouts, confirm-before-commit rules per plan.

### **⚡ Execution**
Tender/accept, book carrier, kick off tracking, status EDI 214, exceptions routing.

**"Write once"** via Outbox → deliver to n8n/EDI/Slack/API with retry & backoff.

### **📄 Docs & Billing**
POD ingestion → verify → invoice generation (210) → factoring integration → payouts.

**Stripe**: subscription/entitlements via webhook (idempotent), overage meters.

### **💰 Reconciliation & Closure**
Settlement checks, variance analysis, margin guardrails, auto-close.

### **📊 Observe/Learn**
Realtime logs & metrics (agent_logs + v_agent_metrics_15m).

**OTEL traces** (web→edge→n8n), Slack trace links, ROI/quote→book KPIs.

Feedback into pricing & match models (lane intelligence).

---

## **3. Agent Taxonomy (Who Does What)**

### **🎮 Orchestrator**
- Schedules tasks, enforces budgets, handles pause/drain, coordinates retries.

### **📥 Intake Agents**
- EDI/email/portal ingestion, normalization, dedupe.

### **💰 Pricing (Rates) Agent**
- Lane pricing, fuel/ACC calc, contract vs market, publish quotes.

### **🤝 Matching Agent**
- Carrier scoring, bid/accept thresholds, compliance gates.

### **📋 Tender/Booking Agent**
- Sends tenders (EDI/API/portal), monitors SLAs, fallbacks.

### **📍 Tracking Agent**
- 214/telematics ingestion, ETA predictions, exception triggers.

### **📄 Docs Agent**
- POD/OCR/QA, fraud checks, doc completeness.

### **💳 Invoice/Finance Agent**
- Invoice build, deliveries, factoring, payout validation.

### **⚠️ Exception Agent**
- Automatic remediation; escalates only on policy breach.

### **🏥 Health/SRE Agent**
- Synthetic probes, SLO checks, freeze/rollback toggles.

### **🔄 DR Agent**
- Backup verify/restore drills, multi-region cutover automation.

---

## **4. Core System Components (What Exists)**

### **🗄️ DB (Supabase / Postgres)**
- `agent_tasks`, `agent_runs`, `agent_logs` (partitioned monthly, 30-day TTL).
- `outbox_events` (durable publish), `dlq_*` + DLQ replay hardening (HMAC+JWT, idempotency, budgets, batch caps).
- `feature_flags_v2` (hierarchical: global→env→tenant) + audit.
- `edge_rate_limits`, `replay_runs`, `stripe_events`, entitlements & usage tables.
- **RLS everywhere**; policies use `is_company_member()`.

### **⚡ Edge Functions**
- `agent-runner` (instrumented, logs, Slack trace links).
- `dlq-replay`, `dlq-admin` (admin UI proxy, v2 signing).
- `roi-intake`, `create-checkout-session`, `stripe-webhook` (idempotent).
- `_shared`: `otel.ts`, `flags.ts`, `signing_v2.ts`, `trace_link.ts`.

### **🌐 Web (Dashboards/Portals)**
- **Autonomous Portal**: LiveFeed (Realtime), MetricsBar (15-min view), trace links.
- **Super-Admin**: Feature flags, DLQ Admin (dry-run first), Traces page (vendor-agnostic).
- **Rates, Directory, CRM, etc.** (role-gated; plan + flag aware).

### **🤖 Automation**
- **n8n workflows**: lead→trial, usage monitors, nightly checks, Slack alerts, Phase-B decommission automation.

### **📊 Observability**
- **OTEL end-to-end** (feature-flagged), span naming (`agent.task.execute` / `agent.fn.*`).
- **Slack error pings** with trace links.
- **k6 thresholds**: p95<2.5s, fail rate <2%, outbox lag p95<5s.

---

## **5. Security & Compliance (Always On)**

### **🔐 AuthZ**
- JWT + RLS; v2 request signing (HMAC + timestamp + nonce; ±5m skew).

### **🚦 Rate Limits**
- Per IP/tenant per function; budgets for replays.

### **🔄 Idempotency**
- Webhooks, replay runs, outbox dedupe window.

### **🔒 Privacy**
- Log redaction (`redact()`), PII guardrails in spans.

### **🛡️ CSP**
- Stripe domains; headers: HSTS, XFO, XCTO, Referrer-Policy, Permissions-Policy.

### **📋 Audit**
- Full trails on flags, admin ops, replay actions; SOC2 evidence scaffolding.

---

## **6. Reliability & Scale**

### **📈 SLOs**
- Uptime ≥99.95%; p95 ≤2.5s; success ≥98%; quarantine <1%.

### **💾 Durability**
- Outbox → multi-target; DLQ auto-snooze/backoff.

### **🎛️ Controls**
- Pause/drain per tenant; kill-switch flags; release freeze on SLO breach.

### **🌍 Multi-region**
- Health-gated routing, 30s probes, auto failover on 3× failures.

### **💿 Storage**
- `agent_logs` partitioning + TTL; hot indexes per partition.

---

## **7. Operations (No Humans in Loop, Humans on Exception)**

### **📅 Day-0**
- Run verification scripts; fire synthetic tasks; confirm realtime + traces + Slack.

### **📅 Day-1/7**
- DR drill, replay proof drill, check budgets, review alerts.

### **📅 Weekly**
- Dependency scan (CodeQL/gitleaks), backup restore test.

### **📅 Monthly**
- Key rotation, partition rotation health, bloat review.

### **📚 Runbooks**
- DLQ replay (dry-run→execute), incident with trace links, canary→50%→100% toggles.

---

## **8. Change Management**

### **🚩 Hierarchical Flags**
- Control all new behavior; default off → canary → cohort → all.

### **🗑️ Decommission**
- Non-production portals via flags (UI guards + 410 stubs + write-freeze).

### **🔒 CI Secure-by-Default**
- Least-priv, concurrency groups, timeouts, post-deploy verify.

---

## **9. API & Contracts (Hard Rules)**

### **✍️ Signed Requests**
- `X-Transbot-Signature`, `X-Transbot-Timestamp`, `X-Transbot-Nonce`.

### **🤖 Agent Task**
```json
{
  "id": "uuid",
  "company_id": "uuid", 
  "fn_name": "string",
  "payload": "jsonb",
  "status": "pending|running|completed|failed",
  "attempts": "integer",
  "next_run_at": "timestamp"
}
```

### **📤 Outbox Event**
```json
{
  "idempotency_key": "string",
  "type": "string", 
  "payload": "jsonb",
  "targets": ["array"],
  "delivered_at": ["array"]
}
```

### **⏱️ SLAs**
- Webhooks ≤2.5s p95; replay ≤50 items/batch; DLQ failure abort >20%.

---

## **10. Testing & Proving**

### **🧪 Smoke**
- Verify deployment, ROI rate-limits, idempotency, CSP, traces.

### **📊 k6**
- P95 latency & error rate thresholds; outbox lag metrics.

### **💥 Chaos**
- Kill handlers / network flaps → zero data loss via outbox+DLQ.

### **🔄 DR**
- Automated weekly drill; RPO<1h, RTO<4h.

---

## **11. Costs & Budgets**

### **💰 Replay Budgets**
- Per tenant/day; OTEL sampling via flags (1–5% default; spike during incidents).

### **🚦 Rate Caps**
- High-cost tools; backoff to protect spend.

### **📊 Usage Meters**
- + upgrade CTAs (overage visibility).

---

## **12. Deployment (No-Drama)**

```bash
# 1. Database
supabase db push

# 2. Edge Functions  
supabase functions deploy (runner, dlq-admin, dlq-replay, shared)

# 3. Web Application
Redeploy web (Autonomous + Super-Admin pages)

# 4. Feature Flags
Enable flags: canary only → observe → expand

# 5. Verification
Run verify scripts (security + operational)

# 6. Monitoring
Monitor Slack + traces + MetricsBar
```

---

## **🚀 Quick "No-Human" Checklist**

### **✅ Pre-Deployment**
- [ ] Flags set: `autonomousAgents`, `obs.otelEnabled` (canary), `ops.dlqAdminUIEnabled` (super-admin only)
- [ ] Webhooks signed (v2), rate limits and budgets active
- [ ] Outbox & DLQ healthy; replay proof drill passes

### **✅ Post-Deployment**
- [ ] Realtime LiveFeed + MetricsBar updating
- [ ] OTEL spans named & linked in Slack; traces open from alerts
- [ ] k6 thresholds green; post-deploy verify job green
- [ ] Multi-region health gate enabled; failover test logged

### **✅ Ongoing**
- [ ] DR drill scheduled; backup verify logged
- [ ] All 250 AI agents active and healthy
- [ ] System uptime ≥99.95%
- [ ] Success rate ≥98%

---

## **🎯 What Happens If Something Fails?**

1. **Agent records exception** (redacted), marks span ERROR, sets HTTP status
2. **Slack ping with trace link** (one click to OTEL)
3. **Outbox retries**; on repeated failure → DLQ with auto-snooze
4. **Exception Agent tries safe remediations** → if policy cannot be met, escalates to human with full context

---

## **🏗️ Implementation Status**

### **✅ Completed**
- [x] Autonomous Portal UI
- [x] 250 AI Agent Framework
- [x] 20+ Portal System
- [x] Real-time Metrics Dashboard
- [x] System Health Monitoring
- [x] OTEL Integration
- [x] Feature Flags System
- [x] Security & Compliance Framework

### **🚧 In Progress**
- [ ] Full Agent Implementation
- [ ] n8n Workflow Integration
- [ ] DLQ System
- [ ] Multi-region Setup
- [ ] Advanced Analytics

### **📋 Next Steps**
- [ ] Deploy to production
- [ ] Enable autonomous agents
- [ ] Monitor system health
- [ ] Scale based on usage

---

**That's the whole machine — from first byte to final invoice, 24/7, no humans in the loop unless policy requires.** 🚀
