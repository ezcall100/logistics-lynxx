# Game Day #1: OpenAI Degraded Scenario

## Overview
This game day tests our system's resilience when OpenAI services are degraded or unavailable. The goal is to verify graceful fallback mechanisms, alert systems, and response procedures.

**Date**: TBD  
**Duration**: 2 hours  
**Participants**: SRE, Data/AI, Security teams  
**Scenario**: OpenAI API degraded performance (high latency, intermittent failures)

---

## Pre-Game Checklist

### [ ] Infrastructure Readiness
- [ ] Monitoring dashboards accessible
- [ ] Alert channels configured (Slack, PagerDuty)
- [ ] Incident response team on standby
- [ ] Backup communication channels ready
- [ ] Rollback procedures documented

### [ ] Team Readiness
- [ ] All participants briefed on scenario
- [ ] Incident commander designated
- [ ] Communication plan established
- [ ] Escalation procedures reviewed
- [ ] Post-mortem template ready

### [ ] System Baseline
- [ ] Current SLO metrics recorded
- [ ] Normal traffic patterns documented
- [ ] Key performance indicators baseline
- [ ] User activity levels noted
- [ ] System resource utilization baseline

---

## Game Day Execution

### Phase 1: Scenario Setup (15 minutes)

#### 1.1 Announce Game Day Start
```bash
# Send notification to all teams
curl -X POST -H 'Content-type: application/json' \
  --data '{"text": "🚨 GAME DAY STARTED: OpenAI Degraded Scenario"}' \
  $SLACK_WEBHOOK_URL
```

#### 1.2 Simulate OpenAI Degradation
```bash
# Option 1: Use OpenAI's test endpoints (if available)
# Option 2: Configure proxy to inject latency/failures
# Option 3: Use feature flags to simulate degraded behavior

# Example: Inject 5-second latency to OpenAI calls
export OPENAI_LATENCY_INJECTION=5000
export OPENAI_FAILURE_RATE=0.3
```

#### 1.3 Monitor Initial Impact
- [ ] Check agent success rate
- [ ] Monitor quote response times
- [ ] Verify alert triggers
- [ ] Document user experience changes

### Phase 2: Response Testing (45 minutes)

#### 2.1 Alert Verification
**Expected**: Alerts should trigger within 2 minutes
- [ ] SLO breach alerts sent
- [ ] PagerDuty incidents created
- [ ] Slack notifications posted
- [ ] Email alerts delivered

#### 2.2 Fallback Mechanism Testing
**Expected**: System should gracefully degrade
- [ ] Cached rates served for common lanes
- [ ] Fallback pricing models activated
- [ ] Queue processing continues
- [ ] User interface shows appropriate messaging

#### 2.3 Performance Monitoring
**Expected**: Response times should increase but remain acceptable
- [ ] Quote response time < 10 seconds
- [ ] Agent success rate > 80%
- [ ] System uptime remains 100%
- [ ] No data loss occurs

#### 2.4 User Communication
**Expected**: Users should be informed of temporary issues
- [ ] Status page updated
- [ ] In-app notifications shown
- [ ] Support team briefed
- [ ] Customer communications prepared

### Phase 3: Recovery Testing (30 minutes)

#### 3.1 Simulate Recovery
```bash
# Remove degradation simulation
unset OPENAI_LATENCY_INJECTION
unset OPENAI_FAILURE_RATE
```

#### 3.2 Monitor Recovery
**Expected**: System should return to normal within 5 minutes
- [ ] Agent success rate returns to >98%
- [ ] Quote response times return to <500ms
- [ ] All alerts clear
- [ ] Normal processing resumes

#### 3.3 Queue Processing Verification
**Expected**: No jobs lost during degradation
- [ ] All pending jobs processed
- [ ] No duplicate processing
- [ ] Results accuracy maintained
- [ ] Audit trail complete

### Phase 4: Post-Game Analysis (30 minutes)

#### 4.1 Metrics Collection
```sql
-- Collect performance data
SELECT 
  time_bucket('5 minutes', created_at) as time_window,
  COUNT(*) as total_requests,
  AVG(response_time) as avg_response_time,
  COUNT(CASE WHEN status = 'success' THEN 1 END) as successful_requests,
  COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_requests
FROM api_requests 
WHERE created_at >= NOW() - INTERVAL '2 hours'
GROUP BY time_window
ORDER BY time_window;
```

#### 4.2 Impact Assessment
- [ ] Document all SLO breaches
- [ ] Calculate business impact
- [ ] Identify affected users
- [ ] Assess financial impact

#### 4.3 Lessons Learned
- [ ] What worked well?
- [ ] What needs improvement?
- [ ] Unexpected behaviors?
- [ ] Team response effectiveness?

---

## Success Criteria

### ✅ Must Achieve
- [ ] No data loss during degradation
- [ ] System remains available (99.9% uptime)
- [ ] Alerts trigger within 2 minutes
- [ ] Recovery completes within 5 minutes
- [ ] All teams respond appropriately

### 🎯 Should Achieve
- [ ] Quote response time < 10 seconds during degradation
- [ ] Agent success rate > 80% during degradation
- [ ] User experience remains acceptable
- [ ] No customer complaints during test
- [ ] Post-mortem completed within 24 hours

### 🚀 Nice to Have
- [ ] Zero user impact during degradation
- [ ] Automatic recovery without manual intervention
- [ ] Proactive customer communication
- [ ] Improved fallback mechanisms identified

---

## Rollback Procedures

### Immediate Rollback (if needed)
```bash
# Stop degradation simulation
unset OPENAI_LATENCY_INJECTION
unset OPENAI_FAILURE_RATE

# Restart affected services
docker-compose restart ai-load-matcher
docker-compose restart agent-runner

# Verify system health
curl -f https://api.transbotai.com/functions/v1/health
```

### Emergency Contacts
- **Incident Commander**: [Name] - [Phone]
- **SRE Lead**: [Name] - [Phone]
- **Data/AI Lead**: [Name] - [Phone]
- **Security Lead**: [Name] - [Phone]

---

## Post-Mortem Template

### Executive Summary
- **Date**: [Date]
- **Duration**: [Duration]
- **Participants**: [List]
- **Overall Result**: [Pass/Fail]

### What Happened
- [Detailed timeline of events]
- [System behavior during degradation]
- [Team response actions]

### Impact Assessment
- **SLO Impact**: [Metrics affected]
- **User Impact**: [Number of users affected]
- **Business Impact**: [Financial/operational impact]
- **Duration**: [How long issues persisted]

### Root Cause Analysis
- [Primary cause of degradation]
- [Contributing factors]
- [System vulnerabilities exposed]

### Lessons Learned
- [What worked well]
- [What needs improvement]
- [Unexpected discoveries]

### Action Items
- [ ] [Action item 1] - [Owner] - [Due date]
- [ ] [Action item 2] - [Owner] - [Due date]
- [ ] [Action item 3] - [Owner] - [Due date]

### Follow-up
- [ ] Schedule follow-up game day
- [ ] Implement identified improvements
- [ ] Update runbooks based on learnings
- [ ] Share learnings with broader team

---

## Communication Templates

### Internal Alert
```
🚨 GAME DAY: OpenAI Degraded Scenario
Time: [Start Time] - [End Time]
Impact: Simulated degradation of OpenAI services
Status: Testing in progress
Teams: SRE, Data/AI, Security
```

### User Communication (if needed)
```
We are currently conducting planned maintenance to improve our system's reliability. 
You may experience slightly longer response times for rate quotes during this period. 
Normal service will resume shortly. Thank you for your patience.
```

### Post-Game Summary
```
✅ GAME DAY COMPLETED: OpenAI Degraded Scenario
Duration: [Duration]
Result: [Pass/Fail]
Key Learnings: [Summary]
Next Steps: [Action items]
```

---

## Resources

### Monitoring Dashboards
- [SLO Dashboard](https://grafana.transbotai.com/slo)
- [System Health](https://grafana.transbotai.com/health)
- [Agent Performance](https://grafana.transbotai.com/agents)

### Documentation
- [Incident Response Plan](../incident-response.md)
- [SLO Definitions](../slo-definitions.md)
- [Fallback Procedures](../fallback-procedures.md)

### Tools
- [Alert Management](https://pagerduty.com/transbotai)
- [Communication](https://slack.com/transbotai)
- [Monitoring](https://datadog.com/transbotai)
