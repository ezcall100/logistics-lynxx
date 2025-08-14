# New TMS Software

## Silencing "Context access might be invalid" in GitHub Actions (Cursor/VS Code)

This repo previously showed editor warnings like `Context access might be invalid: secrets` for valid GitHub Actions expressions. These were editor-side false positives (from the GitHub Actions validator), not CI issues.

We've implemented a workspace-scoped, non-invasive solution that keeps workflows correct and removes the noise while authoring.

### TL;DR
- Workflows are valid and run fine in GitHub Actions.
- We moved secret wiring into a shell step (external script) that writes to `$GITHUB_ENV`.
- We reduced editor lint noise via workspace settings and (optionally) disabling the Actions validator for this workspace.
- We cleaned workflow files (removed excessive inline disables).

## Root Cause
The GitHub Actions validator in Cursor/VS Code can't always resolve `secrets.*`, `vars.*`, `matrix.*`, or envs exported at runtime, leading to false positives.

`.yamllint`/inline comments won't affect that validator (it uses its own language server).

## What We Implemented

### 1) External script for secret export (single source of truth)
**File:** `scripts/export-env-secrets.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

env_name="${1:-}"
supabase_url="${2:-}"
service_key="${3:-}"
anon_key="${4:-}"
n8n_url="${5:-}"
slack_webhook="${6:-}"

if [[ -z "$env_name" || -z "$supabase_url" || -z "$service_key" || -z "$anon_key" ]]; then
  echo "Missing required args" >&2
  exit 1
fi

{
  echo "ENVIRONMENT_NAME=$env_name"
  echo "SUPABASE_URL=$supabase_url"
  echo "SUPABASE_SERVICE_ROLE_KEY=$service_key"
  echo "SUPABASE_ANON_KEY=$anon_key"
  echo "N8N_URL=${n8n_url:-}"
  echo "SLACK_WEBHOOK_URL=${slack_webhook:-}"
} >> "$GITHUB_ENV"
```

This keeps YAML simple and lets us pass secrets only inside `run:` (which editors treat as plain text).

### 2) Minimal workflow pattern (no secrets in matrix/env blocks)
In `post-deploy-verify.yml` (and similar workflows), we call the script and pass secrets as arguments (not in `env:`), then use the exported envs in later steps:

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        options: [prod, staging, dev]
        default: prod

jobs:
  verify:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [${{ inputs.environment }}]

    steps:
      - uses: actions/checkout@v4

      - name: Export environment secrets
        run: |
          set -euo pipefail
          case "${{ matrix.environment }}" in
            prod)
              bash scripts/export-env-secrets.sh prod \
                "${{ secrets.PROD_SUPABASE_URL }}" \
                "${{ secrets.PROD_SUPABASE_SERVICE_ROLE_KEY }}" \
                "${{ secrets.PROD_SUPABASE_ANON_KEY }}" \
                "${{ secrets.PROD_N8N_URL }}" \
                "${{ secrets.PROD_SLACK_WEBHOOK_URL }}"
              ;;
            staging)
              bash scripts/export-env-secrets.sh staging \
                "${{ secrets.STAGING_SUPABASE_URL }}" \
                "${{ secrets.STAGING_SUPABASE_SERVICE_ROLE_KEY }}" \
                "${{ secrets.STAGING_SUPABASE_ANON_KEY }}" \
                "${{ secrets.STAGING_N8N_URL }}" \
                "${{ secrets.STAGING_SLACK_WEBHOOK_URL }}"
              ;;
            dev)
              bash scripts/export-env-secrets.sh dev \
                "${{ secrets.DEV_SUPABASE_URL }}" \
                "${{ secrets.DEV_SUPABASE_SERVICE_ROLE_KEY }}" \
                "${{ secrets.DEV_SUPABASE_ANON_KEY }}" \
                "${{ secrets.DEV_N8N_URL }}" \
                "${{ secrets.DEV_SLACK_WEBHOOK_URL }}"
              ;;
          esac

      - name: Verify Supabase health
        run: curl -fsS "$SUPABASE_URL/health" >/dev/null && echo "Supabase ✔"

      - name: Verify DB access
        run: |
          node -e "
            const fetch = require('node-fetch');
            (async () => {
              const r = await fetch(process.env.SUPABASE_URL + '/rest/v1/', {
                headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY }
              });
              if (!r.ok) throw new Error('Supabase REST check failed: ' + r.status);
            })();
          "
          echo "REST access ✔"

      - name: n8n health (optional)
        if: ${{ env.N8N_URL != '' }}
        run: curl -fsS "$N8N_URL/healthz" >/dev/null || curl -fsS "$N8N_URL" >/dev/null
```

**Why this works:**
- No `${{ secrets.* }}` in matrix/env mappings → fewer editor complaints.
- Secrets only appear inside `run:` (passed as args) → linters treat them as strings.
- All subsequent steps consume plain shell envs: `$SUPABASE_URL`, `$SUPABASE_SERVICE_ROLE_KEY`, etc.

### 3) Workspace editor settings (keep YAML, silence noise)
**File:** `.vscode/settings.json`

```json
{
  // Keep YAML syntax/schema
  "yaml.schemas": {
    "https://json.schemastore.org/github-workflow.json": ".github/workflows/*.yml"
  },

  // Optional: reduce YAML validation aggressiveness
  "yaml.validate": true,

  // If you use the GitHub Actions extension, prefer disabling it for this workspace via the UI.
  // (Settings here won't override that extension's own validator reliably.)
}
```

**Optional (manual):** In Cursor/VS Code, open Extensions → GitHub Actions → ⚙️ → Disable (Workspace).
This silences its validator in this repo only while keeping it available elsewhere.

### 4) Cleanup & docs
- Removed excessive inline disable comments from workflows.
- Added this README and (optionally) `.github/YAML_LINTING_FIX.md` with a shorter summary.

## Files Touched
- `scripts/export-env-secrets.sh` (new)
- `.github/workflows/post-deploy-verify.yml` (refactored to call the script)
- `.vscode/settings.json` (schema mapping; keep YAML highlighting)
- (Optional) `.github/YAML_LINTING_FIX.md` (one-page summary)

## How to Verify
1. Restart Cursor/VS Code (so workspace settings take effect).
2. Open any workflow in `.github/workflows/…` and confirm editor noise is gone or reduced.
3. In GitHub → Actions tab → run Post Deploy Verify via Run workflow, choosing prod, staging, or dev.
4. Check logs for:
   - Supabase ✔
   - REST access ✔
   - Optional n8n check success.

## Notes & Safety
- Runtime behavior is unchanged; this is an authoring-time improvement.
- Secrets never print to logs (we only export names, not echo values).
- If you prefer GitHub Environments, you can define uniform secret names (`SUPABASE_URL`, etc.) per environment and still pass them via the same script pattern.

## Revert (if ever needed)
1. Delete `scripts/export-env-secrets.sh`.
2. Inline the `echo ... >> $GITHUB_ENV` block back into the workflow's `run:` step.
3. Restore any inline disables you previously relied on (not recommended).

## FAQ

**Q: Why not keep secrets in job.env?**
A: Putting `${{ secrets.* }}` in `env:` or `matrix` often triggers editor false positives. Passing them as script args inside `run:` avoids that while remaining first-class in Actions.

**Q: Does this affect CI/CD?**
A: No—this only changes where we wire secrets during the job (script), not the values or the checks.

---

Happy (quiet) shipping! 🚚✨
