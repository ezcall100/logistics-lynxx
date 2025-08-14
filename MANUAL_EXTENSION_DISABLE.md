# Disable GitHub Actions Validation (Workspace Only)

These warnings are editor-side false positives from the GitHub Actions VS Code/Cursor extension.  
Workflows are valid and CI is unaffected.

## Disable for this workspace

1. Open **Extensions** (Ctrl/Cmd + Shift + X).
2. Search **"GitHub Actions"** (publisher: **GitHub**).
3. Click the **gear (⚙️)** → **Disable (Workspace)**.
4. Press **Ctrl/Cmd + Shift + P** → run **Developer: Reload Window**.

## Verify it's off

- Open the **Problems** panel and enable the **Source** column.
- You should **not** see "GitHub Actions" listed as a source.
- (Optional) Ctrl/Cmd + Shift + P → **Developer: Show Running Extensions** → confirm *GitHub Actions* shows **Disabled (Workspace)**.

## Keep linting (optional)

If you still want workflow checks, use **actionlint** (extension or CLI). It respects expressions better and is CI-friendly.

## Final sanity checklist (quick)

- [ ] All hyphenated outputs use bracket notation: `steps.create_issue.outputs['issue-url']`
- [ ] No `${{ vars.* }}` or `${{ secrets.* }}` in `env:`, `matrix:`, or `with:`.
- [ ] Use your export script pattern once per job, then reference `$VARS` in steps.
- [ ] Problems panel Source no longer shows GitHub Actions after disabling.

## Minimal export pattern (reference)

```yaml
- name: Export runtime envs (vars + secrets)
  run: |
    # Non-secrets (vars) — either pass as args to your script or echo here
    echo "APP_URL=${{ vars.APP_URL }}" >> $GITHUB_ENV
    echo "HEALTH_CHECK_URL=${{ vars.HEALTH_CHECK_URL }}" >> $GITHUB_ENV
    echo "DEPLOYMENT_WEBHOOK_URL=${{ vars.DEPLOYMENT_WEBHOOK_URL }}" >> $GITHUB_ENV

    # Secrets via your existing script or echo here
    echo "SUPABASE_URL=${{ secrets.PROD_SUPABASE_URL }}" >> $GITHUB_ENV
    echo "SUPABASE_SERVICE_ROLE_KEY=${{ secrets.PROD_SUPABASE_SERVICE_ROLE_KEY }}" >> $GITHUB_ENV
```

If the extension still complains about `${{ … }}` in `run:`, just complete the manual disable above. That's the reliable, workspace-scoped fix.
