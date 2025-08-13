# Day-0 Triage Cheatsheet

## Symptoms → Checks

**No log lines in UI; CLI tail shows data**
- Ensure browser session is authenticated.
- `profiles.company_id` for the user equals the canary tenant.
- Confirm channel filter uses the same UUID shown in DB.

**No realtime at all**
- `select * from pg_publication_tables where pubname='supabase_realtime'` includes `agent_tasks/agent_runs/agent_logs`.
- Browser console: any `ws` / auth errors?

**Task stays queued**
- Edge function env set: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- Re-deploy: `supabase functions deploy agent-runner`.
- Check row-level locks/constraints on `agent_tasks`.

**RLS denial in UI**
- Verify the user is a **member** of the tenant (`profiles.company_id`).
- RLS on `agent_logs` is read-only; writes happen from Edge.

**Slack silent on errors**
- `N8N_AGENT_LOG_WEBHOOK` must be set on the **function env**.
- Deliberately throw to test: break a handler → confirm ping.

**Log growth sanity**
- 30-day TTL via `pg_cron` in place.
- Spot-check: `select count(*) from agent_logs where created_at < now() - interval '30 days';` → should trend to 0 after nightly job.

## Quick Commands

### Check User Company Mapping
```sql
SELECT p.company_id, p.email 
FROM auth.users u 
JOIN public.profiles p ON u.id = p.id 
WHERE u.email = 'your-email@example.com';
```

### Verify Realtime Tables
```sql
SELECT * FROM pg_publication_tables 
WHERE pubname='supabase_realtime' 
AND relname IN ('agent_tasks','agent_runs','agent_logs');
```

### Check Function Environment
```bash
supabase functions config list agent-runner
```

### Test Slack Webhook
```bash
curl -X POST "$N8N_AGENT_LOG_WEBHOOK" \
  -H "Content-Type: application/json" \
  -d '{"text":"🧪 Test ping"}'
```

### Monitor Task Status
```sql
SELECT id, status, error, result, created_at 
FROM agent_tasks 
WHERE company_id = '00000000-0000-4000-8000-000000000001'
ORDER BY created_at DESC LIMIT 5;
```

## Emergency Rollback

### Disable Autonomous Processing
```sql
-- Update feature flags to disable (if using database flags)
UPDATE feature_flags SET enabled = false WHERE name IN ('autonomousAgents', 'aiLoadMatching');
```

### Clear Queue
```sql
-- Clear all queued tasks (emergency only)
UPDATE agent_tasks SET status = 'cancelled' WHERE status = 'queued';
```

### Stop Function
```bash
# If using scheduled invocations
supabase functions config set agent-runner.enabled=false
```

## Success Indicators

✅ **Autonomous Portal → Live Feed**: Shows "Starting task … / Task completed …"  
✅ **Metrics Bar**: Updates queue depth / running / success(15m)  
✅ **Slack**: Only pings on actual errors (test by breaking a handler)  
✅ **CLI Tail**: Real-time log streaming works  
✅ **Database**: Task status changes from queued → processing → done  

## Common Issues

| Issue | Likely Cause | Quick Fix |
|-------|-------------|-----------|
| No UI updates | JWT expired / wrong company_id | Re-authenticate, check profiles table |
| Task stuck queued | Function not deployed / env missing | `supabase functions deploy agent-runner` |
| No realtime | Tables not in publication | Add to supabase_realtime publication |
| RLS errors | User not in canary company | Update profiles.company_id |
| Silent Slack | Webhook not on function | Set N8N_AGENT_LOG_WEBHOOK on function env |

---

**Remember**: Most issues are configuration-related. Check environment variables and permissions first! 🔧
