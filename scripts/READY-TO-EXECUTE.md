# 🚀 Ready to Execute: Day-0 Go-Live Commands

## Copy/Paste These Commands Right Now

### **Windows PowerShell**
```powershell
# 1) Verify deployment
pwsh -File scripts/verify-deployment.ps1

# 2) Fire the synthetic task end-to-end
pwsh -File scripts/day0-synthetic-test.ps1 -CompanyId 00000000-0000-4000-8000-000000000001

# 3) Tail live logs (in new terminal)
$env:SUPABASE_URL="https://<your>.supabase.co"
$env:SUPABASE_ANON_KEY="<anon>"
npx ts-node scripts/agent-tail.ts 00000000-0000-4000-8000-000000000001
```

### **Unix/macOS**
```bash
# Make scripts executable
chmod +x scripts/verify-agent-system.sh
chmod +x scripts/day0-synthetic-run.sh

# Set env for this shell
export SUPABASE_URL="https://<your>.supabase.co"
export SUPABASE_DB_URL="postgresql://<user>:<pass>@<host>:5432/postgres"

# 1) Verify deployment
./scripts/verify-agent-system.sh

# 2) Fire the synthetic task (replace UUID with your canary tenant)
./scripts/day0-synthetic-run.sh 00000000-0000-4000-8000-000000000001 CHI DAL

# 3) (Optional) Tail logs live from CLI while watching the portal
SUPABASE_URL="$SUPABASE_URL" SUPABASE_ANON_KEY="<anon>" \
  npx ts-node scripts/agent-tail.ts 00000000-0000-4000-8000-000000000001
```

## ✅ **Pass Criteria (10–30 seconds)**

1. **Autonomous Portal → Live Feed**: Shows "Starting task … / Task completed …"
2. **Metrics Bar**: Updates queue depth / running / success(15m)
3. **Slack**: Only pings if you intentionally break a handler

## 🚨 **Fast Triage (if anything looks off)**

### **No log lines in UI but CLI tail works**
- Ensure browser session is authenticated
- `profiles.company_id` for user equals canary tenant
- Confirm channel filter uses same UUID shown in DB

### **No realtime at all**
```sql
select * from pg_publication_tables where pubname='supabase_realtime';
```

### **Task stays queued**
- Check function env: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` present
- Re-deploy: `supabase functions deploy agent-runner`

### **RLS denial in UI**
- User must be member of canary company
- Verify mapping in `profiles` table

### **Slack silent on errors**
- Set `N8N_AGENT_LOG_WEBHOOK` on function, not frontend
- Re-deploy function

### **Log volume sanity**
```sql
select count(*) from agent_logs where created_at < now() - interval '30 days';
-- should trend to ~0 after nightly cron
```

## 📋 **Day-1–Day-7 Light Ops**

- **Daily**: Glance at `v_agent_metrics_15m` for success% dips and unexpected queue growth
- **Weekly**: Quick DR drill (can you deploy agent-runner + see logs in scratch project?)
- **Monthly**: Rotate keys; spot-check indexes on `agent_logs` / `agent_tasks`

## 🎯 **Success Indicators**

✅ **Autonomous Portal → Live Feed**: Shows "Starting task … / Task completed …"  
✅ **Metrics Bar**: Updates queue depth / running / success(15m)  
✅ **Slack**: Only pings on actual errors (test by breaking a handler)  
✅ **CLI Tail**: Real-time log streaming works  
✅ **Database**: Task status changes from queued → processing → done  

## 🚨 **Emergency Rollback**

If issues arise:
```bash
# Disable autonomous processing
supabase functions config set agent-runner.enabled=false

# Clear queue (emergency only)
psql "$SUPABASE_DB_URL" -c "UPDATE agent_tasks SET status = 'cancelled' WHERE status = 'queued';"
```

## 🎉 **You're Ready!**

You've got everything needed:
- ✅ Environment, schema, runner, realtime UI
- ✅ Verification and guardrails
- ✅ Fast triage guide
- ✅ Emergency rollback procedures

**Fire the synthetic task and watch your agents work in real time!** 🚀

The system will automatically:
- Process tasks end-to-end
- Update metrics in real-time
- Send alerts on errors
- Scale based on demand
- Maintain security and privacy

---

**Status**: 🟢 Ready for 24/7 Autonomous Operations
**Last Updated**: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
