# Standing Order A-1 — Trans Bot AI (Autonomous Mode)

## **🤖 Autonomous Agent Standing Order**
*Definitive operational specification for 24/7 no-human TMS operations*

---

## **0) Golden Rules (apply to every task)**

### **🔐 Flags First (PR-101)**
- Resolve global → env → tenant hierarchy
- If blocked → no-op + `FF_BLOCKED` log
- Never bypass feature flags

### **🛡️ Identity & Scope**
- Require JWT (role) + v2 HMAC (timestamp+nonce)
- Carry `company_id` in all reads/writes
- Enforce RBAC on privileged mutations

### **🔄 Idempotency**
- Check event/outbox keys before external side-effects
- Dedupe Stripe/EDI webhooks
- Use idempotency table with 10-min window

### **🔒 RLS-Safe**
- Never bypass tenant RLS outside service-role edge paths
- All operations company-scoped
- Audit trail for all changes

### **📊 Durability**
- Write → commit → publish via Outbox
- On failure → DLQ (auto-snooze/backoff)
- Circuit-break if ≥20% immediate fails

### **📈 Observability**
- Root span: `agent.task.execute`
- Function spans: `agent.fn.<domain>.<action>`
- Record errors with context
- Attach trace links in Slack

### **🎯 SLO Gates**
- Target: uptime ≥99.95%, success ≥98%, p95 ≤2.5s
- Breach → throttle, open incident, flip canaries off
- Quarantine rate <1%

---

## **1) End-to-End Flows (canonical)**

### **A) Quote → Book → Bill**
**Start**: ROI/Quote form, Broker request, API/EDI-204

**Do**: Normalize → Price (`rates.price_one`) → Offer/Tender (204) → Book (990 ack) → Track (214) → POD/OCR → Invoice (210) → AR/Factoring

**Finish**: `load=closed`, `invoice=paid`, analytics written

**Fail**: DLQ + backoff; circuit-break lane if ≥20% immediate fails

### **B) Carrier Onboard → Live**
**Start**: Application/KYC

**Do**: Docs verify → compliance score → integrations → trial load

**Finish**: `carrier=active` + lanes enabled

### **C) Exception → Auto-Remediate**
**Start**: SLA/ETA anomaly

**Do**: classify → re-tender/re-route/re-price → notify

**Finish**: `exception.resolution=success` or quarantine + alert

### **D) DR / Multi-Region**
**Start**: health-gate fail 3×/30s

**Do**: flip region flag, drain, replay outbox

**Finish**: secondary green; post incident

---

## **2) Portal Tasks (20 canonical) — Start → Do → Finish (one-liners)**

### **👑 Super Admin**
- **Start**: config change
- **Do**: write `companies`/`flags`/`audit`
- **Finish**: change audited + propagated

### **⚙️ Admin**
- **Start**: invite/role/key
- **Do**: update `profiles`/`roles`/`api_keys`
- **Finish**: auth passes, keys rotated

### **🏢 TMS Admin**
- **Start**: lane/contract/guardrail
- **Do**: write `lanes`/`contracts`/`pricing_guards`
- **Finish**: guardrails enforced

### **🚀 Onboarding**
- **Start**: step submit/import
- **Do**: mark `onboarding_steps` + connect
- **Finish**: `onboarding.complete=true`

### **🏢 Broker**
- **Start**: quote/tender/book
- **Do**: create `quotes`/`loads`/`docs` + EDI
- **Finish**: booked + invoiced

### **📦 Shipper**
- **Start**: self-serve quote/order
- **Do**: `shipper_orders` + tracking
- **Finish**: delivered + paid

### **🚛 Carrier**
- **Start**: bid/accept/capacity
- **Do**: `carrier_bids`/`capacity`/`coi`
- **Finish**: award + on-time delivery

### **🚗 Driver**
- **Start**: stop/POD/status
- **Do**: `stop_events`/`pod_docs`
- **Finish**: signed POD accepted

### **🚚 Owner Operator**
- **Start**: revenue/costs
- **Do**: `settlements`/`fleet_costs`
- **Finish**: weekly payout cleared

### **💰 Factoring**
- **Start**: package/submit
- **Do**: `factoring_submissions`/`ar_status`
- **Finish**: funded + reconciled

### **📋 Load Board**
- **Start**: post/bid/award
- **Do**: `market_posts`/`bids`
- **Finish**: fill rate ≥ target

### **👥 CRM**
- **Start**: account/opp/activity
- **Do**: `accounts`/`opportunities`
- **Finish**: win/lose updated

### **💳 Financials**
- **Start**: invoice/AP/GL
- **Do**: `invoices`/`ap`/`gl_events`
- **Finish**: DSO within target; payouts on time

### **📡 EDI**
- **Start**: 204/990/214/210
- **Do**: `edi_messages` + ACK chain
- **Finish**: no NAKs outstanding

### **🛒 Marketplace**
- **Start**: install/webhook
- **Do**: `installations`/`webhooks`
- **Finish**: healthy app checks

### **📊 Analytics**
- **Start**: refresh views
- **Do**: read materialized views
- **Finish**: KPIs green or open ticket

### **🤖 Autonomous**
- **Start**: queue/DLQ/quarantine
- **Do**: `agent_tasks`/`agent_logs`/`dlq_*`
- **Finish**: success ≥98%, quarantine <1%

### **👷 Workers**
- **Start**: schedule/assign
- **Do**: `work_shifts`/`work_assignments`
- **Finish**: backlog under threshold

### **💰 Rates**
- **Start**: instant price/contract index
- **Do**: `rate_cards`/`indices`
- **Finish**: guardrails OK, margin ok

### **📚 Directory**
- **Start**: verify/KYC/safety
- **Do**: `partners`/`verifications`
- **Finish**: partner usable

### **🧪 Testing**
- **Start**: test/validate/verify
- **Do**: `test_results`/`test_metrics`
- **Finish**: tests pass, coverage maintained

---

## **3) Website (50 pages) → Events → Agents**

### **Conversion Pages (Critical)**
- **`/roi`** → `lead.roi_submitted` → score → n8n route → trial/checkout link
- **`/trial`** → Stripe → entitlements → flags on
- **`/checkout`** → session → webhook → plan set
- **`/contact`**, **`/demo`** → `lead.contact|demo` → CRM + Slack

### **Hubs & Content (Features/Solutions/Resources)**
- Emit `content.view` with UTM; enrich CRM timeline; nudge nurture automations
- **`/resources/api/*`** → emit `dev.intent` → open API key draft (flag-gated)

### **All Pages**
- Respect CSP; no PII in logs
- Push web events to Outbox → n8n for downstream

---

## **4) Schedules (autonomous)**

### **30s**
- Health probe, queue depth, SLO check
- Throttle if breach

### **5m**
- DLQ retry (≤50 items, 2MB cap, stop if >20% immediate fails)

### **Hourly**
- Guardrail drift, index refresh, ETL ticks

### **Daily 03:00**
- Partitions rotate, TTL cleanup (30d), budget reset

### **Weekly**
- DR drill (dry-run), security scans, portal 410 drift audit

### **Monthly**
- Restore test, flag hygiene, cost review

---

## **5) Alerts (auto ticket + Slack with trace link)**

### **PAGE**
- Outbox lag p95>5s (15m)
- DLQ replay fail>40%
- Success<95%
- Checkout error surge
- EDI NAK storm

### **WARN**
- 410 hits>50/hr/tenant
- Contract guardrail violations
- Tracking gaps

### **INFO**
- Flag changes
- Plan changes
- DR drill pass

---

## **6) Safety & Budgets**

### **Per-Tenant Budgets**
- Replays/expensive ops enforced via flags
- Rate limits: ROI 10/min, checkout 5/min, DLQ replay 3/5m (tenant+IP)
- Replay requires v2 signature + nonce
- Idempotency table enforces 10-min window

---

## **7) Incident Automations**

### **SLO Breach**
- Halve concurrency, disable canaries, open incident
- Attach runbook + trace link

### **Partner Down**
- Circuit-break, queue locally, escalate after 15m

### **Data Drift**
- Revert flag set, quarantine new writes, page owner

---

## **8) "Done" Invariants (end points the agents must satisfy)**

### **Every Business Flow Ends With**
- Correct ledger entries
- Audit log written
- Spans closed with status
- Analytics updated

### **Every External Call**
- Originates from Outbox entry with idempotency
- Either ACK or DLQ record

### **Every Error**
- Has trace link
- Redacted context
- Retry or quarantine disposition

---

## **🎯 Success Metrics**

### **Operational Excellence**
- **Uptime**: ≥99.95%
- **Success Rate**: ≥98%
- **P95 Latency**: ≤2.5s
- **Quarantine Rate**: <1%

### **Business Metrics**
- **Quote-to-book**: ≥85%
- **On-time delivery**: ≥95%
- **Invoice accuracy**: ≥99%
- **Customer satisfaction**: ≥4.5/5

---

**🎯 This Standing Order enables autonomous agents to operate the entire Trans Bot AI platform end-to-end, 24/7, with zero human intervention while maintaining security, compliance, and operational excellence.**

**📌 PINNED IN /autonomous — Execute immediately**
