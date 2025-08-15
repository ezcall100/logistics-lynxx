# 🚨 DAY-0/DAY-1 QUICK REFERENCE CARD

## ⚡ 2-MINUTE GREEN CHECK (Copy/Paste)

### 1. Feature Flags Status
```bash
psql "$SUPABASE_DB_URL" -c \
"select key,scope,value from feature_flags_v2
 where key in ('autonomy.mode','autonomy.emergencyStop','agents.autonomousEnabled','obs.otelEnabled')
 order by key;"
```
**Expected**: FULL / false / true / true

### 2. Synthetic Task + Trace
```bash
node scripts/acceptance-testing.js
```

### 3. Portal Routes
```bash
npm run check:portals
```
**Expected**: All 20 OK, deprecated 410

## 🎛️ FAST LEVERS (Muscle Memory)

### 🔴 Big Red Button (Halt All)
```sql
update feature_flags_v2 set value=true where key='autonomy.emergencyStop' and scope='global';
```

### 🟡 Soft-Degrade (Reduce Load)
```sql
update feature_flags_v2 set value=100 where key='budget.agents.maxConcurrent' and scope='global';
update feature_flags_v2 set value=1   where key='rate.replay.per5m' and scope='global';
```

### 🟢 Resume Operations
```sql
update feature_flags_v2 set value=false where key='autonomy.emergencyStop' and scope='global';
```

## 👀 WHAT TO WATCH (24-72h)

### Critical Metrics
- **Outbox lag p95 < 5s**
- **DLQ replay fail < 2%**
- **Agent success > 98%**

### Evidence Path
- **Location**: `/artifacts/green-posture/YYYY-MM-DD/*`
- **Keep**: 30 days
- **Pin**: In your dashboard

## 🚨 ON-CALL COMMANDS

### Quick Health Check
```powershell
.\scripts\ops-quick-commands.ps1 sanity-ping
.\scripts\ops-quick-commands.ps1 status
```

### Daily Ritual
```powershell
.\scripts\ops-quick-commands.ps1 daily-ritual
```

### Emergency Procedures
```powershell
.\scripts\ops-quick-commands.ps1 emergency-stop
.\scripts\ops-quick-commands.ps1 soft-degrade
.\scripts\ops-quick-commands.ps1 resume
```

## 🛡️ GUARDRAIL TRIPWIRES (Escalate If)

### Success Rate Issues
- **Success < 98% for 10 min** → soft-degrade + inspect DLQ traces

### Latency Issues
- **p95 > 2.5s for 10 min** → reduce concurrency, bump cache TTLs

### Replay Failures
- **Replay fail > 20% in batch** → auto-stop triggers (already enforced)

### System Overload
- **Queue depth > 200 items** → apply soft-degrade immediately

## 📋 HANDOFF ESSENTIALS

### Single Source of Truth
- **Portal Registry**: `src/portals/registry.ts`
- **All portals**: auth + role + flag (no 404s)

### Key Files
- `GO-LIVE-GUARDRAILS.md` - Comprehensive guide
- `OPS-QUICK-REFERENCE-CARD.md` - Emergency reference
- `DAY-0-DAY-1-RUNBOOK.md` - This runbook

### Default Users
| Email | Password | Role |
|-------|----------|------|
| `superadmin@example.com` | `Passw0rd!super` | `super_admin` |
| `owner@example.com` | `Passw0rd!owner` | `owner` |
| `admin@example.com` | `Passw0rd!admin` | `admin` |
| `ops@example.com` | `Passw0rd!ops` | `ops` |

## 🚀 OPERATIONAL CADENCE

### Every 30s
- Health check polling
- Kill-switch verification

### Every 5m
- DLQ retry processing
- Queue depth monitoring

### Daily (7:05 AM)
- TTL cleanup
- Daily ritual execution

### Weekly (Sunday 7:15 AM)
- Disaster recovery drills
- Resilience testing

## 🎯 SUCCESS CRITERIA

### Day-0 (Go-Live)
- ✅ All 20 portals responding with 200s
- ✅ 250 autonomous agents active
- ✅ SLOs meeting targets

### Day-1 (Stabilization)
- ✅ No critical incidents
- ✅ Performance within SLO bounds
- ✅ Daily ritual completed

### Ongoing (Lights-Out)
- ✅ System runs autonomously
- ✅ Incidents resolved within 15 minutes
- ✅ Zero unplanned downtime

## 🎉 YOU'RE PRODUCTION-READY!

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

---

**Remember**: Focus on business growth while the system handles operational complexity! 🚀
