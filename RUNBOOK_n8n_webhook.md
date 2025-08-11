# n8n Webhook – Production Runbook

## 1) Secret rotation (≤ 30s)
- Generate: `openssl rand -base64 32`
- GitHub → Environments (staging/prod) → Secrets → `N8N_WEBHOOK_SECRET` → update
- n8n: set env `N8N_WEBHOOK_SECRET` (restart workflow if needed)

## 2) Health/smoke
- Dispatch "Pipeline Self-Test" workflow
- Verify Slack notification + n8n execution
- Check signature node: "valid signature = true"

## 3) Replay a real payload
- From GH artifacts, download a payload/log
- Bash: `WEBHOOK_URL=... WEBHOOK_SECRET=... ./replay.sh payload.json`
- PowerShell: `.\replay.ps1 -WebhookUrl ... -Secret ... -PayloadPath payload.json`

## 4) Failure triage
- 401/403: secret mismatch → rotate both sides
- Timeout/429: runner egress allow-list includes `pixx100.app.n8n.cloud:443`
- Signature mismatch: confirm base64 vs hex; body must be raw JSON; no re-stringify in n8n before verify

## 5) Rollback signal (optional)
- Re-run deploy with `workflow_dispatch` input `rollback=true`
- Confirm n8n receives `event=deployment` with `status=cancelled|failure` and posts alert

## 6) Audit
- Check GH job summary + uploaded `deploy-logs-*` artifact
- n8n execution history; Slack message thread
