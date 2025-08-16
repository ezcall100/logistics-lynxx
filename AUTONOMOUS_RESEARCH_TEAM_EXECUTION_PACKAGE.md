# 🤖 AUTONOMOUS RESEARCH TEAM — EXECUTION PACKAGE

## **🎯 COMPLETE AUTONOMOUS AGENT RESEARCH CAPABILITIES**

**Date:** August 16, 2025  
**Status:** 🎯 READY FOR IMMEDIATE EXECUTION  
**Scope:** Website + All 20 Portals  
**Mode:** Continuous Self-Improvement with Safe Experiments

---

## **📋 1. OPERATOR PROMPT — TURN RESEARCH MODE ON**

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

## **🔬 2. QUICK PROMPTS — COMMON RESEARCH MISSIONS**

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

## **👥 3. RESEARCH TEAM ROLES (ALL AGENTIZED)**

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

## **🔄 4. RESEARCH FLYWHEEL (REPEAT CONTINUOUSLY)**

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

## **🚀 5. KICKSTART (FIRST THREE HIGH-ROI EXPERIMENTS)**

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

## **📁 6. EVIDENCE STORAGE (STORE DAILY)**

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

## **🚧 7. BOUNDARIES (WHAT AGENTS MAY / MUST NOT CHANGE)**

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

## **📊 8. PRIMARY KPIS (PER SURFACE)**

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

## **📋 9. EXPERIMENT TEMPLATE**

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

## **📚 10. BACKLOG TAXONOMY**

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

## **📊 11. EVIDENCE & REPORTING**

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

## **🛡️ 12. SAFETY & ETHICS**

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

## **📁 13. FILES CREATED FOR AGENTS**

### **✅ Production-Ready Files:**
- `AUTONOMOUS_RESEARCH_TEAM_CHARTER.md` - Complete operating charter
- `knowledge/03-playbooks/experiment-template.md` - Experiment template
- `data/agent-task-registry.json` - Updated with research team task
- `logistics-lynx/src/lib/portal-theme.ts` - Portal theme helper
- `logistics-lynx/tests/visual-regression.spec.ts` - Playwright visual tests
- `logistics-lynx/src/styles/tokens.css` - Design system tokens

### **✅ Execution Commands:**
```bash
# Research Team Activation
npm run research:team:activate
npm run research:backlog:create
npm run research:experiments:launch:3
npm run research:monitoring:setup
npm run research:evidence:structure
npm run research:documentation:template

# Experiment Execution
npm run research:experiment:create
npm run research:experiment:launch
npm run research:experiment:monitor
npm run research:experiment:evaluate
npm run research:experiment:decide
npm run research:experiment:document

# Evidence Collection
npm run research:evidence:collect
npm run research:evidence:analyze
npm run research:evidence:report
```

---

## **🎯 14. AUTONOMOUS AGENT EXECUTION SEQUENCE**

### **Phase 1: Research Team Activation (30 minutes)**
1. ✅ **Activate all 6 roles** - Research Director, UX Researcher, Data Scientist, Performance Engineer, Experiment Conductor, Documentation Curator
2. ✅ **Define responsibilities** - Clear role definitions and success metrics
3. ✅ **Set up communication** - Inter-role coordination and decision-making

### **Phase 2: Backlog Creation (1 hour)**
1. ✅ **Analyze telemetry** - Identify top 10 improvement opportunities
2. ✅ **Map user journeys** - Document pain points and optimization areas
3. ✅ **Prioritize experiments** - Rank by impact and effort
4. ✅ **Create hypotheses** - Clear problem statements and expected outcomes

### **Phase 3: First Experiments (2 hours)**
1. ✅ **Launch Pricing CTA experiment** - Website conversion optimization
2. ✅ **Launch Tables Virtualization** - Portal performance improvement
3. ✅ **Launch Form UX Polish** - User experience enhancement
4. ✅ **Set up monitoring** - Real-time tracking and evidence collection

---

## **🚨 15. TRIPWIRES & ROLLBACK**

### **Performance Breach**
```
p95 > 2.5s for 2× consecutive 3-min windows
→ degrade parallelism 50%
→ investigate and fix
```

### **Success Rate Breach**
```
success < 98% for 10 min
→ rollback experiment to control variant
→ open incident with trace links
```

### **Ethical Violation**
```
dark pattern detected or accessibility regression
→ pause all experiments
→ manual review required
→ ethics committee approval needed
```

### **Emergency Rollback**
```sql
update feature_flags_v2
set value = jsonb_build_object('mode','off')
where key='research.mode.enabled' and scope='global';
```

---

## **✅ 16. "WE'RE DONE" ACCEPTANCE CRITERIA**

### **Research Team Operational**
- [ ] All 6 roles activated and responding
- [ ] Clear role definitions and responsibilities
- [ ] Inter-role communication established

### **Backlog Created**
- [ ] 10+ prioritized experiments identified
- [ ] Clear hypotheses and success metrics defined
- [ ] Impact and effort analysis completed

### **Experiments Launched**
- [ ] 3 active experiments with monitoring
- [ ] Feature flags configured for safe A/B testing
- [ ] Evidence collection working properly

### **Safety & Compliance**
- [ ] All experiments respect SLOs and ethics
- [ ] Accessibility standards maintained
- [ ] PII protection and security intact

### **Documentation & Process**
- [ ] Experiment template in place
- [ ] Process documentation complete
- [ ] Knowledge management system operational

---

## **🚀 EXECUTION STATUS: READY TO LAUNCH**

**The autonomous agents now have everything they need to execute continuous self-improvement:**

- ✅ **Complete Research Team charter** - Operating principles and guardrails
- ✅ **6 specialized roles** - Research Director, UX Researcher, Data Scientist, Performance Engineer, Experiment Conductor, Documentation Curator
- ✅ **Research flywheel process** - Observe → Hypothesize → Experiment → Learn → Document
- ✅ **Experiment template** - Standardized process for all experiments
- ✅ **Safety boundaries** - Clear limits on what can and cannot be changed
- ✅ **Evidence collection** - Comprehensive artifact storage and reporting
- ✅ **Quick prompts** - Common research missions ready to execute
- ✅ **Kickstart experiments** - Three high-ROI experiments to begin with
- ✅ **Rollback procedures** - Emergency stop mechanisms and safety protocols

**🎉 AUTONOMOUS AGENTS CAN NOW EXECUTE CONTINUOUS SELF-IMPROVEMENT IMMEDIATELY!**

*All materials are ready. The agents can copy-paste the operator prompt and begin research mode with the provided charter, templates, and execution commands. The complete package includes everything needed for safe, ethical, and measurable continuous improvement across all 20 portals and the website.*
