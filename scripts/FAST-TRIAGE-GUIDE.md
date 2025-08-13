# 🚨 Fast Triage Guide: Day-0 Go-Live Issues

## Quick Diagnostic Commands

### 1. No Log Lines in UI but CLI Tail Works
**Problem**: Browser can't see real-time updates
**Solution**: Check authentication and company mapping

```sql
-- Verify user's company_id matches canary tenant
SELECT p.company_id, p.email 
FROM auth.users u 
JOIN public.profiles p ON u.id = p.id 
WHERE u.email = 'your-email@example.com';

-- Should return: 00000000-0000-4000-8000-000000000001
```

**Fix**: Ensure user is member of canary company or update profiles table.

### 2. No Realtime at All
**Problem**: Real-time subscriptions not working
**Solution**: Check publication tables

```sql
-- Verify tables are in realtime publication
SELECT * FROM pg_publication_tables WHERE pubname='supabase_realtime';

-- Should include: agent_logs, agent_tasks
```

**Fix**: Add tables to publication if missing:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE agent_logs, agent_tasks;
```

### 3. Task Stays Queued
**Problem**: Agent runner not processing tasks
**Solution**: Check function environment

```bash
# Check function environment variables
supabase functions list
supabase functions logs agent-runner --follow
```

**Required Environment Variables**:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `N8N_AGENT_LOG_WEBHOOK` (optional)

**Fix**: Re-deploy function with correct env vars:
```bash
supabase functions deploy agent-runner
```

### 4. RLS Denial in UI
**Problem**: Row Level Security blocking access
**Solution**: Verify user permissions

```sql
-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename LIKE 'agent_%';

-- Verify user can access their company's data
SELECT * FROM public.agent_tasks 
WHERE company_id = '00000000-0000-4000-8000-000000000001'
LIMIT 1;
```

**Fix**: Ensure user's JWT contains correct company_id claim.

### 5. Slack Silent on Errors
**Problem**: No error notifications in Slack
**Solution**: Check webhook configuration

```bash
# Verify webhook is set on function, not frontend
supabase functions config list agent-runner

# Should show: N8N_AGENT_LOG_WEBHOOK=https://hooks.slack.com/...
```

**Fix**: Set webhook on function and re-deploy:
```bash
supabase functions config set N8N_AGENT_LOG_WEBHOOK=https://hooks.slack.com/...
supabase functions deploy agent-runner
```

### 6. Log Volume Sanity Check
**Problem**: Too many logs accumulating
**Solution**: Verify TTL cleanup

```sql
-- Check 30-day TTL is working
SELECT count(*) FROM agent_logs WHERE created_at < NOW() - INTERVAL '30 days';
-- Should trend to ~0 after nightly cron

-- Check recent log volume
SELECT 
  DATE(created_at) as date,
  COUNT(*) as log_count
FROM agent_logs 
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

**Fix**: Ensure pg_cron job is running:
```sql
SELECT * FROM cron.job WHERE command LIKE '%agent_logs%';
```

## Emergency Rollback Commands

### Disable Autonomous Processing
```typescript
// Update feature flags to disable
updateFeatureFlag('autonomousAgents', { enabled: false, rolloutPercentage: 0 });
updateFeatureFlag('aiLoadMatching', { enabled: false, rolloutPercentage: 0 });
```

### Scale Down Agent Runner
```bash
# Stop function (if using scheduled invocations)
supabase functions config set agent-runner.enabled=false
```

### Clear Queue
```sql
-- Clear all queued tasks (emergency only)
UPDATE agent_tasks SET status = 'cancelled' WHERE status = 'queued';
```

## Health Check Commands

### System Status
```bash
# Quick health check
curl -s "$SUPABASE_URL/functions/v1/health" | jq .

# Check recent errors
curl -s -H "apikey: $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/agent_logs?level=eq.ERROR&order=created_at.desc&limit=5"
```

### Performance Metrics
```sql
-- Check success rate
SELECT * FROM v_agent_metrics_15m 
WHERE company_id = '00000000-0000-4000-8000-000000000001'
ORDER BY time_bucket DESC LIMIT 1;

-- Check queue depth
SELECT status, COUNT(*) FROM agent_tasks 
WHERE company_id = '00000000-0000-4000-8000-000000000001'
GROUP BY status;
```

## Common Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `JWT expired` | Authentication token expired | Re-authenticate user |
| `RLS policy violation` | User not in canary company | Add user to company or update profiles |
| `Function not found` | agent-runner not deployed | `supabase functions deploy agent-runner` |
| `Connection timeout` | Database overloaded | Check query performance, add indexes |
| `Webhook failed` | Slack URL invalid | Verify webhook URL and permissions |

## Quick Recovery Steps

1. **Immediate**: Check function logs for errors
2. **5 min**: Verify environment variables are set
3. **10 min**: Test with synthetic task
4. **15 min**: Check real-time subscriptions
5. **30 min**: Full system health check

## Support Contacts

- **Database Issues**: Check Supabase dashboard logs
- **Function Issues**: `supabase functions logs agent-runner --follow`
- **UI Issues**: Browser dev tools → Network tab
- **Real-time Issues**: Check WebSocket connections in dev tools

---

**Remember**: Most issues are configuration-related. Check environment variables and permissions first! 🔧
