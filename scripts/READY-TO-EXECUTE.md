# Day-0 Go-Live — Ready-to-Execute Guide (Unix/macOS)

This guide runs a full end-to-end synthetic task through your autonomous system and verifies realtime updates, metrics, RLS, and alerts.

## 0) Prerequisites (one-time)

- Supabase CLI and psql are available on your machine.
- Your app and functions have been deployed at least once.
- You have the canary tenant UUID handy.

## 1) Set Environment Variables

```bash
export SUPABASE_URL="https://<your-project>.supabase.co"
export SUPABASE_DB_URL="postgresql://<user>:<pass>@<host>:5432/postgres"
# Optional: override if your function is at a custom URL
export FUNCTION_URL="$SUPABASE_URL/functions/v1/agent-runner"
# Optional for CLI tailing
export SUPABASE_ANON_KEY="<your_anon_key>"
```

Replace the placeholders with your values. Keep secrets out of shell history when possible.

## 2) Verify the System

```bash
chmod +x scripts/verify-agent-system.sh
./scripts/verify-agent-system.sh
```

**Pass criteria:**
- DB connectivity ✅
- agent_tasks, agent_runs, agent_logs present ✅
- agent_logs has RLS ✅
- Tables are in supabase_realtime ✅
- TTL job exists ✅
- v_agent_metrics_15m exists ✅
- agent-runner is reachable ✅

## 3) Fire a Synthetic Task (End-to-End)

```bash
chmod +x scripts/day0-synthetic-run.sh
./scripts/day0-synthetic-run.sh 00000000-0000-4000-8000-000000000001 CHI DAL
```

**Args:** `<COMPANY_ID> [ORIGIN] [DEST]`

The script will:
- Insert a queued task for the tenant
- Invoke the agent-runner function
- Poll until done (or fail/timeout)

## 4) Watch Realtime in the App + CLI (Optional)

Keep your Autonomous Portal open (Live Feed + Metrics Bar), and optionally tail logs from your terminal:

```bash
SUPABASE_URL="$SUPABASE_URL" SUPABASE_ANON_KEY="$SUPABASE_ANON_KEY" \
  npx ts-node scripts/agent-tail.ts 00000000-0000-4000-8000-000000000001
```

## 5) Pass Criteria (10–30 seconds)

- **Autonomous Portal → Live Feed** shows: `Starting task: rates.price_one → Task completed: rates.price_one`.
- **Metrics Bar** updates queue depth / running / success (15m).
- **Database** shows task lifecycle: queued → running → done.
- **Slack** pings only if you intentionally trigger an error.

## Fast Triage

### A. No Live Feed logs in UI (but CLI tail shows events)

- Ensure browser is authenticated (valid JWT).
- Confirm the user's `profiles.company_id` equals the canary tenant UUID.
- Check the Live Feed is using the same companyId you're testing.

### B. No realtime at all

```sql
select relname from pg_publication_tables
where pubname='supabase_realtime'
and relname in ('agent_tasks','agent_runs','agent_logs');
```

If any table is missing, re-run migrations: `supabase db push`.

### C. Task stays queued

- Confirm function env is set: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- Re-deploy: `supabase functions deploy agent-runner`.
- Check runner logs for SQL or payload errors.

### D. RLS denied in UI

- The signed-in user must belong to the tenant (`profiles.company_id`).
- `agent_logs` writes are Edge-only via service role (by design).

### E. Slack is silent

- Set `N8N_AGENT_LOG_WEBHOOK` on the function env (not frontend).
- Intentionally throw in a handler to verify the error path.

### F. Log growth sanity

```sql
-- should trend to ~0 after nightly TTL
select count(*) from agent_logs where created_at < now() - interval '30 days';
```

## Rollback (safe, immediate)

- Disable autonomous flags for the tenant in your feature-flag system.
- Re-deploy the previous function artifact if needed.
- No destructive DB changes in Day-0—data remains intact.

## Day-1 → Day-7 Ops (lightweight)

- **Daily**: glance at `v_agent_metrics_15m` for success dips or queue growth.
- **Weekly**: quick DR drill (fresh project → deploy function → see logs).
- **Monthly**: rotate keys; check bloat on `agent_logs`/`agent_tasks`.

## Suggested SLOs & Alerts

- Uptime ≥ 99.95%
- p95 runner latency ≤ 2.5s
- 15-min success rate ≥ 98%
- Queue > 50 for 5m → warn; > 100 for 5m → page
- Errors > 2/min for 3m → page

## Reference Commands

### Re-verify
```bash
./scripts/verify-agent-system.sh
```

### Re-run synthetic
```bash
./scripts/day0-synthetic-run.sh 00000000-0000-4000-8000-000000000001 CHI DAL
```

### Tail logs
```bash
SUPABASE_URL=... SUPABASE_ANON_KEY=... \
  npx ts-node scripts/agent-tail.ts 00000000-0000-4000-8000-000000000001
```

### Quick metrics
```sql
select * from public.v_agent_metrics_15m
where company_id = '00000000-0000-4000-8000-000000000001';
```

## Security Notes (don't skip)

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
- Keep `N8N_AGENT_LOG_WEBHOOK` server-side only.
- Use the `redact()` helper to avoid logging PII (email, doc_url, names).
- Realtime uses your app's Supabase client—RLS is enforced via JWT.

---

**You're green-lit. Run Section 2–4 now and watch your agents work in real time.** 🚀
