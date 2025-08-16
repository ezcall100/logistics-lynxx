# Experiment Template

## **Experiment: [Title]**

**Date:** YYYY-MM-DD  
**Status:** [Planning/Active/Completed/Rolled Back]  
**Priority:** [High/Medium/Low]  
**Owner:** [Research Team Role]

---

## **Hypothesis**

**If we [change], then [metric] will improve by [delta] because [reason].**

### **Problem Statement**
- **Current State:** [Describe the current user experience or performance issue]
- **Pain Points:** [List specific problems users or the system face]
- **Opportunity:** [Quantify the potential impact]

### **Root Cause Analysis**
- **Why is this happening?** [Technical or UX reasons]
- **Evidence:** [Data, user feedback, telemetry that supports the hypothesis]

---

## **Scope**

### **Surfaces Affected**
- **Pages:** [List specific pages or routes]
- **Portals:** [List affected portals]
- **User Roles:** [List user types affected]
- **Geographic:** [Any regional considerations]

### **User Journey Impact**
- **Entry Point:** [Where users start]
- **Flow:** [Step-by-step user journey]
- **Exit Point:** [Where users complete or abandon]

---

## **Variants**

### **Control (A)**
- **Description:** [Current implementation]
- **Implementation:** [Technical details]
- **Expected Behavior:** [What users will see/experience]

### **Variant (B)**
- **Description:** [Proposed change]
- **Implementation:** [Technical details]
- **Expected Behavior:** [What users will see/experience]

### **Additional Variants (C, D, etc.)**
- [Repeat structure for additional variants]

---

## **Metrics**

### **Primary Metrics**
- **Success Rate:** [Target: ≥ 98%]
- **Performance (p95):** [Target: ≤ 2.5s]
- **[Specific Metric]:** [Target: [value]]

### **Secondary Metrics**
- **Click-through Rate (CTR):** [Current baseline]
- **Time-to-Task:** [Current baseline]
- **User Satisfaction:** [If measurable]
- **Engagement:** [Session duration, pages per session]

### **Guardrails**
- **Error Rate:** [Must stay below threshold]
- **Accessibility:** [WCAG 2.2 AA compliance]
- **Security:** [No security degradation]
- **Performance:** [No p95 regression]

---

## **Test Plan**

### **Sample Sizing**
- **Total Users:** [Number of users to include]
- **Duration:** [How long to run the experiment]
- **Traffic Split:** [Percentage allocation per variant]
- **Statistical Power:** [Confidence level and effect size]

### **Rollout Strategy**
1. **10%** - Initial canary deployment
2. **25%** - Expand if green (30min gate)
3. **50%** - Further expansion if green (30min gate)
4. **100%** - Full rollout if green (30min gate)

### **Stopping Rules**
- **Success:** [Criteria for ramping up]
- **Failure:** [Criteria for rolling back]
- **Pause:** [Criteria for pausing to investigate]

---

## **Implementation**

### **Feature Flags**
```sql
-- Example flag configuration
INSERT INTO feature_flags_v2(key, scope, value) VALUES
('experiment.[name].enabled', 'global', jsonb_build_object(
  'mode', 'canary',
  'ratio', 0.10,
  'variants', jsonb_build_object(
    'control', 0.5,
    'variant_b', 0.5
  )
))
ON CONFLICT (key, scope) DO UPDATE SET value = EXCLUDED.value;
```

### **Technical Changes**
- **Files Modified:** [List of files to change]
- **Components Updated:** [React components, CSS, etc.]
- **Dependencies:** [Any new packages or services]

### **Testing Requirements**
- **Playwright Tests:** [Visual regression tests]
- **k6 Tests:** [Performance tests]
- **Accessibility Tests:** [Axe-core validation]
- **Unit Tests:** [Component testing]

---

## **Results**

### **Statistical Summary**
- **Sample Size:** [Final number of users]
- **Duration:** [Actual experiment duration]
- **Confidence Level:** [Statistical significance]

### **Primary Metrics Results**
| Metric | Control | Variant B | Improvement | P-Value |
|--------|---------|-----------|-------------|---------|
| Success Rate | 98.2% | 98.8% | +0.6% | 0.023 |
| p95 | 2.1s | 1.9s | -9.5% | 0.001 |
| [Metric] | [Value] | [Value] | [Delta] | [P-Value] |

### **Secondary Metrics Results**
| Metric | Control | Variant B | Change |
|--------|---------|-----------|--------|
| CTR | 15.2% | 16.8% | +10.5% |
| Time-to-Task | 45s | 38s | -15.6% |

### **Guardrail Validation**
- ✅ **Error Rate:** No increase (0.1% → 0.1%)
- ✅ **Accessibility:** All WCAG 2.2 AA checks pass
- ✅ **Performance:** No p95 regression
- ✅ **Security:** No security issues detected

---

## **Decision**

### **Winner**
- **Selected Variant:** [Control/Variant B/etc.]
- **Reasoning:** [Why this variant was chosen]
- **Confidence:** [Level of confidence in the decision]

### **Next Steps**
- **Ramp to 100%:** [If successful]
- **Iterate:** [If needs refinement]
- **Rollback:** [If unsuccessful]

---

## **Follow-ups**

### **Tickets Created**
- [ ] **Ticket #1234:** Update design tokens for new variant
- [ ] **Ticket #1235:** Update documentation
- [ ] **Ticket #1236:** Monitor post-rollout metrics

### **Documentation Updates**
- [ ] **ADR Link:** [Link to Architecture Decision Record]
- [ ] **Knowledge Tree:** [Updated knowledge base entries]
- [ ] **Runbooks:** [Updated operational procedures]

### **Code Changes**
- [ ] **Design Tokens:** [Updated if needed]
- [ ] **Components:** [Permanently implemented]
- [ ] **Feature Flags:** [Cleaned up or made permanent]

---

## **Evidence Pack**

### **Artifacts Generated**
- **Traces:** [OTEL trace samples]
- **Screenshots:** [Visual comparison images]
- **Metrics:** [Raw data and analysis]
- **Reports:** [Accessibility, performance reports]

### **Storage Location**
```
/artifacts/research/YYYY-MM-DD/
├── experiment-[name]/
│   ├── traces.txt
│   ├── screenshots/
│   ├── metrics.json
│   ├── accessibility-report.json
│   └── performance-report.json
```

---

## **Lessons Learned**

### **What Worked**
- [Key insights and successful strategies]

### **What Didn't Work**
- [Challenges and failures]

### **Recommendations**
- [Suggestions for future experiments]

---

## **Related Experiments**

### **Dependencies**
- [Experiments this builds upon]

### **Follow-up Experiments**
- [Future experiments this enables]

---

**Template Version:** 1.0  
**Last Updated:** 2025-08-16  
**Maintained By:** Autonomous Research Team
