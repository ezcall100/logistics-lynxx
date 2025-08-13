# Phase 6 — Scale & Monetize (90-Day Plan)

## 0) North-Star Targets

### Reliability
- 99.95% app uptime
- Agent success ≥ 99% rolling hour

### Growth
- Trial→Paid ≥ 25%
- Net MRR +12% MoM

### Product
- Quote→Book ≥ 28%
- Directory invite→onboard ≥ 25%

### Security
- SOC 2 Type II audit window opened
- 0 critical findings

## 1) Multi-Region & Resilience (Weeks 1–4)

### Deliverables
- Active/standby topology (primary + read replica in secondary region)
- Stateless app deploys to both regions; edge functions mirrored
- Object storage dual-region (docs/PODs) + signed URLs
- Failover runbook + game-day ("primary DB loss", "OpenAI degraded")

### Acceptance Tests
- Planned failover ≤ 15 min RTO; RPO ≤ 5 min
- Read latency from secondary < 150ms p95
- Rate quote p95 stays ≤ 600ms during failover window

### Runbook Essentials
- Traffic shift: 10% → 50% → 100% (feature flag)
- Write freeze during cutover; background jobs paused & drained
- Post-cutover integrity: invoice counts, queue depth, error rates

## 2) Monetization at Scale (Weeks 1–6)

### Plans
- **Starter**: spot rating + directory search (soft caps)
- **Pro**: contracts, bulk rating (metered), invites/lists
- **Enterprise**: SSO/SAML, custom SLAs, dedicated support, data residency

### Meters & Limits
- quotes/month, bulk_jobs/day, directory_invites/month
- Hard stop + "request increase" flow + in-app upgrade CTA

### Checkout & Dunning
- Stripe portal + webhooks → entitlement updater
- Discount guardrails: max % by term (annual/prepay) + approval matrix

### KPIs
- ARPA uplift vs. Phase 4 baseline
- Overage revenue share of MRR (goal 8-12%)

## 3) Enterprise GTM (Weeks 1–12)

### Sales Motions
- **Design-Partner Program 2.0**: 5 lighthouse accounts, quarterly roadmap reviews
- **Proof-of-Value (POV)**: 30-day playbook with entrance/exit criteria
- **ROI Calculator**: inputs (lane count, quote volume, avg rate, win rate); export to PDF

### Enablement Kit
- Security pack (SOC, RLS architecture, DR)
- TCO one-pager vs. incumbent TMS
- Demo scripts: Rates (spot→contract→book), Directory (invite→onboard→scorecard)

### Funnel
- Public Rate Calculator → trial → guided onboarding → "first quote sent" within 24h
- SDR playbook for leads with ≥3 quotes or ≥2 bulk jobs in 72h

## 4) Data/AI Excellence (Weeks 2–10)

### Pricing Model Registry
- Versioned models, rollback, A/B (10% traffic)
- Guardrails: min margin, regional caps, anomaly alerts (variance > ±10%)

### Directory Enrichment
- Compliance freshness score; auto-reminders

### Executive Dashboards
- SLO card (uptime, agent success, p95)
- Conversions (trial→paid, quote→book)
- Revenue (ARPA, overage, churn, NRR)

### Ops Queries (drop-in)

```sql
-- Agent success last 60 min
select round((count(*) filter (where status='success')::numeric / nullif(count(*),0))*100,2) as success_pct
from agent_tasks 
where updated_at > now() - interval '60 minutes';

-- Quote variance vs. actual (last 30d)
select avg(abs((actual - proposed_rate)/nullif(proposed_rate,0))) as avg_abs_variance
from invoice_pricing_view 
where created_at > now() - interval '30 days';
```

## 5) Security, Compliance & Trust (Weeks 1–12)

### SOC 2 Type II
- Start evidence collection cadence (weekly snapshots)
- Key rotation: OpenAI/n8n 30-day; service role 90-day
- DSR automation: export/delete within 7 days; run monthly drills
- Pen-test: schedule T+30 days; fix SLA ≤ 14 days

### Hardening Adds
- Secret scanning pre-merge; SBOM & dependency alerts
- Production DB read replica for analytics (no direct prod reads)

## 6) Product & CX (Weeks 1–8)

### First-Run Success
- "time-to-value < 1 day" checklist (send quote, invite partner, book first load)

### Support SLAs
- P1 < 4h; P2 < 1bd; n8n SEV alerts auto-create tickets

### NPS & Churn Loop
- day-21 (trial), day-90 (paid) with save-playbooks

## 7) 30/60/90 Owner Map

### 30 days
- Multi-region pilot complete; canary flip 25%
- Checkout + dunning live; ROI calculator launched
- Exec dashboard in weekly leadership review

### 60 days
- 100% multi-region; zero-downtime migrations drill passed
- Two pricing experiments shipped; overage revenue > 5% MRR
- Three design partners signed to annual

### 90 days
- SOC 2 Type II evidence window closed; pen-test remediated
- Trial→Paid ≥ 25%; quote→book ≥ 28%; uptime ≥ 99.95%

## 8) Top 10 Risks & Mitigations

1. **Model drift → bad pricing** → weekly backtests; rollback button
2. **Queue spikes** → auto-scale runners; rate-limit bulk jobs per tenant
3. **Cross-tenant leak** → RLS probe in post-deploy verify (already wired)
4. **API keys exposed** → rotate + runtime checks; block deploy if missing vars
5. **n8n credential failure** → health yellow + auto-retry + Slack page
6. **Overage backlash** → visible meter, warnings at 80/90/100%
7. **Slow quotes** → cache hot lanes; precompute seasonality tables
8. **Large file costs** → lifecycle rules; archive older docs to cold storage
9. **Sales stall** → POV playbooks; exec-sponsored design partners
10. **Audit gap** → weekly evidence sweep; owner per control

## 9) Two PRs to Open Today

### PR #1: Multi-Region Feature Flag + Health Gate
- `REGION_ACTIVE=primary|secondary`
- Router middleware: if secondary unhealthy → pin users to primary

### PR #2: Overage Visibility
- Meter banner + "request limit increase" drawer
- Nightly job to create notify_ops task on breach

## 10) Customer-Facing SLAs (ready to copy)

- **Uptime**: 99.95% monthly
- **Support**: P1 < 4h, P2 < 1bd, P3 < 3bd
- **Data export**: on request within 7 days
- **RTO**: ≤ 30 min, RPO ≤ 15 min

## Implementation Checklist

### Week 1-2: Foundation
- [ ] Multi-region database setup
- [ ] Feature flag system for region routing
- [ ] Health monitoring for both regions
- [ ] Overage visibility UI components

### Week 3-4: Multi-Region Cutover
- [ ] Failover runbook creation
- [ ] Game day execution
- [ ] Traffic shifting implementation
- [ ] Performance validation

### Week 5-6: Monetization
- [ ] Stripe integration for overage billing
- [ ] Usage meter implementation
- [ ] Upgrade CTA placement
- [ ] Dunning flow setup

### Week 7-8: Enterprise Features
- [ ] ROI calculator
- [ ] POV playbook
- [ ] Security pack documentation
- [ ] Demo script creation

### Week 9-10: Data & Analytics
- [ ] Pricing model registry
- [ ] Executive dashboard enhancements
- [ ] A/B testing framework
- [ ] Anomaly detection

### Week 11-12: Compliance & Polish
- [ ] SOC 2 Type II evidence collection
- [ ] Pen-test scheduling
- [ ] Final performance optimization
- [ ] Go-live preparation
