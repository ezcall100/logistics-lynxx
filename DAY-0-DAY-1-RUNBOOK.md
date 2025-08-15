# 🚀 DAY-0/DAY-1 RUNBOOK - LIGHTS-OUT OPERATIONS

## 🎯 Go-Live Snapshot (Pin This)

### System Status
- **Agents**: 250 active autonomous agents
- **SLOs**: ≥99.95% uptime, ≥98% success rate, p95 ≤2.5s
- **Rails**: RLS/JWT/HMAC, idempotency, budgets, kill-switch
- **Cadence**: 30s health → 5m DLQ → hourly ETL/maint → daily TTL/backup → weekly DR → monthly restore

### Current Configuration
- **Mode**: FULL autonomous operation
- **Emergency Stop**: false (system running)
- **Agents Enabled**: true
- **Observability**: true (OpenTelemetry active)

## ⚡ 2-Minute Green Check (Copy/Paste)

### 1. Feature Flags Status
```bash
# Flags should read: FULL / false / true / true
psql "$SUPABASE_DB_URL" -c \
"select key,scope,value from feature_flags_v2
 where key in ('autonomy.mode','autonomy.emergencyStop','agents.autonomousEnabled','obs.otelEnabled')
 order by key;"
```

### 2. Synthetic Task + Trace + Slack
```bash
# Uses your existing script
node scripts/acceptance-testing.js
```

### 3. Portal Routes Check
```bash
# Expect all 20 OK, deprecated 410
npm run check:portals
```

## 🎛️ Fast Levers (Muscle Memory)

### Big Red Button (Halt All)
```sql
update feature_flags_v2 set value=true where key='autonomy.emergencyStop' and scope='global';
```

### Soft-Degrade (Reduce Load Safely)
```sql
-- Examples; tune to taste
update feature_flags_v2 set value=100 where key='budget.agents.maxConcurrent' and scope='global';
update feature_flags_v2 set value=1   where key='rate.replay.per5m' and scope='global';
```

### Resume Operations
```sql
update feature_flags_v2 set value=false where key='autonomy.emergencyStop' and scope='global';
```

## 👀 What to Watch (First 24–72h)

### Critical Metrics
- **Outbox lag p95 < 5s**
- **DLQ replay fail < 2%**
- **Agent success > 98%**

### Evidence Collection
- Your `green-posture-script.js` already emits daily artifacts
- **Pin the folder**: `/artifacts/green-posture/YYYY-MM-DD/*` in your dashboard
- Keep 30 days of evidence

### Budget Monitoring
- **Budget drift** (concurrency, replay, API rate) → throttle via flags before SLOs dip
- Monitor for per-tenant spikes

### Trace Sampling
- **Trace sample each deploy** (Slack "Open Trace" button + Super-Admin Traces page)
- Ensure distributed tracing is working

## 🚨 On-Call Quick Ops

### Sanity Ping & Status
```powershell
# Quick health check
.\scripts\ops-quick-commands.ps1 sanity-ping

# System status
.\scripts\ops-quick-commands.ps1 status
```

### Daily Ritual (Artifact + Checks)
```powershell
# Comprehensive daily check
.\scripts\ops-quick-commands.ps1 daily-ritual
```

### Emergency Procedures
```powershell
# Emergency stop
.\scripts\ops-quick-commands.ps1 emergency-stop

# Soft degrade
.\scripts\ops-quick-commands.ps1 soft-degrade

# Resume operations
.\scripts\ops-quick-commands.ps1 resume
```

## 🛡️ Guardrail Tripwire (Escalate If)

### Success Rate Issues
- **Success < 98% for 10 min** → soft-degrade + inspect DLQ traces
- **Immediate action**: Reduce concurrency, check external dependencies

### Latency Issues
- **p95 > 2.5s for 10 min** → reduce concurrency, bump cache TTLs
- **Investigate**: Database performance, external API calls, resource constraints

### Replay Failures
- **Replay fail > 20% in batch** → auto-stop triggers (already enforced)
- **Investigate before resume**: Check DLQ contents, external service status

### System Overload
- **Queue depth > 200 items** → apply soft-degrade immediately
- **Monitor**: Agent health, resource utilization, external dependencies

## 📋 Handoff Notes for New Operators

### Single Source of Truth
- **Portal Registry**: `src/portals/registry.ts` (routes/roles/flags)
- **All portals behind auth + role + flag** (no 404s; scaffolds ensure 200s)

### Evidence Path
- **Location**: `/artifacts/green-posture/YYYY-MM-DD/*`
- **Retention**: Keep 30 days
- **Format**: Daily snapshots with metrics, traces, and health status

### Key Files to Know
- `GO-LIVE-GUARDRAILS.md` - Comprehensive operational guide
- `OPS-QUICK-REFERENCE-CARD.md` - Emergency reference card
- `FINAL-PRODUCTION-SETUP.md` - Complete setup guide
- `scripts/ops-quick-commands.ps1` - Windows operational commands
- `scripts/ops-quick-commands.sh` - Linux/Mac operational commands

### Default User Credentials
| Email | Password | Role |
|-------|----------|------|
| `superadmin@example.com` | `Passw0rd!super` | `super_admin` |
| `owner@example.com` | `Passw0rd!owner` | `owner` |
| `admin@example.com` | `Passw0rd!admin` | `admin` |
| `ops@example.com` | `Passw0rd!ops` | `ops` |

## 🎯 Nice-to-Have (Next Pass, Optional)

### Budget Anomaly Alerts
- Per-tenant spikes detection
- Automated alerting for unusual patterns
- Cost optimization recommendations

### Auto-Tune Sampling Rate
- Via flags during incidents
- Dynamic adjustment based on system load
- Intelligent sampling rate management

### Weekly Key Rotation
- Automated key-rotation rehearsal
- Summary in Slack
- Security compliance tracking

## 🚀 Operational Cadence

### Every 30 Seconds
- Health check polling
- Kill-switch verification
- Budget monitoring

### Every 5 Minutes
- DLQ retry processing
- Queue depth monitoring
- Performance metrics collection

### Hourly
- ETL maintenance
- Index optimization
- Resource cleanup

### Daily (7:05 AM)
- TTL cleanup
- Backup verification
- Key rotation check
- Daily ritual execution

### Weekly (Sunday 7:15 AM)
- Disaster recovery drills
- Security scans
- Portal audits
- Resilience testing

### Monthly
- Restore drills
- Cost + SLO review
- Flag hygiene
- Performance optimization

## 🎊 Success Criteria

### Day-0 (Go-Live)
- ✅ All 20 portals responding with 200s
- ✅ 250 autonomous agents active
- ✅ SLOs meeting targets (≥98% success, ≤2.5s p95)
- ✅ Emergency controls tested and working
- ✅ Monitoring and alerting active

### Day-1 (Stabilization)
- ✅ No critical incidents
- ✅ Performance within SLO bounds
- ✅ Daily ritual completed successfully
- ✅ Evidence artifacts generated
- ✅ Team handoff completed

### Ongoing (Lights-Out)
- ✅ System runs autonomously
- ✅ Incidents resolved within 15 minutes
- ✅ Zero unplanned downtime
- ✅ Continuous improvement cycle active

## 🎉 You're Production-Ready and Autonomous!

### Keep the Cadence
- **Daily posture** checks
- **Weekly drills** for resilience
- **Monthly reviews** for optimization

### Pull the Fast Levers
- When SLOs wobble, act quickly
- Use soft-degrade before hard stops
- Monitor and adjust based on evidence

### System Will Stay Green
- **Without babysitting** - truly lights-out
- **Self-healing** capabilities active
- **Proactive monitoring** prevents issues

## 📞 Emergency Contacts

### Primary On-Call
- **Contact**: [Your contact info]
- **Escalation**: [Management contact]

### Communication Channels
- **Slack**: #tms-ops for real-time updates
- **Email**: ops@yourcompany.com for formal notifications
- **PagerDuty**: For critical alerts and escalations

---

**Remember**: Your system is designed to run autonomously while providing complete visibility and control. Focus on business growth while the system handles operational complexity! 🚀
