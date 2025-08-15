# 🚨 OPS QUICK REFERENCE CARD 🚨

## EMERGENCY COMMANDS (Copy/Paste)

### 🟢 Sanity Ping (60s)
```bash
# Check critical flags
psql "$SUPABASE_DB_URL" -c "
select key, scope, value
from public.feature_flags_v2
where key in ('autonomy.emergencyStop','autonomy.mode','agents.autonomousEnabled','obs.otelEnabled')
order by key;"

# Check agent metrics
psql "$SUPABASE_DB_URL" -c "select * from public.v_agent_metrics_15m limit 25;"
```

### 🔴 Big Red Button (Instant Halt)
```bash
psql "$SUPABASE_DB_URL" -c "
update public.feature_flags_v2
set value=true
where key='autonomy.emergencyStop' and scope='global';"
```

### 🟡 Soft Degrade (Stabilize)
```bash
psql "$SUPABASE_DB_URL" -c "
update public.feature_flags_v2 set value=25 where key='budget.agents.maxConcurrency' and scope='global';
update public.feature_flags_v2 set value=1  where key='rate.replay.per5m' and scope='global';"
```

### 🟢 Resume Operations
```bash
psql "$SUPABASE_DB_URL" -c "
update public.feature_flags_v2 set value=false where key='autonomy.emergencyStop' and scope='global';
update public.feature_flags_v2 set value=true  where key='agents.autonomousEnabled' and scope='global';
update public.feature_flags_v2 set value='FULL' where key='autonomy.mode' and scope='global';"
```

## QUICK SCRIPTS

### Windows (PowerShell)
```powershell
# Sanity check
.\scripts\ops-quick-commands.ps1 sanity-ping

# Emergency stop
.\scripts\ops-quick-commands.ps1 emergency-stop

# Daily ritual
.\scripts\ops-quick-commands.ps1 daily-ritual

# Quick triage
.\scripts\ops-quick-commands.ps1 triage
```

### Linux/Mac (Bash)
```bash
# Sanity check
./scripts/ops-quick-commands.sh sanity-ping

# Emergency stop
./scripts/ops-quick-commands.sh emergency-stop

# Daily ritual
./scripts/ops-quick-commands.sh daily-ritual

# Quick triage
./scripts/ops-quick-commands.sh triage
```

## DAILY RITUAL (5 min)
```bash
node scripts/green-posture-script.js
psql "$SUPABASE_DB_URL" -c "select count(*) dlq_depth from public.dlq_items;"
psql "$SUPABASE_DB_URL" -c "select cron.jobid, schedule from cron.job where jobname like 'agent_logs_%';"
```

## TARGET METRICS
- ✅ Success Rate: ≥ 98%
- ✅ P95 Latency: ≤ 2.5s
- ✅ DLQ Depth: Steady/clearing
- ✅ Outbox Lag: P95 < 5s
- ✅ Agent Queue: < 100 items

## ALERT THRESHOLDS
- ❌ Success rate < 95%
- ❌ P95 latency > 5s
- ❌ DLQ depth > 50 items
- ❌ Outbox lag P95 > 10s
- ❌ Agent queue > 200 items

## SCALE-UP SEQUENCE
```bash
# Start conservative
psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=10 where key='budget.agents.maxConcurrency' and scope='global';"

# Wait 5 min, then increase
psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=25 where key='budget.agents.maxConcurrency' and scope='global';"

# Continue monitoring and scaling
psql "$SUPABASE_DB_URL" -c "update public.feature_flags_v2 set value=50 where key='budget.agents.maxConcurrency' and scope='global';"
```

## INCIDENT RESPONSE (15 min)
1. **Triage (2 min):** `node scripts/green-posture-script.js`
2. **Contain (1-3 min):** Run soft-degrade if SLO breach
3. **Prove (2 min):** `node scripts/acceptance-testing.js`
4. **Recover (5-8 min):** Gradual scale-up under SLO gates

## WEEKLY TASKS (30 min)
```bash
node scripts/resilience-drills.js
# Check CI security jobs ran clean
# Verify canary ramps match plan
```

---
**📞 Emergency Contacts:**
- Primary: [Your contact]
- Secondary: [Backup contact]
- Escalation: [Management contact]

**🔗 Quick Links:**
- Dashboard: [URL]
- Logs: [URL]
- Metrics: [URL]
