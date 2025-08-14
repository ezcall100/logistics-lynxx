# Master Operating Spec — Trans Bot AI (Agents Edition)

## **🤖 Autonomous Agent Operating Specification**
*Complete end-to-end operational guide for 24/7 no-human TMS operations*

---

## **A. Global Operating Rules (apply to every task)**

### **🔐 Security & Compliance**
- **Always honor flags**: Resolve with PR-101 hierarchy → global → env → tenant
- **Idempotency first**: Check de-dup tables / idempotency_key before writing or dispatching external calls
- **Security**: Require v2 timestamped signing (PR-102), ±5min skew, nonce replay guard, and JWT role checks
- **Never log PII**: Use `redact()` function for sensitive data

### **🛡️ Access Control**
- **RLS & RBAC**: All DB reads/writes must include `company_id` scope
- **Enforce role policies** on privileged mutations
- **Company-scoped lookups** for all operations

### **🔄 Durability & Reliability**
- **Durability**: Publish external side-effects via Outbox → n8n/HTTP/Slack
- **Error handling**: On error route to DLQ, auto-snooze with backoff
- **Circuit breakers**: If 20% immediate fail, circuit-break lane

### **📊 Observability**
- **Create root span**: `agent.task.execute`
- **Name function spans**: `agent.fn.<domain>.<action>` (PR-107.2)
- **On exceptions**: Record error and set span status=ERROR
- **Include metadata**: `tenant.id`, `agent.task_id`, `agent.fn_name`
- **Attach trace links** in Slack (PR-107.1)

### **🎯 SLO Gates**
- **Success rate**: If `success_rate(15m) < 98%`, reduce sampling/throughput
- **Latency**: If `p95 > 2.5s`, flip canary flag off and alert
- **Cost limits**: Respect per-tenant budgets and replay throttles
- **Budget exceeded**: Emit `BUDGET_EXCEEDED` and schedule for next window

---

## **B. End-to-End Flows (start→finish)**

### **1) Quote → Book → Bill (Core Flow)**
**Start**: Website ROI/Quote form, Broker portal request, API/EDI-204

**Steps**:
1. **Normalize Intake** (EDI/email/API/portal) → `intake.normalized` (Outbox)
2. **Price** (`rates.price_one`) with flags + guardrails → candidate quote
3. **Offer & Tender** (204 to carrier, or marketplace) → await 990
4. **Book** → create load, assign carrier, publish 214 tracking plan
5. **Execute** → status updates, ETA, exceptions self-heal
6. **Docs** → POD/OCR, fraud checks
7. **Invoice** (210) → factoring/AR route; post to Financials

**End**: `load.state = closed` + `invoice.state = paid` + analytics write

**Fail path**: DLQ with auto-snooze; if 20% immediate fail, circuit-break lane

### **2) Carrier Onboard → Live**
**Start**: Directory/Carrier portal application (KYC, COI, W-9)

**Steps**: Validate docs → compliance score → connect EDI/telematics → trial load

**End**: `carrier.status = active` + allowed lanes set; publish to Rates/Marketplace

### **3) Exception → Auto-Remediate**
**Start**: Signal from tracking, SLA miss, or anomaly

**Steps**: classify → remediate (re-tender, re-price, re-route, notify) → confirm SLO

**End**: `exception.resolution = success` + post-mortem note; else quarantine & alert

### **4) DR / Multi-region Failover**
**Start**: Health gate fails 3×/30s

**Steps**: flip feature flag to secondary region, drain queues, replay outbox

**End**: green metrics in secondary; create DR incident record

---

## **C. Portal-by-Portal Task Map (20 canonical)**

### **👑 Super Admin**
- **Entry**: `/super-admin/*`
- **Tasks**: tenant provisioning, global flags, billing plans, SOC2 evidence, traces page
- **Writes**: `companies`, `feature_flags_v2`, `audit_log`
- **External**: Stripe, OTEL
- **Success**: changes audited, flags propagated
- **Alerts**: policy/flag drift, failed evidence sync

### **⚙️ Admin**
- **Entry**: `/admin/*`
- **Tasks**: user invites, RBAC, MFA/SSO, API keys
- **Writes**: `profiles`, `roles`, `api_keys`
- **Success**: user state consistent, keys rotated
- **Alerts**: auth failures spike, key misuse

### **🏢 Broker**
- **Entry**: `/broker/*`
- **Tasks**: quote, tender, book, docs, customer comms
- **Writes**: `quotes`, `loads`, `documents`
- **External**: EDI 204/990/214/210
- **Success**: booked, on-time, invoiced
- **Alerts**: tender rejection spikes, aging unbooked quotes

### **📦 Shipper**
- **Entry**: `/shipper/*`
- **Tasks**: self-serve quotes/book, docs, track, pay
- **Writes**: `shipper_orders`
- **Success**: order→load linked, invoice paid
- **Alerts**: failed payments, track gaps

### **🚛 Carrier**
- **Entry**: `/carrier/*`
- **Tasks**: bids, accept, capacity updates, compliance
- **Writes**: `carrier_bids`, `capacity`, `coi`
- **Success**: award, on-time pickup/delivery
- **Alerts**: expired COI, capacity stale

### **🚗 Driver**
- **Entry**: `/driver/*`
- **Tasks**: stops, POD, status scans, nav assist
- **Writes**: `stop_events`, `pod_docs`
- **Success**: signed POD, clean proof
- **Alerts**: missed scans, rejected POD

### **🚚 Owner Operator**
- **Entry**: `/owner-operator/*`
- **Tasks**: pipeline, revenue, maintenance, payouts
- **Writes**: `settlements`, `fleet_costs`
- **Success**: weekly payout cleared
- **Alerts**: negative margin, payout delays

### **💰 Factoring**
- **Entry**: `/factoring/*`
- **Tasks**: invoice packages, UCC check, status sync
- **Writes**: `factoring_submissions`, `ar_status`
- **External**: factor APIs
- **Success**: funded, status reconciled
- **Alerts**: chargeback risk, doc rejection

### **📋 Load Board**
- **Entry**: `/load-board/*`
- **Tasks**: publish loads, intake bids, SLAs
- **Writes**: `market_posts`, `market_bids`
- **Success**: fill rate, SLA met
- **Alerts**: stale posts, ghost bids

### **👥 CRM**
- **Entry**: `/crm/*`
- **Tasks**: accounts, contacts, opps, activities
- **Writes**: `accounts`, `opportunities`
- **Success**: MQL→SQL→Won; handoffs complete
- **Alerts**: stuck opps, churn signals

### **💳 Financials**
- **Entry**: `/financials/*`
- **Tasks**: AR/AP, invoicing, settlements, payouts
- **Writes**: `invoices`, `ap`, `gl_events`
- **External**: Stripe/Xero/QB
- **Success**: DSO within target, payout SLA met
- **Alerts**: failed payouts, aging AR

### **📡 EDI**
- **Entry**: `/edi/*`
- **Tasks**: 204/990/214/210, ACKs, retry
- **Writes**: `edi_messages`, `edi_partner`
- **Success**: end-to-end ACK chain
- **Alerts**: NAK spikes, partner latency

### **🛒 Marketplace**
- **Entry**: `/marketplace/*`
- **Tasks**: app integrations discovery & install
- **Writes**: `installations`, `webhooks`
- **Success**: app healthy, events delivered
- **Alerts**: failed webhooks, version drift

### **📊 Analytics**
- **Entry**: `/analytics/*`
- **Tasks**: exec dashboards, SLOs, funnels
- **Reads**: materialized views
- **Success**: KPIs within targets
- **Alerts**: SLO burn, conversion dips

### **🤖 Autonomous**
- **Entry**: `/autonomous/*`
- **Tasks**: queue mgmt, live feed, quarantine, DLQ admin
- **Writes**: `agent_tasks`, `agent_logs`, `dlq_*`
- **Success**: success≥98%, quarantine<1%
- **Alerts**: outbox lag, replay failure >40%

### **👷 Workers**
- **Entry**: `/workers/*`
- **Tasks**: internal taskforce scheduling & loadbal
- **Writes**: `work_shifts`, `work_assignments`
- **Success**: backlog under threshold
- **Alerts**: utilization anomalies

### **💰 Rates**
- **Entry**: `/rates/*`
- **Tasks**: instant pricing, contracts, indices
- **Writes**: `rate_cards`, `indices`
- **Success**: guardrails respected, margin ok
- **Alerts**: outlier prices, stale indices

### **📚 Directory**
- **Entry**: `/directory/*`
- **Tasks**: discover/verify partners, KYC, safety
- **Writes**: `partners`, `verifications`
- **Success**: verified partner usable in ops
- **Alerts**: expired docs, failed verification

### **🧪 Testing**
- **Entry**: `/testing/*`
- **Tasks**: agent testing, development, performance testing
- **Writes**: `test_results`, `test_metrics`
- **Success**: tests pass, coverage maintained
- **Alerts**: test failures, coverage drops

---

## **D. Public Website — 50-Page Sitemap (events → agents)**

### **Top-level**
- `/` Home → `lead.viewed_home`
- `/pricing`
- `/features` (hub)
- `/roi` (calculator) → `lead.roi_submitted`
- `/contact` → `lead.contact_submitted`
- `/demo` → `lead.demo_requested`
- `/status`
- `/security`
- `/changelog`
- `/legal/terms`
- `/legal/privacy`
- `/about`
- `/careers`
- `/partners`
- `/integrations` (hub)

### **Features (12)**
- `/features/broker`
- `/features/shipper`
- `/features/carrier`
- `/features/rates`
- `/features/edi`
- `/features/autonomous`
- `/features/analytics`
- `/features/marketplace`
- `/features/financials`
- `/features/crm`
- `/features/onboarding`
- `/features/security`

### **Solutions by Industry (8)**
- `/solutions/retail`
- `/solutions/manufacturing`
- `/solutions/3pl`
- `/solutions/food-beverage`
- `/solutions/automotive`
- `/solutions/energy`
- `/solutions/healthcare`
- `/solutions/ecommerce`

### **Resources (10)**
- `/resources` (hub)
- `/resources/blog`
- `/resources/guides/quote-to-cash`
- `/resources/guides/edi-101`
- `/resources/case-studies`
- `/resources/webinars`
- `/resources/api` (docs hub)
- `/resources/api/auth`
- `/resources/api/rates`
- `/resources/api/loads`

### **Conversion (5)**
- `/trial` → `lead.trial_started` (Stripe+entitlements)
- `/checkout` → Stripe session
- `/thank-you`
- `/newsletter` → `lead.subscribed`
- `/roi/share/:id` (HTML summary) → `lead.shared_roi`

### **Agent handling of website events**
- **Intake**: website → Edge `roi-intake`, `create-checkout-session`, `contact-intake`
- **n8n**: route lead to AE/SDR with lead score, open trial, notify Slack, create CRM record
- **Entitlements**: Stripe webhook → org plan + feature flags
- **Analytics**: UTM capture → funnel views

---

## **E. Start & End Points (quick index)**

| Domain | Start (examples) | End (success) |
|--------|------------------|---------------|
| Pricing | ROI form, Broker quote, API | Quote committed + guardrails ok |
| Tender/Book | 204 send, marketplace bid | 990 ack + load booked |
| Execute/Track | 214 plan, telematics ingest | On-time delivery |
| Docs/Billing | POD/OCR, 210 | Invoice paid or factored |
| Exceptions | SLA/ETA breach | Auto-remediation complete |
| Onboarding | Wizard step 1 | `onboarding.complete=true` |
| DR/Failover | Health gate fail | Secondary region green |

---

## **F. Autonomous Schedules (no-human)**

### **Every 30s**
- Health probe, multi-region gate, agent queue depth

### **Every 5m**
- DLQ replay budget window, retry small batches

### **Hourly**
- Guardrail drift scan, stale indices refill, analytics ETL

### **Daily**
- Rotate partitions, TTL cleanup, key rotation reminders

### **Weekly**
- DR drill dry-run; security scans; portal 410 drift audit

### **Monthly**
- Restore test; cost & SLO review; feature flag hygiene

---

## **G. Alerting Matrix (open ticket + Slack)**

### **PAGE**
- Outbox lag p95 > 5s (15m)
- DLQ replay fail > 40%
- Success < 95% (15m)
- Checkout errors spike
- EDI NAK storm

### **WARN**
- 410 hits > 50/hr/tenant
- Contract guardrail violation
- Stale tracking

### **INFO**
- Feature flag change
- Plan upgrade/downgrade
- DR drill passed

---

## **H. Agent "Do/Don't" Checklist**

### **✅ Do**
- Validate inputs (Zod), respect rate limits, use idempotency keys
- Write via outbox for side-effects; fall back to DLQ on failure
- Attach `trace_id` to DB rows; include trace links in errors
- Enforce RLS and RBAC on every call

### **❌ Don't**
- Don't log PII (email, names, URLs)
- Don't bypass flags/DR gates
- Don't write directly to external systems without outbox

---

## **I. Success Criteria**

### **🎯 Operational Excellence**
- **Uptime**: ≥99.95%
- **Success Rate**: ≥98%
- **P95 Latency**: ≤2.5s
- **Quarantine Rate**: <1%

### **🔒 Security & Compliance**
- **Zero PII leaks**: All sensitive data redacted
- **100% RLS compliance**: All DB operations company-scoped
- **Audit trail complete**: All changes logged and traceable

### **💰 Business Metrics**
- **Quote-to-book conversion**: ≥85%
- **On-time delivery**: ≥95%
- **Invoice accuracy**: ≥99%
- **Customer satisfaction**: ≥4.5/5

---

**🎯 This specification enables your autonomous agents to operate the entire Trans Bot AI platform end-to-end, 24/7, with zero human intervention while maintaining security, compliance, and operational excellence.**
