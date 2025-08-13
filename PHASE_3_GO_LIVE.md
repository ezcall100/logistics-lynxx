# 🚀 Phase 3: Production Go-Live Plan
## Trans Bot AI - Autonomous TMS Deployment

### 📋 Executive Summary
This document outlines the complete production deployment strategy for the Trans Bot AI autonomous TMS system. Phase 3 represents the transition from development/testing to a fully operational, 24/7 autonomous system serving real customers.

---

## 🎯 Deployment Architecture

### 0) Environment & DNS Configuration

#### Production Domains
```
www.transbotai.com     → Public website (Next.js)
app.transbotai.com     → Unified Dashboard (Vite)
api.transbotai.com     → Edge Functions proxy (optional)
n8n.transbotai.com     → n8n (secure behind SSO/IP allowlist)
```

#### CORS Configuration
```
Allowed Origins:
- https://www.transbotai.com
- https://app.transbotai.com
- https://n8n.transbotai.com
- https://api.transbotai.com
```

#### Multi-Tenant Setup
- **Staging Environment**: Separate Supabase project for testing
- **Production Environment**: Dedicated Supabase project for live operations
- **Database Isolation**: Complete separation between staging and production data

---

## 🔐 1) Environment Variables & Secrets

### Website & Dashboard Configuration
```bash
# Public Website (Next.js)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
APP_DASHBOARD_URL=https://app.transbotai.com
SENTRY_DSN=https://your-sentry-dsn

# Unified Dashboard (Vite)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_URL=https://app.transbotai.com
VITE_SENTRY_DSN=https://your-sentry-dsn
```

### Supabase Edge Functions
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
N8N_PING_URL=https://n8n.transbotai.com
SLACK_WEBHOOK_URL=https://hooks.slack.com/your-webhook
```

### n8n Configuration
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/your-webhook
N8N_API_KEY=your-n8n-api-key
```

---

## 🗄️ 2) Database & Functions Deployment

### Supabase CLI Commands
```bash
# Link to production project
supabase link --project-ref your-production-project-ref

# Deploy database schema and RLS policies
supabase db push

# Deploy all edge functions
supabase functions deploy ai-load-matcher
supabase functions deploy agent-runner
supabase functions deploy health
supabase functions deploy on-signup
```

### Agent Runner Scheduling
Choose one of the following approaches:

#### Option A: n8n Cron Trigger (Recommended)
```json
{
  "name": "Agent Runner Cron",
  "type": "n8n-nodes-base.cron",
  "parameters": {
    "rule": {
      "hour": "*",
      "minute": "*/5"
    }
  }
}
```

#### Option B: Supabase Scheduled Functions
```sql
-- Create scheduled function for agent runner
SELECT cron.schedule(
  'agent-runner-every-5-minutes',
  '*/5 * * * *',
  'SELECT agent_runner();'
);
```

---

## 🔄 3) n8n Workflows Import

### Import Method A: UI Import
1. Navigate to n8n dashboard: `https://n8n.transbotai.com`
2. Go to Workflows → Import
3. Upload the following JSON files:
   - `n8n-workflows/load-intake-automation.json`
   - `n8n-workflows/pod-processing-automation.json`

### Import Method B: API Import
```bash
# Import load intake workflow
curl -X POST "https://n8n.transbotai.com/rest/workflows" \
  -H "Content-Type: application/json" \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  --data-binary @n8n-workflows/load-intake-automation.json

# Import POD processing workflow
curl -X POST "https://n8n.transbotai.com/rest/workflows" \
  -H "Content-Type: application/json" \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  --data-binary @n8n-workflows/pod-processing-automation.json
```

### Configure Credentials
Set up the following credentials in n8n:
- **Supabase**: Database connection with service role key
- **OpenAI**: API key for AI operations
- **Slack**: Webhook URL for notifications

---

## 🚀 4) CI/CD Pipeline Configuration

### Supabase Deployment Workflow
```yaml
name: Deploy Supabase
on:
  push:
    tags: ['v*']
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
      - run: supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
      - run: supabase db push
      - run: supabase functions deploy ai-load-matcher agent-runner health on-signup
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

### Application Deployment
- **Public Website**: Deploy to Vercel/Netlify with automatic preview builds
- **Unified Dashboard**: Deploy to your hosting provider
- **Enable**: Preview builds for PRs, production deployment on tags

---

## 🧪 5) Smoke Tests (T-0)

### Health Check Verification
```bash
# Test health endpoint
curl -s https://your-project.supabase.co/functions/v1/health | jq .

# Expected response:
{
  "status": "ok",
  "database": "green",
  "n8n": "green",
  "openai": "green",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Load Intake → Match Test
```bash
# Create test load in database
INSERT INTO loads (id, origin, destination, weight, status, company_id)
VALUES (
  gen_random_uuid(),
  'Los Angeles, CA',
  'New York, NY',
  10000,
  'available',
  'your-company-id'
);

# Trigger load intake workflow
curl -X POST https://n8n.transbotai.com/webhook/load-created \
  -H "Content-Type: application/json" \
  -d '{"load_id":"your-load-id"}'

# Verify results
SELECT * FROM carrier_recommendations WHERE load_id = 'your-load-id';
SELECT * FROM assignments WHERE load_id = 'your-load-id' AND status = 'proposed';
```

### POD → Invoice Test
```bash
# Trigger POD processing
curl -X POST https://n8n.transbotai.com/webhook/pod-uploaded \
  -H "Content-Type: application/json" \
  -d '{
    "load_id": "your-load-id",
    "doc_url": "https://example.com/pod.pdf"
  }'

# Verify results
SELECT * FROM documents WHERE load_id = 'your-load-id' AND kind = 'pod';
SELECT status FROM loads WHERE id = 'your-load-id';
SELECT * FROM invoices WHERE load_id = 'your-load-id';
```

---

## 📊 6) Observability & SLOs

### Monitoring Setup
- **Sentry**: Error tracking for website and dashboard
- **Release Tags**: Git SHA for deployment tracking
- **n8n Alerts**: Slack notifications on workflow failures
- **Edge Function Logs**: Success ratio monitoring

### Service Level Objectives (SLOs)
```
Uptime: 99.9%
Web Performance: LCP < 2.5s, INP < 200ms
API Response: P95 ≤ 500ms
Agent Success Rate: ≥ 98%/hour
Error Budget: 0.1% (8.76 hours/month)
```

### Alerting Rules
- Agent task success rate < 98% for 1 hour
- n8n workflow failures > 3 retries
- Edge function response time > 1s
- Database connection failures

---

## 🔒 7) Security Hardening

### Authentication & Authorization
- **MFA**: Enforced for all admin accounts
- **Password Policy**: Minimum 12 characters, complexity requirements
- **Session Management**: Short lifetimes (4-8 hours)
- **Device Tracking**: Monitor suspicious login patterns

### Data Security
- **Service Role Keys**: Only in server contexts (edge functions, n8n)
- **RLS Policies**: "Secure by default" on all tables
- **CORS**: Locked to production domains only
- **n8n Webhooks**: IP allowlist + authentication headers

### Audit Logging
```sql
-- Create audit log table
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
```

---

## 🔄 8) Rollback & Disaster Recovery

### Blue/Green Deployment
- **Blue Environment**: Current production
- **Green Environment**: New deployment
- **Switch**: Single DNS change for instant rollback

### Database Recovery
- **Snapshots**: Daily automatic backups
- **Retention**: 7 daily + 4 weekly + 12 monthly
- **Restore Testing**: Monthly verification
- **Migration Rollback**: Scripted rollback procedures

### n8n Workflow Versioning
- **Export**: All workflows before changes
- **Git Storage**: Version control for workflow configurations
- **Import**: Automated workflow restoration

---

## 📈 9) Post-Launch KPIs (First 14 Days)

### Operational Metrics
- **Error Budget**: Track usage against 0.1% monthly allowance
- **Task Queue Success**: Monitor agent-runner success rates
- **Quarantine Count**: Track failed tasks requiring manual intervention
- **System Uptime**: Real-time availability monitoring

### Business Metrics
- **Rates Portal**: Quote-to-booking conversion ≥ 25%
- **Response Time**: P95 quote generation ≤ 500ms
- **Rate Accuracy**: Variance vs actual rates ≤ ±8%
- **Directory Portal**: Profile completeness ≥ 80%

### User Experience
- **Page Load Times**: LCP < 2.5s, INP < 200ms
- **API Response**: P95 ≤ 500ms
- **Error Rates**: < 0.1% for critical user flows

---

## 📋 10) Minimal Runbooks

### Incident Response (SEV2 Template)
```
1. Confirm via /health endpoint
2. Check n8n error summaries
3. Pause agent-runner if cascading failures
4. Retry quarantined tasks in batches of 10
5. Post-mortem within 24 hours
6. Attach query IDs and logs
```

### Capacity Management
```
If queue wait > 60s average:
- Scale agent-runner interval to 2 minutes
- Or parallelize to 2-3 runners
- Monitor resource usage
- Adjust based on load patterns
```

---

## ✅ 11) Final Acceptance Checklist

### Pre-Launch Verification
- [ ] Domains & TLS certificates active
- [ ] Supabase migrations applied (staging → production)
- [ ] Edge functions responding (200 status)
- [ ] n8n workflows imported and configured
- [ ] Cron triggers enabled for agent-runner
- [ ] Smoke tests passing (intake, match, POD → invoice)
- [ ] Sentry events flowing
- [ ] Slack alerts tested
- [ ] MFA enforced for admin accounts
- [ ] CORS locked to production domains
- [ ] Backups verified and tested
- [ ] Rollback procedure dry-run completed

### Go-Live Authorization
- [ ] All checklist items completed
- [ ] Stakeholder approval obtained
- [ ] Support team briefed
- [ ] Monitoring dashboards active
- [ ] Emergency contacts documented
- [ ] Launch announcement prepared

---

## 🎉 Go-Live Sequence

### T-0: Launch
1. **DNS Switch**: Point domains to production
2. **Health Check**: Verify all systems operational
3. **Smoke Test**: Run full test suite
4. **Monitoring**: Activate all alerts
5. **Announcement**: Notify stakeholders

### T+1: First Day
1. **Performance Review**: Check all KPIs
2. **Error Analysis**: Review any issues
3. **User Feedback**: Monitor user experience
4. **System Tuning**: Optimize based on real load

### T+7: First Week
1. **Comprehensive Review**: Full system assessment
2. **Performance Optimization**: Fine-tune based on usage
3. **Security Audit**: Verify all security measures
4. **Documentation Update**: Update runbooks based on learnings

---

## 📞 Support & Escalation

### Primary Contacts
- **Technical Lead**: [Contact Information]
- **DevOps Engineer**: [Contact Information]
- **Product Manager**: [Contact Information]

### Escalation Matrix
1. **Level 1**: Automated monitoring and self-healing
2. **Level 2**: On-call engineer (15-minute response)
3. **Level 3**: Technical lead (30-minute response)
4. **Level 4**: Executive escalation (1-hour response)

---

## 📚 Additional Resources

- **System Architecture**: [Link to architecture docs]
- **API Documentation**: [Link to API docs]
- **User Guides**: [Link to user documentation]
- **Troubleshooting**: [Link to troubleshooting guide]
- **Performance Monitoring**: [Link to monitoring dashboards]

---

*This document is a living document and should be updated as the system evolves and new learnings are incorporated.*
