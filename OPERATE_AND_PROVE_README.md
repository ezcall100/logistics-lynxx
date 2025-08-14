# 🟢 Operate & Prove - Production-Grade Autonomous System

## Overview

This comprehensive operational framework implements the "operate & prove" checklist for maintaining a production-grade autonomous TMS system. It provides continuous monitoring, compliance artifacts, resilience testing, and incident response capabilities.

## 🏗️ System Architecture

### Core Components

1. **Green Posture Monitor** (`scripts/green-posture-script.js`)
   - Continuous monitoring of feature flags, budgets, and SLOs
   - Daily compliance artifact generation
   - Automatic alerting and emergency stops

2. **Resilience Drills** (`scripts/resilience-drills.js`)
   - Weekly 15-minute safety tests
   - Kill switch, region wobble, replay rails, and idempotency testing

3. **Operational Cadence** (`scripts/operational-cadence.js`)
   - Daily/weekly/monthly maintenance tasks
   - TTL cleanup, partition rotation, backup checks, DR drills

4. **Incident Response** (`scripts/incident-response.js`)
   - One-page incident levers
   - Big red button, soft degrade, and rollback procedures

5. **Acceptance Testing** (`scripts/acceptance-testing.js`)
   - "Done-done" proof validation
   - Synthetic tasks, error handling, RLS verification

## 🚀 Quick Start

### Prerequisites

```bash
# Install dependencies
npm install @supabase/supabase-js

# Set environment variables
export SUPABASE_URL="your_supabase_url"
export SUPABASE_ANON_KEY="your_supabase_anon_key"
export API_SECRET_KEY="your_api_secret_key"
```

### Start Green Posture Monitoring

```bash
# Start continuous monitoring
node scripts/green-posture-script.js
```

### Run Weekly Resilience Drills

```bash
# Run all resilience drills
node scripts/resilience-drills.js
```

### Execute Operational Cadence

```bash
# Daily tasks
node scripts/operational-cadence.js daily

# Weekly tasks
node scripts/operational-cadence.js weekly

# Monthly tasks
node scripts/operational-cadence.js monthly
```

### Test Incident Response

```bash
# Test incident handling
node scripts/incident-response.js test

# Handle specific incident
node scripts/incident-response.js handle '{"level":"critical","type":"system_failure","description":"Test incident"}'

# Resume system after incident
node scripts/incident-response.js resume <incident_id>
```

### Run Acceptance Testing

```bash
# Run complete acceptance test suite
node scripts/acceptance-testing.js
```

## 📊 Monitoring & Compliance

### Feature Flags (Non-Negotiable Guardrails)

| Flag | Required Value | Purpose |
|------|----------------|---------|
| `autonomy.emergencyStop` | `false` | Emergency stop control |
| `autonomy.mode` | `FULL` | Autonomous operation mode |
| `agents.autonomousEnabled` | `true` | Agent activation |
| `obs.otelEnabled` | `true` | Observability tracing |

### Budget Limits

| Resource | Limit | Purpose |
|----------|-------|---------|
| Agent Concurrency | ≤150 | Prevent resource exhaustion |
| Replay Batch Size | ≤50 items | Prevent memory issues |
| Replay Max Size | ≤2MB | Prevent storage issues |
| Replay Fail Rate | ≤20% | Prevent cascading failures |

### SLO Gates

| Metric | Target | Action |
|--------|--------|--------|
| Uptime | ≥99.95% | Auto-throttle + CI rollback |
| Success Rate | ≥98% | Auto-throttle + CI rollback |
| P95 Response Time | ≤2.5s | Auto-throttle + CI rollback |
| Outbox Lag P95 | ≤5s | Alert + investigation |
| Agent Success Rate | ≥98% | Quarantine + investigation |
| DLQ Replay Fail Rate | ≤2% | Pause + investigation |

### Live Watchlist (First 72h, then ongoing)

- **Outbox lag p95 < 5s (avg < 2s)**
- **Agent success > 98% (quarantine < 1%)**
- **DLQ replay fail < 2%; replays/tenant/day < 3**
- **CI self-heal triggers = 0 on main**
- **Trace coverage: spans for agent.task.execute present on canary flows**

## 🧪 Resilience Drills

### Weekly 15-Minute Safety Tests

1. **Kill Switch Drill**
   - Flip `autonomy.emergencyStop` → halt
   - Flip back → resume in 1 cycle
   - Verify clean stop/resume loop

2. **Region Wobble Drill**
   - Simulate replica lag
   - Verify health-gated cutover after 3×/30s fails
   - Ensure no data loss

3. **Replay Rails Drill**
   - Exceed batch/size limits
   - Expect hard stop + audit
   - Verify safety mechanisms

4. **Idempotency Drill**
   - Resend same signed request
   - Expect 409/ignored, no dup effects
   - Verify idempotency guarantees

## 📦 Compliance Evidence (30-Day Rolling)

### Daily Artifacts

The green posture script generates daily artifacts in `/artifacts/green-posture/YYYY-MM-DD/`:

- **flags.json** - Activation flags + budgets
- **slo_snapshot.json** - Uptime, success%, p95, dlq depth
- **outbox_lag.json** - P50/p95/avg metrics
- **alerts.sql.out** - Zero or list of active alerts
- **trace-sample.txt** - 3 trace IDs with deep-links
- **audit_digest.json** - Last 24h critical actions

### Retention Policy

- Keep 35 days of artifacts
- Auto-purge older artifacts
- Compressed storage for historical data

## 👥 Roles & Users

### Human Roles

| Role | Permissions | Purpose |
|------|-------------|---------|
| `super_admin` | Global access | System administration |
| `tenant_admin` | Tenant-scoped | Tenant management |
| `ops_manager` | Operational | Incident response |
| `dispatcher` | Dispatch operations | Load management |
| `finance_manager` | Financial data | Billing & invoicing |
| `analyst` | Read-only analytics | Reporting |
| `developer` | Development access | Code deployment |
| `viewer` | Read-only | Monitoring |

### Service Accounts (Rotate ≤90d)

| Account | Purpose | Permissions |
|---------|---------|-------------|
| `autopilot@` | Orchestration, canary flags | System control |
| `agents@` | Task execution | Agent operations |
| `dlq@` | Replay with rails | DLQ management |
| `ci@` | Verify + rollback | CI/CD operations |
| `n8n@` | Signed webhooks | Workflow automation |
| `system@` | Break-glass: kill switch only | Emergency control |

### Portal Gates (RLS)

20 canonical portals mapped to roles exactly as in `role-matrix.md`:

- Super Admin Portal
- Carrier Portal
- Shipper Portal
- Broker Portal
- Driver Portal
- Owner-Operator Portal
- Analytics Portal
- Financial Portal
- Dispatch Portal
- And more...

## 🛠️ Operational Cadence

### Daily Tasks

- **TTL cleanup** (agent_logs)
- **Partition rotation**
- **Backup freshness check**
- **Budget drift report**

### Weekly Tasks

- **DR drill**
- **Security scans** (CodeQL, gitleaks)
- **Portal audit**
- **Canary ramp sanity check**

### Monthly Tasks

- **Key rotation rehearsal** (6 SAs)
- **Restore test** (RPO/RTO proof)
- **Cost & SLO review**

## 🚨 Incident Response

### One-Page Incident Levers

#### Big Red Button
```bash
# Emergency stop all autonomous writes
node scripts/incident-response.js handle '{"level":"critical","type":"emergency_stop","description":"System emergency"}'
```

#### Soft Degrade
```bash
# Lower concurrency, pause DLQ, flip canary flags to SAFE
node scripts/incident-response.js handle '{"level":"high","type":"soft_degrade","description":"Graceful degradation"}'
```

#### Rollback
```bash
# CI self-heal workflow reverts + posts audit & trace links
node scripts/incident-response.js handle '{"level":"high","type":"rollback","description":"System rollback"}'
```

### Incident Levels

| Level | Response | Timeout |
|-------|----------|---------|
| **Critical** | Emergency stop + isolation | 30s |
| **High** | Soft degrade + throttling | 1m |
| **Medium** | Monitoring + rollback prep | 5m |
| **Low** | Logging + escalation monitoring | 10m |

## ✅ Acceptance Testing

### "Done-Done" Proof (10 minutes)

1. **Synthetic task runs end-to-end**
   - UI Live Feed + span + audit
   - Verify complete trace coverage

2. **Forced error produces Slack with trace link and DLQ entry**
   - Test error notification chain
   - Verify proper error handling

3. **RLS tenant cross-read returns zero**
   - Test tenant isolation
   - Verify security boundaries

4. **Kill-switch toggles stop/resume loop cleanly**
   - Test emergency controls
   - Verify system recovery

5. **Evidence pack for today exists and passes thresholds**
   - Validate compliance artifacts
   - Verify operational readiness

## 📈 Monitoring Dashboard

### Key Metrics

- **System Health Score**: 0-100 based on all SLOs
- **Active Incidents**: Current incident count and status
- **Agent Performance**: Success rates and quarantine status
- **Resource Utilization**: CPU, memory, and network usage
- **Compliance Status**: Feature flags and budget adherence

### Alerting

- **Critical**: Immediate emergency stop
- **High**: Soft degrade + stakeholder notification
- **Medium**: Increased monitoring + rollback preparation
- **Low**: Logging + escalation monitoring

## 🔧 Configuration

### Environment Variables

```bash
# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# API Security
API_SECRET_KEY=your_api_secret_key

# Monitoring
MONITORING_INTERVAL=300000  # 5 minutes
ALERT_WEBHOOK_URL=your_alert_webhook

# Autonomous Settings
AUTO_RECOVERY=true
MAX_RETRY_ATTEMPTS=3
ESCALATION_THRESHOLD=5
```

### Feature Flags

```json
{
  "autonomy.emergencyStop": false,
  "autonomy.mode": "FULL",
  "agents.autonomousEnabled": true,
  "obs.otelEnabled": true,
  "canary.rollout_percentage": "SAFE",
  "canary.auto_rollback": "SAFE",
  "canary.health_threshold": "SAFE"
}
```

## 📚 API Reference

### Green Posture Monitor

```javascript
const { GreenPostureMonitor } = require('./scripts/green-posture-script');

const monitor = new GreenPostureMonitor();
await monitor.initialize();
```

### Resilience Drills

```javascript
const { ResilienceDrills } = require('./scripts/resilience-drills');

const drills = new ResilienceDrills();
await drills.runWeeklyDrills();
```

### Incident Response

```javascript
const { IncidentResponse } = require('./scripts/incident-response');

const response = new IncidentResponse();
await response.handleIncident({
  level: 'critical',
  type: 'system_failure',
  description: 'Database connection lost'
});
```

### Acceptance Testing

```javascript
const { AcceptanceTesting } = require('./scripts/acceptance-testing');

const testing = new AcceptanceTesting();
await testing.runAcceptanceTests();
```

## 🚀 Deployment

### Production Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

3. **Setup Database Tables**
   ```bash
   npm run db:setup
   ```

4. **Start Monitoring**
   ```bash
   node scripts/green-posture-script.js
   ```

5. **Schedule Operational Tasks**
   ```bash
   # Add to crontab
   0 2 * * * node scripts/operational-cadence.js daily
   0 3 * * 0 node scripts/operational-cadence.js weekly
   0 4 1 * * node scripts/operational-cadence.js monthly
   0 4 * * 0 node scripts/resilience-drills.js
   ```

### Service Management

```bash
# Start as systemd service
sudo systemctl enable autonomous-tms-monitor
sudo systemctl start autonomous-tms-monitor

# Check status
sudo systemctl status autonomous-tms-monitor

# View logs
sudo journalctl -u autonomous-tms-monitor -f
```

## 🔍 Troubleshooting

### Common Issues

1. **Feature Flag Violations**
   - Check `autonomy.emergencyStop` flag
   - Verify all required flags are set correctly
   - Review recent configuration changes

2. **SLO Breaches**
   - Check system resources (CPU, memory, disk)
   - Review recent deployments
   - Analyze error logs and traces

3. **Budget Exceeded**
   - Check agent concurrency settings
   - Review DLQ replay patterns
   - Analyze resource utilization

4. **Incident Response Failures**
   - Verify database connectivity
   - Check service account permissions
   - Review incident logs

### Debug Commands

```bash
# Check system status
node scripts/incident-response.js list

# Test specific functionality
node scripts/acceptance-testing.js

# View recent artifacts
ls -la artifacts/green-posture/$(date +%Y-%m-%d)/

# Check logs
tail -f logs/green-posture.log
```

## 📞 Support

### Emergency Contacts

- **System Administrator**: admin@company.com
- **On-Call Engineer**: oncall@company.com
- **Security Team**: security@company.com

### Escalation Procedures

1. **Level 1**: Automated monitoring and alerts
2. **Level 2**: On-call engineer notification
3. **Level 3**: System administrator escalation
4. **Level 4**: Security team involvement

### Documentation

- **System Architecture**: `docs/architecture.md`
- **API Documentation**: `docs/api.md`
- **Deployment Guide**: `docs/deployment.md`
- **Troubleshooting**: `docs/troubleshooting.md`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**🎯 The autonomous TMS system is now operating with production-grade monitoring, compliance, and incident response capabilities. Keep the cadence, keep the rails, and you'll stay green.**
