# 🚀 PHASE 2 AUTONOMOUS TMS SYSTEM - DEPLOYMENT GUIDE

## 🎯 Overview

Your **Phase 2 Autonomous TMS System** is now ready for deployment! This guide will walk you through deploying the complete autonomous system that includes:

- ✅ **Supabase Schema** with RLS policies
- ✅ **AI Edge Functions** for intelligent decision-making
- ✅ **N8n Workflows** for automation
- ✅ **Agent Orchestration** with retry logic
- ✅ **24/7 Monitoring** with health checks
- ✅ **Multi-tenant Security** with company isolation

## 📋 Pre-Deployment Checklist

Before starting deployment, ensure you have:

- [ ] Supabase project created
- [ ] OpenAI API key
- [ ] N8n instance running (or plan to set one up)
- [ ] Slack webhook URL (optional, for notifications)
- [ ] Environment variables configured

## 🗄️ Step 1: Deploy Supabase Schema

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and API keys

### 1.2 Deploy Schema
1. Open your Supabase SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Execute the SQL to create all tables, functions, and policies

### 1.3 Verify Schema
```sql
-- Check tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('companies', 'carriers', 'loads', 'agent_functions');

-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

## 🧠 Step 2: Deploy AI Edge Functions

### 2.1 Install Supabase CLI
```bash
npm install -g supabase
```

### 2.2 Login to Supabase
```bash
supabase login
```

### 2.3 Deploy Functions
```bash
# Deploy AI Load Matcher
supabase functions deploy ai-load-matcher --no-verify-jwt

# Deploy Agent Runner
supabase functions deploy agent-runner --no-verify-jwt

# Deploy Health Monitor
supabase functions deploy health --no-verify-jwt
```

### 2.4 Set Environment Variables
In your Supabase Dashboard → Settings → Edge Functions:

```
OPENAI_API_KEY=sk-your-openai-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_URL=https://your-project.supabase.co
N8N_PING_URL=http://localhost:5678/healthz
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

## 🔄 Step 3: Import N8n Workflows

### 3.1 Set up N8n
1. Install N8n: `npm install n8n -g`
2. Start N8n: `n8n start`
3. Access at: `http://localhost:5678`

### 3.2 Import Workflows
1. In N8n, go to Workflows → Import from File
2. Import `n8n-workflows/load-intake-automation.json`
3. Import `n8n-workflows/pod-processing-automation.json`

### 3.3 Configure Credentials
Set up these credentials in N8n:
- **Supabase**: Your project URL and service role key
- **OpenAI**: Your API key
- **Slack**: Your webhook URL

### 3.4 Activate Workflows
1. Click "Activate" on each workflow
2. Note the webhook URLs:
   - `http://localhost:5678/webhook/load-created`
   - `http://localhost:5678/webhook/pod-uploaded`

## ⚡ Step 4: Set Up Agent Orchestration

### 4.1 Seed Agent Functions
```sql
-- Run this in Supabase SQL Editor
INSERT INTO public.agent_functions (name, target, endpoint) VALUES
  ('load_match','supabase_function','ai-load-matcher'),
  ('notify_ops','n8n_webhook','http://localhost:5678/webhook/ops-notify'),
  ('route_optimize','supabase_function','ai-route-optimizer'),
  ('invoice_generate','supabase_function','ai-invoice-generator')
ON CONFLICT (name) DO NOTHING;
```

### 4.2 Set Up Scheduled Agent Runner
Create a cron job or use Supabase scheduled functions:

```sql
-- Create scheduled function to run agent runner every 3 minutes
SELECT cron.schedule(
  'agent-runner',
  '*/3 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/agent-runner',
    headers := '{"Authorization": "Bearer your-service-role-key", "Content-Type": "application/json"}',
    body := '{"test": true}'
  );
  $$
);
```

## 🕐 Step 5: Configure 24/7 Monitoring

### 5.1 Set Up Health Checks
Create a monitoring script:

```bash
#!/bin/bash
# monitor.sh
while true; do
  response=$(curl -s https://your-project.supabase.co/functions/v1/health)
  status=$(echo $response | jq -r '.status')
  
  if [ "$status" != "green" ]; then
    echo "ALERT: System health is $status"
    # Send alert to Slack/Email
  fi
  
  sleep 300  # Check every 5 minutes
done
```

### 5.2 Set Up Alerts
Configure alerts for:
- Health check failures
- Agent task failures
- Database connection issues
- OpenAI API errors

## 🔒 Step 6: Test Multi-Tenant Security

### 6.1 Create Test Data
```sql
-- Create test company and user
INSERT INTO public.companies (name) VALUES ('Test Company');
INSERT INTO public.user_profiles (user_id, email, role, company_id) 
VALUES ('test-user-id', 'test@example.com', 'admin', 
        (SELECT id FROM public.companies WHERE name = 'Test Company'));

-- Create test carrier
INSERT INTO public.carriers (company_id, name, equipment, lanes)
VALUES ((SELECT id FROM public.companies WHERE name = 'Test Company'),
        'Test Carrier', ARRAY['van'], '[{"origin":"CA","dest":"TX"}]'::jsonb);
```

### 6.2 Test RLS Policies
```sql
-- Test that users can only see their company data
-- This should only return data for the user's company
SELECT * FROM public.carriers;
```

## 🧪 Step 7: End-to-End Testing

### 7.1 Test Load Creation
```bash
# Create a test load
curl -X POST http://localhost:5678/webhook/load-created \
  -H "Content-Type: application/json" \
  -d '{"load_id": "your-load-id"}'
```

### 7.2 Test POD Processing
```bash
# Simulate POD upload
curl -X POST http://localhost:5678/webhook/pod-uploaded \
  -H "Content-Type: application/json" \
  -d '{"load_id": "your-load-id", "doc_url": "https://example.com/pod.pdf"}'
```

### 7.3 Monitor Results
Check these tables for results:
- `carrier_recommendations`
- `assignments`
- `documents`
- `invoices`

## 📊 Step 8: Monitor SLOs

### 8.1 Set Up Monitoring Dashboard
Track these metrics:
- **Uptime**: Target 99.9%
- **Response Time**: Target < 2.5s
- **Error Rate**: Target < 0.1%
- **Agent Task Success Rate**: Target > 95%

### 8.2 Configure Alerts
Set up alerts for:
- SLO violations
- High error rates
- Slow response times
- Failed agent tasks

## 🚀 Step 9: Production Deployment

### 9.1 Update Environment Variables
For production, update:
```
APP_DASHBOARD_URL=https://app.transbotai.com
NEXT_PUBLIC_SITE_URL=https://transbotai.com
N8N_BASE_URL=https://n8n.transbotai.com
```

### 9.2 Set Up SSL/TLS
- Configure HTTPS for all endpoints
- Set up proper SSL certificates
- Enable HSTS headers

### 9.3 Configure Backup
- Set up database backups
- Configure disaster recovery
- Test backup restoration

## 🎉 Success Criteria

Your autonomous TMS system is fully operational when:

✅ **Load Creation** → AI matches carriers → Assignment created → Ops notified
✅ **POD Upload** → Document stored → Invoice generated → Accounting notified
✅ **Agent Tasks** → Processed automatically → Retry on failure → Quarantine if needed
✅ **Health Monitoring** → Checks all systems → Alerts on issues → Auto-recovery
✅ **Multi-tenant Security** → Company isolation → Role-based access → Secure data

## 🔧 Troubleshooting

### Common Issues:

1. **Edge Functions Not Deploying**
   - Check Supabase CLI version
   - Verify project link
   - Check environment variables

2. **N8n Workflows Not Triggering**
   - Verify webhook URLs
   - Check credentials
   - Test webhook endpoints

3. **Agent Tasks Not Processing**
   - Check scheduled function
   - Verify agent-runner deployment
   - Check task queue

4. **RLS Policies Blocking Access**
   - Verify user authentication
   - Check company membership
   - Test helper functions

## 📞 Support

If you encounter issues:

1. Check the logs in Supabase Dashboard
2. Review N8n execution history
3. Test individual components
4. Verify environment variables

## 🎯 Next Steps

After successful deployment:

1. **Phase 3**: Add more AI functions (route optimization, predictive analytics)
2. **Phase 4**: Implement advanced monitoring and alerting
3. **Phase 5**: Add machine learning for continuous improvement
4. **Phase 6**: Scale to handle thousands of loads per day

---

**🎉 Congratulations! Your Autonomous TMS System is now ready for 24/7 operation!**
