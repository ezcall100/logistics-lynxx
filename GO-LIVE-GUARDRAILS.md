# Go-Live Guardrails & Ops Cheat-Sheet

## Quick Reference Commands

### 0) Sanity Ping (60s)
```bash
# Flags must be: emergencyStop=false, mode=FULL, agentsEnabled=true, otelEnabled=true
psql "$SUPABASE_DB_URL" -c "
select key, scope, value
from public.feature_flags_v2
where key in ('autonomy.emergencyStop','autonomy.mode','agents.autonomousEnabled','obs.otelEnabled')
order by key;"

# Agent SLOs (15m window) – queue, running, success
psql "$SUPABASE_DB_URL" -c "select * from public.v_agent_metrics_15m limit 25;"

# Portals (logged-in check still recommended)
npm run check:portals
```

### 1) Big Red Button (instant halt)
```bash
psql "$SUPABASE_DB_URL" -c "
update public.feature_flags_v2
set value=true
where key='autonomy.emergencyStop' and scope='global';"
```

### 2) Soft-degrade (stabilize without stopping)
```bash
psql "$SUPABASE_DB_URL" -c "
update public.feature_flags_v2 set value=25 where key='budget.agents.maxConcurrency' and scope='global';
update public.feature_flags_v2 set value=1  where key='rate.replay.per5m' and scope='global';"
```

### 3) Resume (post-incident)
```bash
psql "$SUPABASE_DB_URL" -c "
update public.feature_flags_v2 set value=false where key='autonomy.emergencyStop' and scope='global';
update public.feature_flags_v2 set value=true  where key='agents.autonomousEnabled' and scope='global';
update public.feature_flags_v2 set value='FULL' where key='autonomy.mode' and scope='global';"
```

## Minimal On-Call Playbook (15 min)

### Triage (2 min)
```bash
node scripts/green-posture-script.js || true
supabase functions logs agent-runner --since 15m || true
```

**Look for:** signing/nonce errors, high fail %, latency spikes, or rate-limit hits.

### Contain (1–3 min)
- **If SLO breach:** run Soft-degrade (above)
- **If external dep down:** quarantine that tool via a feature flag and retry later

### Prove (2 min)
```bash
node scripts/acceptance-testing.js || true
```

Confirm a synthetic task goes queued → running → done and trace link appears.

### Recover (5–8 min)
- Replays in small batches (≤25); stop if immediate-fail > 20% (rails already enforce)
- Gradually raise concurrency back to your baseline (e.g., 25 → 50 → 100) under SLO gates

## "Green Posture" Daily Ritual (5 min)
```bash
node scripts/green-posture-script.js
psql "$SUPABASE_DB_URL" -c "select count(*) dlq_depth from public.dlq_items;" 2>/dev/null || true
psql "$SUPABASE_DB_URL" -c "select cron.jobid, schedule from cron.job where jobname like 'agent_logs_%';" 2>/dev/null || true
```

**Targets:** DLQ depth steady/clearing, outbox lag p95 < 5s, success ≥ 98%, p95 ≤ 2.5s.

Check artifact folder for today's snapshot.

## Weekly (30 min, automated scripts already exist)
```bash
# Resilience drill
node scripts/resilience-drills.js

# Key hygiene & scanners: ensure scheduled CI security jobs ran clean
# Canary ramps: confirm percent matches plan; roll back if SLO budget tight
```

## Emergency Procedures

### System Health Check
```bash
# Quick system status
node scripts/green-posture-script.js

# Detailed agent metrics
psql "$SUPABASE_DB_URL" -c "select * from public.v_agent_metrics_15m limit 25;"

# Check for stuck items
psql "$SUPABASE_DB_URL" -c "select count(*) from public.dlq_items;"
```

### Incident Response
```bash
# 1. Emergency stop if needed
psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=true where key='autonomy.emergencyStop' and scope='global';"

# 2. Check recent logs
supabase functions logs agent-runner --since 30m

# 3. Run incident response script
node scripts/incident-response.js

# 4. Verify recovery
node scripts/acceptance-testing.js
```

### Performance Tuning
```bash
# Reduce concurrency for stability
psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=10 where key='budget.agents.maxConcurrency' and scope='global';"

# Increase concurrency for performance
psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=50 where key='budget.agents.maxConcurrency' and scope='global';"
```

## Monitoring Dashboards

### Key Metrics to Watch
- **Success Rate:** ≥ 98%
- **P95 Latency:** ≤ 2.5s
- **DLQ Depth:** Steady/clearing
- **Outbox Lag:** P95 < 5s
- **Agent Queue:** < 100 items
- **Running Agents:** Within budget limits

### Alert Thresholds
- Success rate drops below 95%
- P95 latency exceeds 5s
- DLQ depth > 50 items
- Outbox lag P95 > 10s
- Agent queue > 200 items

## Recovery Procedures

### Gradual Scale-Up
```bash
# Start conservative
psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=10 where key='budget.agents.maxConcurrency' and scope='global';"

# Monitor for 5 minutes, then increase
psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=25 where key='budget.agents.maxConcurrency' and scope='global';"

# Continue monitoring and scaling
psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=50 where key='budget.agents.maxConcurrency' and scope='global';"
```

### Feature Flag Management
```bash
# List all feature flags
psql "$SUPABASE_DB_URL" -c "select key, scope, value from public.feature_flags_v2 order by key;"

# Update specific flag
psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value='NEW_VALUE' where key='FLAG_NAME' and scope='global';"
```

## Contact Information
- **Primary On-Call:** [Your contact info]
- **Secondary:** [Backup contact info]
- **Escalation:** [Management contact info]

## Quick Links
- [System Dashboard](https://your-dashboard-url)
- [Logs](https://your-logs-url)
- [Metrics](https://your-metrics-url)
- [Documentation](https://your-docs-url)
