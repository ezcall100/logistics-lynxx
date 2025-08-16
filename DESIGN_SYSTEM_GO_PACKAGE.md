# 🚀 DESIGN SYSTEM GO PACKAGE

## **🎯 OPERATOR PROMPT TO AGENTS (SINGLE MESSAGE)**

```
TASK: ds.rollout.ui.v2
SCOPE: website + all 20 portals
MODE: canary
TARGET: 10% sessions for 30m → 25% → 50% → 100% (auto-ramp when green)
GUARDRAILS:
  - success_rate >= 98%
  - p95_route_paint <= 2500ms
  - visual_diff_critical <= 5%
  - honor autonomy.emergencyStop immediately
EVIDENCE:
  - artifacts/ui-v2/<YYYY-MM-DD>/{flags.json,lighthouse.json,axe.json,visual-diff.html,p95-portal.csv,trace-sample.txt}
ACTIONS:
  1) Generate tokens → tokens.css; replace hardcoded colors.
  2) Apply app shell + state patterns (loading/empty/error) to all portals.
  3) Wire accentMap for 20 portals; use tokens only (no raw hex in components).
  4) Standardize tables & charts; perf: virtualize >200 rows.
  5) Website: home/pricing/blog ≥ 90 Lighthouse (Perf/A11y/SEO).
  6) Enable canary (10%); run Playwright visual + p95 monitor; auto-ramp when green.
  7) On breach: halve parallelism → flip ui.v2.enabled=false → open incident with trace links.
DONE WHEN:
  - all ramps complete at 100%
  - acceptance checks pass
  - evidence pack stored and linked in change log.
```

---

## **🔧 SEED/CONFIRM FLAGS (IDEMPOTENT SQL)**

```sql
insert into feature_flags_v2(key,scope,value) values
('obs.otelEnabled','global',true),
('ui.v2.enabled','global',jsonb_build_object('mode','canary','ratio',0.10)),
('ui.v2.accentMap','global','{
  "superAdmin": "#8B5CF6",
  "admin": "#6366F1", 
  "tmsAdmin": "#7C3AED",
  "onboarding": "#A78BFA",
  "broker": "#4F46E5",
  "shipper": "#10B981",
  "carrier": "#0EA5E9",
  "driver": "#F59E0B",
  "ownerOperator": "#4338CA",
  "factoring": "#16A34A",
  "loadBoard": "#06B6D4",
  "crm": "#0EA5E9",
  "financials": "#14B8A6",
  "edi": "#22C55E",
  "marketplace": "#8B5CF6",
  "analytics": "#D946EF",
  "autonomous": "#22D3EE",
  "workers": "#10B981",
  "rates": "#3B82F6",
  "directory": "#64748B"
}'::jsonb),
('autonomy.emergencyStop','global',false)
on conflict (key,scope) do update set value=excluded.value;
```

---

## **🎨 TOKENS.CSS STARTER**

```css
/* Trans Bot AI Design System v2.0 - Design Tokens */
:root {
  /* Brand Colors */
  --brand: #5B8CFF;
  --accent: #22C55E;
  
  /* Background Colors */
  --bg: #F8FAFC;
  --bg-subtle: #FFFFFF;
  --bg-inverted: #0B1220;
  
  /* Foreground Colors */
  --fg: #0F172A;
  --fg-muted: #475569;
  --fg-inverted: #F8FAFC;
  
  /* Border Colors */
  --border: #E2E8F0;
  
  /* Semantic Colors */
  --success: #16A34A;
  --warning: #F59E0B;
  --danger: #EF4444;
  --info: #3B82F6;
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 16px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(2,6,23,0.08);
  --shadow-md: 0 4px 14px rgba(2,6,23,0.08);
  --shadow-lg: 0 10px 24px rgba(2,6,23,0.10);
  
  /* Spacing */
  --spacing-base: 8px;
  
  /* Typography */
  --font-display: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  --font-text: "Inter", ui-sans-serif, system-ui, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2.25rem;
  --text-4xl: 3rem;
}

/* Dark Mode */
.dark {
  --bg: #0B1220;
  --bg-subtle: #0F172A;
  --fg: #F8FAFC;
  --fg-muted: #CBD5E1;
  --border: #1F2937;
}

/* Portal Accent Colors */
.portal-super-admin { --portal-accent: #8B5CF6; }
.portal-admin { --portal-accent: #6366F1; }
.portal-tms-admin { --portal-accent: #7C3AED; }
.portal-onboarding { --portal-accent: #A78BFA; }
.portal-broker { --portal-accent: #4F46E5; }
.portal-shipper { --portal-accent: #10B981; }
.portal-carrier { --portal-accent: #0EA5E9; }
.portal-driver { --portal-accent: #F59E0B; }
.portal-owner-operator { --portal-accent: #4338CA; }
.portal-factoring { --portal-accent: #16A34A; }
.portal-load-board { --portal-accent: #06B6D4; }
.portal-crm { --portal-accent: #0EA5E9; }
.portal-financials { --portal-accent: #14B8A6; }
.portal-edi { --portal-accent: #22C55E; }
.portal-marketplace { --portal-accent: #8B5CF6; }
.portal-analytics { --portal-accent: #D946EF; }
.portal-autonomous { --portal-accent: #22D3EE; }
.portal-workers { --portal-accent: #10B981; }
.portal-rates { --portal-accent: #3B82F6; }
.portal-directory { --portal-accent: #64748B; }
```

---

## **🔍 QUICK PREFLIGHT (60–90s)**

```bash
# Health checks
curl -fsS http://localhost:8089/healthz
curl -fsS http://localhost:8089/readyz

# Smoke tests
npm run smoke:test
npm run check:portals

# Verify feature flags
psql -c "SELECT key, value FROM feature_flags_v2 WHERE key LIKE 'ui.v2%' OR key = 'obs.otelEnabled';"
```

---

## **📊 LIVE ROLLOUT CHECKLIST**

### **Phase 1: Canary Start (10%)**
- [ ] Enable canary: `ui.v2.enabled` = `{"mode":"canary","ratio":0.10}`
- [ ] Watch 30 minutes for stability
- [ ] Monitor p95 per portal (landing & main dashboard)
- [ ] Check visual snapshots (Playwright) light/dark
- [ ] Verify no critical visual diffs > 5%

### **Phase 2: Auto-Ramp (30min gates)**
- [ ] **25%**: `{"mode":"canary","ratio":0.25}` (after 30min green)
- [ ] **50%**: `{"mode":"canary","ratio":0.50}` (after 30min green)
- [ ] **100%**: `{"mode":"enabled","ratio":1.00}` (after 30min green)

### **Phase 3: Evidence Collection**
- [ ] Store artifacts under `artifacts/ui-v2/<YYYY-MM-DD>/`
  - [ ] `flags.json` - Current flag states
  - [ ] `lighthouse.json` - Website performance scores
  - [ ] `axe.json` - Accessibility audit results
  - [ ] `visual-diff.html` - Visual regression report
  - [ ] `p95-portal.csv` - Performance metrics per portal
  - [ ] `trace-sample.txt` - OTEL trace IDs for exemplars

### **Phase 4: Website Validation**
- [ ] Run Lighthouse on `/` (≥ 90 Perf/A11y/SEO)
- [ ] Run Lighthouse on `/pricing` (≥ 90 Perf/A11y/SEO)
- [ ] Run Lighthouse on `/blog` (≥ 90 Perf/A11y/SEO)

---

## **🚨 TRIPWIRES (AUTO ACTION)**

### **Performance Breach**
```
p95 > 2.5s for 2× consecutive 3-min windows
→ degrade parallelism 50%
→ investigate and fix
```

### **Success Rate Breach**
```
success < 98% for 10 min
→ rollback UI v2 flag to previous value
→ open incident with trace links
```

### **Visual Regression**
```
visual diff critical > 5%
→ hold ramp
→ open incident with trace links
→ manual review required
```

---

## **🔄 ROLLBACK (ONE LINE)**

```sql
update feature_flags_v2
set value=jsonb_build_object('mode','off')
where key='ui.v2.enabled' and scope='global';
```

---

## **✅ "WE'RE DONE" ACCEPTANCE (OPERATOR SPOT-CHECK)**

### **System Health**
- [ ] `/readyz` = 200 (strict, prod)
- [ ] All health checks passing

### **Design System Implementation**
- [ ] All 20 portals load with UI v2 shell & tokens
- [ ] No raw hex colors in components (tokens only)
- [ ] Portal accent colors applied correctly
- [ ] State patterns implemented (loading/empty/error)

### **Performance Standards**
- [ ] p95 route paint ≤ 2.5s on each portal landing
- [ ] p95 route paint ≤ 2.5s on primary dashboards
- [ ] Success rate ≥ 98% across all portals

### **Website Standards**
- [ ] Lighthouse ≥ 90 on `/` (Perf/A11y/SEO)
- [ ] Lighthouse ≥ 90 on `/pricing` (Perf/A11y/SEO)
- [ ] Lighthouse ≥ 90 on `/blog` (Perf/A11y/SEO)

### **Evidence Pack**
- [ ] `flags.json` - Feature flag states documented
- [ ] `axe.json` - Accessibility audit complete
- [ ] `lighthouse.json` - Performance scores recorded
- [ ] `visual-diff.html` - Visual regression report
- [ ] `p95-portal.csv` - Performance metrics per portal
- [ ] `trace-sample.txt` - OTEL trace IDs for exemplars

### **Documentation**
- [ ] Evidence pack stored and linked in change log
- [ ] Rollout summary documented
- [ ] Any issues and resolutions recorded

---

## **🎯 AUTONOMOUS AGENT EXECUTION COMMANDS**

### **Immediate Actions**
```bash
# 1. Generate and apply design tokens
npm run ds:tokens:generate
npm run ds:tailwind:apply

# 2. Apply app shell to all portals
npm run ds:shell:apply:portals

# 3. Wire state patterns
npm run ds:states:wire

# 4. Apply portal accents
npm run ds:accents:apply

# 5. Standardize data visualization
npm run ds:dataviz:standardize

# 6. Apply to website
npm run ds:website:apply

# 7. Run tests
npm run ds:tests:visual

# 8. Enable canary
npm run ds:rollout:canary

# 9. Capture evidence
npm run ds:evidence:capture
```

### **Monitoring Commands**
```bash
# Monitor p95 performance
npm run monitor:p95:portals

# Run visual regression tests
npm run test:visual:regression

# Check accessibility
npm run test:accessibility

# Monitor feature flags
npm run monitor:flags
```

---

## **🚀 EXECUTION STATUS: READY TO LAUNCH**

**The autonomous agents now have:**
- ✅ Complete operator prompt
- ✅ Exact SQL commands for feature flags
- ✅ Ready-to-use tokens.css starter
- ✅ Live rollout checklist
- ✅ Tripwire definitions
- ✅ Rollback procedures
- ✅ Acceptance criteria
- ✅ Execution commands

**🎉 AUTONOMOUS AGENTS CAN NOW EXECUTE THE DESIGN SYSTEM ROLLOUT IMMEDIATELY!**

*All materials are ready. The agents can copy-paste the operator prompt and begin execution with the provided SQL, CSS, and monitoring commands.*
