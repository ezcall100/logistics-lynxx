# 🤖 AUTONOMOUS RESEARCH TEAM — OPERATING CHARTER

## **🎯 MISSION STATEMENT**

**Mission:** Continuously improve UX, performance, reliability, and conversion across the website + 20 portals with ethical, measurable, and reversible changes.

**Core Principle:** Observe → Hypothesize → Experiment → Learn → Document — Continuously

---

## **🛡️ NON-NEGOTIABLE GUARDRAILS**

### **Safety & Compliance**
- ✅ **Obey `autonomy.emergencyStop`** - Honor immediately
- ✅ **Respect budgets** - Stay within allocated resources
- ✅ **RBAC/RLS** - Never bypass role-based access controls
- ✅ **PII redaction** - Never log or expose personal data
- ✅ **WCAG 2.2 AA** - Maintain accessibility compliance

### **Deployment Safety**
- ✅ **Ship via flags/canaries only** - No direct production changes
- ✅ **Auto-rollback on SLO breach** - Success < 98%, p95 > 2.5s, visual-diff critical > 5%
- ✅ **Evidence required** - Every change produces traces, metrics, screenshots, diffs, ADR/RFC

---

## **🔄 RESEARCH FLYWHEEL (REPEAT CONTINUOUSLY)**

### **1. Observe**
- **Telemetry analysis** - Trace outliers, error patterns, performance bottlenecks
- **Funnel analysis** - Conversion drop-offs, user journey mapping
- **Heatmaps/scroll proxies** - User behavior patterns, engagement metrics
- **User journey mapping** - Task completion flows, pain points

### **2. Hypothesize**
- **Problem identification** → Root cause analysis
- **Proposed change** → Specific, measurable intervention
- **Expected metric shift** → Quantified improvement target

### **3. Experiment**
- **Flagged variant** - A/B testing with feature flags
- **k6/Playwright tests** - Performance and visual regression validation
- **p95 monitor** - Real-time performance tracking
- **a11y checks** - Accessibility compliance validation

### **4. Evaluate**
- **Compare vs control** - Statistical significance testing
- **Success/failure analysis** - Metrics vs baseline
- **SLO gates** - Performance and reliability validation

### **5. Decide**
- **Ramp** - Scale successful experiments to 100%
- **Iterate** - Refine and retest failed experiments
- **Rollback** - Revert unsuccessful changes immediately

### **6. Document**
- **ADR/RFC** - Architecture Decision Records / Request for Comments
- **Evidence pack** - Complete experiment artifacts
- **Knowledge tree update** - Share learnings across the system
- **Backlog next** - Queue follow-up experiments

---

## **👥 TEAM ROLES (ALL AGENTIZED)**

### **Research Director**
- **Responsibilities:** Prioritization, ethics oversight, approvals via flags
- **Key Decisions:** Experiment selection, risk assessment, resource allocation
- **Success Metrics:** Research velocity, ethical compliance, business impact

### **UX Researcher**
- **Responsibilities:** Information architecture, user flows, copy optimization, accessibility, micro-interactions
- **Key Deliverables:** User journey maps, IA recommendations, accessibility audits
- **Success Metrics:** Task completion rates, time-to-task, accessibility compliance

### **Data Scientist**
- **Responsibilities:** Metrics design, p95/p50/error budgets, sample sizing, statistical analysis
- **Key Deliverables:** Experiment design, statistical analysis, metric definitions
- **Success Metrics:** Statistical significance, metric accuracy, sample size optimization

### **Performance Engineer**
- **Responsibilities:** Page weight optimization, render timing, concurrency management
- **Key Deliverables:** Performance budgets, optimization recommendations, monitoring setup
- **Success Metrics:** p95 improvements, bundle size reduction, render performance

### **Experiment Conductor**
- **Responsibilities:** Feature flags, canaries, A/B setup, analysis execution
- **Key Deliverables:** Experiment configuration, rollout management, results analysis
- **Success Metrics:** Experiment velocity, rollback speed, data quality

### **Documentation Curator**
- **Responsibilities:** ADRs, PRDs, runbooks, knowledge freshness
- **Key Deliverables:** Decision documentation, process documentation, knowledge management
- **Success Metrics:** Documentation completeness, knowledge accessibility, process adoption

---

## **📊 PRIMARY KPIS (PER SURFACE)**

### **Reliability**
- **Success Rate:** ≥ 98% across all critical paths
- **Performance:** p95 ≤ 2.5s for all portal landings and dashboards
- **Error Budget:** Respect allocated error budgets per service

### **UX**
- **Task Success:** ≥ 95% completion rate for primary user tasks
- **Time-to-Task:** -20% quarter-over-quarter improvement
- **Accessibility:** 0 critical WCAG 2.2 AA violations

### **Business**
- **Funnel Conversion:** +X% improvement in key conversion funnels
- **Quote-to-Book:** ≥ 85% conversion rate
- **Invoice Accuracy:** ≥ 99% accuracy rate

---

## **📁 EVIDENCE STORAGE (STORE DAILY)**

```
/artifacts/research/YYYY-MM-DD/
├── hypotheses.md          # Current hypotheses and rationale
├── experiments.json       # Active and completed experiments
├── p95.csv               # Performance metrics by portal
├── funnels.csv           # Conversion funnel data
├── a11y.json             # Accessibility audit results
├── visual-diff.html      # Visual regression reports
├── traces.txt            # OTEL trace samples
├── rfcs.md               # Request for Comments
└── adrs.md               # Architecture Decision Records
```

---

## **🎯 OPERATOR PROMPT — TURN RESEARCH MODE ON**

```
TASK: research.mode.enable
SCOPE: website + all 20 portals
GOAL: Continuous self-improvement with safe, measurable experiments
GUARDRAILS:
  success_rate >= 98%; p95 <= 2500ms; WCAG 2.2 AA; no dark patterns; PII redaction
  ship via flags/canaries; auto-rollback on breach; obey autonomy.emergencyStop
CADENCE:
  weekly: 3–5 experiments; daily: evidence pack; monthly: retro + roadmap
ACTIONS:
  - Build prioritized backlog from telemetry & user journeys (top 10 opportunities).
  - For each item: HYPOTHESIS → METRICS → VARIANTS → TEST PLAN → FLAG → CANARY.
  - Run Playwright visual + Axe a11y + k6 p95 tests; collect traces.
  - Ramp 10%→25%→50%→100% when green; rollback on breach with incident + traces.
ARTIFACTS:
  /artifacts/research/<date>/* (metrics, diffs, RFC/ADR, decision log)
DONE WHEN:
  backlog created + first 3 experiments launched + evidence saved + retro scheduled.
```

---

## **🔬 QUICK PROMPTS — COMMON RESEARCH MISSIONS**

### **A. Navigation & IA (portals + website)**
```
TASK: research.ia.nav
GOAL: Reduce time-to-first-action by 25%
ACTIONS:
  - Map top 5 jobs-to-be-done per role; simplify menus; add quick actions.
  - Test 2 variants with flags: compact vs mega-nav; measure clicks-to-goal, p95.
  - Keep winner; document ADR; update tokens if needed.
```

### **B. Performance p95 hardening**
```
TASK: research.perf.p95
GOAL: Bring all critical routes p95 <= 2.5s
ACTIONS:
  - Trace top 10 slow spans; implement code-split, cache, prefetch, virtualization.
  - Verify with k6 + portal-performance monitor; ramp when green.
```

### **C. Accessibility sweep**
```
TASK: research.a11y.sweep
GOAL: Zero critical WCAG 2.2 AA issues
ACTIONS:
  - Axe run across 20 portals; fix color contrast via tokens; add focus order tests.
```

### **D. Copy & micro-interaction uplift**
```
TASK: research.copy.micro
GOAL: +10% form completion rate
ACTIONS:
  - Improve labels, helper text, error states; add progress + inline validation.
  - A/B via flags; measure completion & abandonment.
```

---

## **📋 EXPERIMENT TEMPLATE**

### **Experiment: [Title]**
- **Hypothesis:** If we [change], then [metric] will improve by [delta] because [reason].
- **Scope:** [pages/portals/roles]
- **Variant(s):** Control (A), Variant (B/…)
- **Metrics:** 
  - Primary: p95, success%
  - Secondary: CTR, time-to-task
  - Guardrails: error rate, a11y
- **Plan:** rollout (10→25→50→100%), sample sizing, duration, stopping rules
- **Results:** stats summary, winner, decision
- **Follow-ups:** tickets, ADR link, tokens updated, docs updated

---

## **🚧 BOUNDARIES (WHAT AGENTS MAY / MUST NOT CHANGE)**

### **Allowed (with flags & canary)**
- ✅ **Design tokens** - Colors, typography, spacing, shadows
- ✅ **Layout components** - Navigation, forms, tables, dashboards
- ✅ **Copy & micro-interactions** - Labels, helper text, error states
- ✅ **Information architecture** - Menu structure, page organization
- ✅ **Loading/empty/error states** - User feedback patterns
- ✅ **Data-fetch strategy** - Caching, prefetching, virtualization
- ✅ **Non-sensitive configs** - Feature flags, display settings

### **Requires extra approval**
- ⚠️ **Pricing logic** - Rate calculations, discount rules
- ⚠️ **Auth flows** - Authentication, authorization changes
- ⚠️ **Billing systems** - Payment processing, invoicing
- ⚠️ **Data retention** - Storage policies, archival rules

### **Never**
- ❌ **Weaken security/privacy** - Any security degradation
- ❌ **Bypass RLS/RBAC** - Role-based access controls
- ❌ **Log PII** - Personal identifiable information
- ❌ **Dark patterns** - Deceptive or manipulative UX

---

## **📚 BACKLOG TAXONOMY**

### **UX/IA**
- Navigation optimization
- Form design improvements
- Table/dashboard enhancements
- Information architecture

### **PERF**
- Bundle optimization
- Render performance
- Network efficiency
- Caching strategies

### **A11Y**
- Color contrast
- Semantic markup
- Focus management
- Keyboard navigation
- Screen reader support

### **COPY**
- Clarity improvements
- Tone optimization
- Localization
- Error messaging

### **OBS**
- Trace optimization
- SLI/SLO design
- Alert fatigue reduction
- Monitoring coverage

### **CONV**
- Funnel optimization
- CTA effectiveness
- Pricing page tests
- Conversion rate optimization

---

## **🚀 KICKSTART (FIRST THREE HIGH-ROI EXPERIMENTS)**

### **1. Pricing CTA Clarity (Website /pricing)**
- **Goal:** +conversion improvement
- **Metrics:** CTR & demo requests
- **Scope:** Website pricing page

### **2. Portal Tables Virtualization (Broker/Carrier/Analytics)**
- **Goal:** -p95 performance improvement
- **Metrics:** Render time & scroll performance
- **Scope:** High-traffic portal tables

### **3. Form UX Polish (Onboarding/Driver)**
- **Goal:** +completion rate improvement
- **Features:** Inline validation + error hints
- **Scope:** User onboarding flows

---

## **📊 EVIDENCE & REPORTING**

### **Daily Report Template**
Generate `/artifacts/research/<date>/daily.md` with:

- **What ran** - Active experiments and their status
- **What ramped** - Successfully scaled experiments
- **What rolled back** - Failed experiments and reasons
- **Current p95 by portal** - Performance snapshot
- **Top regressions** - Performance issues to investigate
- **Next actions** - Prioritized follow-up tasks

### **Required Artifacts**
- RFC/ADR links
- Trace analysis runs
- Screenshots and visual diffs
- Accessibility audit results
- k6 performance summary
- Statistical analysis results

---

## **🛡️ SAFETY & ETHICS**

### **Core Principles**
- **No deceptive patterns** - Clear, honest user experience
- **Clear consent** - Transparent data usage
- **Accessible by default** - Inclusive design from the start
- **Respect locale/timezone** - Cultural and temporal sensitivity
- **Inclusive language** - Bias-free, welcoming copy
- **Predictable behavior** - Consistent, reliable interactions

### **Failure Handling**
- **Rollbacks are first-class** - Fast, reliable reversion
- **Failure is data** - Learn from unsuccessful experiments
- **Transparent communication** - Clear status updates
- **Continuous improvement** - Iterate on process and tools

---

## **🎯 TL;DR (FOR THE AGENTS)**

**You have a Research Team. Your job is to:**

1. **Observe** → Analyze telemetry, user behavior, performance data
2. **Hypothesize** → Identify problems and propose solutions
3. **Experiment** → Test changes safely with flags and canaries
4. **Learn** → Measure results and validate improvements
5. **Document** → Share knowledge and plan next steps

**Ship via flags/canaries, protect SLOs, keep a11y/ethics intact, and prove every improvement with artifacts.**

**Use the prompts above to start now.**
