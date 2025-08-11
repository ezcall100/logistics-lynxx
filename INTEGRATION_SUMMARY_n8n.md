# n8n Webhook Integration – Summary

**Events:** `deployment`, `health_check`  
**Security:** HMAC-SHA256 signature (`X-Signature-256: sha256=<base64>`) with constant-time compare  
**Reliability:** 5x retries, idempotency key per run/attempt  
**Egress:** `pixx100.app.n8n.cloud:443` allow-listed via `harden-runner`

## Payload (deployment)
```json
{
  "event": "deployment",
  "status": "success|failure|cancelled",
  "repo": "org/repo",
  "sha": "abcdef",
  "ref": "main|develop",
  "run_id": "123",
  "run_attempt": "1",
  "environment": "staging|production",
  "app_url": "https://…",
  "should_deploy": "true|false",
  "target_environment": "staging|production|n/a",
  "timestamp": "2025-08-11T00:00:00Z"
}
```

## n8n Flow
Webhook → Function/Code (HMAC verify) → Slack (success/failure) → optional branches (ticket, Discord, etc.)

## Quick Ops
- **Rotate secret:** update GitHub & n8n → run Self-Test
- **Replay payload:** `replay.sh` / `replay.ps1`
- **Inspect:** GH job summary, artifacts, n8n executions
